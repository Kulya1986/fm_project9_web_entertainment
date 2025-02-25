// import { useEffect, useState } from "react";

export function checkLocalStorage(initialValue, key) {
  const storedValue = JSON.parse(localStorage.getItem(key));
  return storedValue ? storedValue : initialValue;
}
