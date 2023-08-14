let currentImageSrc = null;
let currentColorBlindness = null;
let originalImageData = null;

function showImage(src) {
  const canvas = document.getElementById('imageCanvas');
  const context = canvas.getContext('2d');
  const image = new Image();

  const thumbnails = document.getElementsByClassName('image-thumbnail');
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].style.display = 'none';
  }

  image.onload = function() {
    // Calculate the aspect ratio to maintain image proportions
    const maxWidth = 400; // You can adjust this value to control the maximum width of the scaled-down image
    const maxHeight = 300; // You can adjust this value to control the maximum height of the scaled-down image
    let width = image.width;
    let height = image.height;

    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }

    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }

    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, width, height);
    document.getElementById('canvas').style.display = 'block';
    currentImageSrc = src;
    originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
    simulateColorBlindness();
  };

  image.src = src;
}

function simulateColorBlindness() {
  if (currentImageSrc) {
    const type = currentColorBlindness || 'normal';

    const canvas = document.getElementById('imageCanvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(originalImageData, 0, 0);

    const image = new Image();
    image.onload = function() {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const simulatedData = simulateImageData(imageData, type);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.putImageData(simulatedData, 0, 0);
    };

    image.src = currentImageSrc;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const thumbnails = document.getElementsByClassName('image-thumbnail');
  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', function() {
      showImage(this.src);
      currentColorBlindness = null; // Reset the color blindness type when switching images
    });
  }

  const protonopiaBtn = document.getElementById('protonopiaBtn');
  protonopiaBtn.addEventListener('click', function() {
    currentColorBlindness = 'protonopia';
    simulateColorBlindness();
  });

  const tritanopiaBtn = document.getElementById('tritanopiaBtn');
  tritanopiaBtn.addEventListener('click', function() {
    currentColorBlindness = 'tritanopia';
    simulateColorBlindness();
  });

  const colorblindBtn = document.getElementById('colorblindBtn');
  colorblindBtn.addEventListener('click', function() {
    if (currentColorBlindness === 'colorblind') {
      currentColorBlindness = null; // Reset the color blindness type when clicking the same button
    } else {
      currentColorBlindness = 'colorblind';
    }
    simulateColorBlindness();
  });

    const imageFile = document.getElementById('imageFile');
  imageFile.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(readerEvent) {
      const img = new Image();
      img.onload = function() {
        showImage(img.src);
      };
      img.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  });
});

function simulateImageData(imageData, type) {
  const data = imageData.data;
  const length = data.length;

  for (let i = 0; i < length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    if (type === 'protonopia') {
      // Simulate protonopia (red-green color blindness)
      const grayscale = 0.2989 * red + 0.587 * green + 0.114 * blue;
      data[i] = grayscale;
      data[i + 1] = grayscale;
    } else if (type === 'tritanopia') {
      // Simulate tritanopia (blue-yellow color blindness)
      const grayscale = 0.2989 * red + 0.587 * green + 0.114 * blue;
      data[i + 2] = grayscale;
    } else if (type === 'colorblind') {
      // Simulate general color blindness
      const grayscale = 0.2989 * red + 0.587 * green + 0.114 * blue;
      data[i] = grayscale;
      data[i + 1] = grayscale;
      data[i + 2] = grayscale;
    }
  }

  return imageData;
} 
  