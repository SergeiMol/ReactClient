import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service"

const API_URL = "https://molokhvei.herokuapp.com/api/test/";

const getPublicContent = () => axios.get(API_URL + "all");

const getUserBoard = () => axios.get(API_URL + "user", {headers: authHeader()});

const getModeratorBoard = () => axios.get(API_URL + "mod", {headers: authHeader()});

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", {headers: authHeader()});
};

const getAllUsers = () => axios.get(`${API_URL}users`, {headers: authHeader()});

const checkAccess = () => axios.get(`${API_URL}user/validate`, {headers: authHeader()}).catch(() => authService.logout());

const deleteUsers = (arr) => axios.post(`${API_URL}delete`, {arr});

const blockUsers = (arr) => axios.post(`${API_URL}block`, {arr}).catch(() => authService.logout());

const unblockUsers = (arr) => {
    return axios.post(`${API_URL}unblock`, {arr})
};


export default {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    checkAccess,
    getAllUsers,
    deleteUsers,
    blockUsers,
    unblockUsers

};