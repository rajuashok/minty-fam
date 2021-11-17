import { Magic } from '@magic-sdk/admin';
import tempDb from './lib/db/temp';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function login(req, res) {
  try {
    const didToken = req.headers.authorization.substr(7);
    await magic.token.validate(didToken);
    const meta = await magic.users.getMetadataByToken(didToken);
    const email = meta.email;

    const user = tempDb.readUser(email);

    res.status(200).json({
      user: {
        email,
        ...user
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
