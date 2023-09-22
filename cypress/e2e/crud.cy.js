describe('crud spec', () => {
  before(() => {
    cy.request({
      url: 'http://localhost:5555/post_its/tests'
    })
    .then(res => {
      expect(res.status).eq(200)
    })
  })

  it('get All', () => {
    cy.request({
      url: 'http://localhost:5555/post_its/'
    })
    .then(res => {
      expect(res.body.length).eq(0)
      expect(res.status).eq(200)
    })
  })

  it('create', () => {
    cy.request({
      url: 'http://localhost:5555/post_its/',
      method: 'POST',
      body : {
        title : "Create",
        description : "Create a post-it"
      }
    })
    .then(res => {
      expect(res.body.title).eq("Create")
      expect(res.status).eq(201)
      expect(res.body.id).eq(1)
    })
  })

  it('get All', () => {
    cy.request({
      url: 'http://localhost:5555/post_its/'
    })
    .then(res => {
      expect(res.body.length).eq(1)
      expect(res.status).eq(200)
    })
  })

  it('get one', () => {
    cy.request({
      url: 'http://localhost:5555/post_its/1'
    })
    .then(res => {
      expect(res.body.description).eq("Create a post-it")
      expect(res.status).eq(200)
      expect(res.body.id).eq(1)
    })
  })

  it('get one', () => {
    cy.request({
      url: 'http://localhost:5555/post_its/111',
      failOnStatusCode: false
    })
    .then(res => {
      expect(res.status).eq(404)
    })
  })

})