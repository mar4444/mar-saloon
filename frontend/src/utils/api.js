import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API}`,
    withCredentials: true,
});

// api.interceptors.request.use((config) => {
//     const token = JSON.parse(sessionStorage?.getItem('boardConnect'))?.token;

//     console.log(token)
    
//     if (token)
//         config.headers.token = token;

//     return config;
// })

api.interceptors.request.use((config) => {
  try {
    const stored = sessionStorage.getItem("boardConnect");

    if (stored) {
      const { token } = JSON.parse(stored);

      if (token) {
        config.headers.token = token;
      }
    }
  } catch (err) {
    console.error("Invalid sessionStorage data:", err);
    sessionStorage.removeItem("boardConnect");
  }

  return config;
});

export default api;
