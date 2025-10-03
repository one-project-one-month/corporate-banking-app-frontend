import UsersHeader from "../components/users/UsersHeader";
import UsersTable from "../components/users/UsersTable";
import { useCallback, useState } from "react";
import type { BaseUser } from "@/types/User";

function UsersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BaseUser | null>(null);

  const handleEditUser = useCallback((user: BaseUser) => {
    setIsFormOpen(true);
    setSelectedUser(user);
  }, []);

  return (
    <div>
      <UsersHeader
        selectedUser={selectedUser}
        isFormOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      <UsersTable handleEdit={handleEditUser} />
    </div>
  );
}

export default UsersPage;
