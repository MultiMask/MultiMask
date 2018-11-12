/**
 * Configurable params in congig.json
 */
declare var logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';
declare var encryptEntities: boolean;
declare var etherscanApiKey: string;
declare var infuraApiKey: string;

/**
 * Custom imports
 */
declare module '*.svg' {
  const content: any;
  export default content;
}
declare module 'sha256';
declare module 'aes256';
declare module 'uuid/v4';
declare module 'bitcore-mnemonic';
declare module 'etherscan-api';
declare module 'web3-utils';

/**
 * Custom API
 */
declare var chrome: any;
declare var browser: any;

/**
 * Extend Window
 */
interface Window {
  data: IPrompt;
  notification: any;
  multiWeb: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

/**
 * MultiMask interfaces
 */
interface IPromptConstruct {
  domain?: string;
  network?: any;
  data?: any;
  responder?: (approval: any) => void;
}

interface IPrompt extends IPromptConstruct {
  type: string;
  routeName(): string;
}
