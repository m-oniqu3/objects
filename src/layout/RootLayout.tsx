import { Outlet } from "react-router";
import AuthNavigation from "../components/nav/AuthNavigation";
import DefaultNavigation from "../components/nav/DefaultNavigation";
import Welcome from "../components/Welcome";

function RootLayout() {
  const isAuth = true;

  const nav = isAuth ? <AuthNavigation /> : <DefaultNavigation />;

  return (
    <>
      <Welcome onDismiss={() => {}} />
      <div className="flex flex-col gap-8">
        {nav}
        <div className="wrapper pb-20">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
