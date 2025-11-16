import { useMemo, useState } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import type { BaseAccount } from "@/types/Account";
import { useDeleteAccount, useGetAccount } from "@/queries/Account.query";
import usePagination from "@/hooks/usePagination";
import CustomPagination from "@/components/common/CustomPagination";
import { EyeIcon, Pencil, Trash2 } from "lucide-react";
import { DeleteButton } from "@/components/common/DeleteButton";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<BaseAccount | null>(
    null
  );

  const columns = useMemo<Column<BaseAccount>[]>(
    () => [
      {
        key: "accountNumber",
        label: "Account Number",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: " text-sm text-[#1E2939] text-center",
      },
      {
        key: "accountHolder",
        label: "Account Holder",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
      },
      {
        key: "accountType",
        label: "Account Type",
        cell: (value) => value?.name,
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
      },

      {
        key: "status",
        label: "Status",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: "text-sm text-center",
        cell: (value: boolean) => (
          <div className="flex items-center justify-center text-center">
            {value ? (
              <div className="bg-[#E3EDFF] w-12 h-6 py-1 px-2 flex justify-center text-center items-center rounded-full ">
                <p className="text-xs text-[#3579F6]">Active</p>
              </div>
            ) : (
              <div className="bg-[#ECECEC] w-14 h-6 py-1 px-2 flex justify-center text-center items-center rounded-full ">
                <p className="text-xs text-[#6E757C]">Inactive</p>
              </div>
            )}
          </div>
        ),
      },
      {
        key: "createdAt",
        label: "Date Opened",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm ",
        cell: (value) => {
          const date = new Date(value);
          return date.toLocaleString("en-GB");
        },
      },
    ],
    []
  );

  const actions = useMemo<Action<BaseAccount>[]>(
    () => [
      {
        name: "View Detail",
        icons: <EyeIcon />,
        onClick: function (row: BaseAccount) {},
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
          setAccountToDelete(row);
          setDeleteDialogOpen(true);
        },
      },
    ],
    [handleEdit]
  );

  const tableBodyData = accounts?.data.accounts ?? [];

  const totalCount = 60;
  const limit = 5;
  const totalPages = Math.ceil(totalCount / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const currentPageData = tableBodyData.slice(startIndex, endIndex);

  return (
    <>
      <CustomTable<BaseAccount>
        columns={columns}
        //body={accounts?.data ?? null}
        body={currentPageData}
        actions={actions}
        isLoading={isLoading}
      />
      {/* <CustomPagination
        limit={accounts?.pagination.pageSize ?? 5}
        totalCount={accounts?.totalPages ?? 1}
        isNext={accounts?.hasNextPage ?? false}
        isPrevious={accounts?.hasPreviousPage ?? false}
        page={accounts?.pagination.currentPage ?? 1}
        setPage={setPage}
      /> */}

      <CustomPagination
        limit={limit}
        totalCount={totalCount}
        isNext={page < totalPages}
        isPrevious={page > 1}
        page={page}
        setPage={setPage}
      />
      <DeleteButton
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={accountToDelete?.accountHolder || ""}
        requireNameConfirmation={true}
        onConfirm={() => {
          if (accountToDelete) {
            deleteAccount(accountToDelete.id);
          }
          setDeleteDialogOpen(false);
          setAccountToDelete(null);
        }}
      />
    </>
  );
}

export default AccountTable;
