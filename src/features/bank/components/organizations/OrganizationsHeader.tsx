import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import OrganizationsCreateForm from "./OrganizationsCreateForm";
import { useCallback } from "react";
import type { BaseOrganization } from "@/types/Organization";
import CreateButton from "@/components/common/Button";
import { FileUpload } from "@/components/common/FileUpload";
import { FileUp } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-xl font-bold">Organizations</h1>
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
            <OrganizationsCreateForm
              editOrganization={selectedOrganization}
              handleClose={handleCloseDrawer}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default OrganizationsHeader;
