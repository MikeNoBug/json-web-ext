/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly CONTAINER: 'web' | 'ext';
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
