import { create } from 'zustand';
import api from '../utils/api.js'

const useAuthStore = create((set) => ({
    loading: false,
    error: "",

    onSubmit: async (data) => {
        try {
            set({
                loading: true,
                error: "",
            })

            const res = await api.post("/api/login", data);
            console.log(res.data);

            sessionStorage.setItem("boardConnect", JSON.stringify(res.data));

            // return true // for success
            return {
                success: true,
                message: res.data.message,
            }

        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            })

            return {
                success: false,
                message,
            }
        } finally {
            set({
                loading: false,
            })
        }
    }

}))

export default useAuthStore;