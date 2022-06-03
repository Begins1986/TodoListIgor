import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = 'All'| 'Active' | 'Completed'

function App() {
    const [tasks, setTasks] = useState(
        [
            {id:1, title: 'HTML', isDone: true},
            {id:2, title: 'CSS', isDone: true},
            {id:3, title: 'REACT', isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValueType>('All')

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t=>t.id!==taskId))
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if(filter==='Active'){
        tasksForTodolist=tasks.filter(el=>!el.isDone)
    }

    if(filter==='Completed'){
        tasksForTodolist=tasks.filter(el=>el.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
