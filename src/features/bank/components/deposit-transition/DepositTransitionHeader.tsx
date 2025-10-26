import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import DepositTransitionCreateForm from "./DepositTransitionForm";
import { useCallback } from "react";
import type { BaseDepositTransition } from "@/types/DepositTransition";
import CreateButton from "@/components/common/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { FileUpload } from "@/components/common/FileUpload";

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
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-xl font-bold">DepositTransition</h1>
        <p className="text-sm text-gray-500">Total: 60</p>
      </div>
      <div className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-[149px] h-[42px] bg-[#F3F4F6] text-[#072B46] hover:bg-[#F3F4F6]">
              File Upload <FileUp />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[340px]">
            <FileUpload />
          </DialogContent>
        </Dialog>

        <Drawer direction="right" open={isFormOpen} onOpenChange={onOpenChange}>
          <DrawerTrigger asChild>
            <CreateButton />
          </DrawerTrigger>
          <DrawerContent>
            <DepositTransitionCreateForm
              editDepositTransition={selectedDepositTransition}
              handleClose={handleCloseDrawer}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default DepositTransitionHeader;
