export const openVideo = (videoElement: HTMLVideoElement | null) => {
    if (videoElement?.requestFullscreen) {
        videoElement.requestFullscreen().then(() => {
            videoElement.setAttribute("style", "display: block");
            videoElement.addEventListener("fullscreenchange", onExitFullScreen);
        });
    }
};

const onExitFullScreen = (event: Event) => {
    const videoElement = event.target as HTMLVideoElement;
    if (!document.fullscreenElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.setAttribute("style", "display: none");
        videoElement.removeEventListener("fullscreenchange", onExitFullScreen);
    }
};
