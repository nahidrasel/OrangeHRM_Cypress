# Orange HRM Cypress Web Automation
Cypress is a next generation front end testing tool built for the modern web. This is a sample project which you can use to start your E2E testing with Cypress.
## Introduction
The following document contains setup npm, how to run cypress automation project of the OrangeHRM demo website.
## Setup
### Step 1: Clone this Repo 
> git clone https://github.com/nahidrasel/OrangeHRM_Cypress.git

### Step 2: Install NodeJs and Cypress
> https://nodejs.org/en/download/ or already installed on the Machine or system.

> Go to the Command line on that specific folder where the clone Repo reside. **Install npm on that folder**, use the following command : npm init.
npm init - Install all the up to date dependencies and the configuration files needed for this project.

> **Install Cypress by using command:**
npm install cypress

> There are a lot dependencies that are not updated frequently in parallel with cypress. So while installing if you are seeing conflicts use`npm i --force`.
node_modules folder will be created in the project which will contain all the dependencies of the project and a package-lock.json file will also be created that will contain JSON for all the dependencies.

### Step 3: Run Test

> Open Cypress test runner window by following command:
npx cypress open

When opening this for the first time it will say in the command line that you are using cypress *** version first time. You will see a window of cypress GUI.

Click on the E2E configuration and select any browser you like to run the test and click on the **Start E2E testing with**.

In new window you will have two spec file. One is for **apispec**(Dummy Test) and another one for **ohrmspec** . Just click on any test you want to run.

> Custom commands can be added to interact with Cypress in package.json file under the **scripts** property:

**Run Cypress from command** to run the tests in headless mode on the terminal:
npx cypress run 

Run Individual Spec Files:
npx cypress run --spec 'cypress/integration/<path to spec file>'


How To Use Cypress.io Page Object Design Pattern Basic Model ( Ready To Use )**

**Step 1:**
**How To Add Page Code ==> Create your individual pages objects with pageName.js in the folder => pageobjects**

```

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

```
> **How To Add UI Test Case ==> Create your individual test with name contain spec in it:  uitest.spec.js in the folder =>  e2e**
**Test case code pattern** in the folder =>  **e2e**
```
import homePage from '../pageobjects/homePage'
describe('Navigate to Orange HRM Web Application Base Page', () => {
    beforeEach(function () {
        cy.fixture('userdata').then(userdata => {
            homePage.visitUrl(userdata.url)
            homePage.elements.loginBranding().should('be.visible')
            homePage.elements.copyrightTitle().should('contain', 'OrangeHRM, Inc')
        })
    })
})

```
**Step 2:** 
**How To Add API Test Case ==> Create your individual test with name contain spec in it:  api.spec.js in the folder =>  e2e**

```
Cypress.config('baseUrl', Cypress.env('baseUrl'))
describe('API Testing', () => {

    it('1. Test the GET Method(read) with Response Headers ', () => {
    cy.request('/api/users?page=2','application/json; charset=utf-8')
    .then((response) => {
     expect(response).to.have.property('status', 200)
     expect(response).to.have.property('headers')
     expect(response.headers['content-type']).to.include('application/json; charset')
    })
    })
})

```
 
 **Test data is isolated from the test case** in the folder  => **fixtures** using JSON file.

``` 
{
  "username": "Admin",
  "password": "admin123",
  "invalidUsername": "Ad",
  "invalidPassword": "123",
  "url":"https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
}

```
## **Reporting**
This Framework also support reporting tools which merges both screenshot and test cases into a html file and saves as index.html in the Reporting folder.
    
### Step 1 : Install mochawesome package. 
Execute the following command: npm i --save-dev cypress-mochawesome-reporter
    
### Step 2 : Change the cypress reporter & setup hooks.
For this, edit the config file (cypress.config.js by default)
    
> Implement node event listeners in the **cypress.config.js** file
```
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  // These settings apply everywhere unless overridden
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true,
    html: true,
    inlineAssets: true,
    overwrite: false,
    json: false
  },
e2e: {
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
    },
    
```
    
### Step 3: Add the following code to your cypress/support/e2e.js file.
```
import 'cypress-mochawesome-reporter/register';
```
### Step 4: In order to run your test script to generate html report.
>Go to your package.json file and add the following under scripts:
```
“html-report” : “cypress run — — spec <file-path>.js — — browser chrome — — headed”
```
    
**Simple run the following command in terminal:**
npm run html-report
    
This will generate an index.html file under “reports/html”. Open this file in a browser, the html report will be like this along with **Screenshots** :
![image](https://user-images.githubusercontent.com/53434625/221381208-681f4983-d894-4dd2-acff-09fa9b1439a1.png)
