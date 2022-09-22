import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../lib/firebase";

export const useImage = (file: File) => {
  const [url, setUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const upload = async () => {
    const date = new Date().getTime();

    const storageRef = ref(storage, `${file?.name + date}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            setUrl(downloadURL);
          })
          .catch((e) => console.log(e));
      }
    );
  };

  useEffect(() => {
    upload();
  }, [file]);

  return { url, progress };
};
