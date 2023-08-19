import LoginButton from "./LoginButton";
import "./TitleBar.css";

interface Props {
  text: string;
}

function TitleBar({ text }: Props) {
  return (
    <div className="d-flex">
      <div className="flex-fill">
        <h1 className="text-center specialtext">
          <strong>{text}</strong>
        </h1>
      </div>
      <div>
        <LoginButton />
      </div>
    </div>
  );
}

export default TitleBar;
