import axios from "axios";
import React from "react";


const API_URL = "https://molokhvei.herokuapp.com/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};


const logout = () => {
    //TODO пофиксить redirect на нормальный вид
    
    localStorage.removeItem("user");
    document.location = "/login"
    //document.location = "/login"
};


const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};