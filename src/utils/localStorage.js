export const setStorageFn = (key, data)=> {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

export const  getStorageFn = (key)=> {
        return JSON.parse(window.localStorage.getItem(key));
    }

export const removeStorageFn =  (key)=> {
        window.localStorage.removeItem(key);
    }


