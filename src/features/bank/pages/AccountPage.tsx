import { useCallback, useState } from "react";
import AccountTable from "@/features/bank/components/account/AccountTable";
import type { BaseAccount } from "@/types/Account";
import AccountsHeader from "@/features/bank/components/account/AccountHeader";

const AccountsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BaseAccount | null>(
    null
  );

  const handleEditAccount = useCallback((account: BaseAccount) => {
    setIsFormOpen(true);
    setSelectedAccount(account);
  }, []);

  return (
    <div>
      <AccountsHeader
        selectedAccount={selectedAccount}
        isFormOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      <AccountTable handleEdit={handleEditAccount} />
    </div>
  );
};

export default AccountsPage;
