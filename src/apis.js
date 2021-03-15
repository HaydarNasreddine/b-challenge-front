var url = "http://3.15.233.85/api/v1.0/";

export const apis = {
    version: "1.0",
    customer: {
        register: {api: url + 'users', method: 'post'},
        login: {api: url+ 'login', method: 'POST'},
        logout: {api: url + 'logout', method: 'post'},
        getAll: {api: url + 'users', method: 'get'},
        average: {api: url + 'users/average', method: 'get'},
        filter: {api: url + 'users/filter', method: 'get'},
    }
}