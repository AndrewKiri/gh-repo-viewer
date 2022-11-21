import { useState } from "react";

const DEFAULT_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

export interface IPagination {
  page: number;
  perPage: number;
}

export interface UsePaginationReturn extends IPagination {
  setPagination: ({
    page = DEFAULT_PAGE,
    perPage = DEFAULT_PER_PAGE,
  }: IPagination) => void;
}

export function usePagination(): UsePaginationReturn {
  const [pagination, setPagination] = useState<IPagination>({
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PER_PAGE,
  });

  return {
    page: pagination.page,
    perPage: pagination.perPage,
    setPagination,
  } as const;
}
