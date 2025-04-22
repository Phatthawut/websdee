// Vercel serverless function to verify reCAPTCHA v3 tokens
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token is required" });
    }

    // Verify the token with Google's reCAPTCHA API
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();

    // Check if verification was successful
    if (data.success) {
      // For v3, also check the score (0.0 to 1.0, where 1.0 is very likely a human)
      // Typically, 0.5 is a good threshold, but you can adjust based on your needs
      if (data.score >= 0.5) {
        return res.status(200).json({
          success: true,
          score: data.score,
          message: "reCAPTCHA verification successful",
        });
      } else {
        return res.status(400).json({
          success: false,
          score: data.score,
          message: "reCAPTCHA score too low, possible bot activity",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification failed",
        errors: data["error-codes"],
      });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during reCAPTCHA verification",
    });
  }
}
