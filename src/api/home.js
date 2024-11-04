import request from "./request";
export const homeInfoApi = (formData)=> {
    return request({
        url: "/api/gw",         
        method: "POST",
        data: formData
    })
}


export const getStyleApi = (formData)=> {
    return request({
        url: "/api/gw",         
        method: "POST",
        data: formData
    })
}

export const getStyleGoodArrApi = (formData)=> {
    return request({
        url: "/api/gw",  
               
        method: "POST",
        data: formData
    })
}