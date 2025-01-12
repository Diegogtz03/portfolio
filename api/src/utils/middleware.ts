export const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === process.env.API_AUTH_TOKEN) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
