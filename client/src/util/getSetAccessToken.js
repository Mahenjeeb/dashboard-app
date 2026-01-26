function getSetAccessToken() {
  let accessToken = null;
  const setAccessToken = (token) => (accessToken = token);
  const getAccessToken = () => {
    return accessToken;
  };
  return { setAccessToken, getAccessToken };
}

export default getSetAccessToken;
