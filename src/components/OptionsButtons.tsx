import ChangeOptionsButton from "./ChangeOptionsButton";
import RandomizeButton from "./RandomizeButton";
import "./OptionsButtons.css";

function OptionsButtons() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <RandomizeButton
            text={sessionStorage.getItem("optionsSet") ? "Randomize (Same Options)" : "Randomize (No Options Set)"}
            bypass={false}
          />
        </div>
        {sessionStorage.getItem("optionsSet") && (
          <div className="col">
            <RandomizeButton text="Randomize (Clear Options)" bypass={true} />
          </div>
        )}
        <div className="col">
          <ChangeOptionsButton />
        </div>
      </div>
    </div>
  );
}

export default OptionsButtons;
