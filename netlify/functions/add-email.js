var Base64 = require("crypto-js/enc-base64");
var Utf8 = require("crypto-js/enc-utf8");
const client = require("@sendgrid/client");
const sgMail = require("@sendgrid/mail");

const apiKey = import.meta.env.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY;
const unconfirmedListID =
  import.meta.env.SENDGRID_UNCONFIRMED_LIST ||
  process.env.SENDGRID_UNCONFIRMED_LIST;

client.setApiKey(apiKey);
sgMail.setApiKey(apiKey);

let request = {};

exports.handler = async (event, context, callback) => {
  // Get request body
  const { email, fname, honeypot, confetti } = JSON.parse(event.body);

  // Make sure Honeypot not filled
  if (honeypot.length) {
    // Resolve error
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "Honeypot filled in",
      }),
    };
  }
  // Check for email (Required)
  if (email.length < 4) {
    // Resolve error
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "Invalid Email",
      }),
    };
  }

  // POST to SG in unconfirmed list
  const job = await addUser({ email, fname });

  // Send confirmation email
  const sendEmail = await sendConfirmationEmail({ email, fname, confetti });
  if (sendEmail.statusCode === 202) {
    // Resolve success
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Success",
      }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: "Unknown error",
    }),
  };
};

const addUser = async ({ email, fname }) => {
  let user = {};

  user.email = email;

  if (fname.length) {
    user.first_name = fname;
  }

  request = {
    method: "PUT",
    url: `/v3/marketing/contacts`,
    body: {
      list_ids: [unconfirmedListID],
      contacts: [user],
    },
  };

  return client.request(request).then(([response, body]) => {
    return response.body;
  });
};

const sendConfirmationEmail = async ({ email, fname, confetti }) => {
  const decoration = confetti !== "none" ? confetti : "";
  const id = encrypt(email);
  const url = `https://happyclicks.dev/confirm-email?id=${id}`;
  // const url = `http://localhost:8888/confirm-email?id=${id}`;
  const msg = {
    to: email,
    from: { email: "alex@happyclicks.dev", name: "Alex from Happy Clicks" },
    subject: `${decoration}Confirm your email${decoration}`,
    text: `Hi${
      fname.length ? " " + fname : ""
    }, thanks for signing up for Happy Clicks! Please confirm your email by clicking the link below: ${url}`,
    html: `<p>Hi${
      fname.length ? " " + fname : ""
    }, thanks for signing up for Happy Clicks!</p>
    <p>Please confirm your email by clicking the link below:</p>
    <p><a href="${url}">Confirm Email</a></p>`,
  };

  return await sgMail.send(msg).then(([response, body]) => {
    return response;
  });
};

const encrypt = (text) => {
  return Base64.stringify(Utf8.parse(text));
};
