export type Temperature = "celsius" | "fahrenheit";

export type Theme = "light" | "dark" | "system";

export type MenuItem = {
  label: string;
  description?: string;
  disabled?: boolean;
  action?: () => void;
}[];

export type Apps = {
  icon: string;
  id: string;
  externalLink?: string;
}[];
