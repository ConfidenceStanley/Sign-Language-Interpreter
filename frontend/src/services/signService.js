import api from "./api";

export const getAllSigns = () => api.get("/signs");

export const getCategories = () => api.get("/signs/categories");

export const getSignsByCategory = (category) => api.get(`/signs/category/${category}`);

export const searchSigns = (query) => api.get(`/signs/search?q=${query}`);

export const getSignById = (id) => api.get(`/signs/${id}`);