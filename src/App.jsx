import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleAdd = () => {
    if (todo.trim().length > 3) {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      setTodo("");
      saveToLS(newTodos);
    }
  };

  const handleEdit = (id) => {
    const targetTodo = todos.find((t) => t.id === id);
    if (targetTodo) {
      setTodo(targetTodo.todo);
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Todo?")) {
      const updatedTodos = todos.filter((t) => t.id !== id);
      setTodos(updatedTodos);
      saveToLS(updatedTodos);
    }
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const toggleShowFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 to-indigo-300 p-5">
      <div className="container mx-auto max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">
          Todo's Application
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter a new todo (min 4 characters)"
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim().length <= 3}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        <div className="flex items-center mb-5">
          <input
            type="checkbox"
            id="toggleShowFinished"
            checked={!showFinished}
            onChange={toggleShowFinished}
            className="mr-2"
          />
          <label htmlFor="toggleShowFinished" className="text-gray-700">
            Show Finished
          </label>
        </div>

        <div>
          {todos.length === 0 ? (
            <p className="text-gray-600 text-center">No Todos available</p>
          ) : (
            todos.map(
              (item) =>
                (showFinished || item.isCompleted) && (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-3 shadow"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => handleCheckbox(item.id)}
                        className="cursor-pointer"
                      />
                      <span
                        className={`${
                          item.isCompleted ? "line-through text-gray-500" : ""
                        } text-gray-800`}
                      >
                        {item.todo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
