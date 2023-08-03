export const openVideo = (videoElement: HTMLVideoElement | null) => {
    if (videoElement && videoElement.requestFullscreen) {
        videoElement.requestFullscreen().then(() => {
            videoElement.setAttribute("style", "display: block");
            videoElement.addEventListener("fullscreenchange", onExitFullScreen);
        });
    }
};

const onExitFullScreen = (event: Event) => {
    const videoElement = event.target as HTMLVideoElement;
    if (!document.fullscreenElement) {
        videoElement.setAttribute("style", "display: none");
        videoElement.removeEventListener("fullscreenchange", onExitFullScreen);
    }
};