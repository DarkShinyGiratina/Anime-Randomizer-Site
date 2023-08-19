import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../firebase";

function ChangeOptionsButton() {
  const [user] = useAuthState(firebaseAuth);
  if (user) {
    return (
      <Link to="/options">
        <button type="button" className="btn btn-primary bigbutton">
          Change Options
        </button>
      </Link>
    );
  } else {
    return (
      <button type="button" className="btn btn-primary bigbutton">
        Change Options
      </button>
    );
  }
}

export default ChangeOptionsButton;
