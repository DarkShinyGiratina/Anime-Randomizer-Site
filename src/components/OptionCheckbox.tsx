import { set, ref, remove, get } from "firebase/database";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDb } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  text: string;
  id: string;
}
function OptionCheckbox({ text, id }: Props) {
  const [isChecked, setChecked] = useState(false);
  const [user] = useAuthState(firebaseAuth);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        let userRef = ref(firebaseDb, "options/" + user.uid);
        const snapshot = await get(userRef);
        setChecked(snapshot.val()[id] !== undefined);
      }
    };
    getData();
  });

  // If we check the box, add the selection to database. If we uncheck, delete it.
  function toggleSelected() {
    if (user) {
      let boxRef = ref(firebaseDb, "options/" + user.uid + `/${id}/`);
      if (!isChecked) {
        set(boxRef, "activated");
        setChecked(true);
      } else {
        remove(boxRef);
        setChecked(false);
      }
    }
  }

  // Make a checkbox and label that are inline with each other.
  return (
    <div className="form-check form-check-inline dropdownform">
      <input type="checkbox" className="form-check-input" id={id} checked={isChecked} onChange={toggleSelected} />
      <label className="form-check-label" htmlFor={id}>
        {text}
      </label>
    </div>
  );
}

export default OptionCheckbox;
