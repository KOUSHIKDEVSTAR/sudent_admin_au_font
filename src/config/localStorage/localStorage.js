import * as localForage from "localforage";

// var store = localForage.createInstance({
//     name: "userAuthData"
// });

export const USER_AUTH_DATA_STORE = localForage.createInstance({
    driver      : localForage.LOCALSTORAGE, // Force WebSQL; same as using setDriver()
    name        : 'userAuthData',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'user authentication data store'
});


