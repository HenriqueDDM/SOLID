import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./http/controller/users/routes";
import { gymsRoutes } from "./http/controller/gyms/routes";
import { checkInsRoutes } from "./http/controller/checkIns/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    //TODO Here we should log an external tool like DataDog
  }

  return reply.status(500).send({ message: "Internal server error" });
});
