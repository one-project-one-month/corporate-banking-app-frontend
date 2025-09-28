import {
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Users2 } from "lucide-react";
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
        },
        {
          title: "Organizations",
          url: "/bank/organizations",
        },
        {
          title: "Users",
          url: "/bank/users",
          icon: Users2,
        },
        {
          title: "Deposit Transition",
          url: "/bank/deposit-transition",
        },
        {
          title: "FAQ",
          url: "/bank/faq",
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
        <div className="w-full">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default BankLayout;
