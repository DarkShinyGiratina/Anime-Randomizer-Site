import { NavigateFunction, useNavigate } from "react-router-dom";
import { genres } from "../data/Genres";
import { types } from "../data/Types";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseDb } from "../firebase";
import { get, push, ref, remove } from "firebase/database";
import { User } from "firebase/auth";

interface Props {
  text: string;
  bypass: boolean;
}

function RandomizeButton({ text, bypass }: Props) {
  const [user] = useAuthState(firebaseAuth);
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-primary bigbutton"
      onClick={() => {
        if (user) getAnime(navigate, bypass, user);
      }}
    >
      {text}
    </button>
  );
}

const getAnime = async (navigate: NavigateFunction, bypass: boolean, user: User) => {
  // Navigate to loading page
  navigate("/loading");

  // Get our random anime.
  let finished = false;
  let anime = null;
  while (!finished) {
    anime = await fetch("https://api.jikan.moe/v4/random/anime").then((response) => response.json());
    console.log(anime?.data?.title);
    if (window.location.pathname !== "/loading") {
      return; // Return out if the user leaves the page, so we don't infinite loop.
    }
    if (await passCheck(anime, bypass, user)) finished = true;
  }

  await new Promise((r) => setTimeout(r, 2500));
  // If the user navigated off in between finding an anime and the timeout, chuck the whole thing out.
  if (window.location.pathname !== "/loading") return;
  // If we're logged in, save this result to database.
  if (user) {
    const historyRef = ref(firebaseDb, "history/" + user.uid);
    const snapshot = await get(historyRef);
    const val = snapshot.val();
    const hist = val ? Object.keys(val) : [];
    if (hist.length < 10) push(ref(firebaseDb, "history/" + user.uid), anime);
    else {
      remove(ref(firebaseDb, `history/${user.uid}/${hist[0]}`));
      push(ref(firebaseDb, "history/" + user.uid), anime);
    }
  }
  navigate("/output", { state: anime });
};

async function passCheck(anime: any, bypass: boolean, user: User) {
  if (bypass) return true;
  const userSnapshot = (await get(ref(firebaseDb, "options/" + user?.uid))).val();
  const genrePass: boolean = genreCheck(anime, userSnapshot);
  const datePass: boolean = dateCheck(anime, userSnapshot);
  const numPass: boolean = numCheck(anime, userSnapshot);
  const lenPass: boolean = lenCheck(anime, userSnapshot);
  const typePass: boolean = typeCheck(anime, userSnapshot);
  const scorePass: boolean = scoreCheck(anime, userSnapshot);
  return genrePass && datePass && numPass && lenPass && typePass && scorePass;
}

function genreCheck(anime: any, userSnapshot: any) {
  const matchMode: string = userSnapshot["Match Mode"] ?? "null";
  const genreList = anime.data?.genres?.map((genre: any) => genre.name);
  const themeList = anime.data?.themes?.map((theme: any) => theme.name);
  // Combine the two arrays
  let allGenres: string[] = [].concat(genreList, themeList);
  // Strip duplicates by turning it into a Set then back into an array
  allGenres = [...new Set(allGenres)];

  // Iterate over every key in the snapshot, if the key is in the overall genres list that means it's a selected genre
  const activatedGenres: string[] = [];
  for (const key of Object.keys(userSnapshot)) {
    if (!key.startsWith("genre_")) continue; // If the key isn't a genre key, skip it.
    const genreName = key.substring(6); // Get the genre name without genre_
    if (genres.includes(genreName)) {
      activatedGenres.push(genreName);
    }
  }

  if (activatedGenres.length === 0) return true; // If there are no genres selected, pass the check

  if (matchMode === "full") {
    for (const genre of activatedGenres) {
      // In Full Match mode, all activated genres must be included, therefore if an activated genre isn't in all genres, this anime won't pass.
      if (!allGenres.includes(genre)) {
        console.log(genre + " not found in " + allGenres);
        return false;
      }
    }
  } else if (matchMode === "any") {
    for (const genre of activatedGenres) {
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

function dateCheck(anime: any, userSnapshot: any): boolean {
  const latest: string = userSnapshot["latestAirdate"] ?? "2400-01-01";
  const earliest: string = userSnapshot["earliestAirdate"] ?? "1700-01-01";

  //Get airdate from the data, if there is no airdate make it null so it'll get rejected by the search
  const airdate = anime.data?.aired.from?.split("T")[0] ?? "null";
  if (!airdate) return false;
  if (airdate === "null") return false;

  return earliest <= airdate && airdate <= latest;
}

function numCheck(anime: any, userSnapshot: any): boolean {
  const episodes = anime.data?.episodes;
  if (!episodes) return false; // Fails the episode check if there aren't any episodes given.
  const minEpisodes = userSnapshot["minEpisodes"] ?? 0;
  const maxEpisodes = userSnapshot["maxEpisodes"] ?? Infinity;
  return +minEpisodes <= episodes && episodes <= +maxEpisodes;
}

function scoreCheck(anime: any, userSnapshot: any): boolean {
  const score = anime.data?.score;
  if (!score) return false; // Fails the episode check if there aren't any episodes given.
  const minScore = userSnapshot["minScore"] ?? 0;
  const maxScore = userSnapshot["maxScore"] ?? Infinity;
  return +minScore <= score && score <= +maxScore;
}

function lenCheck(anime: any, userSnapshot: any): boolean {
  const duration: string = anime.data?.duration;
  if (!duration) return false; // Fails the length check if there's no duration listed.
  const minLen = userSnapshot["minLength"] ?? 0;
  const maxLen = userSnapshot["maxLength"] ?? Infinity;

  const durationWords: string[] = duration.split(" ");
  let totalDurationMinutes = 0;

  for (let i = 0; i < durationWords.length; i++) {
    if (durationWords[i] === "sec") {
      totalDurationMinutes += +durationWords[i - 1] / 60;
    } else if (durationWords[i] === "min") {
      totalDurationMinutes += +durationWords[i - 1];
    } else if (durationWords[i] === "hr") {
      totalDurationMinutes += +durationWords[i - 1] * 60;
    }
  }

  return +minLen <= totalDurationMinutes && totalDurationMinutes <= +maxLen;
}

function typeCheck(anime: any, userSnapshot: any): boolean {
  // Iterate over every key in local storage, if the key is in the overall types list that means it's a selected type
  const activatedTypes: string[] = [];
  for (const key of Object.keys(userSnapshot)) {
    if (types.includes(key)) {
      activatedTypes.push(key);
    }
  }
  // Return whether we have the type or not (if there are no types, return true too)
  return activatedTypes.includes(anime.data?.type) || activatedTypes.length === 0;
}

export default RandomizeButton;
