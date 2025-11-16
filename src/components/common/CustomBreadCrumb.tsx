import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { Link } from "react-router-dom";

type CustomBreadCrumbProps = {
  currentPageTitle: string;
  links: { name: string; path: string }[];
};

function CustomBreadCrumb({
  currentPageTitle,
  links,
}: Partial<CustomBreadCrumbProps>) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links?.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={item.path}>{item.name}</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[20px] font-medium text-[#072B46]">
            {currentPageTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default CustomBreadCrumb;
