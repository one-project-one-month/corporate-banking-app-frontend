import { type LucideIcon } from "lucide-react";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

type NavMainItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  children?: {
    title: string;
    url: string;
  }[];
};

type AppSidebarData = {
  navMain: NavMainItem[];
};

type AppSidebarProps = {
  sidebarData: AppSidebarData;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ sidebarData, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-start">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div className="w-[224px] h-[64px] p-6 ">
                <p className="text-5xl font-medium ml-2 text-[#0A3D62] font-serif">
                  flypay
                </p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="my-2" />
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
