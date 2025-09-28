import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

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
      <div className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </div>

      <PaginationContent className="gap-x-2">
        <PaginationItem>
          {isPrevious && (
            <PaginationPrevious
              className="cursor-pointer"
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
                  "flex items-center justify-center",
                  pg === page &&
                    "bg-primary hover:bg-primary text-white hover:text-white"
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
              className="h-9 w-9 cursor-pointer"
              onClick={() => setPage && setPage(page + 1)}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default CustomPagination;
