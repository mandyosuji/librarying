  // ---- CONFIGURE THESE ----
  const FOLDER = 'photos';   // folder where your images live
  const PREFIX = 'library';      // filename prefix, e.g. img1.jpg, img2.jpg
  const EXT = 'jpg';         // file extension (jpg, png, etc.)
  const INTERVAL_MS = 3000;  // time between slides
  const MAX_CHECK = 500;     // safety limit on how high to count
  // --------------------------

  function checkImage(path) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = path;
    });
  }

  async function findImages() {
    const found = [];
    for (let i = 1; i <= MAX_CHECK; i++) {
      const path = `${FOLDER}/${PREFIX}${i}.${EXT}`;
      const exists = await checkImage(path);
      if (exists) {
        found.push(path);
      } else {
        break; // stop counting at the first missing number
      }
    }
    return found;
  }

  async function startGallery() {
    const statusEl = document.getElementById('status');
    const slide = document.getElementById('slide');

    const images = await findImages();

    if (images.length === 0) {
      statusEl.textContent = `No images found in "${FOLDER}/" matching ${PREFIX}1.${EXT}, ${PREFIX}2.${EXT}, ...`;
      return;
    }

    statusEl.remove();

    let index = 0;

    function showSlide(i) {
      setTimeout(() => {
        slide.src = images[i];
      }, 300);
    }

    showSlide(index);

    setInterval(() => {
      index = (index + 1) % images.length;
      showSlide(index);
    }, INTERVAL_MS);
  }

  startGallery();