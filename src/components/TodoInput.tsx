import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
import { addTask } from "../utils/localdb";
import { syncWithServer } from "../utils/sync";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TodoInput = ({ loadTasks }: { loadTasks: any }) => {
  const [text, setText] = useState("");

  const handleAddTodo = async () => {
    const newTodo = {
      id: uuidv4(),
      title: text,
      completed: false,
    };
    if (!text.trim()) return;
    await addTask(newTodo);
    setText("");
    loadTasks();
    syncWithServer(); // try syncing immediately if online
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>
        <button
          onClick={handleAddTodo}
          disabled={!text.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <span className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Task
          </span>
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
