export abstract class ComplexFilter {
  protected readonly filter: string;

  protected constructor(filter: string) {
    this.filter = filter;
  }

  abstract build(): string;
}
