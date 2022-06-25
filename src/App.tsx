import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterValueType = 'All' | 'Active' | 'Completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksType = {
[key:string]:Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to Buy', filter: 'Completed'},
    ])
    const [tasks, setTasks] = useState<TasksType>
    ({
        [todolistID1]:
            [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'REACT', isDone: false},
                {id: v1(), title: 'REACT1', isDone: false},
                {id: v1(), title: 'REACT2', isDone: true},
                {id: v1(), title: 'REACT3', isDone: false},
            ],
        [todolistID2]:
            [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'CSS2', isDone: true},
                {id: v1(), title: 'REACT', isDone: false},
            ],
    })
    // const [filter, setFilter] = useState<FilterValueType>('All')

    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
    }

    const addTask = (todolistID: string, value: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: value, isDone: false}, ...tasks[todolistID]]})
    }

    const changeStatus = (todolistID: string, tId: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === tId ? {...el, isDone: newIsDone} : el)})
    }

    const changeFilter = (todolistID: string, filter: FilterValueType) => {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, filter} : el))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    const AddTodolistForm =(title:string)=>{
        let todolistID = v1()
        setTodolist([{id: todolistID, title: title, filter: 'All'}, ...todolist])
        setTasks({[todolistID]:[
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'REACT', isDone: false},
            ],...tasks})
    }

    const editTodolist = (todolistID:string, newTitle: string) =>{
        setTodolist(todolist.map(el=>el.id===todolistID?{...el,title:newTitle}:el))
    }

    const editTasks = (todolistID:string, taskId: string, newTitle: string)=>{
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(el=>el.id===taskId?{...el, title:newTitle}:el)})
    }


    return (
        <div className="App">
            <AddItemForm addItem={AddTodolistForm}/>
            {
                todolist.map(tl => {
                    let tasksForTodolist = tasks[tl.id]

                    if (tl.filter === 'Active') {
                        tasksForTodolist = tasks[tl.id].filter(el => !el.isDone)
                    }

                    if (tl.filter === 'Completed') {
                        tasksForTodolist = tasks[tl.id].filter(el => el.isDone)
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
                            removeTodolist={removeTodolist}
                            editTodolist={editTodolist}
                            editTasks={editTasks}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
