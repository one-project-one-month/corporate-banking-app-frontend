import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useCallback } from "react";
import type { BaseAccount } from "@/types/Account";
import AccountCreateForm from "@/features/bank/components/account/AccountCreateForm";
import CreateButton from "@/components/common/Button";


type AccountsHeaderProps = {
  selectedAccount: BaseAccount | null;
  isFormOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

function AccountsHeader({
  selectedAccount,
  isFormOpen,
  onOpenChange,
}: AccountsHeaderProps) {
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

        <DrawerTrigger asChild>
          <CreateButton />
        </DrawerTrigger>
      </div>
     
      <DrawerContent>
        <AccountCreateForm
          editAccount={selectedAccount}
          handleClose={handleCloseDrawer}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default AccountsHeader;
