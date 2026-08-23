module.exports = async function bookingHandler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false });
  }

  let booking = request.body;
  if (typeof booking === 'string') {
    try {
      booking = JSON.parse(booking);
    } catch {
      return response.status(400).json({ ok: false });
    }
  }

  if (!booking || typeof booking !== 'object') {
    return response.status(400).json({ ok: false });
  }

  // Quietly accept honeypot submissions without sending spam to Jerry.
  if (booking._honey) {
    return response.status(200).json({ ok: true });
  }

  const requiredFields = ['name', 'phone', 'pickup', 'destination', 'date', 'time'];
  const missingField = requiredFields.some((field) => !String(booking[field] || '').trim());
  if (missingField) {
    return response.status(400).json({ ok: false });
  }

  const emailPayload = {
    _subject: 'New Door2Airport booking request',
    _template: 'table',
    _url: 'https://www.dublin15door2airporttaxi.ie/',
    Name: String(booking.name).trim(),
    Phone: String(booking.phone).trim(),
    'Pickup address': String(booking.pickup).trim(),
    'Drop-off airport': String(booking.destination).trim(),
    Date: String(booking.date).trim(),
    Time: String(booking.time).trim(),
    Passengers: String(booking.passengers || 'Not specified').trim()
  };

  try {
    const emailResponse = await fetch('https://formsubmit.co/ajax/portrow11@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    if (!emailResponse.ok) {
      return response.status(502).json({ ok: false });
    }

    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ ok: false });
  }
};
