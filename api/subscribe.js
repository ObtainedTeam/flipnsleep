export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, listId } = req.body;

  if (!email || !listId) {
    return res.status(400).json({ error: 'Email and listId required' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    if (response.ok || response.status === 204) {
      return res.status(200).json({ success: true });
    }

    const data = await response.json();
    if (data.code === 'duplicate_parameter') {
      return res.status(200).json({ success: true, duplicate: true });
    }

    return res.status(400).json({ error: data.message || 'Signup failed' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
