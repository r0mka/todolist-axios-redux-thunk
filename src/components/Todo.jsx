import React from 'react';
import './styles/Todo.css';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd';

export default function Todo({
  id,
  index,
  title,
  done,
  update,
  destroy,
  toggle,
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(title);

  const saveTodo = (e) => {
    e.preventDefault();
    update(id, inputValue);
    setIsEditing(false);
  };

  let result;
  if (isEditing) {
    result = (
      <form onSubmit={saveTodo} className="Todo-edit-form">
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button>Save</button>
      </form>
    );
  } else {
    result = <div className="Todo-task">{title}</div>;
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className={`Todo ${done && 'completed'}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                onChange={() => toggle(id)}
                checked={done}
              />
              <span className="checkbox-custom rectangular"></span>
            </label>
          </div>
          {result}
          <div className="Todo-buttons">
            <button onClick={() => setIsEditing(!isEditing)}>
              <FaPencilAlt />
            </button>
            <button onClick={() => destroy(id)}>
              <FaTrash />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
}
