import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Desktop from "./Desktop";
import store from "./store";
import { Provider } from "react-redux";
import i18n from "./translation/i18n";
import { I18nextProvider } from "react-i18next";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Desktop />
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
