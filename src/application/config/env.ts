export const env = {
  port: process.env.PORT!,
  jwtSecret: process.env.JWT_SECRET!,

  admin: {
    name: process.env.ADMIN_NAME!,
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!,
  },
}
