import Cookies from "universal-cookie/es6";

const cookies = new Cookies();

export function getToken() {
  return cookies.get("TOKEN");
}

export function setToken(token) {
  return cookies.set("TOKEN", token, { path: "/" });
}

export function removeToken() {
  return cookies.remove("TOKEN");
}
