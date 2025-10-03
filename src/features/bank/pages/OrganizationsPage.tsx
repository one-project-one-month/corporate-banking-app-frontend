import OrganizationsHeader from "../components/organizations/OrganizationsHeader";
import OrganizationsTable from "../components/organizations/OrganizationsTable";
import { useCallback, useState } from "react";
import type { BaseOrganization } from "@/types/Organization";

function OrganizationsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<BaseOrganization | null>(null);

  const handleEditOrganization = useCallback(
    (organization: BaseOrganization) => {
      setIsFormOpen(true);
      setSelectedOrganization(organization);
    },
    []
  );

  return (
    <div>
      <OrganizationsHeader
        selectedOrganization={selectedOrganization}
        isFormOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      <OrganizationsTable handleEdit={handleEditOrganization} />
    </div>
  );
}

export default OrganizationsPage;
