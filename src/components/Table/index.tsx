import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchResultItem } from "../../generated/graphql";
import { SearchData } from "../../types";

const columns: ColumnsType<SearchResultItem> = [
  {
    title: "Name",
    dataIndex: "nameWithOwner",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Forks",
    dataIndex: "forkCount",
    key: "forkCount",
  },
  {
    title: "Stars",
    key: "stargazerCount",
    dataIndex: "stargazerCount",
  },
  {
    title: "Github Page",
    dataIndex: "nameWithOwner",
    key: "nameWithOwner",
    render: (text: string) => <a href={`https://github.com/${text}`}>{text}</a>,
  },
  {
    title: "Project Home Page",
    dataIndex: "homepageUrl",
    key: "homepageUrl",
    render: (text: string) => <a href={text}>{text}</a>,
  },
];

export interface TableComponentProps {
  data: SearchData;
}

const TableComponent = ({ data }: TableComponentProps): JSX.Element => {
  return <Table dataSource={data?.search?.nodes} columns={columns} />;
};

export default TableComponent;
