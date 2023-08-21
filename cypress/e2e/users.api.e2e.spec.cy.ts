describe(`Users API E2E Test`, () => {
  it(`GET /users?firstName=John&limit=20&page=1&sort=-1&sortBy=createdAt)`, () => {
    cy.visit(
      `http://localhost:9000/swagger#/Users%20API/UsersController_getUsers`,
    );

    cy.get(
      '#operations-Users_API-UsersController_getUsers .try-out__btn',
    ).click();

    cy.get(
      '#operations-Users_API-UsersController_getUsers tr[data-param-name="firstName"] input',
    ).type('John');

    cy.get('.execute').click();
  });

  it(`GET /users?firstName=John&limit=50&page=2&sort=-1&sortBy=createdAt)`, () => {
    cy.visit(
      `http://localhost:9000/swagger#/Users%20API/UsersController_getUsers`,
    );

    cy.get(
      '#operations-Users_API-UsersController_getUsers .try-out__btn',
    ).click();

    cy.get(
      '#operations-Users_API-UsersController_getUsers tr[data-param-name="limit"] input',
    ).type('50');

    cy.get(
      '#operations-Users_API-UsersController_getUsers tr[data-param-name="page"] input',
    ).type('2');

    cy.get('.execute').click();
  });
});
