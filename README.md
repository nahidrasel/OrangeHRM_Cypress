# Orange HRM Web Automation
Cypress is a next generation front end testing tool built for the modern web. This is a sample project which you can use to start your E2E testing with Cypress.
## Introduction
The following document contains setup npm, how to run cypress automation project of the OrangeHRM demo website.
## Setup
### Step 1: Clone this Repo 
> git clone https://github.com/nahidrasel/OrangeHRM_Cypress.git

### Step 2: Assume Node.Js Should be already installed on the Machine or system, otherwise install Node.Js on the machine or system.
> Go to the Command line on that specific folder where the clone Repo reside. Install npm on that folder, use the following command : npm init.
npm init - Install all the up to date dependencies and the configuration files needed for this project.

> Install Cypress by using command:
npm install cypress

> There are a lot dependencies that are not updated frequently in parallel with cypress. So while installing if you are seeing conflicts use`npm i --force`.

> node_modules folder will be created in the project which will contain all the dependencies of the project and a package-lock.json file will also be created that will contain JSON for all the dependencies.

### Step 3: Run Test

> Open Cypress test runner window by following command:
npx cypress open

When opening this for the first time it will say in the cmd that you are using cypress *** version first time. You will see a window of cypress GUI.

Click on the E2E configuration and select any browser you like to run the test and click on the **Start E2E testing with ***** .

In new window you will two spec file. One is for **apispec**(Dummy Test) and another one for **ohrmspec** . Just click on any test you want to run.

> Custom commands can be added to interact with Cypress in package.json file under the **scripts** property:

**Run Cypress from command** to run the tests in headless mode on the terminal:
npx cypress run 

Run Individual Spec Files:
npx cypress run --spec 'cypress/integration/<path to spec file>'
