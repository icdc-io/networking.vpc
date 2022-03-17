import axios from 'axios';

export default {
    get(url, headers = {}, params = {}) {
        return axios.get(url, {
            headers,
            params
        })
        .then(response => response.data);
    },
    put(url, data = {}, headers = {}) {
        return axios.put(url, data, {
            headers
        })
        .then(response => response.data);
    },
    post(url, headers = {}, data = {}) {
        return axios.post(url, data, {
            headers
        })
        .then(response => response.data);
    },
    delete(url, headers = {}) {
        return axios.delete(url, {
            headers
        })
        .then(response => response.data);
    }
};
