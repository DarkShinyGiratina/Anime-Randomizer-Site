import OptionsButtons from "../components/OptionsButtons";
import TitleBar from "../components/TitleBar";

function MainRandomizer() {
  sessionStorage.clear();
  return (
    <>
      <div>
        <TitleBar text="Anime Randomizer" />
      </div>

      <div>
        <OptionsButtons />
      </div>
    </>
  );
}

export default MainRandomizer;
