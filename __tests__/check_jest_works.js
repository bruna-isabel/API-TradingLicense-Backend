// This test fails because 1 !== 2
	 // This passes because 1 === 1

test('Jest should use the test DB', ()=> {
		expect(process.env.DB_DATABASE).toBe('test_db');
})