import { StatBar } from "@/components/ui/StatBar";

type MomentumBarProps = {
  label: string;
  value: number;
  variant?: "emerald" | "red" | "amber" | "sky" | "zinc";
};

export function MomentumBar({ label, value, variant = "sky" }: MomentumBarProps) {
  return (
    <StatBar
      label={label}
      value={value}
      variant={variant}
      helperText="Impulso emocional del partido"
    />
  );
}