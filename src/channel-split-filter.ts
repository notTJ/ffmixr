import {
  ChannelLayout,
  ChannelLayoutMap,
  // Channel,
  // ChannelUnion,
  ChannelLayoutUnion,
  ComplexFilter,
  FFmpeg,
} from "../../deno-fast-forward/src/mod.ts";

export class ChannelSplitFilter extends ComplexFilter {
  #layout?: ChannelLayoutUnion;
  // #channel?: Channel | ChannelUnion;
  // #channels?: Channel[] | ChannelUnion[];
  // options
  #splitAllIntoOutput: boolean = false;
  constructor() {
    super("channelsplit");
  }

  // setChannel(channel: Channel | ChannelUnion): this {
  //   this.#channel = channel;
  //   return this;
  // }

  setLayout(channelLayout: ChannelLayoutUnion | ChannelLayout): this {
    if (this.#layout) throw Error("layout already defined");
    this.#layout = channelLayout;
    return this;
  }

  audioOnly(): this {
    this.actions.push((ffmpeg: FFmpeg) => ffmpeg.noVideo().noSubtitles());
    return this;
  }

  splitAllChannelsIntoOutputs(
    channelLayout?: ChannelLayoutUnion | ChannelLayout,
  ): this {
    if (channelLayout && this.#layout) throw Error("layout already defined");
    if (!channelLayout && !this.#layout) throw Error("need layout");
    if (channelLayout) this.#layout = channelLayout;
    this.#splitAllIntoOutput = true;
    return this;
  }

  buildFilterString(): string {
    let filterString = this.filter;
    if (this.#layout) {
      filterString += `=channel_layout=${this.#layout}`;
      if (this.#splitAllIntoOutput) {
        filterString += `[${ChannelLayoutMap[this.#layout].join("][")}]`;
      }
      // else if (this.#channels)
      //   filterString += `:channels=` + this.#channels.map(channel => `${channel}[${channel}]`)
    }

    return filterString;
  }
}
