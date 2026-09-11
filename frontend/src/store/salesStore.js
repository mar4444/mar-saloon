import { create } from 'zustand';
import api from '../utils/api.js'

const useSalesStore = create((set) => ({
    loading: false,
    error: "",
    errorUpdate: false,
    errorDelete: false,
    sales: [],
    loadingSales: false,
    totalPages: 1,
    sale: {},
    loadingButton: false,

    getAllSales: async (page, limit, start, end, service, barber) => {
        try {
            set({
                loading: true,
                loadingSales: true,
                error: "",
            })

            const res = await api.get("/api/all-sales", {
                params: {
                   page,
                   limit,
                   start,
                   end,
                   service,
                   barber,
                }
            });

            set({
                sales: res.data.data,
                totalPages: res.data.totalPages,
            })
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            })
        } finally {
            set({
                loading: false,
                loadingSales: false,
            });
        }
    },

    getSaleById: async (id) => {
        try {
            set({
                loading: true,
                error: "",
            })

            const res = await api.get(`/api/saleById/${id}`);

            set({
                sale: res.data.data,
            })

            return res.data.data;
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            })
        } finally {
            set({
                loading: false,
            });
        }
    },

    updateSale: async (id, data) => {
        try {
            set({
                loading: true,
                loadingButton: true,
                errorUpdate: "",
            })

            const res = await api.put(`/api/update-sale/${id}`, data);

            set({
                sale: res.data.data,
            })

        
            // return true // for success remember this is for displaying error message inside toast
            return {
                success: true,
                message: res.data.message,
            }

        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                errorUpdate: message,
            })

            // will display error when it's false!!
            return {
                success: false,
                message,
            }
        } finally {
            set({
                loadingButton: false,
                loading: false,
            });
        }

    },

    deleteSale: async (id) => {
        try {
            set({
                loadingButton: true,
                errorDelete: "",
            })
            const res = await api.delete(`/api/delete-sale/${id}`);

            return {
                success: true,
                message: res.data.message,
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                errorDelete: message,
            })

            return {
                success: false,
                message,
            }
        } finally {
            set({
                loadingButton: false,
            });
        }
    },

    createSale: async (data) => {
        try {
            set({
                loadingButton: true,
                error: "",
            })
            const res = await api.post("/api/create-sale", data);

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
                loadingButton: false,
            });
        }
    },
}));

export default useSalesStore;
