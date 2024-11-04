import request from "./request";
export const loginApi = (formData)=> {
    return request({
        url: "/api/gw",         
        method: "POST",
        data: formData
    })
}
