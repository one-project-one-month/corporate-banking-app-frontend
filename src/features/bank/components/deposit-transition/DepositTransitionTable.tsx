import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { ExpandableTextCell } from "@/components/common/table/CustomCells";
import usePagination from "@/hooks/usePagination";
import CustomPagination from "@/components/common/CustomPagination";
import { useGetDeposits } from "@/queries/depositTransition.query";
import type { BaseDepositTransition } from "@/types/DepositTransition";

type DepositTransitionTableProps = {
  handleEdit: (tx: BaseDepositTransition) => void;
};

function DepositTransitionTable({ handleEdit }: DepositTransitionTableProps) {
  const { page, setPage } = usePagination();
  const { data: deposits, isLoading } = useGetDeposits({ page, pageSize: 5 });

  const columns = useMemo<Column<BaseDepositTransition>[]>(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "Customer Name" },
      {
        key: "accountType" as any,
        label: "Account Type",
        cell: (value) => <span>{value?.name}</span>,
      },
      { key: "accountNumber", label: "Account Number" },
      {
        key: "amount",
        label: "Amount",
        cell: (value) => <span>${value.toFixed(2)}</span>,
      },
      {
        key: "note",
        label: "Note",
        cell: (value) => <ExpandableTextCell value={value} />,
      },
      {
        key: "createdAt",
        label: "Created At",
        cell: (value) => <span>{new Date(value).toLocaleString()}</span>,
      },
    ],
    []
  );

  const actions = useMemo<Action<BaseDepositTransition>[]>(
    () => [
      {
        name: "Edit",
        onClick: (row: BaseDepositTransition) => handleEdit(row),
      },
      {
        name: "Delete",
        onClick: (row: BaseDepositTransition) => {},
      },
    ],
    [handleEdit]
  );

  return (
    <>
      <CustomTable<BaseDepositTransition>
        columns={columns}
        body={deposits?.data ?? null}
        actions={actions}
        isLoading={isLoading}
      />
      <CustomPagination
        limit={5}
        totalCount={deposits?.totalPages ?? 1}
        isNext={deposits?.hasNextPage ?? false}
        isPrevious={deposits?.hasPreviousPage ?? false}
        page={deposits?.pagination.currentPage ?? 1}
        setPage={setPage}
      />
    </>
  );
}

export default DepositTransitionTable;
