describe('Тестирование страницы конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Тестирование доступности приложения', () => {
    cy.visit('http://localhost:4000');
  });

  it('Тестирование доступности списка ингредиентов для выбора', () => {
    cy.get('[data-ingredient-type="bun"]').should('have.length.at.least', 1);
    cy.get(
      '[data-ingredient-type="sauce"],[data-ingredient-type="main"]'
    ).should('have.length.at.least', 1);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
