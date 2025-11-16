import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type MultipleTypeProps = {
  currentPage: string;
};

const optionsData: Record<string, { placeholder: string; options: string[] }> =
  {
    accounts: {
      placeholder: "Account Type",
      options: ["Individual", "Organization"],
    },
    users: {
      placeholder: "Role",
      options: ["Org Admin", "Maker", "Checker"],
    },
    "deposit-transition": {
      placeholder: "Transition Type",
      options: ["Annual Salary", "Payroll", "Merchant Payment"],
    },
    FAQ: {
      placeholder: "Target User",
      options: ["Customer", "Merchant", "Admin"],
    },
  };

function MultipleType({ currentPage }: Partial<MultipleTypeProps>) {
  const [selectedValue, setSelectedValue] = useState("");
  if (currentPage === "organizations") return null;

  const config = optionsData[currentPage || ""] || {
    placeholder: "Select",
    options: [],
  };

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
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

export default MultipleType;
