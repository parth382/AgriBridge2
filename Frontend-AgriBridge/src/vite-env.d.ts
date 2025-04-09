/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WS_URL: string
  readonly VITE_API_URL: string
  readonly VITE_SOCKET_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 