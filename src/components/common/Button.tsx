import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CreateButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>((props, ref) => (
  <Button
    ref={ref}
    variant="default"
    className="cursor-pointer w-[148px] h-[42px] bg-[#072B46] text-white"
    {...props}
  >
    Create New
    <Plus className="ml-2" color="white" />
  </Button>
));

CreateButton.displayName = "CreateButton";
export default CreateButton;
