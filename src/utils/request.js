import axios from "axios"

// axios request
const req = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
})

export default req
