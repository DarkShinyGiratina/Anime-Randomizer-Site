import TitleBar from "../components/TitleBar";
import "./Options.css";
import { genres } from "../data/Genres";
import { types } from "../data/Types";
import OptionCheckbox from "../components/OptionCheckbox";
import Datefield from "../components/Datefield";
import RandomizeButton from "../components/RandomizeButton";
import Textfield from "../components/Textfield";
import ResetOptionsButton from "../components/ResetOptionsButton";

const defaultValues: { [key: string]: string } = {
  latestAirdate: getLocalToday(),
  earliestAirdate: "1900-01-01",
  minEpisodes: "10",
  maxEpisodes: "30",
  minLength: "20",
  maxLength: "30",
  optionsSet: "true",
  "Match Mode": "any",
};

function Options() {
  sessionStorage.setItem("Match Mode", defaultValues["Match Mode"]);
  sessionStorage.setItem("optionsSet", defaultValues.optionsSet);
  return (
    <>
      <div>
        <TitleBar text="Randomizer Options" />
      </div>

      <div>
        <p className="infotext">
          Edit your preferences for the randomizer! Be careful, the more restrictive you are, the longer it will take!
        </p>
      </div>

      {/* Big Overall Grid*/}
      <div className="container">
        {/*Row 1*/}
        <div className="row">
          {/* Dropdown to select genres*/}
          <div className="col-12 col-md-auto">
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
          <div className="col-12 col-md-auto">
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
                Match Any Genre
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
                Match All Genres (Will take a long time)
              </label>
            </div>
          </div>

          {/*Date Filter*/}
          <div className="col-12 col-md-auto">
            <Datefield
              id="latestAirdate"
              helpText="Only Anime Before:"
              ariaLabel="Latest Airdate"
              defaultValue={defaultValues.latestAirdate}
            />
            <Datefield
              id="earliestAirdate"
              helpText="Only Anime After:"
              ariaLabel="Earliest Airdate"
              defaultValue={defaultValues.earliestAirdate}
            />
          </div>
        </div>

        {/*Row 2*/}
        <div className="row top5">
          {/*Number of Episodes Filter*/}
          <div className="col-sm-12 col-md w-100">
            <Textfield
              id="minEpisodes"
              helpText="Minimum Number of Episodes:"
              ariaLabel="minEpisodes"
              defaultValue={defaultValues.minEpisodes}
            />
            <Textfield
              id="maxEpisodes"
              helpText="Maximum Number of Episodes:"
              ariaLabel="maxEpisodes"
              defaultValue={defaultValues.maxEpisodes}
            />
          </div>

          {/*Length of Episodes Filter*/}
          <div className="col-sm-12 col-md w-100">
            <Textfield
              id="minLength"
              helpText="Minimum Length of Episodes (minutes):"
              ariaLabel="minLength"
              defaultValue={defaultValues.minLength}
            />
            <Textfield
              id="maxLength"
              helpText="Maximum Length of Episodes (minutes):"
              ariaLabel="maxLength"
              defaultValue={defaultValues.maxLength}
            />
          </div>

          {/*Type Selector*/}
          <div className="col-sm-12 col-md w-100">
            <div className="dropdown text-center">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="typeDropdown"
              >
                Select Type
              </button>
              <ul className="dropdown-menu type" aria-labelledby="typeDropdown">
                {types.map((type) => (
                  <li key={type}>
                    {/* Make an item for each type */}
                    <OptionCheckbox text={type} id={type} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bottomButton">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <RandomizeButton text="Randomize" bypass={false} />
            </div>
            <div className="col">
              <ResetOptionsButton />
            </div>
          </div>
        </div>
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
