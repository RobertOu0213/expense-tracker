module.exports = {
  authenticator: (req, res, next) => {
    if (req.authenticator) {
      return next();
    }
    res.redirect("/users/login");
  },
};
