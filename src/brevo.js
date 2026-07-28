// Brevo-lijsten voor flip'nsleep.
// Lijst-IDs uit het Brevo-account (aangemaakt 28 juli 2026).
const LIST_IDS = {
  newsletter: 4, // flipnsleep newsletter
  welcome10: 5,  // flipnsleep welcome10 — automation stuurt WELCOME10 (10%)
  quiz15: 6,     // flipnsleep quiz15 — automation stuurt QUIZ15 (15%)
};

export async function subscribe(email, list, attributes) {
  const listId = LIST_IDS[list];
  if (!listId) throw new Error('Unknown list: ' + list);

  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, listId, ...(attributes ? { attributes } : {}) }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
}
