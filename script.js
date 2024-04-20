

//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

async function downloadFn(images){
  try{
    const downloadPromises = images.map(async (image)=>{
        const response = await fetch (`${image.url}`);
        if(!response.ok){
          throw new Error(`Failed to load images's URL: ${image.url}`)
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
    })

    const imageUrls = await Promise.all(downloadPromises);

    output.innerHTML = imageUrls.map((url)=>`<img src=${url} alt="Image">`).join("");
  }catch(error)
  {
    console.error(error.message);
    output.innerHTML = `<p>Error: ${error.message}</p>`;
  }

}
btn.addEventListener('click',()=>downloadFn(images));

