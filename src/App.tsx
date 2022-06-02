import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const [tasks, setTasks] = useState(
        [
            {id:1, title: 'HTML', isDone: true},
            {id:2, title: 'CSS', isDone: true},
            {id:3, title: 'REACT', isDone: false},
        ]
    )

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t=>t.id!==taskId))
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
