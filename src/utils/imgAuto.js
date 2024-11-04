export const setImgAutoHeightFn = function (wrapDiv, img) {

        let width = wrapDiv.clientWidth;

        let height = parseInt((width * 2)/3);
        
        return height;
    }

export const setVedioHeightFn = function (wrapDiv) {
    let width = wrapDiv.clientWidth;
    let height =  (width * 9) /16;

    return height;
}




export const scrollTopFn = function () {
    console.log("scrollTopFn")

    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

