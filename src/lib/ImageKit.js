import ImageKit from "imagekit-javascript";
import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
});

function isObjectURL(url) {
  var objUrl = new URL(url);
  return objUrl.protocol === "blob:";
}

export async function uploadImages(images, callback = () => null) {
  const previousData = [];
  const individualProgress = {};
  let totalSize = 0;

  const handleProgress = (e, i) => {
    individualProgress[i] = e.loaded;
    let uploaded = Object.values(individualProgress).reduce((x, y) => x + y);
    let progress = Number((uploaded / totalSize).toFixed(4));
    callback(progress);
  };

  if (!images.length) return;

  const result = await Promise.allSettled(
    images
      .filter((s) => s)
      .map(async (image, i) => {
        if (!isObjectURL(image.url)) {
          previousData.push(image);
          return Promise.resolve(false);
        }

        // let qString = "?" + new Date().getTime();

        const authData = await axiosClient("/imagekit/auth").then((res) => res.data);

        if (!authData) return Promise.reject(`Failed to upload ${image.name}, try again.`);

        let imgData = await fetch(image.url).then((res) => res.blob());

        totalSize += imgData.size;

        const customXHR = new XMLHttpRequest();

        customXHR.upload.onprogress = (e) => handleProgress(e, i);

        return imagekit
          .upload({
            xhr: customXHR,
            file: imgData,
            fileName: image.name,
            folder: "/artworld",
            overwriteFile: true,
            useUniqueFileName: false,

            token: authData.token,
            signature: authData.signature,
            expire: authData.expire,
          })
          .then((res) => ({
            ...res,
            uid: image.uid,
            url: res.url,
            thumbnailUrl: res.thumbnailUrl,
          }))
          .catch((err) => Promise.reject(`Failed to upload ${image.name}, try again.`));
      })
  );

  const data = [];
  const error = [];

  result.forEach((res) => {
    if (!res) return;
    if (res.status === "fulfilled") {
      if (res.value) data.push(res.value);
    } else if (res.status === "rejected") error.push(res.reason);
  });

  return { data, error, previousData };
}
