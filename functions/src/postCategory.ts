import * as admin from "firebase-admin";
import { AD } from "./const";

interface CategoryAutocomplete {
  group: string;
  title: string;
}
export async function getCategories(
  language: string
): Promise<CategoryAutocomplete[]> {
  const db = admin.firestore();
  const rtn: CategoryAutocomplete[] = [];

  const values = (await db.collection("category").get()).docs.map((value) => {
    return value.data();
  });

  for (const v of values) {
    const group = language === "en" ? v.engDesc : v.frDesc;
    for (const vv of v.subCategories) {
      rtn.push({
        group,
        title: language === "en" ? vv.engDesc : vv.frDesc,
      });
    }
  }

  return rtn;
}

interface Ad {
  id: string;
  title: string;
  price: string;
  category: string;
  description: string;
  location: string;
  postedByUserId: string;
  views: number;
  datePosted: string;
  archived: boolean;
}

export async function addAd(data: Ad): Promise<Ad> {
  try {
    const db = admin.firestore();

    const rtn = await (
      await db.collection(AD).add({
        ...data,
        datePosted: new Date().toISOString(),
      })
    ).get();

    const newAd: Ad = {
      id: rtn.id,
      title: "",
      price: "",
      category: "",
      description: "",
      location: "",
      postedByUserId: "",
      views: 0,
      datePosted: "",
      archived: false,
      ...rtn.data(),
    };

    return newAd;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAd(id: string): Promise<unknown> {
  try {
    const db = admin.firestore();

    const docRef = await db.collection(AD).doc(id).get();
    if (docRef.exists) {
      return {
        id: docRef.id,
        ...docRef.data(),
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return undefined;
}
