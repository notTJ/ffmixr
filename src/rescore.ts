import { createFFmpegWithDefaultListeners } from "./default-configuration.ts";
import { eventStream } from "./event-stream.ts";
import { ChannelsplitFilter } from "./filters/channel-split/channelsplit-filter.ts";
import { Resolution } from "../../deno-fast-forward/src/mod.ts";
import { Channel } from "./filters/channel-split/channel.ts";
/*
Steps
1. trim video and track
2. extract movie's Front Channel audio from
3. use ffmpeg's amix command to combine the FC track and the music track
4. recombine new audio file + movie
the two cutting steps may be able to be run in the same promise
*/
// default config starts working dir in ./fixtures
// music track
const trackCut = createFFmpegWithDefaultListeners(false)
  .input("I Like It.flac")
  .seek("00:00:04.5")
  .to("00:01:22.0")
  .codec("ac3")
  .output("I Like It-cut.ac3");

// video
const videoCut = await createFFmpegWithDefaultListeners()
  //.cwd("./fixtures/")
  .input("Zombieland.mkv")
  .seek("00:00:05.0")
  // .end("00:06:12.0")
  .to("00:00:15.0")
  .resolution(Resolution.SD480p)
  .logLevel("error")
  .format("ac3")
  .complexFilter(
    new ChannelsplitFilter()
      .setLayout("7.1")
      .setChannels(Channel.frontCenter)
      .toString(),
  ).mappedOutputs({ filename: "zombieland-fc.ac3", identifier: "[FC]" });

await eventStream(trackCut);
await eventStream(videoCut);

// put the video + audio together
// const amix = await createFFmpegWithDefaultListeners()
//   .cwd("./fixtures")
//   .input("./I Like It-cut.ac3");
