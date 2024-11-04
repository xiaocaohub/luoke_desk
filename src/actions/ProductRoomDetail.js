import {getGoodInfoApi} from "../api/ProductRoomDetail";
export const getGoodInfoAction = (formData)=>((dispatch)=>{
    getGoodInfoApi(formData).then((res)=>{
  
        let resData = res.data.data;
        let action = {type:"set_good_info", payload: resData}
        dispatch(action)
    })
})

// export const getGoodInfoAction = ((dispatch)=>{
//     let formData = new FormData();
//     let option = {"brandId":"","minPrice":"","maxPrice":""};
//     formData.append("api", "app.product.productDetails");          
//     formData.append("storeId", 1);

//     formData.append("storeType", 6);

//     formData.append("productId", 507);
//     getGoodInfoApi(formData).then((res)=>{
//         console.log(res)
//         let resData = res.data.data;
//         let action = {type:"set_good_info", payload: resData}
//         dispatch(action)
//     })
// })
