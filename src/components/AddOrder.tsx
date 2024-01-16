import { useState } from "react";

export type AppProps = {
  customerId: number;
};

export default function AddOrder({ customerId }: AppProps) {
  const [active, setActive] = useState(false);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState<number>(NaN);

  return (
    <div>
      {active ? null : (
        <button
          onClick={() => {
            setActive(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + New Order
        </button>
      )}
      {active ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10 border border-black"
          >
            <h3 className=" text-3xl text-left mr-[10%] font-bold">
              Add A Customer:
            </h3>
            <br />
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description:
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="w-full px-3 py-2 border rounded shadow appearance-none border-black"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cost"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Cost:
              </label>
              <input
                id="cost"
                type="number"
                value={isNaN(cost) ? "" : cost}
                onChange={(e) => {
                  setCost(parseFloat(e.target.value));
                }}
                className="w-full px-3 py-2 border rounded shadow appearance-none border-black"
              />
            </div>
            {/*
            <div className="flex items-center justify-center">
              <button
                disabled={createCustomerLoading ? true : false}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Submit
              </button>
              {createCustomerError ? <p> Error Creating Customer </p> : null}
            </div>
            */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Order
            </button>
            <button
              onClick={() => {
                setActive(false);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded"
            >
              Close
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
