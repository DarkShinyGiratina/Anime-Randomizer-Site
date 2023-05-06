import "./TitleBar.css";

interface Props {
  text: string;
}

function TitleBar({ text }: Props) {
  return (
    <h1 className="text-center specialtext">
      <strong>{text}</strong>
    </h1>
  );
}

export default TitleBar;
