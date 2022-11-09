function protonopia() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var image = document.getElementById("img");
  ctx.drawImage(image, 0, 0);
  var imgData = ctx.getImageData(0, 0, c.width, c.height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 0;
        imgData.data[i + 1] = imgData.data[i + 1];
        imgData.data[i + 2] = imgData.data[i + 2];
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
}

function tritanopia() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var image = document.getElementById("img");
    ctx.drawImage(image, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = imgData.data[i];
        imgData.data[i + 1] = imgData.data[i + 1];
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
}

function totalcolorblind() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var image = document.getElementById("img");
    ctx.drawImage(image, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);

    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] =
            0.3 * imgData.data[i] +
            0.59 * imgData.data[i + 1] +
            0.11 * imgData.data[i + 2];
        imgData.data[i + 1] =
            0.3 * imgData.data[i] +
            0.59 * imgData.data[i + 1] +
            0.11 * imgData.data[i + 2];
        imgData.data[i + 2] =
            0.3 * imgData.data[i] +
            0.59 * imgData.data[i + 1] +
            0.11 * imgData.data[i + 2];
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
}

function endExperiment() {
    writeText("Thanks for participating!");
}
