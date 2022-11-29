describe("App tests", () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.visit("http://localhost:3000");
  });

  it("Search functions correctly", () => {
    cy.get("input[name=search]").type(`react`);
    cy.get(".ant-input-search-button").click();
    cy.get(".ant-table-row").should(($lis) => {
      expect($lis).to.have.length(10);
    });
  });

  it("Allows clearing search", () => {
    cy.get("input[name=search]").type(`react`);
    cy.get(".ant-input-search-button").click();
    cy.get(".ant-table-row").should(($lis) => {
      expect($lis).to.have.length(10);
    });

    cy.get("input[name=search]").clear();
    cy.get(".ant-input-search-button").click();

    cy.get(".ant-table-row").should(($lis) => {
      expect($lis).to.have.length(0);
    });
  });
});
