import request from "./request";
export const getGoodInfoApi = (formData)=>{ 
    return request({
        url: "/api/gw",         
        method: "POST",
        data: formData
    })
}
