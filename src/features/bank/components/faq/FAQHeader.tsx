import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import FAQCreateForm from "./FAQCreateForm";
import { useCallback } from "react";
import type { BaseFAQ } from "@/types/FAQ";
import CreateButton from "@/components/common/Button";
import SearchInput from "@/components/common/Search";

type FAQHeaderProps = {
  selectedFAQ: BaseFAQ | null;
  isFormOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

function FAQHeader({ selectedFAQ, isFormOpen, onOpenChange }: FAQHeaderProps) {
  const handleCloseDrawer = useCallback(() => {
    onOpenChange(false);
  }, []);

  return (
    <Drawer direction="right" open={isFormOpen} onOpenChange={onOpenChange}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">FAQ</h1>
          <p className="text-sm text-gray-500">Total: 60</p>
        </div>
        <DrawerTrigger asChild>
          <CreateButton />
        </DrawerTrigger>
      </div>

      <div className="flex justify-end gap-6">
        <SearchInput />
        <Button className="w-[148px] h-[42px] bg-[#E5E5E5]" variant="secondary">
          Filter
        </Button>
      </div>
      <DrawerContent>
        <FAQCreateForm editFAQ={selectedFAQ} handleClose={handleCloseDrawer} />
      </DrawerContent>
    </Drawer>
  );
}

export default FAQHeader;
