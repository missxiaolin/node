function convertToBase64(url, outputFormat) {
  var canvas = document.createElement("CANVAS"),
    ctx = canvas.getContext("2d"),
    img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || "image/png");
    localStorage.setItem("BASE54IMGE", dataURL);
    canvas = null;
  };
  img.src = url;
}
// 非常巧妙的优化思路
