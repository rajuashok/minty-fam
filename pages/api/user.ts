import { Magic } from '@magic-sdk/admin';
import db from './lib/db';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function user(req, res) {
  console.log(`Running a ${req.method} request on /api/user...`);
  let email = ""
  try {
    const didToken = req.headers.authorization.substr(7);
    await magic.token.validate(didToken);
    const meta = await magic.users.getMetadataByToken(didToken);
    email = meta.email;
  } catch (e) {
    console.log(`Failed to authenticate token with Magic, e: `, e);
    return res.status(500).json({ error: e.message })
  }

  if (!email) {
    console.log(`Failed to capture email from auth token as email is null`);
    return res.status(500).json({ error: 'Unauthenticated request for a user.' })
  }

  switch (req.method) {
    case 'GET': {
      try {
        const user = await db.readUser(email);

        return res.status(200).json({
          user: {
            email,
            ...user
          }
        });
      } catch (error) {
        console.log("Failed to GET user, error: ", error);
        return res.status(500).json({ error: error.message });
      }
    }
    case 'POST': {
      try {
        const newUser = req.body;
        const user = await db.updateUser(email, newUser);

        return res.status(200).json({
          user: {
            email,
            ...user
          }
        });
      } catch (error) {
        console.log("Failed to POST user, error: ", error);
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
