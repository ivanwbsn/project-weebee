import { rest } from "msw";
import { DefaultBodyType, PathParams, RestContext, RestRequest } from "msw";

export const handlers = [
  // Login handler
  rest.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (
      req: RestRequest<DefaultBodyType, PathParams>,
      res: any,
      ctx: RestContext
    ) => {
      const { email, password } = await req.json();

      if (email === "test@example.com" && password === "password123") {
        return res(
          ctx.status(200),
          ctx.json({
            access_token: "mock_token",
            refresh_token: "mock_refresh_token",
          })
        );
      }

      return res(
        ctx.status(401),
        ctx.json({
          message: "Invalid email or password",
        })
      );
    }
  ),

  // Signup handler
  rest.post(
    "https://api.escuelajs.co/api/v1/users/",
    async (
      req: RestRequest<DefaultBodyType, PathParams>,
      res: any,
      ctx: RestContext
    ) => {
      const { email, password, name } = await req.json();

      if (email && password && name) {
        return res(
          ctx.status(201),
          ctx.json({
            id: 1,
            email,
            name,
            avatar: "https://picsum.photos/800",
          })
        );
      }

      return res(
        ctx.status(400),
        ctx.json({
          message: "Invalid user data",
        })
      );
    }
  ),
];
