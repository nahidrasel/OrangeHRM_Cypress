
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

    it('2. Test Get Method (read) Response body and status ', () => {
        cy.fixture('apiuserdata').then(apiuserdata => {
            cy.request('/api/users/2')
                .then((response) => {
                    expect(response).to.have.property('status', 200)
                    expect(response.body.data.id).to.equal(apiuserdata.id)
                    expect(response.body.data.first_name).to.equal(apiuserdata.first_name)
                    expect(response.body.data.last_name).to.equal(apiuserdata.last_name)
                    expect(response.body.data.email).to.equal(apiuserdata.email)
                    expect(response.body.support.url).to.equal(apiuserdata.url)
                    expect(response.body.support.text).to.equal(apiuserdata.text)
                })
        })
    })

    it('3. Test the POST Method(Create)', () => {
        const details = {
            "name": "morpheus",
            "job": "leader"
        }
        cy.fixture('apiuserdata').then(apiuserdata => {
            cy.request({method: 'POST', url: '/api/users', body: details, failOnStatusCode: false})
                .then((response) => {
                expect(response).to.have.property('status', 201)
                expect(response.body.name).to.equal(details.name)
            })
        })
    })

    it('4. Test the PUT Method(update)', () => {
    const updatedetails = {
        "name": "morpheus",
        "job": "zion resident"
    }
    cy.request({ method: 'PUT', url: '/api/users/2', body: updatedetails, failOnStatusCode: false })
        .then((response) => {
    expect(response).to.have.property('status', 200)
    expect(response.body.name).to.equal(updatedetails.name)
    })
    })

    it('5. Get Access Token Test', () => {
        let access_token = ''
        const login = {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
        cy.fixture('apiuserdata').then(apiuserdata => {
            cy.request({method: 'POST', url: '/api/login', body: login})
                .then((response) => {
                    expect(response).to.have.property('status', 200)
                    access_token = response.body.access_token
                    expect(response.body.token).to.equals(apiuserdata.tokenSecret)
                })
        })
    })

    it('6. Test the DELETE Method(delete)', () => {
    cy.request({ method: 'DELETE', url: '/api/users/2', failOnStatusCode: false})
    .then((response) => {
    expect(response).to.have.property('status', 204)
    })
    })
})