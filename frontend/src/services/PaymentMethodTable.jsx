import { MoreHorizontal, Plus } from "lucide-react";

const data = [
  { id: 1, name: "Cash" },
  { id: 2, name: "Mobile Money" },
];

const PaymentMethodTable = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">Payment Methods</h1>
        <p className="text-gray-400 font-semibold">2 Total Payment Methods</p>
      </div>

      <div className="">
        <button
          className="flex items-center gap-2
          bg-green-600
          hover:bg-green-700
          text-white
          rounded-md
          px-4
          py-2
          cursor-pointer"
        >
          <Plus size={18}/>
          Add Payment Method
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="bg-white min-w-[650px] max-w-[400px] border border-gray-200">
          <thead className="bg-green-50">
            <tr className="text-left text-gray-400 text-sm">
              <th className="p-3">
                Payment Name
              </th>
              <th className="text-center p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  {item.name}
                </td>
                <td className="text-center">
                  <button className="cursor-pointer">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default PaymentMethodTable;