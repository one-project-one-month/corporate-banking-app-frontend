import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import FAQCreateForm from "./FAQCreateForm";
import { useCallback, useState } from "react";
import type { BaseFAQ } from "@/types/FAQ";

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
        <div className="flex space-x-2">
          <DrawerTrigger asChild>
            <Button variant="default">Create</Button>
          </DrawerTrigger>
          <Button variant="secondary">Filter</Button>
        </div>
      </div>
      <DrawerContent>
        <FAQCreateForm editFAQ={selectedFAQ} handleClose={handleCloseDrawer} />
      </DrawerContent>
    </Drawer>
  );
}

export default FAQHeader;
