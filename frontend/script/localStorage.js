export class localStorageFunc {
  get(key) {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : data;
    } catch (e) {
      return data;
    }
  }
  set(key, value) {
    localStorage.setItem(
      key,
      typeof value === "object" ? JSON.stringify(value) : value
    );
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}
