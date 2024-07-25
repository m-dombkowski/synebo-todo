import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TaskProvider } from "./lib/context/Tasks.tsx";
import { MyThemeContextProvider } from "./lib/context/Theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <MyThemeContextProvider>
      <App />
    </MyThemeContextProvider>
  </TaskProvider>
);
