import { Magic } from "@magic-sdk/admin";
import { NextApiRequest, NextApiResponse } from "next";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const withAuthenticatedEmail = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<NextApiResponse | void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const didToken = req.headers.authorization.substr(7);
      await magic.token.validate(didToken);
      const meta = await magic.users.getMetadataByToken(didToken);
      if (!meta.email) {
        throw new Error(`Didn't find an email in auth headers.`);
      }

      req.body = {
        ...req.body,
        auth: {
          email: meta.email
        }
      };
      return handler(req, res);
    } catch (e) {
      const msg = `Unauthenticated ${req.method} request to ${req.url}`;
      console.log(msg);
      return res.status(500).json({ error: msg });
    }
  }
}

export default withAuthenticatedEmail;

