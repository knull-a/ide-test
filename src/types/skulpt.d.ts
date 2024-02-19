interface Config {
  output: (text: string) => void;
}

declare module "skulpt" {
  function configure(config: Config): void;

  function importMainWithBody(
    filename: string,
    runIt: boolean,
    body: string,
    async: boolean
  ): void;

  const misceval: {
    asyncToPromise: (fn: () => void) => Promise<void>;
  };
}
