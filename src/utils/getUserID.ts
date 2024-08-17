export function getUserID(): string {
  const localStorageKey = "user_id";
  let userId = localStorage.getItem(localStorageKey);

  if (!userId) {
    userId = generateNewId();
    localStorage.setItem(localStorageKey, userId);
  }

  return userId;
}

function generateNewId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
