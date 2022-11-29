import {ComplexFilter} from "../complex-filter.ts";
import {ChannelLayout, ChannelLayoutUnion} from "./channel-layout.ts";
import {Channel, ChannelUnion } from "./channel.ts";

export class ChannelSplitFilter extends ComplexFilter {
  #layout?: ChannelLayoutUnion;
  #channels?: (Channel | ChannelUnion)[];
  #splitAllIntoOutput: boolean = false;
  constructor() {
    super("channelsplit");
  }

  setLayout(channelLayout: ChannelLayoutUnion | ChannelLayout): this {
    if (this.#layout) throw Error("layout already defined");
    this.#layout = channelLayout;
    return this;
  }

  setChannels(channels: (Channel | ChannelUnion)[]): this {
    this.#channels = channels
    return this;
  }

  // set the filter string and output map
  build(): string {
    if (!this.#layout) throw Error("channelsplit filter: no layout defined");
    if (!this.#channels) throw Error("channelsplit filter: no layout defined");
    return `channelsplit=channel_layout=${this.#layout}[${this.#channels.join("][")}]`;
  }
}
