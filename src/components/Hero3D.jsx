import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Html,
  useAnimations,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import DinoLoader from "./loader/DinoLoader";

const MODEL_URL = "/models/demon_trex.glb";

useGLTF.preload(MODEL_URL);

function tryPlayVideoTexture(texture) {
  if (!texture) return;
  const image = texture.image;
  if (!image || typeof image.play !== "function") return;
  image.muted = true;
  image.loop = true;
  image.playsInline = true;
  image.crossOrigin = "anonymous";
  const playPromise = image.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
}

function Dinosaur({
  reducedMotion,
  scaleTarget = 0.3,
  groundOffsetAdjust = -0.02,
  onModelReady,
}) {
  const group = useRef(null);
  const [fitted, setFitted] = useState(false);
  const readyNotifiedRef = useRef(false);
  const footYRef = useRef(-0.82);
  const [groundY, setGroundY] = useState(-0.82);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);
  const model = useMemo(() => (scene ? cloneSkeleton(scene) : null), [scene]);

  // Keep model dimension fixed (no viewport-based scaling).
  useLayoutEffect(() => {
    if (!model) return;
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.sub(center);
    model.scale.setScalar(scaleTarget);

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const material = child.material;
        if (material) {
          if (Array.isArray(material)) {
            material.forEach((m) => {
              tryPlayVideoTexture(m?.map);
              tryPlayVideoTexture(m?.emissiveMap);
              tryPlayVideoTexture(m?.alphaMap);
            });
          } else {
            tryPlayVideoTexture(material.map);
            tryPlayVideoTexture(material.emissiveMap);
            tryPlayVideoTexture(material.alphaMap);
          }
        }
      }
    });
    model.updateMatrixWorld(true);
    const fittedBox = new THREE.Box3().setFromObject(model);
    footYRef.current = fittedBox.min.y;
    setGroundY(footYRef.current + groundOffsetAdjust);
    setFitted(true);
    if (!readyNotifiedRef.current) {
      readyNotifiedRef.current = true;
      onModelReady?.();
    }
  }, [model, scaleTarget, groundOffsetAdjust, onModelReady]);

  useEffect(() => {
    setGroundY(footYRef.current + groundOffsetAdjust);
  }, [groundOffsetAdjust]);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => {
      if (!action) return;
      action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play();
    });
    return () => {
      Object.values(actions).forEach((action) => action?.fadeOut(0.2));
    };
  }, [actions]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const swingSpeed = reducedMotion ? 0 : 0.45;
    const targetY = Math.sin(t * swingSpeed) * (Math.PI / 3.1);

    // Subtle floating.
    const float = reducedMotion ? 0 : Math.sin(t * 0.6) * 0.06;
    group.current.position.y = -0.6 + float;
    group.current.rotation.x += (0 - group.current.rotation.x) * 0.08;
    group.current.rotation.z += (0 - group.current.rotation.z) * 0.08;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.08;
  });

  return (
    <group ref={group}>
      <GroundPing reducedMotion={reducedMotion} yOffset={groundY} />
      {model && <primitive object={model} visible={fitted} />}
    </group>
  );
}

function GroundPing({ reducedMotion, yOffset = -0.82 }) {
  const coreRef = useRef(null);
  const stageRef = useRef(null);
  const logoMap = useTexture("/Rex.svg");
  const stageYOffset = -0.03;

  useEffect(() => {
    if (!logoMap) return;
    logoMap.colorSpace = THREE.SRGBColorSpace;
    logoMap.needsUpdate = true;
  }, [logoMap]);

  useFrame((state) => {
    if (!coreRef.current || !stageRef.current) return;
    const t = state.clock.getElapsedTime();
    const pulse = reducedMotion ? 0.5 : (Math.sin(t * 1.8) + 1) * 0.5;
    const coreScale = 0.9 + pulse * 0.08;
    const stagePulse = reducedMotion ? 0.5 : (Math.sin(t * 1.2) + 1) * 0.5;

    coreRef.current.scale.set(coreScale, coreScale, coreScale);
    stageRef.current.material.emissiveIntensity = 0.015 + stagePulse * 0.025;
  });

  return (
    <group position={[0, yOffset + stageYOffset, -0.22]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh
        ref={stageRef}
        position={[0, 0, -0.035]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow={false}
      >
        <cylinderGeometry args={[1.02, 1.08, 0.08, 96]} />
        <meshStandardMaterial
          color="#0b0b0d"
          roughness={0.42}
          metalness={0.35}
          emissive="#050507"
          emissiveIntensity={0.02}
        />
      </mesh>
      <mesh ref={coreRef}>
        <ringGeometry args={[0.70, 0.76, 96]} />
        <meshBasicMaterial color="#08080a" transparent opacity={0.18} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.90, 0.95, 96]} />
        <meshBasicMaterial color="#040405" transparent opacity={0.22} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[0.96, 1.02, 96]} />
        <meshBasicMaterial color="#1a1c22" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.028]}>
        <circleGeometry args={[0.69, 96]} />
        <meshBasicMaterial
          map={logoMap}
          transparent
          opacity={0.9}
          alphaTest={0.08}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.026]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <shadowMaterial transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

function Rig({ cameraX, cameraY, cameraZ }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (cameraX - camera.position.x) * 0.08;
    camera.position.y += (cameraY - camera.position.y) * 0.08;
    camera.position.z += (cameraZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0.1, 0);
  });
  return null;
}

function Loader() {
  return (
    <Html center>
      <DinoLoader compact />
    </Html>
  );
}

export function Hero3D({
  className = "",
  scaleTarget = 0.26,
  onModelReady,
  onModelError,
}) {
  const containerRef = useRef(null);
  const [maxDpr, setMaxDpr] = useState(1.75);
  const [responsiveScale, setResponsiveScale] = useState(scaleTarget);
  const [groundOffsetAdjust, setGroundOffsetAdjust] = useState(-0.02);
  const [cameraX, setCameraX] = useState(0.7);
  const [cameraY, setCameraY] = useState(1.25);
  const [cameraZ, setCameraZ] = useState(4.8);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const setViewportConfig = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setMaxDpr(1.15);
        setResponsiveScale(scaleTarget * 0.78);
        setGroundOffsetAdjust(-0.035);
        setCameraX(0.32);
        setCameraY(1.0);
        setCameraZ(5.9);
      } else if (w < 1024) {
        setMaxDpr(1.35);
        setResponsiveScale(scaleTarget * 0.9);
        setGroundOffsetAdjust(-0.028);
        setCameraX(0.46);
        setCameraY(1.15);
        setCameraZ(5.35);
      } else {
        setMaxDpr(1.75);
        setResponsiveScale(scaleTarget);
        setGroundOffsetAdjust(-0.02);
        setCameraX(0.55);
        setCameraY(1.25);
        setCameraZ(5.0);
      }
    };
    setViewportConfig();
    window.addEventListener("resize", setViewportConfig, { passive: true });
    return () => window.removeEventListener("resize", setViewportConfig);
  }, [scaleTarget]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <Canvas
        dpr={[1, maxDpr]}
        camera={{ position: [0.7, 1.25, 4.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows={{ type: THREE.PCFShadowMap }}
        className="!h-full !w-full"
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const onLost = (event) => {
            event.preventDefault();
            onModelError?.();
          };
          const onError = () => onModelError?.();
          canvas.addEventListener("webglcontextlost", onLost, false);
          canvas.addEventListener("webglcontextcreationerror", onError, false);
        }}
      >
        {/* Soft studio lighting */}
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={1.05}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00015}
          shadow-normalBias={0.02}
          shadow-camera-near={0.1}
          shadow-camera-far={24}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-radius={2}
        />
        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.18}
          color="#dfe3ff"
        />
        <hemisphereLight
          color="#ffffff"
          groundColor="#e5e7eb"
          intensity={0.35}
        />

        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          <Dinosaur
            reducedMotion={reducedMotion}
            scaleTarget={responsiveScale}
            groundOffsetAdjust={groundOffsetAdjust}
            onModelReady={onModelReady}
          />
        </Suspense>

        <Rig cameraX={cameraX} cameraY={cameraY} cameraZ={cameraZ} />
      </Canvas>
    </div>
  );
}
