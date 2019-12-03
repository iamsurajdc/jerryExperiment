import axios from 'axios';
const axiosinstance= axios.create({
    baseURL:'https://identitytoolkit.googleapis.com/v1/accounts'
})

// axiosinstance.defaults.headers.common["sdfsd"]="dfsdf";
export default axiosinstance