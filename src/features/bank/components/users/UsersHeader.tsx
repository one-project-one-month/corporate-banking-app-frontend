import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import UsersCreateForm from "./UsersCreateForm";
import { useCallback } from "react";
import type { BaseUser } from "@/types/User";
import CreateButton from "@/components/common/Button";

type UsersHeaderProps = {
  selectedUser?: BaseUser | null;
  isFormOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

function UsersHeader({
  isFormOpen,
  onOpenChange,
  selectedUser,
}: UsersHeaderProps) {
  const handleCloseDrawer = useCallback(() => {
    onOpenChange(false);
  }, []);

  return (
    <Drawer direction="right" open={isFormOpen} onOpenChange={onOpenChange}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Users</h1>
          <p className="text-sm text-gray-500">Total: 60</p>
        </div>
        <DrawerTrigger asChild>
          <CreateButton />
        </DrawerTrigger>
      </div>

      <DrawerContent>
        <UsersCreateForm
          editUser={selectedUser}
          handleClose={handleCloseDrawer}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default UsersHeader;
