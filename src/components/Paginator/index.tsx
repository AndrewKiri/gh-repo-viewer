import React, { ReactNode } from "react";
import { PaginationProps, Pagination } from "antd";

export interface PaginatorProps extends PaginationProps {
  children: ReactNode;
}

const Paginator = ({
  current,
  total,
  defaultCurrent,
  defaultPageSize,
  onChange,
  children,
}: PaginatorProps): JSX.Element => {
  return (
    <>
      <Pagination
        current={current}
        style={{ margin: "12px 0" }}
        total={total}
        showTotal={(total: number) => `Total ${total} items`}
        defaultPageSize={defaultPageSize}
        defaultCurrent={defaultCurrent}
        onChange={onChange}
      />
      {children}
      <Pagination
        current={current}
        style={{ margin: "12px 0" }}
        total={total}
        showTotal={(total: number) => `Total ${total} items`}
        defaultPageSize={defaultPageSize}
        defaultCurrent={defaultCurrent}
        onChange={onChange}
      />
    </>
  );
};

export default Paginator;
