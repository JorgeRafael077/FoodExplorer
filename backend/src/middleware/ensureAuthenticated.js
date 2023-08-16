const ensureAuthenticatedUser = require("../middleware/ensureAuthenticatedUser");
const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticadedAdmin");

function ensureAuthenticated(request, response, next) {
  try {
    ensureAuthenticatedUser(request, response, () => {
      next();
    });
  } catch {
    ensureAuthenticatedAdmin(request, response, () => {
      next();
    });
  }
}


module.exports = ensureAuthenticated;
