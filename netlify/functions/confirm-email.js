const client = require("@sendgrid/client");
var Base64 = require("crypto-js/enc-base64");
var Utf8 = require("crypto-js/enc-utf8");

client.setApiKey(import.meta.env.SENDGRID_API_KEY);
const unconfirmedListID = import.meta.env.SENDGRID_UNCONFIRMED_LIST;
const confirmedListID = import.meta.env.SENDGRID_CONFIRMED_LIST;

let request = {};

exports.handler = async (event, context, callback) => {
  const id = event.queryStringParameters.id;
  const email = decrypt(id).toLowerCase();

  let user, fetchedUserList;

  try {
    fetchedUserList = await getUserByEmail(email);
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "User not found" }),
    };
  }
  try {
    user = fetchedUserList.result[email].contact;
  } catch (error) {}

  if (user) {
    const lists = user.list_ids;
    if (lists.includes(unconfirmedListID)) {
      // user is not confirmed
      const result = await updateUserLists(user);
      if (result.statusCode === 202) {
        const deleteResult = await deleteFromUnconfirmed(user.id);

        if (deleteResult.statusCode === 202) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email address confirmed!" }),
          };
        } else {
          // found user and they weren't confirmed, but couldn't update.
          return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error updating user list" }),
          };
        }
      }
    }

    if (lists.includes(confirmedListID)) {
      return {
        statusCode: 409,
        body: JSON.stringify({
          message: "Your email is already confirmed",
          first_name: user.first_name,
        }),
      };
    }
  }

  callback(null, {
    statusCode: 200,
  });
};

const updateUserLists = async (user) => {
  request = {
    method: "PUT",
    url: `/v3/marketing/contacts`,
    body: {
      list_ids: [confirmedListID],
      contacts: [user],
    },
  };

  return client.request(request).then(([response, body]) => {
    return response;
  });
};

const deleteFromUnconfirmed = async (userId) => {
  request = {
    method: "DELETE",
    url: `/v3/marketing/lists/${unconfirmedListID}/contacts?contact_ids=${userId}`,
  };
  return client.request(request).then(([response, body]) => {
    return response;
  });
};

const getUserByEmail = async (email) => {
  if (!email) {
    return null;
  }

  request = {
    method: "POST",
    url: `/v3/marketing/contacts/search/emails`,
    body: {
      emails: [email],
    },
  };
  return await client.request(request).then(([response, body]) => {
    return response.body;
  });
};

const decrypt = (data) => {
  return Base64.parse(data).toString(Utf8);
};
