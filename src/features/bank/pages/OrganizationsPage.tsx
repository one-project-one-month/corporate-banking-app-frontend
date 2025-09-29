import CustomPagination from "@/components/common/CustomPagination";
import OrganizationsHeader from "../components/organizations/OrganizationsHeader";
import OrganizationsTable from "../components/organizations/OrganizationsTable";

function OrganizationsPage() {
  return (
    <div>
      <OrganizationsHeader />
      <OrganizationsTable />
      <CustomPagination limit={5} totalCount={40} isNext isPrevious page={1} />
    </div>
  );
}

export default OrganizationsPage;
