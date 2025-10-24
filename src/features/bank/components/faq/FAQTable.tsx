import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { ExpandableTextCell } from "@/components/common/table/CustomCells";
import { useDeleteFaq, useGetFaq } from "@/queries/FAQ.query";
import usePagination from "@/hooks/usePagination";
import CustomPagination from "@/components/common/CustomPagination";
import type { BaseFAQ } from "@/types/FAQ";

type FAQTableProps = {
  handleEditFAQ: (faq: BaseFAQ) => void;
};

function FAQTable({ handleEditFAQ }: FAQTableProps) {
  const { page, setPage } = usePagination();
  const { data: FAQ, isLoading } = useGetFaq({ page, pageSize: 5 });
  const { mutate: deleteFaq } = useDeleteFaq();

  const columns = useMemo<Column<BaseFAQ>[]>(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "question",
        label: "Question",
      },
      {
        key: "answer",
        label: "Answer",
        cell(value) {
          return <ExpandableTextCell value={value} />;
        },
      },
      {
        key: "status",
        label: "Status",
      },
      {
        key: "updatedAt",
        label: "Last Edit",
      },
      // {
      //   key: "category" as any,
      //   label: "Category",
      //   cell: (value) => {
      //     return <span>{value?.name}</span>;
      //   },
      // },
    ],
    [handleEditFAQ]
  );

  const actions = useMemo<Action<BaseFAQ>[]>(
    () => [
      {
        name: "Edit",
        onClick: function (row: BaseFAQ) {
          handleEditFAQ(row);
        },
      },
      {
        name: "Delete",
        onClick: function (row: BaseFAQ) {
          deleteFaq(row.id);
        },
      },
    ],
    []
  );

  return (
    <>
      <CustomTable<BaseFAQ>
        columns={columns}
        body={FAQ?.data ?? null}
        actions={actions}
        isLoading={isLoading}
      />
      <CustomPagination
        limit={FAQ?.pagination.pageSize ?? 5}
        totalCount={FAQ?.totalPages ?? 1}
        isNext={FAQ?.hasNextPage ?? false}
        isPrevious={FAQ?.hasPreviousPage ?? false}
        page={FAQ?.pagination.currentPage ?? 1}
        setPage={setPage}
      />
    </>
  );
}

export default FAQTable;
