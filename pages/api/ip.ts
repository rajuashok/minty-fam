import { Magic } from '@magic-sdk/admin';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function login(req, res) {
  try {
    const didToken = req.headers.authorization.substr(7);
    await magic.token.validate(didToken);

    const ip = await magic.token.getPublicAddress(didToken);
    const meta = await magic.users.getMetadataByToken(didToken);
    res.status(200).json({ ip, email: meta.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
