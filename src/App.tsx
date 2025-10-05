import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import TodoInput from "./components/TodoInput";
import Todolist from "./components/Todolist";
import { getTasks } from "./utils/localdb";
import { syncWithServer } from "./utils/sync";
import { Analytics } from "@vercel/analytics/next"


function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    loadTasks();
    window.addEventListener("online", handleSync);

    return () => window.removeEventListener("online", handleSync);
  }, []);

  const handleSync = async () => {
    await syncWithServer();
    loadTasks();
  };

  const loadTasks = async () => {
    const allTasks = await getTasks();
    setTodos(allTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Analytics />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12 text-blue-500" />
            Todo App
          </h1>
          <p className="text-gray-600 text-lg">
            Stay organized and get things done
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* TodoInput */}
          <div className="animate-slide-up">
            <TodoInput loadTasks={loadTasks} />
          </div>

          {/* Todolist */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Todolist todos={todos} loadTasks={loadTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
