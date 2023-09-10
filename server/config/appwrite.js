const sdk = require('node-appwrite');

// Init SDK
const client = new sdk.Client();

const storage = new sdk.Storage(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('64e86e3e11bf8bb954c6') // Your project ID
    .setKey('36e2fc3dd1ab31becef2127ebf5fdd7573140cc268d91be4148dfbdc89f33fa7cccde30a5f2f75e20c6ea6d0a9e009241808534dbf47590203ad62c4d04d24d652c486ed8339f3748f3964280b1aaf3296813a4caabb7b1bb29c762f0855be976840d62ac3d6ab98daea893efdd92a1523fe193c3aa21c7cab0313654f27b687') // Your secret API key
;

module.exports = { client, storage}
