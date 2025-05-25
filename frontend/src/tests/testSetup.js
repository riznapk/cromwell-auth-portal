// src/tests/testSetup.js
import "@testing-library/jest-dom/vitest";
import { server } from "../mocks/server";
import "@testing-library/jest-dom";
import { beforeAll, afterAll, afterEach } from "vitest";
import { expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as testingLibrary from "./testUtil";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// Make them global
globalThis.expect = expect;
globalThis.vi = vi;
globalThis.render = render;
globalThis.screen = screen;
globalThis.waitFor = waitFor;
globalThis.userEvent = userEvent;

// Expose the custom render and other testing utils globally
Object.entries(testingLibrary).forEach(([key, value]) => {
  globalThis[key] = value;
});
