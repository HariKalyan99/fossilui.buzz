import { Outlet } from "react-router-dom";
import { LeftRail } from "./LeftRail";
import { RightRail } from "./RightRail";
import { TopBar } from "./TopBar";
import { BottomTabs } from "./BottomTabs";
import { CreatePostModal } from "../compose/CreatePostModal";

export function AppShell() {
  return (
    <div className="min-h-dvh bg-app text-base-strong">
      <div className="mx-auto max-w-[1380px] grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_minmax(0,1fr)_340px]">
        <LeftRail />
        <main className="min-w-0">
          <TopBar />
          <div className="pb-24 md:pb-10">
            <Outlet />
          </div>
        </main>
        <RightRail />
      </div>
      <BottomTabs />
      <CreatePostModal />
    </div>
  );
}
