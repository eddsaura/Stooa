/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('sees tomorrow fishbowl information page', () => {
  cy.get('[data-testid=fishbowl-name]', { timeout: 10000 }).should('exist');

  cy.get('[data-testid=fishbowl-description]', { timeout: 10000 }).should('exist');

  cy.screenshot();
});

Then('sees the password input', () => {
  cy.get('[data-testid=prejoin-password]').should('exist');

  cy.screenshot();
});

Then('writes the correct password', () => {
  cy.intercept('POST', 'https://localhost:8443/es/private-password/test-fishbowl', req => {
    req.reply({
      response: true
    });
  }).as('gqlPrivateFishbowlPassword');

  cy.get('[data-testid=prejoin-password]').type('stooa123');
  cy.get('[data-testid=prejoin-cta]').click();

  cy.wait('@gqlPrivateFishbowlPassword');

  cy.screenshot();
});
