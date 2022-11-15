import { ffmpeg } from "https://deno.land/x/fast_forward@0.1.6/mod.ts";



await ffmpeg("https://www.w3schools.com/html/mov_bbb.mp4")
    // Global encoding options (applied to all outputs).
    .audioBitrate("192k")
    .videoBitrate("1M")
    .width(480)
    .height(640)
    // Output 1.
    .output("output.mp4")
    .audioCodec("aac")
    .videoCodec("libx264")
    // Output 2.
    .output("output.webm")
    .audioCodec("libvorbis")
    .videoCodec("libvpx-vp9")
    // Start encoding.
    .encode();