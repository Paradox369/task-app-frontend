import React from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
const { formatDistanceToNow } = require("date-fns");

const Task = ({ task, index, deleteTask, getSingleTask, setToComplete }) => {
    return (
        <div className={task.completed ? "task completed" : "task"}>
            <div>
                <p>
                    <b>{index + 1}. </b>
                    {task.name}
                </p>
                <p style={{ marginLeft: "1rem", fontSize: "1.25rem" }}>
                    <b>author:</b> <i> {task.author}</i>
                </p>
                <p style={{ marginLeft: "1rem", fontSize: "1.25rem" }}>
                    <b>date issued: </b>
                    {formatDistanceToNow(task.updatedAt, { addSuffix: true })}
                </p>
            </div>
            <div className="task-icons">
                <FaCheckDouble
                    color="green"
                    onClick={() => setToComplete(task)}
                />
                <FaEdit color="purple" onClick={() => getSingleTask(task)} />
                <FaRegTrashAlt
                    color="red"
                    onClick={() => deleteTask(task._id)}
                />
            </div>
        </div>
    );
};

export default Task;
