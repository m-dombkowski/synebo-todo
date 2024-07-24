import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TaskProvider } from "./lib/context/Tasks.tsx";
import AnimationWrapper from "./components/AnimationWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TaskProvider>
      <AnimationWrapper>
        <App />
      </AnimationWrapper>
    </TaskProvider>
  </React.StrictMode>
);
