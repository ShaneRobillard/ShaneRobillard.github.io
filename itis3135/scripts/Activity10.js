function swap(imgPath, imgText) {
    var curImage = document.getElementById('current');
    curImage.src = imgPath;
    curImage.alt = imgText;
    curImage.title = imgText;
 }
