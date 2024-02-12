import { FC, useEffect, ReactNode, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userLoggedIn: boolean = useMemo(
    () => localStorage?.user?.isAuthenticated,
    []
  );

  // useEffect(() => {
  //   if (!Boolean(userLoggedIn)) {
  //     navigate("/login", {
  //       state: {
  //         from: `${location.pathname}${location.search}`,
  //       },
  //     });
  //   } else {
  //     navigate("/");
  //   }
  // }, [userLoggedIn]);

  return <>{children}</>;

  return userLoggedIn ? <>{children}</> : null;
};
