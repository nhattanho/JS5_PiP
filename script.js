const videoElement = document.getElementById('video');
const button = document.getElementById('button');
const buttonFirefox = document.getElementById('buttonFirefox');
//Prompt showing all screens we are playing for selecting
async function selectMediaStream() {
    console.log('In selectMediaStream');
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (err) {
        alert('Whoops, something wrong with calling the API, try again!');
    }
    console.log('In the end of selectMediaStream');
}

button.addEventListener('click', async () => {
    if(document.pictureInPictureEnabled && !videoElement.disablePictureInPicture) {
        button.disabled = true;
        /* If we do like this, any time we click to the button, it always requests the Picture ==> not good */
        /*
        await videoElement.requestPictureInPicture();
        button.disabled = false;
        */

        /* We toggle the button, if the PictureInPicture has already existed in screen, we will exit it. And
        it's not, we will request it */
        try {
            if (videoElement !== document.pictureInPictureElement)
                await videoElement.requestPictureInPicture();
            else
                await document.exitPictureInPicture();
        } catch(error) {
            console.log(`> Argh! ${error}`);
        } finally {
            button.disabled = false;
        }
    }
    else {
        alert('Your browser currently doesn\'t support this feature. Please follow this link for helping\nhttps://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/');
    }
    // console.log('out of the selectMediaStream function');
}); 

buttonFirefox.addEventListener('click', selectMediaStream );

// //Load function
// document.addEventListener('DOMContentLoaded', selectMediaStream);