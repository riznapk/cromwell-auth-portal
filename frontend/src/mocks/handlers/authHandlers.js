import { http, HttpResponse } from "msw";
import { loginResponse } from "../data/authMockData";

export const authHandlers = [
  http.post("http://localhost:3000/user/login", async () => {
    return HttpResponse.json(loginResponse, { status: 200 });
  }),
  http.post("http://localhost:3000/user/register", async () => {
    return HttpResponse.json({ status: 200 });
  }),
];
