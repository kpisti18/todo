export default function TodoList({ todos, onToggle, onDelete }) {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id}>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={todo.isChecked}
                            onChange={() => onToggle(todo.id)}
                        />
                        <span className="todo-text">{todo.text}</span>
                    </label>

                    <button 
                        type="button"
                        className="delete-btn"
                        onClick={() => onDelete(todo.id)}
                    >
                        X
                    </button>
                </li>
            ))}
        </ul>
    )
}