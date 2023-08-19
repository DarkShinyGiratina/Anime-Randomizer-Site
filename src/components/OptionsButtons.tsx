import ChangeOptionsButton from "./ChangeOptionsButton";
import RandomizeButton from "./RandomizeButton";
import "./OptionsButtons.css";
import HistoryButton from "./HistoryButton";

function OptionsButtons() {
  return (
    <div className="container-fluid button-container">
      <div className="row">
        <div className="col">
          <RandomizeButton text="Randomize (Stored Options)" bypass={false} />
        </div>
        <div className="col">
          <RandomizeButton text="Randomize (Default Options)" bypass={true} />
        </div>
        <div className="col">
          <ChangeOptionsButton />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-4 col">
          <HistoryButton />
        </div>
      </div>
    </div>
  );
}

export default OptionsButtons;
