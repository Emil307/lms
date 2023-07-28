export const openVideo = (src: string) => {
    const videoElement = document.createElement("video");
    videoElement.src = src;
    videoElement.controls = true;

    videoElement.onload = () => {
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        }
    };
};
