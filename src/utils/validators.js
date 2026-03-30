export function validateJobDescription(text) {
  if (!text || text.trim().length < 100) {
    return { valid: false, error: 'Job description must be at least 100 characters.' };
  }
  if (text.length > 8000) {
    return { valid: false, error: 'Job description must be under 8,000 characters.' };
  }
  return { valid: true, error: null };
}

export function validateResumeText(text) {
  if (!text || text.trim().length < 100) {
    return { valid: false, error: 'Resume text must be at least 100 characters.' };
  }
  if (text.length > 12000) {
    return { valid: false, error: 'Resume text must be under 12,000 characters.' };
  }
  return { valid: true, error: null };
}
