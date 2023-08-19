import { Link } from "react-router-dom";
import TitleBar from "../components/TitleBar";
import "./Loading.css";
import { useEffect, useState } from "react";
import kurukuru from "../assets/loading.webp";
import ChangeOptionsButton from "../components/ChangeOptionsButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";

function Loading() {
  const [timedOut, setTimeoutState] = useState(false);
  useEffect(() => {
    setTimeout(() => setTimeoutState(true), 7500);
  }, []);

  const [user] = useAuthState(firebaseAuth);
  return (
    <>
      <div>
        <TitleBar text={user ? "Anime Randomizer" : "Please login with the button on the top right!"} />
      </div>

      <br />
      <img src={kurukuru} alt="Loading Anime..." className="mx-auto d-block" />

      <div>
        <ChangeOptionsButton />
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
