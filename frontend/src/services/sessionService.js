import api from "./api";

export const endSession = (data) => api.post("/sessions/end", data);

export const getSessions = (page = 1) => api.get(`/sessions?page=${page}&limit=10`);

export const getSessionById = (id) => api.get(`/sessions/${id}`);

export const getStats = () => api.get("/sessions/stats");

export const deleteSession = (id) => api.delete(`/sessions/${id}`);