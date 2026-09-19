(() => {
  // Each HTML page declares a fixed destination. Never forward arbitrary paths.
  const target = new URL(document.querySelector('link[rel="canonical"]').href);
  target.search = window.location.search;
  target.hash = window.location.hash;
  // Replace the old URL in history so Back does not create a redirect loop.
  window.location.replace(target.href);
})();
