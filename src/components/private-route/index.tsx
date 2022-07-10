import { useStateValue } from "@context/index";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ element, ...rest }: any) => {
  const [{ auth }]: any = useStateValue();

  if (auth) {
    return <Route element={element} {...rest} />;
  }

  return <Navigate to={{ pathname: "/login" }} />;
};
