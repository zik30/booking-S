import type { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <div>
      <header>
        <Link to={"open-space"}>open</Link>
        <Link to={"silent-space"}>silent</Link>
        <Link to={"period"}>multi</Link>
        <Link to={"permanent"}>Perm</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
