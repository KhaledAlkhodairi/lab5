const addPhoto = document.getElementById('add-photo');
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');

function createImgElement(photoURL) {
  const imgElem = document.createElement('img');
  imgElem.src = photoURL;
  imgElem.style.transform = 'scale(1)'; // Set initial scale to 100%
  return imgElem;
}

function addPhotoToGallery(imgElem) {
  const photoGalleryDiv = document.getElementById('photo-gallery');
  photoGalleryDiv.appendChild(imgElem);
}

function addDeleteButton(imgElem) {
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', () => {
    imgElem.remove();
    deleteButton.remove();
  });
  const photoGalleryDiv = document.getElementById('photo-gallery');
  photoGalleryDiv.appendChild(deleteButton);
}

function zoomIn(imgElem) {
  const currentScale = getScale(imgElem);
  const newScale = currentScale + 0.1; // You can adjust the zoom increment
  setScale(imgElem, newScale);
}

function zoomOut(imgElem) {
  const currentScale = getScale(imgElem);
  if (currentScale > 0.1) { // Limit the minimum scale (adjust as needed)
    const newScale = currentScale - 0.1; // You can adjust the zoom decrement
    setScale(imgElem, newScale);
  }
}

function getScale(imgElem) {
  const transformValue = getComputedStyle(imgElem).transform;
  const matrix = new DOMMatrix(transformValue);
  return matrix.a; // The 'a' component represents the horizontal scaling
}

function setScale(imgElem, scale) {
  imgElem.style.transform = `scale(${scale})`;
}

addPhoto.addEventListener("click", () => {
  const photoUrl = prompt("Enter the URL of the photo:");
  if (photoUrl) {
    const imgElem = createImgElement(photoUrl);
    addPhotoToGallery(imgElem);
    const deleteButton = addDeleteButton(imgElem);
    addPhotoToGallery(deleteButton);

    // Add zoom in and out buttons for the image
    const zoomInButton = document.createElement('button');
    zoomInButton.innerText = 'Zoom In';
    zoomInButton.addEventListener('click', () => {
      zoomIn(imgElem);
    });
    addPhotoToGallery(zoomInButton);

    const zoomOutButton = document.createElement('button');
    zoomOutButton.innerText = 'Zoom Out';
    zoomOutButton.addEventListener('click', () => {
      zoomOut(imgElem);
    });
    addPhotoToGallery(zoomOutButton);
  }
});

zoomInButton.addEventListener('click', () => {
  const selectedImage = document.querySelector('#photo-gallery img');
  if (selectedImage) {
    zoomIn(selectedImage);
  }
});

zoomOutButton.addEventListener('click', () => {
  const selectedImage = document.querySelector('#photo-gallery img');
  if (selectedImage) {
    zoomOut(selectedImage);
  }
});
