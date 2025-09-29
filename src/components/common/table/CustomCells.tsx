import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

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

type ExpandableTextCellProps = {
  value: string;
};

//TODO: need to refine the UI later, current UI is super dull
export function ExpandableTextCell({ value }: ExpandableTextCellProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <p title={value} className={isExpanded ? "" : "line-clamp-1"}>
        {value}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500 underline"
      >
        {isExpanded ? "See Less" : "See More"}
      </button>
    </div>
  );
}
