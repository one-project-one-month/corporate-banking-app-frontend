import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function StatusType({
  currentPage,
  onChange,
}: {
  currentPage?: string;
  onChange?: (val: boolean | null) => void;
}) {
  const [selectedValue, setSelectedValue] = useState("");

  const optionsData: Record<
    string,
    { placeholder: string; options: string[] }
  > = {
    accounts: {
      placeholder: "Status",
      options: ["Active", "InActive"],
    },
    organizations: {
      placeholder: "Status",
      options: ["Active", "InActive"],
    },
    users: {
      placeholder: "Status",
      options: ["Active", "InActive"],
    },
    "deposit-transition": {
      placeholder: "Status",
      options: ["Active", "InActive"],
    },
    FAQ: {
      placeholder: "Status",
      options: ["Published", "Unpublished"],
    },
  };

  const config = optionsData[currentPage || ""] || {
    placeholder: "Status",
    options: [],
  };

  const handleChange = (val: string) => {
    setSelectedValue(val);

    if (val === "Active" || val === "Published") {
      onChange?.(true);
    } else if (val === "InActive" || val === "Unpublished") {
      onChange?.(false);
    } else {
      onChange?.(null);
    }
  };

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-[150px] !h-[42px] border-[#B3C3CE]">
        <SelectValue placeholder={config.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {config.options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export default StatusType;
