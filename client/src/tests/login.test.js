import mockAxios from '../__mocks__/axios'

//Testing if login form returns an active token 
test("should return an ative token", async() => {
    //Setup
    mockAxios.post.mockImplementationOnce(()=> Promise.resolve({
        data : {
            isError: false,
            message: "No Error!",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWQ4ZTJmYjc1YjAzMGE1NjQwZTUwNCIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJURVNUQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEVwdUV0bjV0RzhFYk5lNXVydW4yNWVJdlhTM2p6bkJBZEJTUHpDT2Y2YmxJaEhXc1JrNWgyIiwiaWF0IjoxNjc2NzQ2MzIzLCJleHAiOjE2NzcwNDYzMjN9.7cVfzXHL5sP3ZBs_NiwPm5AaWGOBraqGjfzmY_aQcCs"
        }
    }))


    //Work
    const SERVER_URL = "//localhost:3001"
    const email = "test@gmail.com"
    const password = "TEST_test_123"
    const axios_response = await mockAxios.post(SERVER_URL + '/signup', {email, password}) 

    //Assertions
    expect(axios_response.data.isError).toBe(false)
    expect(axios_response.data.message).toBe("No Error!")
   

})

