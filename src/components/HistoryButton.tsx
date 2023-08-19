import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../firebase";

function HistoryButton() {
  const [user] = useAuthState(firebaseAuth);
  if (user) {
    return (
      <Link to="/history">
        <button type="button" className="btn btn-primary bigbutton">
          Your History
        </button>
      </Link>
    );
  } else {
    return (
      <button type="button" className="btn btn-primary bigbutton">
        Your History
      </button>
    );
  }
}

export default HistoryButton;
