import { useAuthContext } from "../contexts/auth/useAuth";
import Feed from "./Feed";
import Landing from "./Landing";

function Home() {
  const { user } = useAuthContext();

  const isAuth = true;

  const component = isAuth ? <Feed /> : <Landing />;
  return <>{component}</>;
}

export default Home;
