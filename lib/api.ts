import { magic } from "../magic";

/**
 * Make a GET request
 */
export async function get(path: string, auth?: boolean, token?: string) {
  if (!path) throw new Error("Must provide path to fetch");

  try {
    if (auth) {
      return await fetch(path, {
        headers: await createAuthHeaders(token)
      })
    } else {
      return await fetch(path);
    }
  } catch (e) {
    throw new Error(`Failed to make ${auth ? "authed" : ""} fetch (${path}), error: ${e}`);
  }
}

/**
 * Make a POST request
 */
export async function post(path: string, body: any, auth?: boolean, token?: string) {
  if (!path) throw new Error("Must provide path to fetch");

  try {
    if (auth) {
      return await fetch(path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: await createAuthHeaders(token)
      })
    } else {
      return await fetch(path);
    }
  } catch (e) {
    throw new Error(`Failed to make ${auth ? "authed" : ""} fetch (${path}), error: ${e}`);
  }
}

async function createAuthHeaders(token?: string) {
  try {
    token = token ? token : await magic.user.getIdToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  } catch (e) {
    throw new Error(`Failed to create auth headers, error: ${e}`)
  }
}