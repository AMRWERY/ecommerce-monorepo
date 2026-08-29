export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "select"
  | "textarea"
  | "checkbox"
  | "radio"
  | "range";

export type Size = "sm" | "md" | "lg";

export interface SelectOption {
  label: string;
  value: string | number;
}