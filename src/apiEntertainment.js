const API_URL = "http://localhost:3001";

export async function registerUser(emailAddress, password, bookmarked) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailAddress,
        password: password,
        bookmarked: bookmarked,
      }),
    });
    const data = await res.json();
    if (res.status === 400) throw Error(data);
    else if (res.status === 200) {
      return data;
    }
  } catch (e) {
    throw Error(e.message);
  }
}

export async function loginUser(emailAddress, password) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailAddress,
        password: password,
      }),
    });
    const data = await res.json();
    if (res.status === 400) throw Error(data);
    else if (res.status === 200) {
      return data;
    }
  } catch (e) {
    throw Error(e.message);
  }
}

export async function bookmarkClick(emailAddress, videoID) {
  try {
    const res = await fetch(`${API_URL}/bookmark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailAddress,
        videoID: videoID,
      }),
    });
    const data = await res.json();
    if (res.status === 400) throw Error(data);
    else if (res.status === 200) {
      return data;
    }
  } catch (e) {
    throw Error(e.message);
  }
}

export async function fetchEntertaimentData() {
  try {
    const res = await fetch(`${API_URL}/`);
    const data = await res.json();

    if (res.status === 400) throw Error(data);
    else if (res.status === 200) {
      return data;
    }
  } catch (err) {
    throw Error(err.message);
  }
}
