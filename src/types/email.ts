export interface EmailComponent {
  (props: Record<string, unknown> | Record<string, never>): React.ReactNode
  PreviewProps?: Record<string, unknown>
}

export interface Email {
  id: string
  name: string
  code: string
  recipient: string
  subject: string
  createdAt: string
}
