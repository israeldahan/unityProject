import axios from "axios";
import { useState } from "react";
import { ResponseWS } from "./ResponseWS";


const Customers = () => {
    const [requestId, setRequestId] = useState(0)
    const  handleCreateCustomer = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const res = await axios.post(`${import.meta.env.VITE_CUSTOMER_API_URL}/customers`, {
            username: data.get('username'),
            userid: data.get('userid'),
            price: data.get('price'),
        });

        const getRequestId = res.data.requestId;
        setRequestId(getRequestId);
    }

  return (
    <div>
      <h1>Create Customer </h1>
      <form onSubmit={handleCreateCustomer}>
        <label>username</label>
        <input type="text" name="username" /> <br />
        <label>User ID</label>
        <input type="text" name="userid" /><br />
        <label>Price</label>
        <input type="text" name="price" /><br />
        <button type="submit">Submit</button>
      </form>
      {requestId !== 0 && <p>Request ID: {requestId}</p>}
      {requestId !== 0 && <ResponseWS requestId={requestId} />}
    </div>
  );
};

export default Customers;
