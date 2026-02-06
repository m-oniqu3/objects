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
      {nav}
      <Outlet />
    </>
  );
}

export default RootLayout;
