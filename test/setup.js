// test/setup.js

const fs = require("fs");
const path = require("path");

const publicKeyPath = path.join(__dirname, "../bin/keys/public.key");
const privateKeyPath = path.join(__dirname, "../bin/keys/private.key");

const publicKey = fs.readFileSync(publicKeyPath, "utf8");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

process.env.PUBLIC_KEY = publicKey;
process.env.PRIVATE_KEY = privateKey;
