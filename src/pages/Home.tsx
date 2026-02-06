import { useAuth } from "../contexts/useAuth";
import Feed from "./Feed";
import Landing from "./Landing";

function Home() {
  const { user } = useAuth();
  console.log(user);
  const isAuth = true;

  const component = isAuth ? <Feed /> : <Landing />;
  return <>{component}</>;
}

export default Home;
