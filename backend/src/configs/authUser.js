module.exports = {
  jwt: {
    secret: process.env.AUTH_CLIENT_SECRET ||"default", 
    expiresIn: "1d", 
  }
}
