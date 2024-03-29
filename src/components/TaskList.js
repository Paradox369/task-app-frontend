import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../App";
import loadingImg from "../assets/loader.gif";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        completed: false,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [taskID, setTaskID] = useState("");

    const { name, author } = formData;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleAuthorChange = (e) => {
        if (e.target.value === "") {
            setFormData({ ...formData, author: "anonymous" });
        }
        setFormData({ ...formData, author: e.target.value });
    };

    const getTasks = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${URL}/api/tasks`);
            setTasks(data);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const createTask = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("enter a task there!");
        }
        try {
            await axios.post(`${URL}/api/tasks`, formData);
            toast.success("task added successfully");
            setFormData({ ...formData, name: "", author: "" });
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${URL}/api/tasks/${id}`);
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getSingleTask = async (task) => {
        setFormData({ name: task.name, author: task.author, completed: false });
        setTaskID(task._id);
        setIsEditing(true);
    };

    const updateTask = async (e) => {
        e.preventDefault();
        if (name === "") return toast.error("enter a task there!");
        try {
            await axios.patch(`${URL}/api/tasks/${taskID}`, formData);
            setFormData({ ...formData, name: "", author: "" });
            setIsEditing(false);
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const setToComplete = async (task) => {
        const newFormData = { completed: true };
        // const newFormData = {name:task.name, completed: true}
        try {
            await axios.patch(`${URL}/api/tasks/${task._id}`, newFormData);
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const completedTasks = tasks.filter((task) => {
            return task.completed === true;
        });
        setCompletedTasks(completedTasks);
    }, [tasks]);

    return (
        <div>
            <h2>everyone's task manager</h2>
            <TaskForm
                name={name}
                author={author}
                handleInputChange={handleInputChange}
                handleAuthorChange={handleAuthorChange}
                createTask={createTask}
                isEditing={isEditing}
                updateTask={updateTask}
            />
            {tasks.length > 0 && (
                <div className="--flex-between --pb">
                    <p>
                        <b>total tasks: </b> {tasks.length}
                    </p>
                    <p>
                        <b>completed tasks: </b>
                        {completedTasks.length}
                    </p>
                </div>
            )}

            <hr />
            {isLoading && (
                <div className="--flex-center">
                    <img src={loadingImg} alt="loading..." />
                </div>
            )}
            {!isLoading && tasks.length === 0 ? (
                <p className="--py">no tasks currently</p>
            ) : (
                <>
                    {tasks.map((task, index) => {
                        return (
                            <Task
                                key={task._id}
                                task={task}
                                index={index}
                                deleteTask={deleteTask}
                                getSingleTask={getSingleTask}
                                setToComplete={setToComplete}
                            />
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default TaskList;
