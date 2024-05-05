import axios from "axios";
import { storeItem } from "../utils/storage";

// Login
export const setHeader = (token) => {
	axios.defaults.headers.common["Authorization"] = `Bear ${token}`;
};

export const login = async (value) => {
	try {
		console.log(axios.defaults.baseURL)

		const response = await axios.post("auth/login", value);
		await storeItem("token", response.data.token);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Get user information
export const getUser = async () => {
	try {
		const response = await axios.get("auth/user");
		return response;
	} catch (error) {
		return error.response;
	}
};

// Register
export const signup = async (value) => {
	try {
		const response = await axios.post("auth/signup", value);
		return response;
	} catch (error) {
		return error.response;
	}
};