import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../Navbar";
import styles from "./LoginPage.module.css";
function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/reserve");
  }, [user, loading, navigate]);
  return (
    <Fragment>
      <Navbar />
      <div className={styles.login}>
        <h1>Login with Google to Reserve a Spot!</h1>
        <button className={styles.loginBtn} onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </Fragment>
  );
}
export default Login;
