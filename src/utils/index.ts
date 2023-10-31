export function cns(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ');
}
