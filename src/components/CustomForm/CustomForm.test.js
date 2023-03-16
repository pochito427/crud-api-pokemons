import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CustomForm from "./CustomForm";

describe("<CustomForm /> spec", () => {
    it("should render without problems.", () => {
        const { container } = render(<CustomForm />);
        expect(container).toBeInTheDocument();
      });
});