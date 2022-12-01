// http://underpop.online.fr/f/ffmpeg/help/amix.htm.gz
import { BaseFilterOptions } from "../base-filter-options.ts";

export interface AmixFilterOptions extends BaseFilterOptions {
  inputs?: number;
  duration?: string;
  longest?: string;
  shortest?: string;
  first?: string;
  dropout_transition?: number;
  weights?: number;
}
