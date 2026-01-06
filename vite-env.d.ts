/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_N8N_WEBHOOK_BOOKING: string
  readonly VITE_N8N_WEBHOOK_CTA: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

