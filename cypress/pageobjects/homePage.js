
class homePage{

    elements ={
        loginBranding : () =>  cy.get('.orangehrm-login-branding'),
        copyrightTitle : () =>  cy.get('.orangehrm-copyright-wrapper > :nth-child(2)')
    }
    visitUrl(Url) {
    cy.visit(Url)
    }
    }

module.exports = new homePage();