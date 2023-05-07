import ChangeOptionsButton from "./ChangeOptionsButton";
import RandomizeButton from "./RandomizeButton";
import "./OptionsButtons.css";

function OptionsButtons() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <RandomizeButton />
        </div>
        <div className="col">
          <ChangeOptionsButton />
        </div>
      </div>
    </div>
  );
}

export default OptionsButtons;
