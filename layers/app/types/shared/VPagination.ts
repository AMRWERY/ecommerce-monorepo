export interface PaginationProps {
  modelValue?: number;
  totalPages?: number;
  totalItems?: number;
  perPage?: number;
  siblingCount?: number;
  showPrevNext?: boolean;
}

export type PaginationItem = number | "...";