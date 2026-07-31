import { create } from "zustand";
import api from "../utils/api.js";

const useServiceStore = create((set) => ({
  loading: false,
  error: "",
  services: [],
  loadingServices: false,

    getAllServices: async () => {
        try {
            set({
                loading: true,
                loadingServices: true,
                error: "",
            })

            const res = await api.get("/api/all-services");

            set({
                services: res.data.data,
            })
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            })
        } finally {
            set({
                loading: false,
                loadingServices: false,
            });
        }
    },
}));

export default useServiceStore;