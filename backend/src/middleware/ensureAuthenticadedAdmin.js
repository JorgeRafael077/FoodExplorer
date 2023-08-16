const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfigAdmin = require('../configs/authAdmin')

function ensureAuthenticatedAdmin(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token não informado', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, authConfigAdmin.jwt.secret)

    request.user = {
      id: Number(user_id),
    }

    return next();
  } catch {
    throw new AppError('JWT token admin inválido', 401)
  }
}

module.exports = ensureAuthenticatedAdmin;
