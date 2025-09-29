import { useMemo } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";

type Organization = {
  id: number;
  name: string;
  shortcode: string;
  address: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
};

function OrganizationsTable() {
  const organizations: Organization[] = [
    {
      id: 1,
      name: "Alpha Corp",
      shortcode: "ALPHA",
      address: "123 Alpha Street",
      country: "USA",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-02",
      createdBy: 1,
      updatedBy: 2,
    },
    {
      id: 2,
      name: "Beta Ltd",
      shortcode: "BETA",
      address: "456 Beta Avenue",
      country: "Canada",
      createdAt: "2023-02-01",
      updatedAt: "2023-02-02",
      createdBy: 3,
      updatedBy: 4,
    },
    {
      id: 3,
      name: "Gamma Inc",
      shortcode: "GAMMA",
      address: "789 Gamma Road",
      country: "UK",
      createdAt: "2023-03-01",
      updatedAt: "2023-03-02",
      createdBy: 5,
      updatedBy: 6,
    },
    {
      id: 4,
      name: "Delta LLC",
      shortcode: "DELTA",
      address: "101 Delta Blvd",
      country: "Australia",
      createdAt: "2023-04-01",
      updatedAt: "2023-04-02",
      createdBy: 7,
      updatedBy: 8,
    },
    {
      id: 5,
      name: "Epsilon Group",
      shortcode: "EPSILON",
      address: "202 Epsilon Lane",
      country: "India",
      createdAt: "2023-05-01",
      updatedAt: "2023-05-02",
      createdBy: 9,
      updatedBy: 10,
    },
  ];

  const columns = useMemo<Column<Organization>[]>(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "name",
        label: "Organization Name",
      },
      {
        key: "shortcode",
        label: "Shortcode",
        className: "text-center",
        headerClassName: "text-center",
      },
      {
        key: "address",
        label: "Address",
      },
      {
        key: "country",
        label: "Country",
        className: "text-center",
        headerClassName: "text-center",
      },
      {
        key: "createdBy",
        label: "Created By",
        className: "text-center",
        headerClassName: "text-center",
      },
    ],
    []
  );

  const actions = useMemo<Action<Organization>[]>(
    () => [
      { name: "Edit", onClick: () => {} },
      { name: "Delete", onClick: () => {} },
    ],
    []
  );

  return (
    <CustomTable<Organization>
      columns={columns}
      body={organizations}
      actions={actions}
    />
  );
}

export default OrganizationsTable;
