import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Users2,
  LayoutDashboard,
  Building2,
  ClipboardList,
  User,
  MessageCircleMore,
} from "lucide-react";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../sidebar/AppSidebar";
import SiteHeader from "../sidebar/SiteHeader";

function BankLayout() {
  const nav = useMemo(
    () => ({
      navMain: [
        {
          title: "Dashboard",
          url: "/bank",
          icon: LayoutDashboard,
        },
        {
          title: "Accounts",
          url: "/bank/accounts",
          icon: User,
        },
        {
          title: "Organizations",
          url: "/bank/organizations",
          icon: Building2,
        },
        {
          title: "Users",
          url: "/bank/users",
          icon: Users2,
        },
        {
          title: "Deposit Transition",
          url: "/bank/deposit-transition",
          icon: ClipboardList,
        },
        {
          title: "FAQ",
          url: "/bank/FAQ",
          icon: MessageCircleMore,
        },
      ],
    }),
    []
  );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar sidebarData={nav} />
      <SidebarInset>
        <SiteHeader />
        <div className="w-full px-6 py-3">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default BankLayout;
