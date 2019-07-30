/// <reference types="Cypress" />

context('Search', () => {
    before(() => {
      cy.visit('/')
    })

    it('Should open searchbox', ()=> {
        cy.get('nav').getByText('Search').click().get('#search-input').should('be.visible')
    })

    const expectedPostTitle = 'Firmware Update Notifications for My Asus Router';
    it(`Should find post with title '${expectedPostTitle}' search for "asus firmware"`, ()=> {
        cy.get('#search-input')
          .wait(3000) // give some time for index file to download
          .type('asus firmware')
          .get('#search-output .result-list')
          .within(() => {
            cy.getByText(expectedPostTitle)
            .should('be.visible')
          })
    })

    it(`Should navigate to post when clicked`, ()=> {
        cy.get('#search-output .result-list')
          .within(() => {
            cy.getByText(expectedPostTitle)
            .click()
            .url(`/firmware-update-notifications-for-my-asus-router/`)
          })
    })

    it('Should close on ESC key', ()=> {
        cy.get('nav').getByText('Search').click().get('#search-input')
            .type('{esc}')
            .get('#search-input').should('not.be.visible')

    })    
})