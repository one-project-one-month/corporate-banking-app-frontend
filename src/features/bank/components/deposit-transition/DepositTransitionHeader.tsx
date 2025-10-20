import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import DepositTransitionCreateForm from "./DepositTransitionForm";
import { useCallback } from "react";
import type { BaseDepositTransition } from "@/types/DepositTransition";
import CreateButton from "@/components/common/Button";
import SearchInput from "@/components/common/Search";

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
        <DrawerTrigger asChild>
          <CreateButton />
        </DrawerTrigger>
      </div>

      <div className="flex justify-end gap-6">
        <SearchInput />
        <Button className="w-[148px] h-[42px] bg-[#E5E5E5]" variant="secondary">
          Filter
        </Button>
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
