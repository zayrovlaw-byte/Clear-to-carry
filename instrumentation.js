/* Runs once when the server starts. Starts the hourly client-reminder check
   (lib/reminders.js). Set REMINDERS=off to disable it. */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.REMINDERS === "off") return;
  const { runReminders } = await import("./lib/reminders");
  const tick = () =>
    runReminders()
      .then((n) => { if (n) console.log(`[reminders] sent ${n}`); })
      .catch((e) => console.error("[reminders]", e.message));
  setTimeout(tick, 60 * 1000);
  setInterval(tick, 60 * 60 * 1000);
}
