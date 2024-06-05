// Import necessary functions
import {jwtDecode} from "jwt-decode";

/**
 * Extracts the user ID from a JWT token.
 *
 * @param {string} token The JWT token to decode.
 * @returns {number|null} The user ID if the token is valid, otherwise null.
 */
export const getUserIdFromToken = (token) => {
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  } catch (error) {
    return null;
  }
};

/**
 * Checks if the user is currently logged in based on the presence of a JWT token.
 *
 * @returns {boolean} True if the user is logged in, otherwise false.
 */
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

