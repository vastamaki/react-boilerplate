import { PrivateRoute } from "components/private-route";
import Frontpage from "views/frontpage";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useStateValue } from "context";
import LoadingPage from "components/loading-spinner";
import Login from "views/login";

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
      setLoading(false);
    })();
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <LoadingPage />
  //   );
  // }

  return (
    <LoadingPage loading={loading}>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={<PrivateRoute redirectPath="/login" isAllowed={auth} />}
        >
          <Route path="front" element={<Frontpage />} />
        </Route>
        <Route
          path="admin"
          element={
            <PrivateRoute
              redirectPath="/home"
              isAllowed={auth && [""].includes("admin")}
            >
              <Frontpage />
            </PrivateRoute>
          }
        />
      </Routes>
    </LoadingPage>
  );
}

export default App;
