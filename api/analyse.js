export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Missing resumeText or jobDescription' });
  }

  if (resumeText.length < 100) {
    return res.status(400).json({ error: 'Resume text too short' });
  }

  if (jobDescription.length < 100) {
    return res.status(400).json({ error: 'Job description too short' });
  }

  const prompt = `You are an expert ATS (Applicant Tracking System) resume analyst with 15 years of recruiting experience.

Analyse the resume below against the job description and return a thorough, honest assessment.

Return ONLY a valid JSON object. No markdown. No code blocks. No explanation before or after. Just the raw JSON.

The JSON must match this exact schema:
{
  "overallScore": <number 0-100>,
  "subscores": {
    "keywords": <number 0-100>,
    "experience": <number 0-100>,
    "skills": <number 0-100>,
    "format": <number 0-100>
  },
  "presentKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "sectionRatings": {
    "summary":    { "score": <number 0-10>, "feedback": "<string>" },
    "experience": { "score": <number 0-10>, "feedback": "<string>" },
    "skills":     { "score": <number 0-10>, "feedback": "<string>" },
    "education":  { "score": <number 0-10>, "feedback": "<string>" }
  },
  "strengths": ["strength1", "strength2"],
  "rewriteSuggestions": [
    {
      "original": "<original bullet text>",
      "rewritten": "<improved version>",
      "reason": "<explanation>"
    }
  ],
  "topRecommendation": "<single most important action to take>"
}

Scoring guide:
- overallScore 90-100: Exceptional match, apply immediately
- overallScore 75-89: Strong match, minor gaps
- overallScore 50-74: Moderate match, significant gaps
- overallScore below 50: Weak match, major rework needed

Be honest and specific. Do not inflate scores. Provide exactly 3 rewriteSuggestions.

JOB DESCRIPTION:
---
${jobDescription}
---

RESUME:
---
${resumeText}
---

Return only the JSON object now.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 429) {
      return res.status(429).json({ error: 'Too many requests. Please wait 30 seconds and try again.' });
    }

    if (!response.ok) {
      const err = await response.json();
      return res.status(502).json({ error: 'Claude API error', detail: err });
    }

    const data = await response.json();
    const rawText = data.content[0].text.trim();

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          result = JSON.parse(jsonMatch[0]);
        } catch {
          return res.status(500).json({ error: 'Failed to parse Claude response' });
        }
      } else {
        return res.status(500).json({ error: 'Failed to parse Claude response' });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Analysis is taking too long. Please try again.' });
    }
    return res.status(500).json({ error: 'Internal server error', detail: error.message });
  }
}
