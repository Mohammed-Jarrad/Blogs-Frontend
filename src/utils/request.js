import axios from "axios"

// axios request
const req = axios.create({
	baseURL: "http://localhost:1010",
})

export default req
