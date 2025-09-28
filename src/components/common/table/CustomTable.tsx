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

type CustomTableProps<T extends Record<string, any>> = {
  columns: Column<T>[];
  body: T[];
  actions?: Action<T>[];
};

//this is designed to use as a dynamic table component, this might lead to messy logic in future but for light weight usage this is fine to use for now

function CustomTable<T extends Record<string, any>>({
  columns,
  body,
  actions = [],
}: CustomTableProps<T>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                className={cn("py-5", col.className)}
                key={col.key.toString()}
              >
                {col.label}
              </TableHead>
            ))}
            {actions.length > 0 && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row, i) => (
            <CustomTableRow
              row={row}
              columns={columns as any}
              key={i}
              actions={actions}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomTable;
