import passport from "passport";
import '../passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireAdminAuth = passport.authenticate('jwt-admin', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = {
  requireAuth,
  requireSignIn,
  requireAdminAuth,
}