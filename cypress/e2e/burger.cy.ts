import * as orderFixture from '../fixtures/order.json';

describe('Тестирование страницы конструктора бургеров', () => {
  beforeEach('Мокирование запроса получения списка ингредиентов', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
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
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Тестирование закрытия модального окна по клику на оверлей', () => {
        cy.get('[data-ingredient-type="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Тестирование закрытия модального окна при нажатии клавиши "esc"', () => {
        cy.get('[data-ingredient-type="bun"]:first-of-type').click();
        cy.get('body').type('{esc}');
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  describe('Тестирование создания заказа пользователем', () => {
    beforeEach('Добавление фейковых OIDC токенов', () => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');
    });

    beforeEach('Мокирование данных для создания заказа', () => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });

      cy.visit('/');
    });

    it('Тестирование создание заказа пользователем', () => {
      cy.get('[data-create-order-button]').should('be.disabled');
      cy.get('[data-ingredient-type="bun"]:first-of-type button').click();
      cy.get('[data-create-order-button]').should('be.disabled');
      cy.get('[data-ingredient-type="main"]:first-of-type button').click();
      cy.get('[data-create-order-button]').should('be.enabled');

      cy.get('[data-create-order-button]').click();

      cy.get('#modals').children().should('have.length', 2);

      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );

      cy.get('[data-create-order-button]').should('be.disabled');
    });

    afterEach('Удаление фейковых OIDC токенов', () => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
