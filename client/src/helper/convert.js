import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

export default async function ConvertToUrl(file) {
  try {
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("File uploaded successfully. URL:", url);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
