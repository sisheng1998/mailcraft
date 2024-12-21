export interface EmailComponent {
  (props: Record<string, unknown> | Record<string, never>): React.ReactNode
  PreviewProps?: Record<string, unknown>
}
