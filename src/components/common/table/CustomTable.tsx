import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Action, Column, Status } from "@/types/Table";
import CustomTableRow from "./CustomTableRow";
import { cn } from "@/lib/utils";
import TableSkeleton from "./TableSkeleton";
import SearchInput from "@/components/common/Search";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleType from "@/components/common/MultipleType";
import { useLocation } from "react-router-dom";
import StatusType from "@/components/common/Status";

type CustomTableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  body: T[] | null;
  actions?: Action<T>[];
  isLoading?: boolean;
  isEditColunm?: boolean;
  status: Status<T>[];
};

//** this is designed to use as a dynamic table component, this might lead to messy logic in future but for light weight usage this is fine to use for now

function CustomTable<T extends Record<string, unknown>>({
  columns,
  body,
  actions = [],
  isLoading = false,
  isEditColunm = true,
}: CustomTableProps<T>) {
  //** The pain of no using react table TwT */
  const [visibleCol, setVisibleCol] = useState<number[]>(
    columns.map((_, i) => i)
  );

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedData, setSelectedData] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<boolean | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const location = useLocation();
  const pathname = location.pathname;
  const currentPage = pathname.split("/").pop();
  // const filteredBody = selectedData
  //   ? body?.filter((row) => row.status === selectedData)
  //   : body;

  // const filterStatus = selectedStatus
  //   ? body?.filter((row) => row.status === selectedStatus)
  //   : body;

  const filteredBody = body
    ?.filter((row) =>
      selectedStatus !== null ? row.status === selectedStatus : true
    )
    ?.filter((row) =>
      selectedData ? String(row.someField).includes(selectedData) : true
    )
    ?.filter((row) =>
      searchText
        ? Object.values(row).some((val) =>
            String(val)
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase())
          )
        : true
    );

  const allSelected = !!body?.length && selectedRows.length === body.length;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(body?.map((_, i) => i) ?? []);
    } else {
      setSelectedRows([]);
    }
  };

  const handleToggleVisibility = (index: number) => {
    setVisibleCol((prev) => {
      const newCols = prev.includes(index)
        ? prev.filter((colIndex) => colIndex !== index)
        : [...prev, index];
      return newCols;
    });
  };

  return (
    <div className="rounded-md w-full">
      <div className="w-full mb-3 flex justify-end">
        <div className="flex justify-between gap-6">
          <div className="flex justify-between gap-3">
            <SearchInput value={searchText} onChange={setSearchText} />
            <div>
              <StatusType
                currentPage={currentPage}
                onChange={setSelectedStatus}
              />
            </div>
            <div>
              <MultipleType currentPage={currentPage} />
            </div>
          </div>
        </div>
        {isEditColunm && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto !h-[42px] font-normal"
              >
                Views <Eye />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columns.map((col) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={col.label}
                    className="capitalize"
                    checked={visibleCol.includes(columns.indexOf(col))}
                    onCheckedChange={() =>
                      handleToggleVisibility(columns.indexOf(col))
                    }
                  >
                    {col.label}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Table className="max-w-full mt-8 border">
        <TableHeader>
          <TableRow className="[&>th]:border-r">
            <TableHead className="items-center">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(check) => toggleSelectAll(check === true)}
              />
            </TableHead>
            {columns.map((col, i) => {
              if (!visibleCol.includes(i)) return;

              return (
                <TableHead
                  className={cn("py-5 max-w-[200px] ", col.headerClassName)}
                  key={col.key.toString()}
                >
                  {col.label}
                </TableHead>
              );
            })}

            {actions.length > 0 && (
              <TableHead className="text-center items-center font-medium text-base text-[#99A1AF]">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton rows={7} columns={columns?.length + 1} />
          ) : (body?.length ?? 0) <= 0 ? (
            <TableRow>
              <TableHead
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
              >
                <div className="py-5 text-center text-gray-500">
                  No data available
                </div>
              </TableHead>
            </TableRow>
          ) : (
            // filterStatus &&
            filteredBody?.map((row, i) => {
              if (!visibleCol.includes(i)) return;

              return (
                <CustomTableRow
                  row={row}
                  columns={columns.filter((_, ci) => visibleCol.includes(ci))}
                  key={i}
                  actions={actions}
                  isSelected={selectedRows.includes(i)}
                  onSelect={(checked) =>
                    setSelectedRows((prv) =>
                      checked ? [...prv, i] : prv.filter((idx) => idx !== i)
                    )
                  }
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomTable;
