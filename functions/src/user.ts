import * as admin from "firebase-admin";
import * as _const from "./const";

export default class User {
  email: string;
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(
    email: string,
    phoneNumber: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  async register() {
    try {
      const _usrRecord = await admin.auth().createUser({
        email: this.email,
        emailVerified: false,
        phoneNumber: this.phoneNumber,
        password: this.password,
        displayName: this.firstName,
        disabled: false,
      });
      const claims = {
        admin: this.email.startsWith("peter"),
        firstName: this.firstName,
        lastName: this.lastName,
      };

      await admin.auth().setCustomUserClaims(_usrRecord.uid, claims);

      // const user = {
      //   id: _usrRecord.uid,
      //   firstName: _usrRecord.displayName,
      //   lastName: this.lastName,
      // };

      // admin.firestore().collection(_const.USER).add(user);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
