import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T;
  label: string;
  className?: string;
  headerClassName?: string;
  cell?: (value: any, row: T) => ReactNode;
};

export type Action<T> = {
  name: string;
  onClick: (row: T) => void;
};
