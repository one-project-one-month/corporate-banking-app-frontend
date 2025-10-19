import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Action, Column } from "@/types/Table";
import CustomTableRow from "./CustomTableRow";
import { cn } from "@/lib/utils";
import TableSkeleton from "./TableSkeleton";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { ChevronDown } from "lucide-react";
import { useState } from "react";

type CustomTableProps<T extends Record<string, any>> = {
  columns: Column<T>[];
  body: T[] | null;
  actions?: Action<T>[];
  isLoading?: boolean;
  isEditColunm?: boolean;
};

//** this is designed to use as a dynamic table component, this might lead to messy logic in future but for light weight usage this is fine to use for now

function CustomTable<T extends Record<string, any>>({
  columns,
  body,
  actions = [],
  isLoading = false,
}: // isEditColunm = true,
CustomTableProps<T>) {
  //** The pain of no using react table TwT */
  const [
    visibleCol,
    //setVisibleCol
  ] = useState<number[]>(columns.map((_, i) => i));

  // const handleToggleVisibility = (index: number) => {
  //   setVisibleCol((prev) => {
  //     const newCols = prev.includes(index)
  //       ? prev.filter((colIndex) => colIndex !== index)
  //       : [...prev, index];
  //     return newCols;
  //   });
  // };

  return (
    <div className="rounded-md w-full">
      {/* <div className="w-full mb-3 flex justify-end">
        {isEditColunm && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
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
      </div> */}
      <Table className="max-w-full mt-8 border">
        <TableHeader>
          <TableRow className="[&>th]:border-r">
            {columns.map((col, i) => {
              if (!visibleCol.includes(i)) return;

              return (
                <TableHead
                  className={cn("py-5 max-w-[200px]", col.headerClassName)}
                  key={col.key.toString()}
                >
                  {col.label}
                </TableHead>
              );
            })}
            {actions.length > 0 && <TableHead></TableHead>}
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
            body?.map((row, i) => {
              if (!visibleCol.includes(i)) return;

              return (
                <CustomTableRow
                  row={row}
                  columns={columns.filter((_, ci) => visibleCol.includes(ci))}
                  key={i}
                  actions={actions}
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
