import { NavModule } from "modules/navModule/NavModule";
import { useEffect, type FC } from "react";
import { useUser } from "shared/lib/useUser";

export const MainPage: FC = () => {
  const { user_id, setUserId } = useUser();

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user && user.id !== user_id) {
        setUserId(user.id);
      }
    }
  }, []);
  return (
    <div>
      <NavModule />
    </div>
  );
};
