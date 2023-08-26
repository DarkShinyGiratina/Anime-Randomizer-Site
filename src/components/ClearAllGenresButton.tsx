import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseDb } from "../firebase";
import { get, ref, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function ClearAllGenresButton() {
  const [user] = useAuthState(firebaseAuth);
  const navigate = useNavigate();
  const clearGenres = async () => {
    if (user) {
      const userRef = ref(firebaseDb, "options/" + user.uid);
      const userSnapshot = (await get(userRef)).val();
      const keysToRemove = [];
      for (const key of Object.keys(userSnapshot)) {
        if (key.startsWith("genre_")) {
          const keyRef = ref(firebaseDb, "options/" + user.uid + `/${key}`);
          keysToRemove.push(keyRef);
        }
      }
      for (const [i, ref] of keysToRemove.entries()) {
        if (i === keysToRemove.length - 1) {
          remove(ref).then(() => navigate(0));
        } else {
          remove(ref);
        }
      }
    }
  };
  return (
    <button className="btn btn-danger" type="button" id="clearAllGenres" onClick={clearGenres}>
      Clear all Genres
    </button>
  );
}

export default ClearAllGenresButton;
