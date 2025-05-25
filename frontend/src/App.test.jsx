import { describe, it, expect } from "vitest";
import { render } from "./tests/testUtil";
import App from "./App";

describe("App", () => {
  it("testing the vitest", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
