import { StatBar } from "@/components/ui/StatBar";

type EnergyBarProps = {
  label: string;
  value: number;
  variant?: "emerald" | "red" | "amber" | "sky" | "zinc";
};

export function EnergyBar({ label, value, variant = "emerald" }: EnergyBarProps) {
  return (
    <StatBar
      label={label}
      value={value}
      variant={variant}
      helperText="Recursos físicos para usar cartas"
    />
  );
}