export function verifyAuthDataForLogin(username, password) {
  if (!username || !password) {
    return { error: true };
  } else {
    return {
      username: username.trim(),
      password: password.trim(),
      error: false,
    };
  }
}
