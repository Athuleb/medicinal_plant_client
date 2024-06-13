import axios from "axios";
const instance = axios.create({
    baseURL:"http://127.0.0.1:8000"
})

export const saveDetails = async (formdata)=>{
  try {
    const result = await instance.post("/search/save-leaf",formdata,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': '0kqtNwkUAFSsTDNWh6bGvlOfc6PtXnlQ9k8cThYmRXhKEH46DgMjcpU9vWpE865x',
      },
    })
    console.log(result.data);
    return result.data
  } catch (error) {
    return {status:"error",message:"Something went wrong"}
  }
}

export const update_details = async (formdata)=>{
  try {
    const result = await instance.post("/search/update-details",formdata,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': '0kqtNwkUAFSsTDNWh6bGvlOfc6PtXnlQ9k8cThYmRXhKEH46DgMjcpU9vWpE865x',
      },
    })
    console.log(result.data);
    return result.data
  } catch (error) {
    return {status:"error",message:"Something went wrong"}
  }
}

// '0kqtNwkUAFSsTDNWh6bGvlOfc6PtXnlQ9k8cThYmRXhKEH46DgMjcpU9vWpE865x'