/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06060A",
          900: "#0A0A12",
          850: "#0E0E1A",
          800: "#13131F",
          700: "#1B1B2C",
          600: "#252539",
          500: "#33334D",
        },
        brand: {
          violet: "#8B5CF6",
          purple: "#A855F7",
          blue: "#3B82F6",
          cyan: "#22D3EE",
          orange: "#FB923C",
          pink: "#EC4899",
        },
      },
      fontFamily: {
        display: [
          "Space Grotesk",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #FB923C 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.15) 50%, rgba(251,146,60,0.15) 100%)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.35) 0%, rgba(59,130,246,0.15) 40%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(139, 92, 246, 0.45)",
        "glow-orange": "0 10px 40px -10px rgba(251, 146, 60, 0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        gradient: "gradient 8s ease infinite",
      },
    },
  },
  plugins: [],
};
