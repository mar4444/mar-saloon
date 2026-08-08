import { create } from "zustand";
import api from '../utils/api.js'

const useDashboardStore = create((set) => ({
    loading: false,
    error: "",
    totalUsersAndSales: {},
    todayReport: {},
    todayBarberReport: [],

    getTotalUsersAndSales: async () => {
        try {
            set({
                loading: true,
                error: "",
            })

            const res = await api.get("/api/getDashboard")

            set({
                totalUsersAndSales: res.data,
            })
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            })
        } finally {
            set({
                loading: false,
            })
        }
    },

    dailyReports: async (startDate, endDate) => {
        try {
            set({
                loading: true,
                error: "",
            });

            if (!startDate || !endDate) {
                const today = new Date();

                startDate = new Date(today);
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date(today);
                endDate.setHours(23, 59, 59, 999);

                startDate = startDate.toISOString();
                endDate = endDate.toISOString();
            }

            const res = await api.get("/api/report/daily-report", {
                params: {
                    startDate,
                    endDate,
                },
            });

            set({
                todayReport: res.data,
            });
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            });
        } finally {
            set({
                loading: false,
            });
        }
    },

    reportPerBarber: async (startDate, endDate) => {
        try {
            set({
                loading: true,
                error: "",
            });

            if (!startDate || !endDate) {
                const today = new Date();

                startDate = new Date(today);
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date(today);
                endDate.setHours(23, 59, 59, 999);

                startDate = startDate.toISOString();
                endDate = endDate.toISOString();
            }

            const res = await api.get("/api/report/barber", {
                params: {
                    startDate,
                    endDate,
                },
            });

            set({
                todayBarberReport: res.data.data,
            });
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";

            set({
                error: message,
            });
        } finally {
            set({
                loading: false,
            });
        }
    },
}));

export default useDashboardStore;