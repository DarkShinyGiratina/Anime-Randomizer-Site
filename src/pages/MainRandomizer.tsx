import { useAuthState } from "react-firebase-hooks/auth";
import OptionsButtons from "../components/OptionsButtons";
import TitleBar from "../components/TitleBar";
import { firebaseAuth } from "../firebase";

function MainRandomizer() {
  const [user] = useAuthState(firebaseAuth);
  return (
    <>
      <div>
        <TitleBar text={user ? "Anime Randomizer" : "Please login with the button on the top right!"} />
      </div>

      <div>
        <OptionsButtons />
      </div>
    </>
  );
}

export default MainRandomizer;
