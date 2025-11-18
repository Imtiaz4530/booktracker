import API from "./axios";

// 🟢 Signup
export const signup = async (data) => {
  const res = await API.post(`/user/signup`, data);
  return res.data;
};

// 🟢 Login
export const login = async (data) => {
  const res = await API.post(`/user/login`, data);
  return res.data;
};

// 🟢 Create Book
export const createBook = async (data) => {
  const res = await API.post(`/book/create`, data);
  return res.data;
};

// 🟢 Get Books
export const getBooks = async () => {
  const res = await API.get(`/book`);
  return res.data;
};

// 🟢 Update Book
export const updateBook = async (id, data) => {
  const res = await API.put(`/book/update/${id}`, data);
  return res.data;
};
