import { Link } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import "./Loading.css";
import { useEffect, useState } from "react";
import kurukuru from "../assets/loading.gif";
import OptionsButtons from "../components/OptionsButtons";

function Loading() {
  const [timedOut, setTimeoutState] = useState(false);
  useEffect(() => {
    setTimeout(() => setTimeoutState(true), 7500);
  }, []);
  return (
    <>
      <div>
        <TitleBar text="Anime Randomizer" />
      </div>

      <br />
      <img src={kurukuru} alt="Loading Anime..." className="mx-auto d-block" />

      <div>
        <OptionsButtons />
      </div>

      <div className="return">
        {timedOut && (
          <p className="text-center stuck">
            Stuck? Try broadening your search <Link to="/options">options.</Link>
          </p>
        )}
      </div>
    </>
  );
}

export default Loading;
