import { useEffect, useState } from "react";

interface Props {
  text: string;
  id: string;
}
function OptionCheckbox({ text, id }: Props) {
  const [checked, setChecked] = useState(false);

  // If we check the box, add the selection to session storage. If we uncheck, delete it.
  function toggleSelected() {
    setChecked(!checked);
  }

  useEffect(() => {
    if (checked) {
      sessionStorage.setItem(id, "activated");
    } else {
      sessionStorage.removeItem(id);
    }
  }, [checked]);

  // Make a checkbox and label that are inline with each other.
  return (
    <div className="form-check form-check-inline dropdownform">
      <input type="checkbox" className="form-check-input" id={id} checked={checked} onChange={toggleSelected} />
      <label className="form-check-label" htmlFor={id}>
        {text}
      </label>
    </div>
  );
}

export default OptionCheckbox;
