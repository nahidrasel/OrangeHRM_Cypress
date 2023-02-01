describe('login', () => {
    before(function () {
        //Navigating to a URL
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        //Verify the Login Page Images
        cy.get('.orangehrm-login-branding > img').should('have.attr', 'src').should('include', '/web/images/ohrm_branding.png?1672659722816')
        cy.get('.orangehrm-copyright-wrapper > :nth-child(2)').should('contain', 'OrangeHRM, Inc')
        cy.get('.orangehrm-copyright-wrapper > :nth-child(2)').contains('© 2005 - 2023 ')
        cy.get('.orangehrm-copyright-wrapper > :nth-child(2)').contains('. All rights reserved.')
    })

    /*
     1.Invalid Login Test
     2.Valid Login and Logout Test
    */

    //Invalid Login Test
    it('Invalid Login', () => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('invalid')
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('12345')
        cy.get('.oxd-button').click()
        cy.get('.oxd-alert')
            .should('be.visible')
            .and('contain', 'Invalid credentials')
        cy.screenshot({capture: 'fullPage'})
    })

    //Valid Login and Logout Test
    describe("Valid Login and Logout Actions", () => {
        cy.fixture('userdata').then(userdata => {
            cy.login(userdata.username, userdata.password)
            cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
            cy.get(':nth-child(1) > .oxd-main-menu-item').should('be.visible')

    //Logout Action
            cy.get('.oxd-userdropdown-name').click()
            cy.get(':nth-child(4) > .oxd-userdropdown-link').click()
            cy.get('.orangehrm-login-branding > img').should('have.attr', 'src').should('include', '/web/images/ohrm_branding.png?1672659722816')
        })
    })
})