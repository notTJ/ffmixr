import { createFFmpegWithDefaultListeners } from './default-configuration.ts';
import { eventStream } from './event-stream.ts';
import { ChannelSplitFilter } from './channel-split-filter.ts';

/*
Steps
1. trim video and track
2. extract movie's Front Channel audio from
3. use ffmpeg's amix command to combine the FC track and the music track
4. recombine new audio file + movie
the two cutting steps may be able to be run in the same promise
*/
// music track
// const trackCut = createFFmpegWithDefaultListeners(false)
//   .input('./fixtures/I LikeIt.flac')
//   // Global encoding options (applied to all outputs).
//   // .audioBitrate("192k")
//   // .videoBitrate("1M")
//   // .noInputVideo()
//   // .inputArgs()
//   // Output 1.
//   .output('./fixtures/ILikeIt-cut.mp3')
//   .start('00:00:04.5')
//   .end('00:01:22.0')
//   .encode();
// await eventStream(trackCut);

// video
// streams: 0: film, 1: audio 7.1 truehd, 2: ac3 5.1(side),  3: steroeo, 4+ subtitles
const videoCut = await createFFmpegWithDefaultListeners()
  .input('./fixtures/Zombieland.mkv')
  .output('./fixtures/Zombieland-split.mka')
  .start('00:00:05.0')
  // .end("00:06:12.0")
  .end('00:00:15.0')
  // .resolution(Resolution.SD480p)
  .filter(new ChannelSplitFilter().setLayout('7.1').audioOnly());
// .inputAudioChannels(3)
// Start encoding.
// .encode();
await eventStream(videoCut);

/*
finding log/param info inside ffmpeg
-- ffprobe
- sections: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l157

print DOVI Metadata: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l1955
print_dynamic_hdr10_plus: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2102
print_dynamic_hdr_vivid: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2201
print_pkt_side_data: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2269
printColorRange+: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2376

show log: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2443
show packet: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2478
show subtitle: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2531
show frame: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2554

log_read_interval: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2780
read_interval_packets: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2804
read_packets: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2915

show_stream: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l2935
show_program: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l3175
show_chapters: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l3224
show_format: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l3249
show_tags: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l1937
probe_file: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l3417
print Disposition: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l3116
optionDefs: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l3953

debug? https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffmpeg.c#l3710
show pixel formats: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l3555
print section: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffprobe.c#l3910

ffmpeg opt: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffmpeg_opt.c#l1352
ffmpeg print report: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffmpeg.c#l1484
ffmpeg print final steps: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/ffmpeg.c#l1364

// print all libs info: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/opt_common.c#l185
// print codec: https://git.ffmpeg.org/gitweb/ffmpeg.git/blob/HEAD:/fftools/opt_common.c#l278
 */
