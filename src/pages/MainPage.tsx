import { NavModule } from "modules/navModule/NavModule";
import { useEffect, type FC } from "react";
import { useUser } from "shared/lib/useUser";

export const MainPage: FC = () => {
  const { user_id, setUserId } = useUser();

  useEffect(() => {
    // Проверяем, есть ли объект WebApp
    if (window.Telegram?.WebApp?.initDataUnsafe) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      if (user != user_id) {
        setUserId(user.id); // вот он user_id
      }
    }
  }, []);
  return (
    <div>
      <NavModule />
    </div>
  );
};
