import React, { Suspense, useState } from "react";
import "./App.scss";
import RoomView from "./views/elements/RoowView";
import InstalationView from "./views/instalation/InstalationView";
import { ConfigContext, defaultConfigVlues } from "./context/config-context";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/home/Home";
import Navigation from "./components/ui/navigation/Navigation";

function App() {
  const [context, setContext] = useState(defaultConfigVlues);
  return (
    <div className="app">
      <Suspense fallback={""}>
        <ConfigContext.Provider value={[context, setContext]}>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/config" element={<InstalationView />} />
              <Route path="/elements" element={<RoomView />} />
            </Routes>
          </BrowserRouter>
        </ConfigContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
