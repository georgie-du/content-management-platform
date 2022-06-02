import jwt from "jsonwebtoken";

const secret = 'test';

// authentication check middleware for protected routes
const auth = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    // ckeck if token is custom. !google
    const isCustomAuth = token.length < 500;

    let decodedToken;

    if (token && isCustomAuth) {
      decodedToken = jwt.verify(token, secret);

      req.userId = decodedToken?.id;
    } else {
      decodedToken = jwt.decode(token);
      // sub - google user's id
      req.userId = decodedToken?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;