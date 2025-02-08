self.addEventListener("activate", (event) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      })
      .then(() => {
        window.location.reload();
      });
  }
});
