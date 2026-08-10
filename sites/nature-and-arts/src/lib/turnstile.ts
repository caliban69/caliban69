const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstileToken(token: string, secretKey: string, remoteIp?: string) {
  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  const response = await fetch(VERIFY_URL, { method: 'POST', body });
  const result = (await response.json()) as { success: boolean };
  return result.success === true;
}
