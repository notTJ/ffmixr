import {EncodingInfoEvent, EncodingProgressEvent, FFmpeg, ffmpeg} from "../../deno-fast-forward/mod.ts";

export function createFFmpegWithDefaultListeners(): FFmpeg {
        return ffmpeg(undefined, undefined)
                .override(true)
                .addEventListener("start", (event) => console.log("Event: %s", event.type))
                .addEventListener("info", (event) => console.log("Event: %s", event.type))
                .addEventListener("progress", (event) => console.log("Event: %s", event.type, `${event.progress}%`),)
                .addEventListener("end", (event) => console.log("Event: %s", event.type))
                .addEventListener("error", (error) => console.log("Error event: %s", error.error));
}