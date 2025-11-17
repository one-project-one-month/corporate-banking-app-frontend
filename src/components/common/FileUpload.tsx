import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function FileUpload() {
  return (
    <div>
      <form>
        <DialogHeader>
          <DialogTitle>Bulk Upload</DialogTitle>
          <DialogDescription>
            Click{" "}
            <a href="" className="underline text-[blue]">
              here
            </a>{" "}
            to download template.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 mb-6">
          <h2 className="mb-3">Accounts</h2>
          <label
            htmlFor="fileUpload"
            className="block w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-gray-500 hover:bg-gray-50"
          >
            Select File
            <Input id="fileUpload" type="file" className="hidden" />
          </label>
        </div>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline" className="w-[140px]">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="w-[140px] bg-[#072B46]">
            Create
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}
