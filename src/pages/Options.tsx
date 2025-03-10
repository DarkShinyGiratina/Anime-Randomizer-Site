import TitleBar from "../components/TitleBar";
import "./Options.css";
import { genres } from "../data/Genres";
import { types } from "../data/Types";
import OptionCheckbox from "../components/OptionCheckbox";
import Datefield from "../components/Datefield";
import RandomizeButton from "../components/RandomizeButton";
import Textfield from "../components/Textfield";
import ResetOptionsButton from "../components/ResetOptionsButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseDb } from "../firebase";
import { ref, set } from "firebase/database";
import GoHomeButton from "../components/GoHomeButton";
import HistoryButton from "../components/HistoryButton";
import ClearAllGenresButton from "../components/ClearAllGenresButton";

function Options() {
  const [user] = useAuthState(firebaseAuth);
  const matchModeRef = ref(firebaseDb, "options/" + user?.uid + "/Match Mode");
  const optionsSetRef = ref(firebaseDb, "options/" + user?.uid + "/optionsSet");
  set(matchModeRef, "any");
  set(optionsSetRef, true);

  return (
    <>
      <div>
        <TitleBar text={user ? "Randomizer Options" : "Please login with the button on the top right!"} />
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
                <ClearAllGenresButton />
                {genres.map((genre) => (
                  <li key={genre}>
                    {/* Make an item for each genre */}
                    <OptionCheckbox text={genre} id={`genre_${genre}`} />{" "}
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
                onChange={() => {
                  if (user) set(matchModeRef, "any");
                }}
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
                onChange={() => {
                  if (user) set(matchModeRef, "full");
                }}
              />
              <label className="form-check-label radiolabel" htmlFor="fullMatch">
                Match All Genres (Will take a long time)
              </label>
            </div>
          </div>

          {/*Date Filter*/}
          <div className="col-12 col-md-auto">
            <Datefield id="latestAirdate" helpText="Only Anime Before:" ariaLabel="Latest Airdate" />
            <Datefield id="earliestAirdate" helpText="Only Anime After:" ariaLabel="Earliest Airdate" />
          </div>
        </div>

        {/*Row 2*/}
        <div className="row top5">
          {/*Number of Episodes Filter*/}
          <div className="col-sm-12 col-md w-100">
            <Textfield id="minEpisodes" helpText="Minimum Number of Episodes:" ariaLabel="minEpisodes" />
            <Textfield id="maxEpisodes" helpText="Maximum Number of Episodes:" ariaLabel="maxEpisodes" />
          </div>

          {/*Length of Episodes Filter*/}
          <div className="col-sm-12 col-md w-100">
            <Textfield id="minLength" helpText="Minimum Length of Episodes (minutes):" ariaLabel="minLength" />
            <Textfield id="maxLength" helpText="Maximum Length of Episodes (minutes):" ariaLabel="maxLength" />
          </div>

          {/*Score Filter*/}
          <div className="col-sm-12 col-md w-100">
            <Textfield id="minScore" helpText="Minimum Score on MAL:" ariaLabel="minScore" />
            <Textfield id="maxScore" helpText="Maximum Score on MAL:" ariaLabel="maxScore" />
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
            <div className="col">
              <GoHomeButton />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-4 col">
              <HistoryButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Options;
