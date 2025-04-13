const TINYBIRD_API_KEY = process.env.NEXT_PUBLIC_TINYBIRD_API_KEY;

export async function trackUrlAnalysis(url: string, isValid: boolean) {
  if (!TINYBIRD_API_KEY) return;

  try {
    await fetch("https://api.tinybird.co/v0/events?name=url_analysis", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TINYBIRD_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        isValid,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Failed to track analytics:", error);
  }
} 