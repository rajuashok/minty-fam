
const whitelisted_emails = require('./whitelisted_emails.json');

export const isWhitelisted = (email: string) => {
    return whitelisted_emails.includes(email);
}