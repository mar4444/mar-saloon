import {create} from 'zustand';
import api from '../utils/api.js'

const useUserStore = create((set) => ({
    loading: false,
    error: "",

    onSubmit: async (data) => {
        try {
            set({
                loading: true,
                error: "",
            })

            const res = await api.post("/api/register", data);
            console.log(res.data);

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
            });
        }
    },

    getAllUsers: async () => {
        try {
            set({
                loading: true,
                error: "",
            })

            const res = await api.get("/api/all-users");
            console.log(res.data);
            return {
                success: true,
                data: res.data.data,
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
            });
        }
    },

    deleteUser: async (userId) => {
        try {
            set({
                loading: true,
                error: "",
            })

            const res = await api.delete(`/api/delete-user/${userId}`);
            console.log(res.data);
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
            });
        }   
        
    }

}));

export default useUserStore;