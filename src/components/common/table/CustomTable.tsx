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

type CustomTableProps<T extends Record<string, any>> = {
  columns: Column<T>[];
  body: T[] | null;
  actions?: Action<T>[];
  isLoading?: boolean;
};

//this is designed to use as a dynamic table component, this might lead to messy logic in future but for light weight usage this is fine to use for now

function CustomTable<T extends Record<string, any>>({
  columns,
  body,
  actions = [],
  isLoading = false,
}: CustomTableProps<T>) {
  return (
    <div className="rounded-md border w-full">
      <Table className="max-w-full">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                className={cn("py-5 max-w-[200px]", col.headerClassName)}
                key={col.key.toString()}
              >
                {col.label}
              </TableHead>
            ))}
            {actions.length > 0 && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableSkeleton rows={5} columns={columns?.length + 1} />
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
            body?.map((row, i) => (
              <CustomTableRow
                row={row}
                columns={columns as any}
                key={i}
                actions={actions}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomTable;
