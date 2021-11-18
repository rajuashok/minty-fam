import { Magic } from '@magic-sdk/admin';
import jsonDB from './lib/db/json';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function user(req, res) {
  let email = ""
  try {
    const didToken = req.headers.authorization.substr(7);
    await magic.token.validate(didToken);
    const meta = await magic.users.getMetadataByToken(didToken);
    email = meta.email;
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }

  if (!email) {
    return res.status(500).json({ error: 'Unauthenticated request for a user.' })
  }

  switch (req.method) {
    case 'GET': {
      try {
        const user = jsonDB.readUser(email);
    
        return res.status(200).json({
          user: {
            email,
            ...user
          }
        });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    case 'POST': {
      console.log("POST user update", req.body);
      console.log("POST user update", req.body);
      try {
        const newUser = req.body;
        console.log(newUser);
        const user = jsonDB.updateUser(email, newUser);

        console.log("Updated user: ", user);
        return res.status(200).json({
          user: {
            email,
            ...user
          }
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
