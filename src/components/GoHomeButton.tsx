import { Link } from "react-router-dom";

function GoHomeButton() {
  return (
    <Link to="/">
      <button type="button" className="btn btn-primary bigbutton">
        Return to Home Screen
      </button>
    </Link>
  );
}

export default GoHomeButton;
