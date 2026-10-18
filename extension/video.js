// This self-contained function runs only in the tab the user invokes Afloat on.
export async function toggleVideo() {
  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
    return { active: false };
  }
  if (!document.pictureInPictureEnabled) {
    return { active: false, error: "Afloat — Picture-in-Picture is unavailable on this page." };
  }

  const videos = [...document.querySelectorAll("video")]
    .filter((video) => video.readyState > 0 && video.videoWidth > 0 && !video.ended)
    .sort((a, b) => Number(a.paused) - Number(b.paused) ||
      (b.getBoundingClientRect().width * b.getBoundingClientRect().height) -
      (a.getBoundingClientRect().width * a.getBoundingClientRect().height));
  const video = videos[0];
  if (!video) return { active: false, error: "Afloat — Start a YouTube video, then click again." };

  const onLeave = (event) => {
    if (!event.isTrusted) return;
    video.removeEventListener("leavepictureinpicture", onLeave);
    try { void chrome.runtime.sendMessage({ type: "AFLOAT_CLOSED" }).catch(() => {}); } catch { /* Extension was reloaded. */ }
  };
  // A synthetic event must neither change the badge nor consume the real close listener.
  video.addEventListener("leavepictureinpicture", onLeave);
  try {
    // Use the existing player. Do not reload, seek, pause, or duplicate the video.
    await video.requestPictureInPicture();
    return { active: true };
  } catch (error) {
    video.removeEventListener("leavepictureinpicture", onLeave);
    return { active: false, error: error.name === "NotAllowedError"
      ? "Afloat — Click play on the video, then click Afloat again."
      : "Afloat — This video cannot open in Picture-in-Picture." };
  }
}
