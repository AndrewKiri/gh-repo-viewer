import Paginator from "../../src/components/Paginator";

describe("Paginator.cy.ts", () => {
  it("Renders correctly when there are no items to paginate", () => {
    cy.mount(<Paginator />);
    cy.get(".cy-paginator .ant-pagination-total-text").should(
      "have.text",
      "Total 0 items"
    );
  });

  it("Pagination controls work correctly when there are items to paginate through", () => {
    const onChangeSpy = cy.spy((page, perPage) => {}).as("onChangeSpy");
    const pagination = {
      current: 1,
      total: 200,
      defaultPageSize: 10,
      defaultCurrent: 1,
    };

    cy.mount(<Paginator {...pagination} onChange={onChangeSpy} />);

    cy.get(".cy-paginator .anticon-right").click();

    cy.get("@onChangeSpy").should("have.been.calledWith", 2, 10);
  });
});
