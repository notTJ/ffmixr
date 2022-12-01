import { AbstractComplexFilter } from "../abstract-complex-filter.ts";
import { ChannelLayout, ChannelLayoutUnion } from "./channel-layout.ts";
import { Channel, ChannelUnion } from "./channel.ts";
import { ChannelsplitFilterOptions } from "./channelsplit-filter-options.ts";
import { ChannelLayoutMap } from "./channel-layout-map.ts";

export class ChannelsplitFilter
  extends AbstractComplexFilter<ChannelsplitFilterOptions> {
  // not supporting  non-specified channel names yet
  #channelLayout?: ChannelLayoutUnion;
  #channels?: (Channel | ChannelUnion)[];
  #referenceAllChannels: boolean = false;
  constructor() {
    super("channelsplit");
  }

  setLayout(channelLayout: ChannelLayoutUnion | ChannelLayout): this {
    if (this.#channelLayout) throw Error("layout already defined");
    this.#channelLayout = channelLayout;
    return this;
  }

  referenceAllChannels(ref: boolean = true): this {
    this.#referenceAllChannels = ref;
    return this;
  }

  // for right now only predefined values/enums can be used
  setChannels(...channels: (Channel | ChannelUnion)[]): this {
    this.#channels = channels;
    return this;
  }

  // set the filter string and output map
  build(): string {
    if (!this.#channelLayout) {
      throw Error("channelsplit filter: no layout defined");
    }
    if (!this.#referenceAllChannels && !this.#channels) {
      throw Error("channelsplit filter: no channels specified");
    }

    if (this.#referenceAllChannels) {
      // channelsplit=channel_layout=5.1[FL][FR][FC][LFE][BC]
      this.options.channelLayout = `${this.#channelLayout}[${
        ChannelLayoutMap[this.#channelLayout].join("][")
      }]`;
      this.options.channels = "";
    } else {
      // channelsplit=channel_layout=5.1:channels=[FL]
      this.options.channelLayout = this.#channelLayout;
      this.options.channels = this.#channels!.map((channel) =>
        `${channel}[${channel}]`
      ).join();
    }

    return `${this.filter}=channel_layout=${this.options.channelLayout}${
      this.options.channels ? `:channels=${this.options.channels}` : ""
    }`;
  }
}
