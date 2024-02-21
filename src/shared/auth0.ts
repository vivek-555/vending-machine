import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.AUTH0_AUDIENCE)
console.log(process.env.AUTH0_URI)

export const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_URI}/.well-known/jwks.json`
    }) as jwksRsa.GetVerificationKey,
    // Validate the audience and the issuer
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `${process.env.AUTH0_URI}/`,    //NOTE: the right slash is important here
    algorithms: ['RS256']
});

export const getManagementAPIToken = async () => {
    const url = `${process.env.AUTH0_URI}/oauth/token`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: String(process.env.AUTH0_MANAMGEMENT_API_M2M_CLIENTID),
            client_secret: String(process.env.AUTH0_MANAMGEMENT_API_M2M_SECRET),
            audience: String(process.env.AUTH0_MANAMGEMENT_API_M2M_AUDIENCE)
        })
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export const createAuth0User = async (username: string, password: string) => {
    const url = `${process.env.AUTH0_URI}/api/v2/users`;
    const { access_token } = await getManagementAPIToken();
    const options = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${access_token}` },
        body: JSON.stringify({
            email: `${username}@test.com`,  // auth0 needs the email address therefore small hack
            username,
            password,
            connection: String(process.env.AUTH0_DB_CONNECTION_NAME),
            verify_email: false,
            blocked: false,
            email_verified: true,
        })
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}