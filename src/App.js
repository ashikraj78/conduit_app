import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserContext from "./components/UserContext";
import { ROOT_URL } from "./utils/constants";

function App(props) {
  let [user, setUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  let [activeModel, setActiveModel] = useState("");
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    if (localStorage.token) {
      fetch(ROOT_URL + "user", {
        method: "GET",
        headers: { authorization: `Token ${localStorage.token}` },
      })
        .then((res) => res.json())
        .then(({ user }) => {
          setUser(user);
        })
        .catch((error) => setUser(null));
    }
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Header open={open} setActiveModel={setActiveModel} />
        <Switch>
          <Route path="/" exact>
            <Home
              showDialog={showDialog}
              close={close}
              activeModel={activeModel}
              close={close}
            />
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
