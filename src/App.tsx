import { PrivateRoute } from "@components/private-route";
import Frontpage from "@views/frontpage";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useStateValue } from "./context";

function App() {
  const [{ auth }, dispatch]: any = useStateValue();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        dispatch({
          type: "SET_AUTH",
          payload: true,
        });
      }
    })();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>loading..</h1>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <PrivateRoute />
    </Routes>
  );
}

export default App;
