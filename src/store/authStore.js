import { atom } from "recoil";


// 데이터 틀
const DATA = {
    userInfo: {}
};



export const authStore = atom({
    key: 'authStore',
    default: DATA
})