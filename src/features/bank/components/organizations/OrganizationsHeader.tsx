import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import OrganizationsCreateForm from "./OrganizationsCreateForm";
import { useCallback, useState } from "react";

function OrganizationsHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>();

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <Drawer
      direction="right"
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Organizations</h1>
          <p className="text-sm text-gray-500">Total: 60</p>
        </div>
        <div className="flex space-x-2">
          <DrawerTrigger asChild>
            <Button variant="default">Create</Button>
          </DrawerTrigger>
          <Button variant="secondary">Filter</Button>
        </div>
      </div>
      <DrawerContent>
        <OrganizationsCreateForm handleClose={handleCloseDrawer} />
      </DrawerContent>
    </Drawer>
  );
}

export default OrganizationsHeader;
