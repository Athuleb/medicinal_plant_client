import { instance } from "../../constants";
export const getDetails = async (leaf)=>{
    let result = null
    try {
        result = await instance.post('/search/get-all',{leaf})
        return result.data
    } catch (error) {
        return result.status
    }
}