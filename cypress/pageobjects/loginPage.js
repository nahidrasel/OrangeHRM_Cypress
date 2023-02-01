
class loginPage{

    elements ={
        usernameInput : () => cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        passwordInput : () => cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        loginBtn : () => cy.get('.oxd-button'),
        errorAlert : () => cy.get('.oxd-alert'),
        usernameAlert : () => cy.get('.oxd-input-group > .oxd-text'),
        passwordAlert : () => cy.get('.oxd-input-group > .oxd-text')
        }
    usernameValidation(username){
    this.elements.usernameInput().type(username)
    }

    passwordValidation(password){
    this.elements.passwordInput().type(password)
    }

    loginBtnClick()
    {
    this.elements.loginBtn().click()
    }

    loginValidation(userID,pass){
    this.usernameValidation(userID)
    this.passwordValidation(pass)
    this.loginBtnClick();
    }
}
module.exports = new loginPage();