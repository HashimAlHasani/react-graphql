import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import AddOrder from "./components/AddOrder";

export type Order = {
  id: number;
  description: string;
  totalInCents: number;
};

export type Customer = {
  id: number;
  name: string;
  industry: string;
  orders: Order[];
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
  mutation MUTATE_DATA($name: String!, $industry: String!) {
    createCustomer(name: $name, industry: $industry) {
      customer {
        id
        name
        industry
      }
    }
  }
`;

function App() {
  const [name, setName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");

  const { loading, error, data } = useQuery(GET_DATA);
  const [
    createCustomer,
    {
      loading: createCustomerLoading,
      error: createCustomerError,
      data: createCustomerData,
    },
  ] = useMutation(MUTATE_DATA, {
    refetchQueries: [{ query: GET_DATA }],
  });

  useEffect(() => {
    console.log(loading, error, data);
    console.log(
      createCustomer,
      createCustomerLoading,
      createCustomerError,
      createCustomerData
    );
  });
  return (
    <div className="App">
      <h1 className=" text-3xl text-center mr-[14.5%] font-bold">Customers:</h1>
      {error ? <p> Something went wrong </p> : null}
      {loading ? (
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
      {data
        ? data.customers.map((customer: Customer) => {
            return (
              <div key={customer.id}>
                <h2 className="text-center font-bold text-4xl">
                  {customer.name + " (" + customer.industry + ")"}
                </h2>
                {customer.orders.map((order: Order) => {
                  return (
                    <div key={order.id}>
                      <p className="text-center">
                        {order.description} ( $
                        {(order.totalInCents / 100).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        )
                      </p>
                    </div>
                  );
                })}
                <div className="flex justify-center items-center w-screen">
                  <AddOrder customerId={customer.id} />
                </div>
              </div>
            );
          })
        : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCustomer({ variables: { name: name, industry: industry } });
          if (!createCustomerError) {
            setName("");
            setIndustry("");
          }
        }}
        className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10 border border-black"
      >
        <h3 className=" text-3xl text-left mr-[10%] font-bold">
          Add A Customer:
        </h3>
        <br />
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded shadow appearance-none border-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="industry"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Industry:
          </label>
          <input
            id="industry"
            type="text"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded shadow appearance-none border-black"
          />
        </div>
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
      </form>
    </div>
  );
}

export default App;
