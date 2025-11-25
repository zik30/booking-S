import { BackButton } from "components/backButton/BackButton";
import type { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const Layout: FC = () => {
  const { pathname } = useLocation();

  const hide = pathname === "/";
  return (
    <div>
      {!hide && <BackButton />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
