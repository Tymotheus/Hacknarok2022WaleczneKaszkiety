import jwtDecode from 'jwt-decode';
import moment from 'moment';

/**
 * Decode the payload behind the JWT token.
 */
export const getTokenPayload = token => jwtDecode(token);

/**
 * Return a moment object that contains the datetime when the
 * decoded jwt token expires.
 */
export const payloadExpires = payload => moment(payload.exp * 1000);

/**
 * Returns a boolean which is true when the decoded payload has expired.
 */
export const payloadHasExpired = payload => moment() > payloadExpires(payload);

/**
 * Returns a boolean which is true when the token has expired.
 */
export const tokenHasExpired = token => payloadHasExpired(jwtDecode(token));

/**
 * Returns a moment duration object with the duration until decoded token expiration.
 */
export const payloadDuration = payload => moment.duration(payloadExpires(payload).diff(moment()));

/**
 * Returns a moment duration object with the duration until decoded token expiration.
 */
export const tokenDuration = token =>
  moment.duration(payloadExpires(jwtDecode(token)).diff(moment()));