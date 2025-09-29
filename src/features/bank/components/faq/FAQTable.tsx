import { useMemo, useState } from "react";
import CustomTable from "@/components/common/table/CustomTable";
import type { Action, Column } from "@/types/Table";
import { ExpandableTextCell } from "@/components/common/table/CustomCells";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  category: {
    id: string;
    name: string;
  };
};

function FAQTable() {
  const FAQ: FAQ[] = [
    {
      id: 1,
      question: "What is corporate banking?",
      answer:
        "Corporate banking refers to the aspect of banking that deals with corporate customers.",
      category: {
        id: "1",
        name: "General",
      },
    },
    {
      id: 2,
      question: "How can I open a corporate account?",
      answer:
        "You can open a corporate account by visiting your nearest branch with the required documents.",
      category: {
        id: "2",
        name: "Account Opening",
      },
    },
    {
      id: 3,
      question: "What are the benefits of corporate banking?",
      answer:
        "Corporate banking offers tailored financial solutions for businesses, including loans and cash management.",
      category: {
        id: "1",
        name: "General",
      },
    },
    {
      id: 4,
      question: "How do I apply for a corporate loan?",
      answer:
        "You can apply for a corporate loan by contacting your relationship manager or visiting a branch.",
      category: {
        id: "3",
        name: "Loans",
      },
    },
    {
      id: 5,
      question: "What documents are required for account opening?",
      answer:
        "Documents such as business registration, ID proof, and address proof are required.",
      category: {
        id: "2",
        name: "Account Opening",
      },
    },
  ];

  const columns = useMemo<Column<FAQ>[]>(
    () => [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "question",
        label: "Question",
      },
      {
        key: "answer",
        label: "Answer",
        cell(value) {
          return <ExpandableTextCell value={value} />;
        },
      },
      {
        key: "category.name" as any,
        label: "Category",
      },
    ],
    []
  );

  const actions = useMemo<Action<FAQ>[]>(
    () => [
      { name: "Edit", onClick: () => {} },
      { name: "Delete", onClick: () => {} },
    ],
    []
  );

  return <CustomTable<FAQ> columns={columns} body={FAQ} actions={actions} />;
}

export default FAQTable;
