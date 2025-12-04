import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import usePagination from "@/hooks/usePagination";
import CustomPagination from "@/components/common/CustomPagination";
import {
  useDeleteDeposit,
  useGetDeposits,
} from "@/queries/depositTransition.query";
import type { BaseDepositTransition } from "@/types/DepositTransition";

type DepositTransitionTableProps = {
  handleEdit: (tx: BaseDepositTransition) => void;
};

function DepositTransitionTable({ handleEdit }: DepositTransitionTableProps) {
  const { page, setPage } = usePagination();
  const { data: deposits, isLoading } = useGetDeposits({ page, pageSize: 5 });
  const { mutate: deleteDeposit } = useDeleteDeposit();

  const columns = useMemo<Column<BaseDepositTransition>[]>(
    () => [
      {
        key: "transactionId",
        label: "Transaction ID",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: " text-sm text-[#1E2939] text-center",
      },

      {
        key: "accountId" as any,
        label: "Account Id",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
      },

      {
        key: "amount",
        label: "Amount",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
        cell: (value) => <span>${value.toFixed(2)}</span>,
      },
      {
        key: "transactionType",
        label: "Transaction Type",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
      },

      {
        key: "status",
        label: "Status",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: " text-sm text-[#1E2939]",
        cell: (value) => <span>{value ? "Active" : "InActive"}</span>,
      },

      {
        key: "createdAt",
        label: "Date",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
        cell: (value) => <span>{new Date(value).toLocaleString()}</span>,
      },
    ],
    []
  );

  const actions = useMemo<Action<BaseDepositTransition>[]>(
    () => [
      {
        name: "Edit",
        onClick: function (row: BaseDepositTransition) {
          handleEdit(row);
        },
      },
      {
        name: "Delete",
        onClick: function (row: BaseDepositTransition) {
          deleteDeposit(row.id);
        },
      },
    ],
    [handleEdit]
  );

  console.log("deposits", deposits);

  const totalBodyData = deposits?.data ?? [];
  const totalCount = 60;
  const limit = 5;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const currentPageData = totalBodyData.slice(startIndex, endIndex);

  return (
    <>
      <CustomTable<BaseDepositTransition>
        columns={columns}
        // body={deposits?.data ?? null}
        body={currentPageData}
        actions={actions}
        isLoading={isLoading}
      />
      {/* <CustomPagination
        limit={5}
        totalCount={deposits?.totalPages ?? 1}
        isNext={deposits?.hasNextPage ?? false}
        isPrevious={deposits?.hasPreviousPage ?? false}
        page={deposits?.pagination.currentPage ?? 1}
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
    </>
  );
}

export default DepositTransitionTable;
