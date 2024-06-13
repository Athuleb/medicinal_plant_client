import axios from 'axios'
import { instance } from '../constants'
export const sendImage =async (body)=>{
   try {
    const result = await axios.post("http://127.0.0.1:8000/image",body,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': '0kqtNwkUAFSsTDNWh6bGvlOfc6PtXnlQ9k8cThYmRXhKEH46DgMjcpU9vWpE865x',
        },
      })
    // console.log(result.data?.message);
    return result.data
   } catch (error) {
    // console.log(error.response.data);
    return error.response.data
   }
}

export const getLeafDetails = async (leaf)=>{
  console.log(leaf);
  try {
    const result = await instance.post('/search/get-all',{leaf})
    return result.data
  } catch (error) {
    return {}
  }
}