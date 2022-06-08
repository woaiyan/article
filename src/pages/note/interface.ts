import axios from "axios";

export const createCategory = (params: any) => {
    return axios.post('waiyan/note/category/', params);
}

export const getCategory = () => {
    return axios.get('waiyan/note/category/');
}

export const deleteCategory = (id: number) => {
    return axios.delete(`waiyan/note/category/${id}/`);
}

export const createNote = (params: any) => {
    return axios.post('waiyan/note/category/create/', params);
}