import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import type { BaseAccount } from "@/types/Account";
import { useDeleteAccount, useGetAccount } from "@/queries/Account.query";
import usePagination from "@/hooks/usePagination";
import CustomPagination from "@/components/common/CustomPagination";
import { EyeIcon, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AccountTableProps = {
  handleEdit: (account: BaseAccount) => void;
};

function AccountTable({ handleEdit }: AccountTableProps) {
  const { page, setPage } = usePagination();
  const { data: accounts, isLoading } = useGetAccount({
    page,
    pageSize: 5,
  });
  const { mutate: deleteAccount } = useDeleteAccount();

  const columns = useMemo<Column<BaseAccount>[]>(
    () => [
      {
        key: "accountNumber",
        label: "Account Number",
      },
      {
        key: "accountHolder",
        label: "Account Holder",
      },
      {
        key: "accountType",
        label: "Account Type",
      },
      {
        key: "status",
        label: "Status",
        cell: (value) => (
          <span
            className={cn(
              "w-25 p-1 border rounded-2xl  capitalize text-sm text-center ",
              value === "active"
                ? "text-[#3579F6] bg-[#E3EDFF]"
                : value === "inActive bg-[#ECECEC]"
                ? "text-[gray]"
                : "text-gray-500"
            )}
          >
            {value}
          </span>
        ),
      },
      {
        key: "createdBy",
        label: "Date Opened",
        className: "text-center",
        headerClassName: "text-center",
      },
    ],
    []
  );

  const actions = useMemo<Action<BaseAccount>[]>(
    () => [
      {
        name: "View Detail",
        icons: <EyeIcon />,
        onClick: function (row: BaseAccount) {
          handleEdit(row);
        },
      },
      {
        name: "Edit",
        icons: <Pencil />,
        onClick: function (row: BaseAccount) {
          handleEdit(row);
        },
      },
      {
        name: "Delete",
        icons: <Trash2 color="red" />,
        onClick: function (row: BaseAccount) {
          deleteAccount(row.id);
        },
      },
    ],
    []
  );

  return (
    <>
      <CustomTable<BaseAccount>
        columns={columns}
        body={accounts?.data ?? null}
        actions={actions}
        isLoading={isLoading}
      />
      <CustomPagination
        limit={accounts?.pagination.pageSize ?? 5}
        totalCount={accounts?.totalPages ?? 1}
        isNext={accounts?.hasNextPage ?? false}
        isPrevious={accounts?.hasPreviousPage ?? false}
        page={accounts?.pagination.currentPage ?? 1}
        setPage={setPage}
      />
    </>
  );
}

export default AccountTable;
