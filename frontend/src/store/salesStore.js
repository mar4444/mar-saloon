import { create } from 'zustand';
import api from '../utils/api.js'

const useSalesStore = create((set) => ({
    loading: false,
    error: "",
    sales: [],
    loadingSales: false,
    totalPages: 1,

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
}));

export default useSalesStore;
