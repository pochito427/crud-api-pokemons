import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CustomModal from "./CustomModal";

describe("<CustomModal /> spec", () => {
    it("should render without problems.", () => {
        const { container } = render(<CustomModal />);
        expect(container).toBeInTheDocument();
      });
});