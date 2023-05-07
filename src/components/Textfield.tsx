import { useState, useEffect } from "react";

interface Props {
  id: string;
  helpText: string;
  ariaLabel: string;
  defaultValue: string;
}

function Textfield({ id, helpText, ariaLabel, defaultValue }: Props) {
  // State for the text value
  const [input, setInput] = useState(defaultValue);

  useEffect(() => {
    sessionStorage.setItem(id, input);
  }, [input]);

  sessionStorage.setItem(id, defaultValue);
  return (
    <div className="input-group">
      <span className="input-group-text" id={id}>
        {helpText}
      </span>
      <input
        type="text"
        className="form-control"
        aria-label={ariaLabel}
        aria-labelledby={id}
        defaultValue={defaultValue}
        onChange={(e) => setInput(e.target.value)}
      ></input>
    </div>
  );
}

export default Textfield;
