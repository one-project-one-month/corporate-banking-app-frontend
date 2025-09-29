import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

type CustomPaginationProps = {
  isNext: boolean;
  isPrevious: boolean;
  totalCount: number;
  page: number;
  limit: number;
  setPage?: (newPage: number) => void;
  className?: string;
};

function CustomPagination({
  isNext,
  isPrevious,
  totalCount,
  page,
  limit,
  setPage,
  className,
}: CustomPaginationProps) {
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <Pagination
      className={cn("py-5 flex items-center justify-between", className)}
    >
      <div className="flex items-center gap-2">
        <Label>Page</Label>
        <Select
          value={page.toString()}
          onValueChange={(rowsPerPage) => setPage?.(Number(rowsPerPage))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="h-44">
            {Array.from({ length: totalPages }).map((_, i) => {
              return (
                <SelectItem value={(i + 1).toString()}>{i + 1}</SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Label>of {totalPages} Pages</Label>
      </div>

      <PaginationContent className="gap-0 border rounded-lg divide-x overflow-hidden">
        <PaginationItem>
          {isPrevious && (
            <PaginationPrevious
              className="rounded-none cursor-pointer"
              onClick={() => setPage && setPage(page - 1)}
            />
          )}
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(0, 3)
          .map((pg, index) => (
            <PaginationItem className="cursor-pointer" key={index}>
              <PaginationLink
                onClick={() => setPage && setPage(pg)}
                className={cn(
                  {
                    [buttonVariants({
                      variant: "default",
                      className:
                        "dark:bg-primary dark:hover:bg-primary/90 hover:text-primary-foreground!",
                    })]: pg === page,
                  },
                  "rounded-none border-none"
                )}
              >
                {pg}
              </PaginationLink>
            </PaginationItem>
          ))}
        {totalPages > 3 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setPage && setPage(totalPages)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center",
                  totalPages === page &&
                    "bg-primary hover:bg-primary text-white hover:text-white"
                )}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          {isNext && (
            <PaginationNext
              className="rounded-none cursor-pointer"
              onClick={() => setPage && setPage(page + 1)}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default CustomPagination;
