import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `https://s1.playworld.id/api`,
        withCredentials: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access-token'),
            'Content-Type': 'application/json',
        }
    })
}