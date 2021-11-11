import { Magic } from '@magic-sdk/admin';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const userMetadata = {
  'deville75@gmail.com': {
    'name': 'Ashok Raju',
    'birthYear': 1987
  }
}

export default async function login(req, res) {
  try {
    const didToken = req.headers.authorization.substr(7);
    await magic.token.validate(didToken);

    const meta = await magic.users.getMetadataByToken(didToken);
    res.status(200).json({
      email: meta.email,
      meta: meta.email in userMetadata ? userMetadata[meta.email] : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
