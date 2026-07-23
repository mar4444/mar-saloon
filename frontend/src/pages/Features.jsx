import { useState } from "react";
import Layout from "../layout/Layout";
import ServiceTable from "../services/ServiceTable";
import PaymentMethodTable from "../services/PaymentMethodTable";

const Features = () => {
  const [tab, setTab] = useState("services");

  return (
    <Layout pageTitle="Features">
      <div className="space-y-1">

        {/* Tabs */}
        <div className="flex gap-2 rounded-md p-1.5 bg-green-100 w-1/3 overflow-x-auto">
          <button
            onClick={() => setTab("services")}
            className={`px-3 py-1 w-full rounded-md whitespace-nowrap transition cursor-pointer
              ${
                tab === "services"
                  ? "text-gray-500 bg-white font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Services
          </button>

          <button
            onClick={() => setTab("payment")}
            className={`px-3 py-1 w-full rounded-md whitespace-nowrap transition cursor-pointer
              ${
                tab === "payment"
                  ? "text-gray-500 bg-white font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Payment Methods
          </button>
        </div>

        <div className="p-5">
          {tab === "services" ? (
            <ServiceTable />
          ) : (
            <PaymentMethodTable />
          )}
        </div>

      </div>
    </Layout>
  );
};

export default Features;