export function getIsLoggedInClient() {
  const hasToken = document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith("authToken="));

  return hasToken;
}
