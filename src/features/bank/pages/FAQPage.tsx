import CustomPagination from "@/components/common/CustomPagination";
import FAQHeader from "../components/faq/FAQHeader";
import FAQTable from "../components/faq/FAQTable";

function FAQPage() {
  return (
    <div>
      <FAQHeader />
      <FAQTable />
      <CustomPagination limit={5} totalCount={40} isNext isPrevious page={1} />
    </div>
  );
}

export default FAQPage;
