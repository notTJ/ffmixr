// import { ffmpeg } from "https://raw.githubusercontent.com/notTJ/deno-fast-forward/rescore/mod.ts";
import { ffmpeg } from "../../deno-fast-forward/mod.ts";

/*
Steps
1. trim video and track
2. extract movie's Front Channel audio from
3. use ffmpeg's amix command to combine the FC track and the music track
4. recombine new audio file + movie
*/

// music track
await ffmpeg("../fixtures/ILikeIt.flac")
    // .binary("c:/Program Files/ffmpeg/ffmpeg.exe")
    // Global encoding options (applied to all outputs).
    // .audioBitrate("192k")
    // .videoBitrate("1M")
    .noInputVideo()
    // .inputArgs()
    // Output 1.
    .output("../fixtures/ILikeIt-cut.mp3")
    // .audioCodec("flac")
    .override(true)
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