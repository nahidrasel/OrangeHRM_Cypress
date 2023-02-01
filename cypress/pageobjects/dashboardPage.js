
class dashboardPage{

    elements ={
        topBarHeader : () => cy.get('.oxd-topbar-header-breadcrumb > .oxd-text'),
        mainMenuItem : () => cy.get(':nth-child(1) > .oxd-main-menu-item'),
        userDropdownName : () => cy.get('.oxd-userdropdown-tab > .oxd-icon'),
        logoutBtn : () => cy.get(':nth-child(4) > .oxd-userdropdown-link')
    }

    dashboardPageValidation() {
    elements.topBarHeader().should('be.visible')
    elements.mainMenuItem().should('be.visible')
    }
    logoutActions(){
    this.elements.userDropdownName().click()
    this.elements.logoutBtn().click()
    }
}
module.exports = new dashboardPage();