const THE_NUM_OF_IMAGES = 3;

function generateRandomNum() {
    const number = Math.floor(Math.random()*THE_NUM_OF_IMAGES);
    return number;
}

function paintImage(imageNumber) {
    const image = new Image();
    image.src=`images/${imageNumber+1}.jpg`;
}

function init() {
    const randomNum = generateRandomNum();
    paintImage(randomNum);
}

init();