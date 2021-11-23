import { NextApiRequest, NextApiResponse } from 'next';
import db from './lib/db';
import withAuthenticatedEmail from './lib/middleware/auth';

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`Running a ${req.method} request on /api/user...`);
  let email = req.body.auth.email; // Authentication middleware will store email here.

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

  return res.status(404);
}

export default withAuthenticatedEmail(user);