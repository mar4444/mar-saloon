import { create } from "zustand";
import api from "../utils/api.js";

const useServiceStore = create((set) => ({
  loadingButton: false,
  error: "",
  services: [],
  loadingServices: false,

    getAllServices: async () => {
        try {
            set({
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
                loadingServices: false,
            });
        }
    },

    addService: async (data) => {
        try {
            set({
                loadingButton: true,
                error: "",
            })

            const res = await api.post("/api/createService", data);

            return {
                success: true,
                message: res.data.message,
            }

        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            })
        } finally {
            set({
                loadingButton: false,
            })
        }
    },

    updateService: async (id, data) => {
        try {
            set({
                loadingButton: true,
                error: "",
            })
            const res = await api.put(`/api/update-service/${id}`, data);

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
            })
        }
    },

    deleteService: async (id) => {
        try {
            set({
                loadingButton: true,
                error: "",
            })
            const res = await api.delete(`/api/delete-service/${id}`);
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
            })
        }
    },
}));

export default useServiceStore;