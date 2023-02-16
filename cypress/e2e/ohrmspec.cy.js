import loginPage from '../pageobjects/loginPage'
import homePage from '../pageobjects/homePage'
import dashboardPage from '../pageobjects/dashboardPage'
const faker = require('faker')
import 'cypress-mochawesome-reporter/register';
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

describe('Navigate to Orange HRM Web Application Base Page', () => {
    beforeEach(function() {
    cy.fixture('userdata').then(userdata => {

    //Navigate to Url and Validate the landed page
    homePage.visitUrl(userdata.url)
    homePage.elements.loginBranding().should('be.visible')
    homePage.elements.copyrightTitle().should('contain','OrangeHRM, Inc')
    })
    })

    //Checking Username
    it('1. This test will Check Username Only and Click on login', () => {
    cy.fixture('userdata').then(userdata => {
    loginPage.usernameValidation(userdata.invalidUsername)
    loginPage.loginBtnClick()
    loginPage.elements.passwordAlert().should('be.visible').and('contain', 'Required')
    })
    })

    //Checking Password
    it('2. This test will Check Password Only and Click on login', () => {
    cy.fixture('userdata').then(userdata => {
    loginPage.passwordValidation(userdata.invalidPassword)
    loginPage.loginBtnClick()
    loginPage.elements.usernameAlert().should('be.visible').and('contain', 'Required')
    })
    })

    //Checking login without username and password
    it('3. This test will attempt to Login without username and password', () => {
    loginPage.loginBtnClick()
    loginPage.elements.usernameAlert().should('be.visible').and('contain', 'Required')
    loginPage.elements.passwordAlert().should('be.visible').and('contain', 'Required')
    })

    //Checking Invalid Alert and taking screenshots
    it('4. This test will attempt an Invalid Login and Take Screenshot', () => {
    cy.fixture('userdata').then(userdata => {
	loginPage.loginValidation(userdata.invalidUsername,userdata.invalidPassword)
	loginPage.elements.errorAlert().should('be.visible').and('contain', 'Invalid credentials').screenshot()
	})
	})

    //Valid Login and Logout
    it('5. This test will perform Valid Login and Logout', () => {
    cy.fixture('userdata').then(userdata => {
    loginPage.loginValidation(userdata.username,userdata.password)
    dashboardPage.elements.topBarHeader().should('be.visible')
    dashboardPage.elements.mainMenuItem().should('be.visible')
    dashboardPage.logoutActions()
    homePage.elements.loginBranding().should('be.visible')
    homePage.elements.copyrightTitle().should('contain','OrangeHRM, Inc')
    })
    })

    //InValid Login with Faker Username and Password
    it('6. This test will perform InValid Login using faker Username and Password', () => {
    const fakerUsername =faker.name.firstName()
    const fakerPassword =faker.internet.password()
    loginPage.loginValidation(fakerUsername,fakerPassword)
    loginPage.elements.errorAlert().should('be.visible').and('contain', 'Invalid credentials').screenshot()
    })
})
