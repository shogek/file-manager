/**
 * `(1_123_456) => "1.12 MB"`
 * `(1_123) => "1.12 KB"`
 * `(11) => "1.12 B"`
 */
export function getHumanReadableSize(bytes: number): string {
  if (bytes >= 100_000) {
    return `${(bytes / 1_000_000).toFixed(2)} MB`;
  }

  if (bytes >= 100) {
    return `${(bytes / 1_000).toFixed(2)} KB`;
  }

  return `${bytes} B`;
}
