export const enum Channel {
  frontLeft = "FL",
  frontRight = "FR",
  frontCenter = "FC",
  lowFrequency = "LFE",
  backLeft = "BL",
  backRight = "BR",
  frontLeftOfCenter = "FLC",
  frontRightOfCenter = "FRC",
  backCenter = "BC",
  sideLeft = "SL",
  sideRight = "SR",
  topCenter = "TC",
  topFrontLeft = "TFL",
  topFrontCenter = "TFC",
  topFrontRight = "TFR",
  topBackLeft = "TBL",
  topBackCenter = "TBC",
  topBackRight = "TBR",
  downmixLeft = "DL",
  downmixRight = "DR",
  wideLeft = "WL",
  wideRight = "WR",
  surroundDirectLeft = "SDL",
  surroundDirectRight = "SDR",
  lowFrequency2 = "LFE2",
  topSideLeft = "TSL",
  topSideRight = "TSR",
  bottomFrontCenter = "BFC",
  bottomFrontLeft = "BFL",
  bottomFrontRight = "BFR",
}

export type ChannelUnion = `${Channel}`;

// type ToUnion<T extends Record<string, string>> = keyof {
//   [Prop in keyof T as `${T[Prop]}`]: Prop
// }
// export type ChannelUnion = ToUnion<typeof Channel>

export const DefaultChannelOutputName = {
  "FL": "front_left",
  "FR": "front_right",
  "FC": "front_center",
  "LFE": "low_frequency",
  "BL": "back_left",
  "BR": "back_right",
  "BC": "back_center",
  "SL": "side_left",
  "SR": "side_right",
  "WL": "wide_left",
  "WR": "wide_right",
  "FLC": "front_left_center",
  "FRC": "right_left_center",
  "TC": "top_center",
  "TFL": "top_front_left",
  "TFC": "top_front_center",
  "TFR": "top_front_right",
  "TBL": "top_back_left",
  "TBC": "top_back_center",
  "TBR": "top_back_right",
  "DL": "downmix_left",
  "DR": "downmix_right",
  "SDL": "surround_direct_left",
  "SDR": "surround_direct_right",
  "LFE2": "low_frequency_2",
  "TSL": "top_side_left",
  "TSR": "top_side_right",
  "BFC": "bottom_front_center",
  "BFL": "bottom_front_left",
  "BFR": "bottom_front_right",
};

// export type DefaultChannelOutputNameUnion = `${DefaultChannelOutputName}`
