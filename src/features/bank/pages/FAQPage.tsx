import FAQHeader from "../components/faq/FAQHeader";
import FAQTable from "../components/faq/FAQTable";
import { useCallback, useState } from "react";
import type { BaseFAQ } from "@/types/FAQ";

function FAQPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<BaseFAQ | null>(null);

  const handleEditFAQ = useCallback((faq: BaseFAQ) => {
    setIsFormOpen(true);
    setSelectedFAQ(faq);
  }, []);

  return (
    <div>
      <FAQHeader
        selectedFAQ={selectedFAQ}
        isFormOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      <FAQTable handleEditFAQ={handleEditFAQ} />
    </div>
  );
}

export default FAQPage;
