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

  describe('Тестирование работы модальных окон описаний ингредиентов', () => {
    describe('Тестирование открытия модальных окон', () => {
      it('Тестирование открытие по карточке ингредиента', () => {
        cy.get('[data-ingredient-type="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });

      it('Тестирования модального окна после перезагрузки страницы', () => {
        cy.get('[data-ingredient-type="bun"]:first-of-type').click();
        cy.reload(true);
        cy.get('#modals').children().should('have.length', 2);
      });
    });

    describe('Тестирование закрытия модальных окон', () => {
      it('Тестирование закрытия модального окна по кнопке закрыть', () => {
        cy.get('[data-ingredient-type="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(1000);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Тестирование закрытия модального окна по клику на оверлей', () => {
        cy.get('[data-ingredient-type="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(1000);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Тестирование закрытия модального окна при нажатии клавиши "esc"', () => {
        cy.get('[data-ingredient-type="bun"]:first-of-type').click();
        cy.get('body').type('{esc}');
        cy.wait(1000);
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
