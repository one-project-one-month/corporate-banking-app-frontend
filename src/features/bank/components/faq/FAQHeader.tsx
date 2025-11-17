import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import FAQCreateForm from "./FAQCreateForm";
import { useCallback } from "react";
import type { BaseFAQ } from "@/types/FAQ";
import CreateButton from "@/components/common/Button";

type FAQHeaderProps = {
  selectedFAQ: BaseFAQ | null;
  isFormOpen: boolean;
  onOpenChange: (open: boolean) => void;
  clearEditFaq: () => void;
};

function FAQHeader({
  selectedFAQ,
  isFormOpen,
  onOpenChange,
  clearEditFaq,
}: FAQHeaderProps) {
  const handleCloseDrawer = useCallback(() => {
    onOpenChange(false);
  }, []);

  return (
    <Drawer direction="right" open={isFormOpen} onOpenChange={onOpenChange}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg text-[#072B46] font-medium">FAQ</h1>
          <p className="text-sm text-gray-500">Total: 60</p>
        </div>
        <DrawerTrigger asChild>
          <CreateButton />
        </DrawerTrigger>
      </div>

      <DrawerContent>
        <FAQCreateForm
          editFAQ={selectedFAQ}
          handleClose={handleCloseDrawer}
          clearEditFaq={clearEditFaq}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default FAQHeader;
