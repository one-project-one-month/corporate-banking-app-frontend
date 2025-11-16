import { useMemo, useState } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { useDeleteUser, useGetUsers } from "@/queries/user.query";
import type { BaseUser } from "@/types/User";
import CustomPagination from "@/components/common/CustomPagination";
import usePagination from "@/hooks/usePagination";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { StatusConfirm } from "@/components/common/StatusConfirm";
import { EyeIcon, Pencil, Trash2 } from "lucide-react";
import { DeleteButton } from "@/components/common/DeleteButton";

type UsersTableProps = {
  handleEdit: (user: BaseUser) => void;
};

function UsersTable({ handleEdit }: UsersTableProps) {
  const { page, setPage } = usePagination();
  const { data: users, isLoading } = useGetUsers({ page, pageSize: 10 });
  const { mutate: deleteUser } = useDeleteUser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<BaseUser | null>(null);

  console.log("user", users);

  const columns = useMemo<Column<BaseUser>[]>(
    () => [
      {
        key: "userId",
        label: "User ID",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: " text-sm text-[#1E2939] text-center",
      },
      {
        key: "fullName",
        label: "Full Name",
        headerClassName: "font-medium text-base text-[#99A1AF] ",
        className: " text-sm text-[#1E2939] ",
      },
      {
        key: "emailAddress",
        label: "Email Address",
        headerClassName: "font-medium text-base text-[#99A1AF] ",
        className: " text-sm text-[#1E2939] ",
      },

      {
        key: "role",
        label: "Role",
        headerClassName: "font-medium text-base text-[#99A1AF] ",
        className: " text-sm text-[#1E2939] ",
      },
      {
        key: "organizationName",
        label: "Organization Name",
        headerClassName: "font-medium text-base text-[#99A1AF] ",
        className: " text-sm text-[#1E2939] ",
      },

      {
        key: "status",
        label: "Status",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: "text-sm text-center",
        cell: (status: boolean, row: BaseUser) =>
          status === false ? (
            <Dialog>
              <DialogTrigger>
                <p className="text-red-500 font-medium">Pending</p>
              </DialogTrigger>
              <StatusConfirm userId={row.userId} />
            </Dialog>
          ) : (
            <div className="text-[#3579F6]">Approve</div>
          ),
      },

      {
        key: "updatedAt",
        label: "Last Update",
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

  const actions = useMemo<Action<BaseUser>[]>(
    () => [
      {
        name: "View Detail",
        icons: <EyeIcon />,
        onClick: function (row: BaseUser) {},
      },
      {
        name: "Edit",
        icons: <Pencil />,
        onClick: function (row: BaseUser) {
          handleEdit(row);
        },
      },
      {
        name: "Delete",
        icons: <Trash2 color="red" />,
        onClick: function (row: BaseUser) {
          setUserToDelete(row);
          setDeleteDialogOpen(true);
        },
      },
    ],
    [handleEdit]
  );

  const tableBodyData = users?.data?.users ?? [];
  const sortedUsers = tableBodyData.sort((a, b) => a.userId - b.userId);

  const totalCount = 60;
  const limit = 5;
  const totalPages = Math.ceil(totalCount / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const currentPageData = sortedUsers.slice(startIndex, endIndex);

  return (
    <>
      <CustomTable<BaseUser>
        columns={columns}
        body={currentPageData}
        actions={actions}
        isLoading={isLoading}
      />

      {/* <CustomPagination
        limit={users?.pagination.pageSize ?? 5}
        totalCount={users?.totalPages ?? 1}
        isNext={users?.hasNextPage ?? false}
        isPrevious={users?.hasPreviousPage ?? false}
        page={users?.pagination.currentPage ?? 1}
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
        itemName={userToDelete?.organizationName || ""}
        requireNameConfirmation={true}
        onConfirm={() => {
          if (userToDelete) {
            deleteUser(userToDelete.id);
          }
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        }}
      />
    </>
  );
}

export default UsersTable;
