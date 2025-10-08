import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import OrganizationsCreateForm from "./OrganizationsCreateForm";
import { useCallback } from "react";
import type { BaseOrganization } from "@/types/Organization";

type OrganizationsHeaderProps = {
  selectedOrganization: BaseOrganization | null;
  isFormOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

function OrganizationsHeader({
  selectedOrganization,
  isFormOpen,
  onOpenChange,
}: OrganizationsHeaderProps) {
  const handleCloseDrawer = useCallback(() => {
    onOpenChange(false);
  }, []);

  return (
    <Drawer direction="right" open={isFormOpen} onOpenChange={onOpenChange}>
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
        <OrganizationsCreateForm
          editOrganization={selectedOrganization}
          handleClose={handleCloseDrawer}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default OrganizationsHeader;
