import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

const getRequestOptions = () => {
    return {
        method: 'GET',
        headers: authHeader()
    }
};

const postRequestOptions = (param) => {
    return {
        method :'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(param)
    };
};

function login(username, password){
    const requestOptons = postRequestOptions({ username, password});

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptons)
        .then(handleResponse)
        .then(user => {
           if (user.token) {
               localStorage.setItem('user', JSON.stringify(user));
           }

           return user;
        });
}

function logout(){
    localStorage.removeItem('user');
}

function getAll(){
    const requestOptions = getRequestOptions();

    console.log("==== getAll ====");
    console.log(requestOptions);
    return fetch(`${config.apiUrl}/users`, requestOptions)
        .then(handleResponse);
}

function getById(id){
    const requestOptions = getRequestOptions();

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user){
    const requestOptions = postRequestOptions(user);

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user){
    const requestOptions = {
        method : 'PUT',
        headers : { ...authHeader(), 'Content-Type' : 'application/json'},
        body : JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

function _delete(id){
    const requestOptions = {
        method : 'DELETE',
        headers : authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`,requestOptions).then(handleResponse);
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }


        return data;
    });
}