const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

export const jwtConstants = {
    //secret: "no utilizar en producción",
    secret: secretKey
};
