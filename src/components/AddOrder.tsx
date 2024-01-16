import { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

export type AppProps = {
  customerId: number;
};

const GET_DATA = gql`
  {
    customers {
      id
      name
      industry
      orders {
        id
        description
        totalInCents
      }
    }
  }
`;

const MUTATE_DATA = gql`
  mutation MUTATE_DATA(
    $description: String!
    $totalInCents: Int!
    $customer: ID
  ) {
    createOrder(
      customer: $customer
      description: $description
      totalInCents: $totalInCents
    ) {
      order {
        id
        customer {
          id
        }
        description
        totalInCents
      }
    }
  }
`;

export default function AddOrder({ customerId }: AppProps) {
  const [active, setActive] = useState(false);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState<number>(NaN);
  const [createOrder, { loading, error, data }] = useMutation(MUTATE_DATA, {
    refetchQueries: [{ query: GET_DATA }],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setDescription("");
      setCost(NaN);
    }
  }, [data]);

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
              createOrder({
                variables: {
                  customer: customerId,
                  description: description,
                  totalInCents: cost * 100,
                },
              });
              setActive(false);
            }}
            className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10 border border-black"
          >
            <h3 className=" text-3xl text-left mr-[10%] font-bold">
              Add an Order:
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
                required
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
                required
                id="cost"
                type="number"
                value={isNaN(cost) ? "" : cost}
                onChange={(e) => {
                  setCost(parseFloat(e.target.value));
                }}
                className="w-full px-3 py-2 border rounded shadow appearance-none border-black"
              />
            </div>
            <button
              disabled={loading ? true : false}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Order
            </button>
            <button
              disabled={loading ? true : false}
              onClick={() => {
                setActive(false);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded"
            >
              Close
            </button>
            {error ? <p>Something Went Wrong</p> : null}
          </form>
        </div>
      ) : null}
    </div>
  );
}
