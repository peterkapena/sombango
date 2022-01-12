import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import User from "./user";

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  functions.logger.info("Hello 344!", { structuredData: true });
  response.send("Hello from Sombango!");
});

//  User
export const userRegister = functions.https.onCall((data) =>
  new User(
    data.email,
    data.phoneNumber,
    data.password,
    data.firstName,
    data.lastName
  ).register()
);
