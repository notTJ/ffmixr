import { BaseFilterOptions } from "../base-filter-options.ts";

export interface ChannelsplitFilterOptions extends BaseFilterOptions {
  channelLayout?: string;
  channels?: string;
}
