import axios from 'axios'

let api = axios.create({
    baseURL: 'https://whispering-citadel-02337.herokuapp.com/'
})

export default api