import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import DepositTransitionCreateForm from "./DepositTransitionForm";
import { useCallback } from "react";
import type { BaseDepositTransition } from "@/types/DepositTransition";

type DepositTransitionHeaderProps = {
  selectedDepositTransition: BaseDepositTransition | null;
  isFormOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

function DepositTransitionHeader({
  selectedDepositTransition,
  isFormOpen,
  onOpenChange,
}: DepositTransitionHeaderProps) {
  const handleCloseDrawer = useCallback(() => {
    onOpenChange(false);
  }, []);

  return (
    <Drawer direction="right" open={isFormOpen} onOpenChange={onOpenChange}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">DepositTransition</h1>
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
        <DepositTransitionCreateForm
          editDepositTransition={selectedDepositTransition}
          handleClose={handleCloseDrawer}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default DepositTransitionHeader;
