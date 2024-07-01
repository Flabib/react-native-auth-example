import axiosInstance from "./axiosInstance";

const userService = {
    getUsers: () => axiosInstance.get('/users'),
};

export default userService;