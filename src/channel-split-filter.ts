import {
  ChannelUnion,
  ComplexFilter,
  Layout,
} from '../../deno-fast-forward/src/mod.ts';

import {
  Channel,
  ChannelLayout,
} from '../../deno-fast-forward/src/filters/channel-layouts.ts';

export class ChannelSplitFilter extends ComplexFilter {
  #layout?: ChannelLayout;
  #channel?: Channel | ChannelUnion;

  constructor() {
    super('channelsplit');
  }

  setChannel(channel: Channel | ChannelUnion): this {
    this.#channel = channel;
    return this;
  }

  setLayout(channelLayout: Layout | ChannelLayout): this {
    this.#layout = channelLayout;
    return this;
  }

  audioOnly(): this {
    this.actions.push((ffmpeg) => ffmpeg.audioChannels());
    return this;
  }

  buildFilterString(): string {
    let filterString = this.filter;
    if (this.#layout) {
      filterString += `=channel_layout=${this.#layout}`;
    }

    return filterString;
  }
}
