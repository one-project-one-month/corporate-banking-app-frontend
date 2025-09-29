import { Checkbox } from "@/components/ui/checkbox";

type CheckCellProps = {
  value: boolean;
  onChange?: () => void;
};

export function CheckCell({ value, onChange }: CheckCellProps) {
  return (
    <div className="flex items-center justify-center">
      <Checkbox defaultChecked={value} checked={value} onChange={onChange} />
    </div>
  );
}
