import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { useGetUsers } from "@/queries/user.query";
import type { BaseUser } from "@/types/User";
import CustomPagination from "@/components/common/CustomPagination";
import usePagination from "@/hooks/usePagination";

type UsersTableProps = {
  handleEdit: (user: BaseUser) => void;
};

function UsersTable({ handleEdit }: UsersTableProps) {
  const { page, setPage } = usePagination();
  const { data: users, isLoading } = useGetUsers({ page, pageSize: 5 });

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
      {
        name: "Edit",
        onClick: function (row: BaseUser) {
          handleEdit(row);
        },
      },
      { name: "Delete", onClick: () => {} },
    ],
    [handleEdit]
  );

  return (
    <>
      <CustomTable<BaseUser>
        columns={columns}
        body={users?.data ?? null}
        actions={actions}
        isLoading={isLoading}
      />

      <CustomPagination
        limit={users?.pagination.pageSize ?? 5}
        totalCount={users?.totalPages ?? 1}
        isNext={users?.hasNextPage ?? false}
        isPrevious={users?.hasPreviousPage ?? false}
        page={users?.pagination.currentPage ?? 1}
        setPage={setPage}
      />
    </>
  );
}

export default UsersTable;
