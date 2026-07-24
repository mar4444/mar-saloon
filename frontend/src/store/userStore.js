import {create} from 'zustand';
import api from '../utils/api.js'

const useUserStore = create((set) => ({
    loading: false,
    error: "",
    users: [],
    loadingUsers: false,
    totalPages: 1,

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

    getAllUsers: async (page, limit, role, search) => {
        try {
            set({
                loading: true,
                loadingUsers: true,
                error: "",
            })

            const res = await api.get("/api/allUsers", {
                params: {
                   page,
                   limit,
                   role,
                   search,
                }
            });
            set({ 
                users: res.data.data, 
                totalPages: res.data.totalPages
            })

            console.log(res.data.data);

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
                loadingUsers: false,
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