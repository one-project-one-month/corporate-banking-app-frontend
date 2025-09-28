import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type Option = {
  label: string;
  value: string;
};

export type FormSelectInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string | ReactNode;
  options: Option[];
  placeholder?: string;
  wrapperClass?: string;
  labelClass?: string;
  required?: boolean;
};

function FormSelectInput<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = "Select an option",
  wrapperClass,
  labelClass,
  required,
}: FormSelectInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(wrapperClass)}>
          <FormLabel className={cn("text-neutral-800", labelClass)}>
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export default FormSelectInput;
