import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Action, Column } from "@/types/Table";

type CustomTableRowProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  row: T;
  actions: Action<T>[];
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
};

function CustomTableRow<T extends Record<string, unknown>>({
  columns,
  row,
  actions,
  isSelected,
  onSelect,
}: CustomTableRowProps<T>) {
  return (
    <TableRow className="*:border-r last:border-r-0 odd:bg-muted/50">
      <TableCell className="text-center">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect?.(checked as boolean)}
        />
      </TableCell>
      {columns.map((col) => (
        <TableCell
          key={col.key.toString()}
          className={cn("py-5 max-w-[200px] whitespace-normal", col.className)}
        >
          {col.cell
            ? col.cell(row[col.key], row)
            : JSON.stringify(row[col.key])}
        </TableCell>
      ))}

      {actions?.length > 0 && (
        <TableCell className="py-3 text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 text-xl"
                aria-expanded="false"
                aria-haspopup="menu"
              >
                ...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {actions.map((action) => (
                <DropdownMenuItem
                  key={action.name}
                  onClick={() => action.onClick(row)}
                >
                  {action.icons}
                  {action.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
}

export default CustomTableRow;
