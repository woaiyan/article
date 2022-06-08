import axios from "axios";

export const getSvgList = (params: any) => {
    return axios.get('waiyan/svg/', {
        params: params
    });
}

export const addSvg = (params: any) => {
    return axios.post('waiyan/svg/', params);
}

export const deleteSvg = (id: number) => {
    return axios.delete(`waiyan/svg/${id}/`);
}