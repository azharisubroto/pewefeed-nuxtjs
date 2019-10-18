import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://localhost/pw-api/public/api`,
        withCredentials: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access-token'),
            'Content-Type': 'application/json',
        }
    })
}