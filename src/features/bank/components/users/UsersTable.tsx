import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { useDeleteUser, useGetUsers } from "@/queries/user.query";
import type { BaseUser } from "@/types/User";
import CustomPagination from "@/components/common/CustomPagination";
import usePagination from "@/hooks/usePagination";

type UsersTableProps = {
  handleEdit: (user: BaseUser) => void;
};

function UsersTable({ handleEdit }: UsersTableProps) {
  const { page, setPage } = usePagination();
  const { data: users, isLoading } = useGetUsers({ page, pageSize: 5 });
  const { mutate: deleteUser } = useDeleteUser();

  const columns = useMemo<Column<BaseUser>[]>(
    () => [
      {
        key: "userId",
        label: "User ID",
      },
      {
        key: "fullName",
        label: "Full Name",
      },
      {
        key: "emailAddress",
        label: "Email Address",
        className: "text-center",
      },
      // {
      //   key: "genderId",
      //   label: "Gender",
      //   className: "text-center",
      //   cell: (value) => {
      //     return (
      //       <span>{value == 1 ? "Male" : value == 2 ? "Female" : "Other"}</span>
      //     );
      //   },
      // },

      {
        key: "role",
        label: "Role",
      },
      {
        key: "organizationName",
        label: "Organization Name",
      },

      {
        key: "status",
        label: "Status",
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
      {
        name: "Delete",
        onClick: function (row: BaseUser) {
          deleteUser(row.id);
        },
      },
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
