import { FFmpeg, ffmpeg } from "../../deno-fast-forward/src/mod.ts";

export function createFFmpegWithDefaultListeners(
  showInfo: boolean = false,
): FFmpeg {
  return ffmpeg(undefined, undefined)
    .override(true)
    .addEventListener("start", (event) => console.log("Event: %s", event.type))
    .addEventListener("info", (event) => {
      console.log("Event: %s", event.type);
      if (showInfo) console.log("Event info:\n", event.info);
    })
    .addEventListener(
      "progress",
      (event) => console.log("Event: %s", event.type, `${event.progress}%`),
    )
    .addEventListener("end", (event) => console.log("Event: %s", event.type))
    .addEventListener(
      "error",
      (error) => console.log("Error event: %s", error.error),
    );
}
