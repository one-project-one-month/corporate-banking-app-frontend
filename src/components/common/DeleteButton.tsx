import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, type ReactNode } from "react";

type DeleteButtonProps = {
  onConfirm: () => void;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  itemName?: string;
  requireNameConfirmation?: boolean;
};
export function DeleteButton({
  onConfirm,
  trigger,
  open,
  onOpenChange,
  itemName = "",
  requireNameConfirmation = false,
}: DeleteButtonProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmationValid =
    !requireNameConfirmation || confirmText === itemName;

  useEffect(() => {
    if (!open) {
      setConfirmText("");
    }
  }, [open]);

  const handleConfirm = () => {
    if (isConfirmationValid) {
      onConfirm();
      setConfirmText("");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        {trigger && <Button variant="outline">{trigger}</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Confirm</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {""}
            {itemName && <strong>{itemName}</strong>} and remove your data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {requireNameConfirmation && (
          <div className="space-y-2 py-4">
            <Label htmlFor="confirm-name">
              Type<strong>{itemName}</strong> to confirm
            </Label>
            <Input
              id="confirm-name"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={`Type ${itemName} to confirm`}
              autoComplete="off"
            />
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmationValid}
            className="bg-[#0A3D62] hover:bg-[#0A3D62]"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
