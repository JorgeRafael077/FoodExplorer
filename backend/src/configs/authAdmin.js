module.exports = {
  jwt: {
    secret: process.env.AUTH_ADMIN_SECRET || "defaultAdmin", 
    expiresIn: "1d", 
  }
}
