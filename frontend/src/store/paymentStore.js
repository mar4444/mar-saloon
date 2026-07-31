import { create } from "zustand";
import api from "../utils/api.js";

const usePaymentStore = create((set) => ({
  loading: false,
  error: "",
  paymentMethods: [],
  loadingPaymentMethods: false,

    getAllPaymentMethods: async () => {
        try {
            set({
                loading: true,
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
                loading: false,
                loadingPaymentMethods: false,
            });
        }
    },
}));

export default usePaymentStore