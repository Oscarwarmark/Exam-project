const { OAuth2Client } = require("google-auth-library");

async function fetchUserData(access_token) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
}

async function exchangeCodeForTokens(code) {
  try {
    const redirectUrl = "http://127.0.0.1:3000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );

    const tokenResponse = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(tokenResponse.tokens);

    return oAuth2Client.credentials.access_token;
  } catch (error) {
    throw new Error("Failed to exchange code for tokens");
  }
}

async function googleAuth(req, res, next) {
  const code = req.query.code;

  try {
    const access_token = await exchangeCodeForTokens(code);
    console.log("Access Token:", access_token);
    const userData = await fetchUserData(access_token);

    // Handle retrieved user data
    console.log("User Data:", userData);

    // Respond with the retrieved user data or any relevant response
    res.redirect("http://localhost:5173/cart");
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({ error: "An error occurred during authentication" });
  }
}

module.exports = {
  googleAuth,
  fetchUserData,
  exchangeCodeForTokens,
};
