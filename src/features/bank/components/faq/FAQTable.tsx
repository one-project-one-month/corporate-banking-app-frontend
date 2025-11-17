import { useMemo, useState } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { ExpandableTextCell } from "@/components/common/table/CustomCells";
import { useDeleteFaq, useGetFaq } from "@/queries/FAQ.query";
import usePagination from "@/hooks/usePagination";
import CustomPagination from "@/components/common/CustomPagination";
import type { BaseFAQ } from "@/types/FAQ";
import { EyeIcon, Pencil, Trash2 } from "lucide-react";
import { DeleteButton } from "@/components/common/DeleteButton";

type FAQTableProps = {
  handleEditFAQ: (faq: BaseFAQ) => void;
};

function FAQTable({ handleEditFAQ }: FAQTableProps) {
  const { page, setPage } = usePagination();
  const { data: FAQ, isLoading } = useGetFaq({ page, pageSize: 5 });
  const { mutate: deleteFaq } = useDeleteFaq();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<BaseFAQ | null>(null);

  const columns = useMemo<Column<BaseFAQ>[]>(
    () => [
      {
        key: "id",
        label: "ID",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: " text-sm text-[#1E2939] text-center",
      },
      {
        key: "question",
        label: "Question",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
      },
      {
        key: "answer",
        label: "Answer",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
        cell(value) {
          return <ExpandableTextCell value={value} />;
        },
      },
      {
        key: "status",
        label: "Status",
        headerClassName: "font-medium text-base text-[#99A1AF] text-center",
        className: " text-sm text-[#3579F6] text-center",
        cell: (row) => <div className=" capitalize">{row}</div>,
      },
      {
        key: "updatedAt",
        label: "Last Edit",
        headerClassName: "font-medium text-base text-[#99A1AF]",
        className: " text-sm text-[#1E2939]",
      },
    ],
    [handleEditFAQ]
  );

  const actions = useMemo<Action<BaseFAQ>[]>(
    () => [
      {
        name: "View Detail",
        icons: <EyeIcon />,
        onClick: function (row: BaseFAQ) {},
      },
      {
        name: "Edit",
        icons: <Pencil />,
        onClick: function (row: BaseFAQ) {
          handleEditFAQ(row);
        },
      },
      {
        name: "Delete",
        icons: <Trash2 color="red" />,
        onClick: function (row: BaseFAQ) {
          setFaqToDelete(row);
          setDeleteDialogOpen(true);
        },
      },
    ],
    []
  );

  const tableBodyData = FAQ?.data?.faqs ?? [];
  const sortedFaq = tableBodyData.sort((a, b) => a.id - b.id);
  const totalCount = 60;
  const limit = 5;
  const totalPages = Math.ceil(totalCount / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const currentPageData = sortedFaq.slice(startIndex, endIndex);

  return (
    <>
      <CustomTable<BaseFAQ>
        columns={columns}
        body={currentPageData}
        actions={actions}
        isLoading={isLoading}
      />
      {/* <CustomPagination
        limit={FAQ?.pagination.pageSize ?? 5}
        totalCount={FAQ?.totalPages ?? 1}
        isNext={FAQ?.hasNextPage ?? false}
        isPrevious={FAQ?.hasPreviousPage ?? false}
        page={FAQ?.pagination.currentPage ?? 1}
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
        itemName={faqToDelete?.question || ""}
        requireNameConfirmation={true}
        onConfirm={() => {
          if (faqToDelete) {
            deleteFaq(faqToDelete.id);
          }
          setDeleteDialogOpen(false);
          setFaqToDelete(null);
        }}
      />
    </>
  );
}

export default FAQTable;
