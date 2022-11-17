// stolen directly from the deno-fast-forward example
import { wait } from "https://deno.land/x/wait@0.1.12/mod.ts";
// import type { EncodingEvent } from "";
import type {EncodingProcess, EncodingEvent} from "../../deno-fast-forward/mod.ts";
import {FFmpeg} from "../../deno-fast-forward/mod.ts";
const spinner = wait({ text: "" });

// this causes problems lol
// export async function executeAllEncoders(...encoders: FFmpeg[]): Promise<void> {
//   const map = encoders.map((encoder) => {
//     return eventStream((encoder))
//   // })
//   await Promise.all(map);
// };

export async function eventStream(encoder: FFmpeg): Promise<void> {
  for await (const process of encoder) {
    process.run();
    spinner.start();
    for await (const event of process) {
      switch (event.type) {
        case "start":
          spinner.text = `Loading meta data: ${event.encoding.output} ...`;
          break;
        case "info":
          spinner.text = `Start encoding: ${event.encoding.output} ...`;
          break;
        case "progress":
          spinner.text = `Encode: ${event.encoding.output} - ${event.progress}%`;
          break;
        case "end":
          spinner.stop();
          process.close();
          console.log(`✔ Encode: ${process.encoding.output} - 100%`);
          break;
        case "error":
          spinner.stop();
          process.close();
          console.log(`✘ Encode: ${process.encoding.output} - failed!`);
          throw event.error;
      }
    }
  }
}