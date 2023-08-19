// FirebaseUI
import firebase from "firebase/compat/app";
import { ui } from "../firebase";
import "firebaseui/dist/firebaseui.css";

// React stuff
import { useEffect } from "react";
import { auth as firebaseuiAuth } from "firebaseui";

function LoginBox() {
  useEffect(() => {
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function () {
          console.log("we in there");
          return true;
        },
        uiShown: function () {
          // This is what should happen when the form is full loaded. In this example, I hide the loader element.
          document.getElementById("loader")!.style.display = "none";
        },
      },
      signInFlow: "popup",
      signInSuccessUrl: "/options", // This is where should redirect if the sign in is successful.
      signInOptions: [
        // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
        {
          provider: firebaseuiAuth.AnonymousAuthProvider.PROVIDER_ID,
          fullLabel: "Sign in as a guest (OPTIONS WILL DISAPPEAR UPON LOGOUT!)",
        },
      ],
    });
  }, []);

  return (
    <>
      <div id="firebaseui-auth-container"></div>
      <div id="loader" className="text-center">
        Loading form
      </div>
    </>
  );
}

export default LoginBox;
