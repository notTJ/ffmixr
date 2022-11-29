export const enum ChannelLayout {
  "mono" = "mono",
  "stereo" = "stereo",
  "c2.1" = "2.1",
  "c3.0" = "3.0",
  "c3.0(back)" = "3.0(back)",
  "4.0" = "4.0",
  "quad" = "quad",
  "quad(side)" = "quad(side)",
  "c3.1" = "3.1",
  "c5.0" = "5.0",
  "5.0(side)" = "5.0(side)",
  "c4.1" = "4.1",
  "c5.1" = "5.1",
  "5.1(side)" = "5.1(side)",
  "6.0" = "6.0",
  "6.0(front)" = "6.0(front)",
  "hexagonal" = "hexagonal",
  "c6.1" = "6.1",
  "6.1(back)" = "6.1(back)",
  "6.1(front)" = "6.1(front)",
  "7.0" = "7.0",
  "7.0(front)" = "7.0(front)",
  "c7.1" = "7.1",
  "7.1(wide)" = "7.1(wide)",
  "7.1(wide-side)" = "7.1(wide-side)",
  "octagonal" = "octagonal",
  "hexadecagonal" = "hexadecagonal",
  "downmix" = "downmix",
  "c22.2" = "22.2",
}

export type ChannelLayoutUnion =
  | "mono"
  | "stereo"
  | "2.1"
  | "3.0"
  | "3.0(back)"
  | "4.0"
  | "quad"
  | "quad(side)"
  | "3.1"
  | "5.0"
  | "5.0(side)"
  | "4.1"
  | "5.1"
  | "5.1(side)"
  | "6.0"
  | "6.0(front)"
  | "hexagonal"
  | "6.1"
  | "6.1(back)"
  | "6.1(front)"
  | "7.0"
  | "7.0(front)"
  | "7.1"
  | "7.1(wide)"
  | "7.1(wide-side)"
  | "octagonal"
  | "hexadecagonal"
  | "downmix"
  | "22.2";
