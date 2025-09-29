import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Action, Column } from "@/types/Table";

type CustomTableRowProps<T extends Record<string, any>> = {
  columns: Column<T>[];
  row: T;
  actions: Action<T>[];
};

function CustomTableRow<T extends Record<string, any>>({
  columns,
  row,
  actions,
}: CustomTableRowProps<T>) {
  return (
    <TableRow>
      {columns.map((col) => (
        <TableCell
          key={col.key.toString()}
          className={cn("py-5 max-w-[200px] whitespace-normal", col.className)}
        >
          {col.cell ? col.cell(row[col.key], row) : row[col.key]}
        </TableCell>
      ))}
      {actions?.length > 0 && (
        <TableCell className="py-5">
          <div className="flex gap-2">
            {actions.map((action) => (
              <Button
                key={action.name}
                variant="outline"
                size="sm"
                onClick={() => action.onClick(row)}
              >
                {action.name}
              </Button>
            ))}
          </div>
        </TableCell>
      )}
    </TableRow>
  );
}

export default CustomTableRow;
