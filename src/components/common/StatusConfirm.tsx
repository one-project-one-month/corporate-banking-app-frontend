import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStatusConfirmUser } from "@/queries/user.query";

type StatusType = {
  userId: number;
};

export function StatusConfirm({ userId }: StatusType) {
  const { mutate: confirmStatus, isPending } = useStatusConfirmUser();
  const handleApprove = () => {
    confirmStatus({ userId, action: "APPROVE" });
  };

  const handleReject = () => {
    confirmStatus({ userId, action: "REJECT" });
  };
  return (
    <DialogContent className="sm:max-w-[300px]">
      <DialogHeader>
        <DialogTitle>Status Confirm</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="flex w-full justify-between">
          <Button
            className="bg-green-600 w-28"
            onClick={handleApprove}
            disabled={isPending}
          >
            Approve
          </Button>
          <Button
            className="bg-red-600 w-28"
            onClick={handleReject}
            disabled={isPending}
          >
            Reject
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
