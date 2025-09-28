import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { CheckCell } from "@/components/common/table/CustomCells";

type User = {
  fullName: string;
  dateOfBirth: string;
  genderId: string;
  email: string;
};

function UsersTable() {
  const users: User[] = [
    {
      fullName: "Wai Yan Linn",
      dateOfBirth: "17.5.2002",
      genderId: "2",
      email: "linn205426@gmail.com",
    },
    {
      fullName: "Wai Yan Linn",
      dateOfBirth: "17.5.2002",
      genderId: "2",
      email: "linn205426@gmail.com",
    },
    {
      fullName: "Wai Yan Linn",
      dateOfBirth: "17.5.2002",
      genderId: "2",
      email: "linn205426@gmail.com",
    },
    {
      fullName: "Wai Yan Linn",
      dateOfBirth: "17.5.2002",
      genderId: "2",
      email: "linn205426@gmail.com",
    },
    {
      fullName: "Wai Yan Linn",
      dateOfBirth: "17.5.2002",
      genderId: "2",
      email: "linn205426@gmail.com",
    },
  ];

  const columns = useMemo<Column<User>[]>(
    () => [
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
      },
      {
        key: "email",
        label: "Email",
      },
    ],
    []
  );

  const actions = useMemo<Action<User>[]>(
    () => [
      { name: "Edit", onClick: () => {} },
      { name: "Delete", onClick: () => {} },
    ],
    []
  );

  return <CustomTable<User> columns={columns} body={users} actions={actions} />;
}

export default UsersTable;
