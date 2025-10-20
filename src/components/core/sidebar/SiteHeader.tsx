import CustomBreadCrumb from "@/components/common/CustomBreadCrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { User } from "lucide-react";

function SiteHeader() {
  const currentPathName = useLocation().pathname;

  const segments = currentPathName.split("/").filter(Boolean);
  const displaySegments = segments[0] === "bank" ? segments.slice(1) : segments;

  const crumbs = displaySegments.map((segment, index) => {
    return {
      name: segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      path: displaySegments.filter((_, i) => i <= index).join("/"),
    };
  });

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="w-full flex justify-between px-4 lg:gap-2 lg:px-6">
        <div className="flex  items-center gap-1 ">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <CustomBreadCrumb
            currentPageTitle={crumbs[crumbs.length - 1]?.name}
            links={crumbs.filter((_, i) => i !== crumbs.length - 1)}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 border-2 rounded-full flex justify-center items-center">
            <User size={16} />
          </div>

          <p className="text-sm font-bold">Jon Doe</p>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
