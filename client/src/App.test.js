import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// const MockApp = () => {
//     return (
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     );
// };

test("xxx", () => {
    render(<App />);

    let test = screen.getByRole("heading");
});
