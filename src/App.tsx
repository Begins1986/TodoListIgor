import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'All'| 'Active' | 'Completed'

function App() {
    const [tasks, setTasks] = useState(
        [
            {id:v1(), title: 'HTML', isDone: true},
            {id:v1(), title: 'CSS', isDone: true},
            {id:v1(), title: 'REACT', isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValueType>('All')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t=>t.id!==taskId))
    }

    const addTask = (value: string) => {
        setTasks([{id:v1(), title: value, isDone: true}, ...tasks])
    }

    const changeStatus =(tId:string, newIsDone:boolean)=>{
        setTasks(tasks.map(el=>el.id===tId?{...el,isDone: newIsDone}:el))
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
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
