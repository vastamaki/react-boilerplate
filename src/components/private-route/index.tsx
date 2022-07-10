import { Outlet, Navigate } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  children?: JSX.Element;
  redirectPath: string;
}

export const PrivateRoute = ({
  isAllowed,
  children,
  redirectPath = "/login",
}: Props) => {
  if (!isAllowed) {
    return <Navigate to={{ pathname: redirectPath }} replace />;
  }

  return children ? children : <Outlet />;
};
