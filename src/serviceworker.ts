self.addEventListener("activate", (_) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      })
      .then(() => {
        window.location.reload();
      });
  }
});
