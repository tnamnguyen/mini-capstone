import testt from "../components/signup"
import mockAxios from "../__mocks__/axios";

//Testing if post method is called properly
test('Post method is called properly', async() => {

    //Setup
    mockAxios.post.mockImplementationOnce(()=> Promise.resolve({
        data : {
            isError: false,
            message: "No Error!"
        }
    }))

    //Work
    const SERVER_URL = "//localhost:3001"
    var username = "tes"
    var email = "test@gmail.com"
    var password = "test_password"
    var passwordConfirm = "test_password"
    const axios_response = await mockAxios.post(SERVER_URL + '/signup', {username, email, password, passwordConfirm})     

    //Assertion
    expect(axios_response.data.isError).toBe(false)
    expect(axios_response.data.message).toBe("No Error!")
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(SERVER_URL + '/signup', {username, email, password, passwordConfirm})
});