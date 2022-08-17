import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";
//axios.defaults.baseURL = "https://quanlyduan-api.herokuapp.com/api";
export function postApi(url, data, token) {
    return axios.post(url, data, {
        headers: {
            Authorization: token,
        },
    });
}

export function patchApi(url, data, token) {
    return axios.patch(url, data, {
        headers: {
            Authorization: token,
        },
    });
}

export function deleteApi(url, token) {
    return axios.delete(url, {
        headers: {
            Authorization: token,
        },
    });
}

export function getApi(url, token) {
    return axios.get(url, {
        headers: {
            Authorization: token,
        },
    });
}
