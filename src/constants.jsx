import axios from "axios";
const requestInstance = axios.create({
    baseURL:"http://127.0.0.1:8000"
})
// requestInstance.defaults.headers.common['X-CSRFToken'] = '0kqtNwkUAFSsTDNWh6bGvlOfc6PtXnlQ9k8cThYmRXhKEH46DgMjcpU9vWpE865x';
// requestInstance.defaults.headers.post['Content-Type'] = 'application/json';
export const  instance = requestInstance