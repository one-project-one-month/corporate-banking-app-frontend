import DepositTransitionHeader from "../components/deposit-transition/DepositTransitionHeader";
import DepositTransitionTable from "../components/deposit-transition/DepositTransitionTable";
import { useCallback, useState } from "react";
import type { BaseDepositTransition } from "@/types/DepositTransition";

function DepositTransitionPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDepositTransition, setSelectedDepositTransition] =
    useState<BaseDepositTransition | null>(null);

  const handleEditDepositTransition = useCallback(
    (deposit: BaseDepositTransition) => {
      setIsFormOpen(true);
      setSelectedDepositTransition(deposit);
    },
    []
  );

  return (
    <div>
      <DepositTransitionHeader
        selectedDepositTransition={selectedDepositTransition}
        isFormOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      <DepositTransitionTable handleEdit={handleEditDepositTransition} />
    </div>
  );
}

export default DepositTransitionPage;
