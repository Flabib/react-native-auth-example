import axiosInstance from "./axiosInstance";

const authService = {
    login: (data: {
        email: string,
        password: string,
    }) => axiosInstance.post('/login', data),
};

export default authService;