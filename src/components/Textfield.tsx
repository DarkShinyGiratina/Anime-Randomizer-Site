import { ref, get, set } from "firebase/database";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseDb } from "../firebase";

interface Props {
  id: string;
  helpText: string;
  ariaLabel: string;
}

function Textfield({ id, helpText, ariaLabel }: Props) {
  // State for the text value
  const [storedVal, setValue] = useState("");
  const [user] = useAuthState(firebaseAuth);
  useEffect(() => {
    const getData = async () => {
      if (user) {
        const userRef = ref(firebaseDb, "options/" + user?.uid);
        const snapshot = await get(userRef);
        setValue(snapshot.val()[id]);
      }
    };
    getData();
  });

  function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    set(ref(firebaseDb, "options/" + user?.uid + `/${id}/`), event.target.value);
    setValue(event.target.value);
  }

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
        defaultValue={storedVal}
        onChange={inputHandler}
      ></input>
    </div>
  );
}

export default Textfield;
