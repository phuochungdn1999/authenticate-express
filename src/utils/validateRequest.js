const z = require("zod");

const SignupSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    fullname: z
      .string({ required_error: "Fullname is required" })
      .min(8, "Fullname must be more than 8 characters")
      .max(255, "Fullname must be less than 255 characters"),
  }),
});

const SigninSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  }),
});
const RefreshSchema = z.object({
  body: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
  }),
});

module.exports = {
  SignupSchema,
  SigninSchema,
  RefreshSchema,
};
