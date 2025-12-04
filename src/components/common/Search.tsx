import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <>
      <div className="relative ">
        <Search size={16} className="absolute mt-3.5 ml-5 " color="#99A1AF" />
        <Input
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="md:w-[342px] w-[200px] h-[42px] pl-10 text-sm border-[#B3C3CE] text-[#99A1AF]"
        />
      </div>
    </>
  );
};

export default SearchInput;
