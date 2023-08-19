import { get, ref } from "firebase/database";
import OptionsButtons from "../components/OptionsButtons";
import TitleBar from "../components/TitleBar";
import { firebaseAuth, firebaseDb } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "./History.css";
import { Link } from "react-router-dom";

function History() {
  const [user] = useAuthState(firebaseAuth);
  const [hist, setHist] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      if (user) {
        let histRef = ref(firebaseDb, "history/" + user.uid);
        const snapshot = await get(histRef);
        setIsLoading(false);
        setHist(snapshot.val());
      }
    };
    getHistory();
  }, [user]);

  if (isLoading) {
    return (
      <>
        <div>
          <TitleBar text={user ? "Previously Generated Anime" : "Please login with the button on the top right!"} />
        </div>
        <strong>
          <h1 className="outputspecialtext">Loading History</h1>
        </strong>
        <div>
          <OptionsButtons />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <TitleBar text={user ? "Previously Generated Anime" : "Please login with the button on the top right!"} />
        </div>
        <div>
          <ul className="list-group">
            {Object.values(hist)
              .reverse()
              .map((anime: any) => (
                <li key={anime.data.mal_id} className="list-group-item">
                  <strong>
                    <Link to="/output" state={anime}>
                      {anime.data.title}
                    </Link>
                  </strong>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <OptionsButtons />
        </div>
      </>
    );
  }
}

export default History;
