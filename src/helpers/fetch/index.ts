import jwt from "jwt-decode";

const { REACT_APP_API_URL: API_URL } = process.env;

export const customFetch = async (path: string, params: any) => {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (accessToken && refreshToken) {
    let token = jwt(accessToken);
    if (Date.now() / 1000 > token.exp) {
      accessToken = await refreshAccessToken();
    }
  }
  const req = await fetch(`${API_URL}${path}`, {
    ...params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
  if (req.status !== 200) {
    return {
      statusCode: req.status,
    };
  }
  try {
    return await req.json();
  } catch (err) {
    console.error(err);
    return {
      statusCode: 200,
    };
  }
};

const refreshAccessToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const req = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token,
      }),
    });
    const { AccessToken, IdToken } = await req.json();

    localStorage.setItem("access_token", AccessToken);
    localStorage.setItem("id_token", IdToken);
    return AccessToken;
  } catch (err) {
    console.error("failed to refresh token", err);
    throw new Error("Failed to refresh token");
  }
};
