import axios from "axios" 

const instance = axios.create({
    baseURL: 'https://efp-usa-server-site.vercel.app/api/v1',
    headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`                    
    }
  });

export default instance;