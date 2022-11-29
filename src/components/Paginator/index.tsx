import React, { ReactNode } from "react";
import { PaginationProps, Pagination } from "antd";

enum RENDER_MODES {
  bottom = "bottom",
  top = "top",
  topAndBottom = "topAndBottom",
}

export interface PaginatorProps extends PaginationProps {
  children?: ReactNode;
  mode?: keyof typeof RENDER_MODES;
}

const Paginator = ({
  current,
  total,
  defaultCurrent,
  defaultPageSize,
  onChange,
  children,
  mode = RENDER_MODES.bottom,
}: PaginatorProps): JSX.Element => {
  const shouldShowTop =
    mode === RENDER_MODES.top || mode === RENDER_MODES.topAndBottom;
  const shouldShowBottom =
    mode === RENDER_MODES.bottom || mode === RENDER_MODES.topAndBottom;

  return (
    <>
      {shouldShowTop && (
        <Pagination
          className="cy-paginator"
          current={current}
          style={{ margin: "12px 0" }}
          total={total}
          showTotal={(total: number) => `Total ${total} items`}
          defaultPageSize={defaultPageSize}
          defaultCurrent={defaultCurrent}
          onChange={onChange}
        />
      )}
      {children}
      {shouldShowBottom && (
        <Pagination
          className="cy-paginator"
          current={current}
          style={{ margin: "12px 0" }}
          total={total}
          showTotal={(total: number) => `Total ${total} items`}
          defaultPageSize={defaultPageSize}
          defaultCurrent={defaultCurrent}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default Paginator;
