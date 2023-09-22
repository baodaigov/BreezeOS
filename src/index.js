import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Desktop from "./Desktop";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <Provider store={store}>
      <Desktop />
    </Provider>
  </StrictMode>
);
