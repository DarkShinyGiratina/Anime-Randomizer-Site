import OptionsButtons from "../components/OptionsButtons";
import TitleBar from "../components/TitleBar";
import "./Options.css";
import { genres } from "../data/Genres";
import OptionCheckbox from "../components/OptionCheckbox";
import Datefield from "../components/Datefield";
import RandomizeButton from "../components/RandomizeButton";

function Options() {
  sessionStorage.clear();
  sessionStorage.setItem("Match Mode", "any");
  return (
    <>
      <div>
        <TitleBar text="Randomizer Options" />
      </div>

      {/* Big Overall Grid*/}
      <div className="container">
        {/*Row 1*/}
        <div className="row">
          {/* Dropdown to select genres*/}
          <div className="col">
            <div className="dropdown text-center">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="optionsDropdown"
              >
                Select Genre
              </button>
              <ul className="dropdown-menu" aria-labelledby="optionsDropdown">
                {genres.map((genre) => (
                  <li key={genre}>
                    {/* Make an item for each genre */}
                    <OptionCheckbox text={genre} id={genre} />{" "}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/*Radio buttons to select match mode */}
          <div className="col-auto">
            <div className="form-check radio">
              <input
                className="form-check-input"
                type="radio"
                name="matchTypeRadio"
                id="anyMatch"
                defaultChecked={true}
                onChange={() => setMatchMode("any")}
              />
              <label className="form-check-label radiolabel" htmlFor="anyMatch">
                Any Match
              </label>
            </div>
            <div className="form-check radio">
              <input
                className="form-check-input"
                type="radio"
                name="matchTypeRadio"
                id="fullMatch"
                onChange={() => setMatchMode("full")}
              />
              <label className="form-check-label radiolabel" htmlFor="fullMatch">
                Full Match (Might take a long time)
              </label>
            </div>
          </div>

          {/*Date Filter*/}
          <div className="col">
            <Datefield
              id="latestAirdate"
              helpText="Only Anime Before:"
              ariaLabel="Latest Airdate"
              defaultValue={getLocalToday()}
            />
            <Datefield
              id="earliestAirdate"
              helpText="Only Anime After:"
              ariaLabel="Earliest Airdate"
              defaultValue="1900-01-01"
            />
          </div>
        </div>

        {/*Row 2*/}
        <div className="row">
          <div className="col">
            <p>xd</p>
          </div>
        </div>
      </div>

      <div className="bottomButton">
        <RandomizeButton />
      </div>
    </>
  );
}

// Set matching mode for genre search.
function setMatchMode(mode: string) {
  sessionStorage.setItem("Match Mode", mode);
}

// Get YYYY-MM-DD format with timezones accounted for
function getLocalToday() {
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  return new Date(Date.now() - tzoffset).toISOString().split("T")[0];
}

export default Options;
