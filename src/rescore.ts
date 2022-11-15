// import { ffmpeg } from "https://raw.githubusercontent.com/notTJ/deno-fast-forward/rescore/mod.ts";
import { ffmpeg } from "../../deno-fast-forward/mod.ts";

/*
Steps
1. trim video and track
2. extract movie's Front Channel audio from
3. use ffmpeg's amix command to combine the FC track and the music track
4. recombine new audio file + movie
the two cutting steps may be able to be run in the same promise
*/

// music track
const trackCut = await ffmpeg("../fixtures/ILikeIt.flac")
    // .binary("c:/Program Files/ffmpeg/ffmpeg.exe")
    // Global encoding options (applied to all outputs).
    // .audioBitrate("192k")
    // .videoBitrate("1M")
    .noInputVideo()
    // .inputArgs()
    // Output 1.
    .output("../fixtures/ILikeIt-cut.mp3")
    .start("00:00:04.5")
    .end("00:01:22.0")
    // .audioCodec("flac")
    .override(true)
    .addEventListener("start", (event) => console.log("Event: %s", event.type))
    .addEventListener("info", (event) => console.log("Event: %s", event.type))
    .addEventListener(
        "progress",
        (event) => console.log("Event: %s", event.type, `${event.progress}%`),
    )
    .addEventListener("end", (event) => console.log("Event: %s", event.type))
    .addEventListener(
        "error",
        (error) => console.log("Error event: %s", error.error),
    )
    // Start encoding.
    .encode();

// video
const videoCut = await ffmpeg("../fixtures/Zombieland.mkv")
    .output("../fixtures/Zombieland-cut.mkv")
    .start("00:04:54.0")
    .end("00:06:12.0")
    .override(true)
    .addEventListener("start", (event) => console.log("Event: %s", event.type))
    .addEventListener("info", (event) => console.log("Event: %s", event.type))
    .addEventListener(
        "progress",
        (event) => console.log("Event: %s", event.type, `${event.progress}%`),
    )
    .addEventListener("end", (event) => console.log("Event: %s", event.type))
    .addEventListener(
        "error",
        (error) => console.log("Error event: %s", error.error),
    )
    // Start encoding.
    .encode();


const rescoreConfig: any = {
    movie: {
        name: "",
        start: "",
        end: ""
    },
    track: {
        name: "",
        start: "",
        end: ""
    }
};