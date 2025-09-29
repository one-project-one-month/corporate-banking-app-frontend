import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { useGetUsers } from "@/queries/user.query";
import type { BaseUser } from "@/types/User";

function UsersTable() {
  const { data: users, isLoading } = useGetUsers();

  const columns = useMemo<Column<BaseUser>[]>(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "fullName",
        label: "Full Name",
      },
      {
        key: "dateOfBirth",
        label: "DOB",
        className: "text-center",
      },
      {
        key: "genderId",
        label: "Gender",
        className: "text-center",
        cell: (value) => {
          return (
            <span>{value == 1 ? "Male" : value == 2 ? "Female" : "Other"}</span>
          );
        },
      },
      {
        key: "email",
        label: "Email",
      },
    ],
    []
  );

  const actions = useMemo<Action<BaseUser>[]>(
    () => [
      { name: "Edit", onClick: () => {} },
      { name: "Delete", onClick: () => {} },
    ],
    []
  );

  return (
    <CustomTable<BaseUser>
      columns={columns}
      body={users?.data ?? null}
      actions={actions}
      isLoading={isLoading}
    />
  );
}

export default UsersTable;
