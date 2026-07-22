// Brevo-lijsten voor flip'nsleep.
// TODO: listId's vervangen zodra de lijsten in Brevo zijn aangemaakt.
const LIST_IDS = {
  newsletter: 0,
  welcome10: 0,
};

export async function subscribe(email, list) {
  const listId = LIST_IDS[list];
  if (!listId) throw new Error('Unknown list: ' + list);

  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, listId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
}
