import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";

import App from "./App";
import fallbackRender from "./utils/fallback";
import store from "./redux/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={fallbackRender}>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
