import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'All' | 'Active' | 'Completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'What to Buy', filter: 'Completed'},
    ])
    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
        ]
    )

    // const [filter, setFilter] = useState<FilterValueType>('All')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (value: string) => {
        setTasks([{id: v1(), title: value, isDone: true}, ...tasks])
    }

    const changeStatus = (tId: string, newIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === tId ? {...el, isDone: newIsDone} : el))
    }

    const changeFilter = (todolistID:string, filter: FilterValueType) => {
        setTodolist(todolist.map(el=>el.id===todolistID?{...el, filter}:el))
    }



    return (
        <div className="App">
            {
                todolist.map(tl => {
                    let tasksForTodolist = tasks

                    if (tl.filter === 'Active') {
                        tasksForTodolist = tasks.filter(el => !el.isDone)
                    }

                    if (tl.filter === 'Completed') {
                        tasksForTodolist = tasks.filter(el => el.isDone)
                    }


                    return (
                        <Todolist
                            key={tl.id}
                            todolistID={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
