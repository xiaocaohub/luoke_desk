import request from "./request";
export const getGoodListApi = (formData)=> {
    return request({
        url: "/api/gw",         
        method: "POST",
        data: formData
    })
}


