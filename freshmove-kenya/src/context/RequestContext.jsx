import { createContext, useState } from "react";

export const RequestContext = createContext();

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([]);

  const addRequest = (newRequest) => {
    setRequests((prev) => [...prev, newRequest]);
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest }}>
      {children}
    </RequestContext.Provider>
  );
}
