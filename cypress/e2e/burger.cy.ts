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
        cy.get('[data-ingredient-type="bun"]:first-of-type')
          .invoke('attr', 'data-ingredient-id')
          .then((ingredientId) => {
            cy.get('[data-ingredient-type="bun"]:first-of-type').click();

            cy.get('#modals [data-ingredient-id]').should(
              'have.attr',
              'data-ingredient-id',
              ingredientId
            );
          });
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
        cy.get('#modals [data-cy="modal-overlay"]').click({ force: true });
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
      cy.get('[data-cy="burger-constructor-bun-top"]').as('bun-top');
      cy.get('[data-cy="burger-constructor-list-ingredients"]').as(
        'ingredients-list'
      );
      cy.get('[data-cy="burger-constructor-bun-bottom"]').as('bun-bottom');
      cy.get('[data-cy="create-order-button"]').as('create-order-button');

      cy.get('@bun-top').should('contain.text', 'Выберите булки');
      cy.get('@ingredients-list')
        .find('.text_type_main-default')
        .should('contain.text', 'Выберите начинку');
      cy.get('@bun-bottom').should('contain.text', 'Выберите булки');
      cy.get('@create-order-button').should('have.attr', 'disabled');

      cy.get('[data-ingredient-type="bun"]:first-of-type').as('bun');
      cy.get('@bun').find('button').click();
      cy.get('@bun')
        .invoke('attr', 'data-ingredient-id')
        .then((ingredientId) => {
          cy.get('@bun-top')
            .invoke('attr', 'data-ingredient-id')
            .should('eq', ingredientId);

          cy.get('@bun-bottom')
            .invoke('attr', 'data-ingredient-id')
            .should('eq', ingredientId);
        });

      cy.get('[data-ingredient-type="main"]:first-of-type').as('main');
      cy.get('@main').find('button').click();
      cy.get('@main')
        .invoke('attr', 'data-ingredient-id')
        .then((ingredientId) => {
          cy.get('@ingredients-list')
            .find('li:first-of-type')
            .invoke('attr', 'data-ingredient-id')
            .should('eq', ingredientId);
        });
      cy.get('@create-order-button').should('not.have.attr', 'disabled');

      cy.get('[data-ingredient-type="sauce"]:first-of-type').as('sauce');
      cy.get('@sauce').find('button').click();
      cy.get('@sauce')
        .invoke('attr', 'data-ingredient-id')
        .then((ingredientId) => {
          cy.get('@ingredients-list')
            .find('li:last-of-type')
            .invoke('attr', 'data-ingredient-id')
            .should('eq', ingredientId);
        });

      cy.get('@create-order-button').click();

      cy.get('#modals')
        .find('h2')
        .should('contain.text', orderFixture.order.number);

      cy.get('#modals').find('button');

      cy.get('@bun-top').should('contain.text', 'Выберите булки');
      cy.get('@ingredients-list')
        .find('.text_type_main-default')
        .should('contain.text', 'Выберите начинку');
      cy.get('@bun-bottom').should('contain.text', 'Выберите булки');
      cy.get('@create-order-button').should('have.attr', 'disabled');
    });

    afterEach('Удаление фейковых OIDC токенов', () => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
