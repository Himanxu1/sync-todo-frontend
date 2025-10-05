import { getTasks, markAsSynced } from "./localdb";

export const syncWithServer = async () => {
  if (!navigator.onLine) return;

  const tasks = await getTasks();
  const unsynced = tasks.filter((t) => !t.synced);

  for (const task of unsynced) {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/api/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      // Mark task as synced in IndexedDB
      await markAsSynced(task.id);
    } catch (err) {
      console.error("Sync failed, will retry later:", err);
    }
  }
};
