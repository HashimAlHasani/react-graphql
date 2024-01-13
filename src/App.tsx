import { useEffect } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

export type Customer = {
  id: number;
  name: string;
  industry: string;
};

const GET_DATA = gql`
  {
    customers {
      id
      name
      industry
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    console.log(loading, error, data);
  });
  return (
    <div className="App">
      {error ? <p> Something went wrong </p> : null}
      {loading ? <p> Loading... </p> : null}
      {data
        ? data.customers.map((customer: Customer) => {
            return (
              <p key={customer.id}>{customer.name + " " + customer.industry}</p>
            );
          })
        : null}
    </div>
  );
}

export default App;
