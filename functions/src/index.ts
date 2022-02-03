import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import User from "./user";
import {
  getCategories as GetCategories,
  addAd as AddAd,
  getAd as GetAd,
  getAds as GetAds,
} from "./postCategory";

admin.initializeApp();

export const helloWorld = functions.https.onRequest((_, response) => {
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

// Ad
export const getCategories = functions.https.onCall(GetCategories);
export const addAd = functions.https.onCall(AddAd);
export const getAd = functions.https.onCall(GetAd);
export const getAds = functions.https.onCall(GetAds);
