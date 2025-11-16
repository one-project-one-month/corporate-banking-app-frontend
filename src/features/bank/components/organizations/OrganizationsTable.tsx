import { useMemo, useState } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import type { BaseOrganization } from "@/types/Organization";
import {
  useDeleteOrganization,
  useGetOrganizations,
} from "@/queries/organization.query";
import usePagination from "@/hooks/usePagination";
import CustomPagination from "@/components/common/CustomPagination";
import { EyeIcon, Pencil, Trash2 } from "lucide-react";
import { DeleteButton } from "@/components/common/DeleteButton";

type OrganizationsTableProps = {
  handleEdit: (organization: BaseOrganization) => void;
};

function OrganizationsTable({ handleEdit }: OrganizationsTableProps) {
  const { page, setPage } = usePagination();
  const { data: organizations, isLoading } = useGetOrganizations({
    page,
    pageSize: 5,
  });
  const { mutate: deleteOrganization } = useDeleteOrganization();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] =
    useState<BaseOrganization | null>(null);

  const tableBodyData = organizations?.data?.organizations ?? [];

  const columns = useMemo<Column<BaseOrganization>[]>(
    () => [
      {
        key: "organizationId",
        label: "Organization Id",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: " text-sm text-[#1E2939] text-center",
      },
      {
        key: "organizationName",
        label: "Organization Name",
        headerClassName: "font-medium text-base text-[#99A1AF] ",
        className: " text-sm text-[#1E2939] ",
      },

      {
        key: "organizationAdmin",
        label: "Organization Admin",
        headerClassName: "font-medium text-base text-[#99A1AF] ",
        className: " text-sm text-[#1E2939] ",
      },

      {
        key: "adminEmail",
        label: "Admin Email",
        headerClassName: "font-medium text-base text-[#99A1AF] ",
        className: " text-sm text-[#1E2939] ",
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
        label: "Date Joined",
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

  const actions = useMemo<Action<BaseOrganization>[]>(
    () => [
      {
        name: "View Detail",
        icons: <EyeIcon />,
        onClick: function (row: BaseOrganization) {},
      },
      {
        name: "Edit",
        icons: <Pencil />,
        onClick: function (row: BaseOrganization) {
          handleEdit(row);
        },
      },
      {
        name: "Delete",
        icons: <Trash2 color="red" />,
        onClick: function (row: BaseOrganization) {
          setOrganizationToDelete(row);
          setDeleteDialogOpen(true);
        },
      },
    ],
    []
  );

  const totalCount = 60;
  const limit = 5;
  const totalPages = Math.ceil(totalCount / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const currentPageData = tableBodyData.slice(startIndex, endIndex);

  return (
    <>
      <CustomTable<BaseOrganization>
        isLoading={isLoading}
        columns={columns}
        // body={organizations?.data.organizations ?? null}
        body={currentPageData}
        actions={actions}
      />
      {/* <CustomPagination
        limit={organizations?.data.pagination.pageSize ?? 5}
        totalCount={organizations?.totalPages ?? 1}
        isNext={organizations?.hasNextPage ?? false}
        isPrevious={organizations?.hasPreviousPage ?? false}
        page={organizations?.pagination.currentPage ?? 1}
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
        itemName={organizationToDelete?.organizationName || ""}
        requireNameConfirmation={true}
        onConfirm={() => {
          if (organizationToDelete) {
            deleteOrganization(organizationToDelete.organizationId);
          }
          setDeleteDialogOpen(false);
          setOrganizationToDelete(null);
        }}
      />
    </>
  );
}

export default OrganizationsTable;
