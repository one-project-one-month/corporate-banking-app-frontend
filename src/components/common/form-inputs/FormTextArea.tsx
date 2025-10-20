import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import type { ComponentProps, HTMLInputTypeAttribute, ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

export type FormTextAreaProps<T extends FieldValues> = Omit<
  ComponentProps<"textarea">,
  "form" | "textarea"
> & {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string | ReactNode;
  type?: HTMLInputTypeAttribute;
  wrapperClass?: string;
  labelClass?: string;
  registerOptions?: any;
};

function FormTextArea<T extends FieldValues>({
  form,
  name,
  label,
  wrapperClass,
  labelClass,
  registerOptions,
  ...props
}: FormTextAreaProps<T>) {
  const { register } = form;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(wrapperClass)}>
          <FormLabel className={cn("text-neutral-800", labelClass)}>
            {label}
            {props.required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              {...props}
              className={cn(
                "border-gray-300 rounded-lg transition-all min-h-[100px]",
                props.className
              )}
              {...register(name, registerOptions)}
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export default FormTextArea;
