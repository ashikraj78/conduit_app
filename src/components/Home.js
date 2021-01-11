import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dialog from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import Articles from "./Articles";

function showModel(label, close) {
  switch (label) {
    case "login":
      return <Login close={close} />;
    case "signup":
      return <Signup close={close} />;
    default:
      return "";
  }
}

function Home({ showDialog, close, activeModel }) {
  return (
    <React.Fragment>
      <Dialog isOpen={showDialog} onDismiss={close} className="flex-1">
        <button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span arial-hidden>×</span>
        </button>
        {showModel(activeModel, close)}
      </Dialog>
      <Articles />
    </React.Fragment>
  );
}
export default Home;
