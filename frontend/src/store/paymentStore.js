import { create } from "zustand";
import api from "../utils/api.js";

const usePaymentStore = create((set) => ({
  loadingModal: false,
  loadingButton: false,
  loadingPaymentMethods: false,
  error: "",
  erroModal: false,
  paymentMethods: [],
  paymentMethod: {},
  

    getAllPaymentMethods: async () => {
        try {
            set({
                loadingPaymentMethods: true,
                error: "",
            })

            const res = await api.get("/api/all-payment");

            set({
                paymentMethods: res.data.data,
            })
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            })
        } finally {
            set({
                loadingPaymentMethods: false,
            });
        }
    },

    createPaymentMethod: async (data) => {
        try {
            set({
                loadingModal: true,
                loadingButton: true,
                erroModal: "",
            })
            const res = await api.post("/api/createPayment", data);

            return {
                success: true,
                message: res.data.message,
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                erroModal: message,
            })

            return {
                success: false,
                message
            }
        } finally {
            set({
                loadingButton: false,
                loadingModal: false,
            });
        }
    },

    updatePaymentMethod: async (id, data) => {
        try {
            set({
                loadingModal: true,
                loadingButton: true,
                erroModal: "",
            })
            const res = await api.put(`/api/update-payment/${id}`, data);

            return {
                success: true,
                message: res.data.message,
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                erroModal: message,
            })

            return {
                success: false,
                message,
            }
        } finally {
            set({
                loadingModal: false,
                loadingButton: false,
            })
        }
    },

    deletePaymentMethod: async (id) => {
        try {
            set({
                loadingButton: true,
                erroModal: "",
            })
            const res = await api.delete(`/api/delete-payment/${id}`);

            return {
                success: true,
                message: res.data.message,
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                errorModal: message,
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

    getPaymentMethodById: async (id) => {
        try {
            set({
                loadingModal: true,
                errorModal: "",
            })
            const res = await api.get(`/api/getPaymentById/${id}`);

            set({
                paymentMethod: res.data.data,
            });

            return {
                success: true,
                data: res.data.data,
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                errorModal: message,
            })

            return {
                success: false,
                message,
            }
        } finally {
            set({
                loadingModal: false,
            })
        }
    },
}));

export default usePaymentStore