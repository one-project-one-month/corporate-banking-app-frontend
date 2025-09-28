import { Info } from "lucide-react";
import { toast } from "sonner";

//simple error toast, will modify detail later
export const errorToast = (header: string, message: string) => {
  toast.error(header, {
    description() {
      return <div className="text-neutral-800 text-xs">{message}</div>;
    },
    position: "top-left",
    icon: <Info size={20} />,
  });
};
