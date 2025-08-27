export default function applyIgnore(base: string[], user?: string[]): string[] {
  return user && user.length > 0 ? [...base, ...user] : base;
}
