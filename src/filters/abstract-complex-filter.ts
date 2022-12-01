import { BaseFilterOptions } from "./base-filter-options.ts";

export abstract class AbstractComplexFilter<TOpts extends BaseFilterOptions> {
  protected readonly filter: string;
  protected readonly options: TOpts;
  protected constructor(filter: string, options: TOpts = {} as TOpts) {
    this.filter = filter;
    this.options = options;
  }

  abstract build(): string;

  toString(): string {
    return this.build();
  }
}
