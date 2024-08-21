import axios from "axios";
import { useState, useEffect } from "react";
import { ResponseWS } from "./ResponseWS";

const Customers = () => {
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const handleGetCustomers = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_CUSTOMER_API_URL}/customers`
      );
      const getRequestId = res.data.requestId;
      setRequestId(getRequestId);
    };
    handleGetCustomers();
  }, []);

  return (
    <div>
      <h1>Customer List</h1>
      {requestId !== 0 && <p>Request ID: {requestId}</p>}
      {requestId !== 0 && <ResponseWS requestId={requestId} />}
    </div>
  );
};

export default Customers;
