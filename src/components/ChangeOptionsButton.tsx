import { useNavigate } from "react-router-dom";
import "./ChangeOptionsButton.css";

function ChangeOptionsButton() {
  let navigate = useNavigate();

  const toOptions = () => {
    navigate("/options");
  };

  return (
    <button
      type="button"
      className="btn btn-primary bigbutton"
      onClick={toOptions}
    >
      Change Options
    </button>
  );
}

export default ChangeOptionsButton;
