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

  const columns = useMemo<Column<BaseOrganization>[]>(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "name",
        label: "Organization Name",
      },
      {
        key: "shortcode",
        label: "Shortcode",
        className: "text-center",
        headerClassName: "text-center",
      },
      {
        key: "address",
        label: "Address",
      },
      {
        key: "country",
        label: "Country",
        className: "text-center",
        headerClassName: "text-center",
      },
      {
        key: "createdBy",
        label: "Created By",
        className: "text-center",
        headerClassName: "text-center",
      },
    ],
    []
  );

  const actions = useMemo<Action<BaseOrganization>[]>(
    () => [
      {
        name: "Edit",
        onClick: function (row: BaseOrganization) {
          handleEdit(row);
        },
      },
      {
        name: "Delete",
        onClick: function (row: BaseOrganization) {
          deleteOrganization(row.id);
        },
      },
    ],
    []
  );

  return (
    <>
      <CustomTable<BaseOrganization>
        columns={columns}
        body={organizations?.data ?? null}
        actions={actions}
        isLoading={isLoading}
      />
      <CustomPagination
        limit={organizations?.pagination.pageSize ?? 5}
        totalCount={organizations?.totalPages ?? 1}
        isNext={organizations?.hasNextPage ?? false}
        isPrevious={organizations?.hasPreviousPage ?? false}
        page={organizations?.pagination.currentPage ?? 1}
        setPage={setPage}
      />
    </>
  );
}

export default OrganizationsTable;
