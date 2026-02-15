import { Outlet } from "react-router";
import AuthNavigation from "../components/nav/AuthNavigation";
import DefaultNavigation from "../components/nav/DefaultNavigation";

function RootLayout() {
  const isAuth = true;

  const nav = isAuth ? <AuthNavigation /> : <DefaultNavigation />;

  return (
    <>
      <div className="flex flex-col gap-8 relative">
        <div className=" top-0 left-0 w-full">
          {nav}
          {/* <Welcome onDismiss={() => {}} /> */}
        </div>

        <div className="wrapper pb-20">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
