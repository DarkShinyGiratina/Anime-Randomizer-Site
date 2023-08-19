import { Link, useLocation } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import "./Output.css";
import noImage from "../assets/no-image-png-2.png";
import OptionsButtons from "../components/OptionsButtons";
import LoginButton from "../components/LoginButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";

function Output() {
  // Use Location to get the anime data pushed by the API.
  const location = useLocation();
  const [user] = useAuthState(firebaseAuth);

  // If there's no state, that means the output page was accessed without randomizing.
  if (!location.state) {
    return (
      <>
        <div>
          <TitleBar text={user ? "Anime Randomizer" : "Please login with the button on the top right!"} />
        </div>
        <div>
          <h1 className="text-center subtitle">
            No Anime found, return to <Link to="/">main.</Link>
          </h1>
        </div>
      </>
    );
  }

  // Normal Case
  const anime = location.state.data;
  return (
    <>
      <div>
        <div className="d-flex">
          <div className="flex-fill">
            <h1 className="text-center outputspecialtext">
              <strong>
                <a href={anime.url} target="_blank">
                  {anime.title}
                </a>
              </strong>
            </h1>
          </div>
          <div>
            <LoginButton />
          </div>
        </div>
        <h2 className="text-center subtitle">
          <strong>{anime.title_english}</strong>
        </h2>
      </div>

      <div className="card">
        {/* we call displayImage to get the anime's thumbnail */}
        <img src={displayImage(anime)} alt="anime thumbnail" className="card-img-top"></img>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Type: </strong>
            {anime.type}
          </li>
          <li className="list-group-item">
            <strong>Aired: </strong>
            {displayAired(anime)}
          </li>
          <li className="list-group-item">
            <strong>Episodes: </strong>
            {anime.episodes} ({anime.duration})
          </li>
          <li className="list-group-item">
            <strong>Score: </strong>
            {anime.score}
          </li>
          <li className="list-group-item">
            <strong>Rank/Popularity: </strong>
            {anime.rank} / {anime.popularity}
          </li>
          <li className="list-group-item">
            <strong>Rating: </strong>
            {anime.rating}
          </li>
          <li className="list-group-item">
            <strong>Genre: </strong>
            {displayGenre(anime)}
          </li>
          <li className="list-group-item">
            <strong>Synopsis: </strong>
            {displaySynopsis(anime)}
          </li>
        </ul>
      </div>

      <div>
        <OptionsButtons />
      </div>
    </>
  );
}

/* tries to return thumbnail from API, else returns placeholder */
function displayImage(anime: any) {
  try {
    return anime.images.jpg.image_url;
  } catch (error) {
    null;
  }

  try {
    return anime.images.webp.image_url;
  } catch (error) {
    null;
  }
  return noImage;
}

/* tries to return genres from API, else returns blank */
function displayGenre(anime: any) {
  let genreListObj = anime.genres.map((genre: any) => genre.name);
  let themeList = anime.themes.map((theme: any) => theme.name);
  // Combine the two arrays
  let allGenres: string[] = [].concat(genreListObj, themeList);
  // Strip duplicates by turning it into a Set then back into an array
  allGenres = [...new Set(allGenres)];
  var genreList = "";
  try {
    for (var i = 0; i < allGenres.length; i++)
      if (i < allGenres.length - 1) genreList += allGenres[i] + ", ";
      else genreList += allGenres[i];
    return genreList;
  } catch (error) {
    null;
  }

  return "";
}
/* tries to truncate synopsis from API. If synopsis is null, returns blank */
function displaySynopsis(anime: any) {
  try {
    //can change truncation length by changing '> 0' to '>= num' and change slice to same num
    if (anime.synopsis.length > 0) {
      return anime.synopsis;
    } else return anime.synopsis.slice(0, 1) + "...";
  } catch (error) {
    null;
  }

  return "";
}

/* tries to build aired date string from API. Else returns blank */
function displayAired(anime: any) {
  var airDate = "";
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    airDate += months[anime.aired.prop.from.month - 1];
    airDate += " " + anime.aired.prop.from.day;
    airDate += ", " + anime.aired.prop.from.year;
    //can add status ('Finished Airing', etc.)
    //airDate += ' (' + anime.status + ')'
    if (anime.aired.prop.from.month != null) return airDate;
    return "";
  } catch (error) {
    null;
  }

  return "";
}

export default Output;
