import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { ResponseWS } from "./ResponseWS";

const CustomerById = () => {
  const { customerId } = useParams();
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const handleGetCustomers = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_CUSTOMER_API_URL}/customers/${customerId}` 
      );
      const getRequestId = res.data.requestId;
      setRequestId(getRequestId);
    };
    handleGetCustomers();
  }, [customerId]);

  return (
    <div>
      <h1>Customer {customerId}</h1>
      {requestId !== 0 && <p>Request ID: {requestId}</p>}
      {requestId !== 0 && <ResponseWS requestId={requestId} />}
    </div>
  );
};

export default CustomerById;
