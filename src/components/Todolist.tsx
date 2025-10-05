import { deleteTask, updateTask } from "../utils/localdb";
import { Check, Trash2, ClipboardList, Clipboard } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Todolist = ({ todos, loadTasks }: { todos: any; loadTasks: any }) => {
  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggleComplete = async (todo: any) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    await updateTask(updatedTodo);
    loadTasks();
  };

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <Clipboard className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-500">
            Add your first task above to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-blue-500" />
          Your Tasks ({todos.length})
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {todos.map((todo: any, index: number) => (
          <div
            key={todo.id}
            className={`p-6 hover:bg-gray-50 transition-colors duration-200 animate-slide-up ${
              todo.completed ? "opacity-75" : ""
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              {/* Checkbox */}
              <button
                onClick={() => handleToggleComplete(todo)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  todo.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                }`}
              >
                {todo.completed && <Check className="w-4 h-4" />}
              </button>

              {/* Task Text */}
              <div className="flex-1">
                <p
                  className={`text-lg transition-all duration-200 ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {todo.completed ? "Completed" : "Pending"}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(todo.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                title="Delete task"
              >
                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todolist;
