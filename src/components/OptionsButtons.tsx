import ChangeOptionsButton from "./ChangeOptionsButton";
import RandomizeButton from "./RandomizeButton";
import "./OptionsButtons.css";

function OptionsButtons() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <RandomizeButton text={"Randomize (Stored Options)"} bypass={false} />
        </div>
        {
          <div className="col">
            <RandomizeButton text="Randomize (Default Options)" bypass={true} />
          </div>
        }
        <div className="col">
          <ChangeOptionsButton />
        </div>
      </div>
    </div>
  );
}

export default OptionsButtons;
