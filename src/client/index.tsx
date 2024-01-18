import { createRoot } from "react-dom/client";
import { Root } from "./components/root/root.component";

const container = document.getElementById("root");
if (!container) {
  throw Error(
    'Cannot initialize React - DOM element with ID of "root" not found!'
  );
}

const root = createRoot(container);
root.render(<Root />);
