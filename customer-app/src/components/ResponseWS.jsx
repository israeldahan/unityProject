import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import CustomersData from "./CustomersData";

export const ResponseWS = (params) => {
  const { requestId } = params;

  const WS_URL = `ws://localhost/ws-app`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL);

  useEffect(() => {
    sendMessage(JSON.stringify({ type: "register", requestId }));
  }, [requestId, sendMessage]);

  if (readyState !== ReadyState.OPEN) {
    return <div>Connecting to WebSocket...</div>;
  }
  if (lastMessage !== null) {
    const message = JSON.parse(lastMessage.data);
    return (
      <div>
        <h2>Response from WebSocket</h2>
        {message.data.length === 0 && <p>No data found</p>}
        {<CustomersData data={message.data} />}
      </div>
    );
  }
  return null;
};
