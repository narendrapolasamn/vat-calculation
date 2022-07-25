describe('Vat Calculation test cases', () => {
    it('Should visit page', () => {
        cy.visit('/');
        cy.get('[class=header]').should ('be.visible');
        cy.get('[class=header]').should('have.text', ' Vat Calculation ');
    });
    it('Should check calculation disabled button', () => {
        cy.get('#calculate').should ('be.visible');
        cy.get('#calculate').should('have.text', 'Calculate');
    });
});