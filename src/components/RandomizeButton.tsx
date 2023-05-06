import { useLocation, useNavigate } from "react-router-dom";
import "./RandomizeButton.css";
function RandomizeButton() {
  let location = useLocation();
  let navigate = useNavigate();
  const getAnime = async () => {
    // If we're already loading, the button won't do anything.
    if (location.pathname === "/loading") return;

    // Navigate to loading page
    navigate("/loading");

    // Get our random anime.
    const anime = await fetch("https://api.jikan.moe/v4/random/anime").then(
      (response) => response.json()
    );

    await new Promise((r) => setTimeout(r, 2500));
    navigate("/output", { state: anime });
  };

  return (
    <button
      type="button"
      className="btn btn-primary bigbutton"
      onClick={getAnime}
    >
      Randomize
    </button>
  );
}

export default RandomizeButton;
