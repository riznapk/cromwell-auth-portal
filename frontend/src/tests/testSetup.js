// src/tests/testSetup.js
import "@testing-library/jest-dom/vitest";
import { server } from "../mocks/server";
import "@testing-library/jest-dom";
import { beforeAll, afterAll, afterEach } from "vitest";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
