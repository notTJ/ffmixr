import { AbstractComplexFilter } from "../abstract-complex-filter.ts";
import { AmixFilterOptions } from "./amix-filter-options.ts";

export class AmixFilter extends AbstractComplexFilter<AmixFilterOptions> {
  constructor(options: AmixFilterOptions = {}) {
    super("amix", options);
  }

  build(): string {
    return "";
  }
}
