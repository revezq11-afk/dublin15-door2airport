# Dublin 15 Door2Airport

Static, mobile-responsive website ready for GitHub and Vercel.

## Deploy to Vercel

Upload every file plus the complete `assets` folder to the repository root. Keep `booking.js` beside `index.html`; `vercel.json` turns it into the booking-email function. In Vercel, use **Other** as the framework preset and leave the build command empty.

## Edit contact details

The telephone and WhatsApp number currently used is `085 812 2981` (`353858122981` internationally). Update it in `index.html` and `script.js` if needed.

## Booking email activation

Booking forms open a pre-filled WhatsApp message and send an email copy to `portrow11@gmail.com`. After the first test booking on the live website, open the activation email from FormSubmit in that Gmail inbox and click **Activate Form** once. Future booking copies will then arrive automatically.

The booking function identifies the live website to FormSubmit so that bookings submitted from the public domain are accepted correctly.
