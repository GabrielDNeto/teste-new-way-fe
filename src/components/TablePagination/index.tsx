import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";

interface ITablePaginationProps {
  totalCount: number;
  currentPage: number;
  itemsPerPage?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TablePagination({
  totalCount,
  currentPage,
  itemsPerPage,
  setPage,
}: ITablePaginationProps) {
  const pagesCount = Math.ceil(totalCount / (itemsPerPage || 10));

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className="w-full flex gap-2 justify-end items-center mt-4">
      <Button
        variant="ghost"
        onClick={() => setPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </Button>

      {pages.map((p) => (
        <Button
          variant="ghost"
          key={p}
          onClick={() => setPage(p)}
          disabled={currentPage === p}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="ghost"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={currentPage === pagesCount}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
