import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CustomSearch from "./CustomSearch";

describe("<CustomSearch /> spec", () => {
    it("should render without problems.", () => {
        const { container } = render(<CustomSearch />);
        expect(container).toBeInTheDocument();
      });
});