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
            return true // for success

        } catch (error) {
            set({
                error: error.response?.data?.message || "Something went wrong.",
            })
        } finally {
            set({
                loading: false,
            })
        }
    }

}))

export default useAuthStore;