import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function LoginButton() {
  const navigate = useNavigate();
  function logout() {
    firebaseAuth
      .signOut()
      .then(() => {
        console.log("signed out successfully");
        navigate("/");
      })
      .catch((e) => console.log("Error: " + e));
  }
  const [user] = useAuthState(firebaseAuth);
  if (!user) {
    return (
      <Link to="/login">
        <button type="button" className="btn btn-primary">
          Login
        </button>
      </Link>
    );
  } else {
    return (
      <button type="button" className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    );
  }
}

export default LoginButton;
