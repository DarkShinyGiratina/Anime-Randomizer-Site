import { ref, remove } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseDb } from "../firebase";
import { useNavigate } from "react-router-dom";

function ResetOptionsButton() {
  const [user] = useAuthState(firebaseAuth);
  const userRef = ref(firebaseDb, "options/" + user?.uid);
  const navigate = useNavigate();

  function resetOptions() {
    remove(userRef);
    navigate(0);
  }

  return (
    <button type="button" className="btn btn-primary bigbutton" onClick={resetOptions}>
      Reset Options (Refresh)
    </button>
  );
}

export default ResetOptionsButton;
