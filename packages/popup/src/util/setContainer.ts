export function setContainer(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const container = urlParams.get('container') || 'ext';
  console.log('wq', container);
  window.container = container as 'web' | 'ext';
}
