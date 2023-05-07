import { Link } from "react-router-dom";
import "./ChangeOptionsButton.css";

function ChangeOptionsButton() {
  return (
    <Link to="/options">
      <button type="button" className="btn btn-primary bigbutton">
        Change Options
      </button>
    </Link>
  );
}

export default ChangeOptionsButton;
