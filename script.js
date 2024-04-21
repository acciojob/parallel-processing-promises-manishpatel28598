const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

async function downloadImages(images) {
  try {
    // Create an array of Promises for each image download
    const downloadPromises = images.map(async (image) => {
      const response = await fetch(image.url);
      if (!response.ok) {
        throw new Error(`Failed to load image's URL: ${image.url}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return url;
    });

    // Download all images in parallel using Promise.all
    const imageUrls = await Promise.all(downloadPromises);

    // Display downloaded images in the output div
    output.innerHTML = imageUrls.map((url) => `<img src="${url}" alt="Image">`).join("");
  } catch (error) {
    console.error(error.message);
    output.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

btn.addEventListener("click", () => downloadImages(images));

