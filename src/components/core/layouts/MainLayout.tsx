import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="p-5">
      <Button asChild>
        <Link to="/bank">Go To Bank Admin Page</Link>
      </Button>
      <Outlet />
    </div>
  );
}

export default MainLayout;
