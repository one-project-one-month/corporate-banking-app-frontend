import CustomPagination from "@/components/common/CustomPagination";
import UsersHeader from "../components/users/UsersHeader";
import UsersTable from "../components/users/UsersTable";

function UsersPage() {
  return (
    <div className="px-6 py-3">
      <UsersHeader />
      <UsersTable />
      <CustomPagination limit={5} totalCount={40} isNext isPrevious page={1} />
    </div>
  );
}

export default UsersPage;
