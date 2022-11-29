export class PsyduckNode {
  readonly id: string;
  readonly dom: HTMLElement | null = null;
  readonly name: string | null = null;
  readonly version: string | null = null;
  readonly data: unknown;
  readonly children: PsyduckNode[] = [];
  constructor() {
    this.id = '';
  }
}

export class PsyduckRenderer {
  root: null = null;
  build() {}
  render() {}
  instantiation() {}
  serialize() {}
}
