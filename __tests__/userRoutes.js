const request = require('supertest')
const app = require('../app')

describe('User Routes', () => {
	
	// Create new user - Pass
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'lol',
				email: 'email@gmail.com',
				password: 'somepassword'
      })
		console.log()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('name')
  })
	
	// Create new user - Fail
  it('it should not create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'bruna',
				email: 'emailgmailcom'
      })
		console.log()
    expect(res.statusCode).toEqual(400)
  })
	
	// Shows all users pass
	it('should show all users', async () => {
        const res = await request(app).get('/users')
        expect(res.statusCode).toEqual(201)
	 })
	
	// Updates a user - Pass
	it('should update a user by id', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({
        name: 'updatedUser',
      })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty("updatedAt")
   })
	
	// Deletes a user - Pass
	it('should delete a user', async () => {
      const res = await request(app)
        .del('/users/1')
      expect(res.statusCode).toEqual(400)
  })

});