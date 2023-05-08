import { useNavigate } from "react-router-dom";

function ResetOptionsButton() {
  const navigate = useNavigate();
  function resetOptions() {
    sessionStorage.clear();
    navigate(0);
  }

  return (
    <button type="button" className="btn btn-primary bigbutton" onClick={resetOptions}>
      Reset Options (Refresh)
    </button>
  );
}

export default ResetOptionsButton;
