

export function saveUserId(user) {
    localStorage.setItem("user_id", user.id);
}

export function getUserId() {
  return localStorage.getItem("user_id");
}

