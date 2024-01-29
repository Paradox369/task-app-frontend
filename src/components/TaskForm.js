import React from "react";

const TaskForm = ({
    createTask,
    name,
    author,
    handleInputChange,
    isEditing,
    updateTask,
}) => {
    return (
        <form
            onSubmit={isEditing ? updateTask : createTask}
            className="task-form">
            <input
                type="text"
                placeholder="add task"
                name="name"
                value={name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="author"
                name="author"
                value={author}
                onChange={handleInputChange}
            />
            <button type="submit">{isEditing ? "edit" : "add"}</button>
        </form>
    );
};

export default TaskForm;
