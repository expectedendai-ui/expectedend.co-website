// The slice of jsdom's API the Crew invite page test uses (jsdom ships without types).
declare module "jsdom" {
  export class JSDOM {
    constructor(
      html: string,
      options?: { url?: string; runScripts?: "dangerously"; beforeParse?: (window: Window & typeof globalThis) => void },
    );
    readonly window: Window & typeof globalThis;
  }
}
