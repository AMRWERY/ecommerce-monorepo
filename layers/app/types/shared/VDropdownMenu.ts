export interface DropdownMenuItem {
  label?: string;
  name?: string;
  to?: string | Record<string, unknown>;
  route?: string | Record<string, unknown>;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export type DropdownPlacement = "start" | "end" | "center";