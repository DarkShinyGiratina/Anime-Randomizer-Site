import { NavigateFunction, useNavigate } from "react-router-dom";
import { genres } from "../data/Genres";
import "./RandomizeButton.css";

function RandomizeButton() {
  let navigate = useNavigate();
  return (
    <button type="button" className="btn btn-primary bigbutton" onClick={() => getAnime(navigate)}>
      Randomize
    </button>
  );
}

const getAnime = async (navigate: NavigateFunction) => {
  // If we're already loading, the button won't do anything.
  if (window.location.pathname === "/loading") return;

  // Navigate to loading page
  navigate("/loading");

  // Get our random anime.
  let finished: boolean = false;
  let anime = null;
  while (!finished) {
    anime = await fetch("https://api.jikan.moe/v4/random/anime").then((response) => response.json());
    if (window.location.pathname !== "/loading") {
      return; // Return out if the user leaves the page, so we don't infinite loop.
    }
    if (passCheck(anime)) finished = true;
  }

  await new Promise((r) => setTimeout(r, 2500));
  // If the user navigated off in between finding an anime and the timeout, chuck the whole thing out.
  if (window.location.pathname !== "/loading") return;
  navigate("/output", { state: anime });
};

function passCheck(anime: any): boolean {
  let genrePass: boolean = genreCheck(anime);
  let datePass: boolean = dateCheck(anime);
  return genrePass && datePass;
}

function genreCheck(anime: any): boolean {
  let matchMode: string = sessionStorage.getItem("Match Mode") ?? "null";
  let genreList = anime.data.genres.map((genre: any) => genre.name);
  let themeList = anime.data.themes.map((theme: any) => theme.name);
  // Combine the two arrays
  let allGenres: string[] = [].concat(genreList, themeList);
  // Strip duplicates by turning it into a Set then back into an array
  allGenres = [...new Set(allGenres)];

  // Iterate over every key in session storage, if the key is in the overall genres list that means it's a selected genre
  let activatedGenres: string[] = [];
  for (let key of Object.keys(sessionStorage)) {
    if (genres.includes(key)) {
      activatedGenres.push(key);
    }
  }

  if (activatedGenres.length === 0) return true; // If there are no genres selected, pass the check

  if (matchMode === "full") {
    for (let genre of activatedGenres) {
      // In Full Match mode, all activated genres must be included, therefore if an activated genre isn't in all genres, this anime won't pass.
      if (!allGenres.includes(genre)) {
        console.log(genre + " not found in " + allGenres);
        return false;
      }
    }
  } else if (matchMode === "any") {
    for (let genre of activatedGenres) {
      // In Any Match mode, any activated genre must be included, therefore as soon as an activated genre is found in all genres, this anime does pass.
      if (allGenres.includes(genre)) {
        return true;
      }
    }
  } else {
    // If the match mode is malformed, just fail the check without bothering.
    return false;
  }
  // Return false if we don't match
  return false;
}

function dateCheck(anime: any): boolean {
  let latest: string = sessionStorage.getItem("latestAirdate") ?? "2400-01-01";
  let earliest: string = sessionStorage.getItem("earliestAirdate") ?? "1700-01-01";

  //Get airdate from the data, if there is no airdate make it null so it'll get rejected by the search
  let airdate = anime.data.aired.from.split("T")[0] ?? "null";
  if (airdate === "null") return false;

  return earliest < airdate && airdate < latest;
}

export default RandomizeButton;
