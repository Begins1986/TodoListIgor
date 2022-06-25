import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import style from './Todolist.module.css'
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type PropsTodolistType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, filter: FilterValueType) => void
    addTask: (todolistID: string, value: string) => void
    changeStatus: (todolistID: string, tId: string, newIsDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    editTodolist: (todolistID:string, newTitle: string) =>void
    editTasks:(todolistID:string, taskId: string, newTitle: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsTodolistType) => {

    // const [title, setTitle] = useState<string>('')
    // const [error, setError] = useState<string|null>(null)


    // const onClickHandler = () => {
    //     if(title.trim()!==''){
    //         props.addTask(props.todolistID, title.trim())
    //         setTitle('')
    //
    //     } else{
    //         setError('Title is required')
    //
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     console.log(e.key)
    //     if (e.key === 'Enter') {
    //         onClickHandler()
    //     }
    // }

    const onChangeFilterHandler = (filter: FilterValueType) => {
        props.changeFilter(props.todolistID, filter)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const AddItemFormHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const EditTodolistHandler=(title:string)=>{
        props.editTodolist(props.todolistID, title)
    }

    const EditTAskHandler=(taskId:string, title:string)=>{
        props.editTasks(props.todolistID,taskId,title)
    }

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} addItem={EditTodolistHandler}/>
                <button onClick={removeTodolistHandler}>delete</button>
            </h3>

            <AddItemForm addItem={AddItemFormHandler}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        className={error?style.error: ''}*/}
            {/*        onChange={onChangeHandler}*/}
            {/*        value={title}*/}
            {/*        onKeyPress={onKeyPressHandler}/>*/}
            {/*    <button onClick={onClickHandler}>+</button>*/}
            {/*    {error && <div className={style.errorMessage}>{error}</div>}*/}
            {/*</div>*/}
            <ul>
                {props.tasks.map(el => {
                    const onClickHandler = () => {
                        props.removeTask(props.todolistID, el.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(props.todolistID, el.id, newIsDoneValue)
                    }
                    return <li key={el.id} className={el.isDone ? style.isDone : ''}>
                        <button onClick={onClickHandler}>X</button>
                        <input
                            type="checkbox"
                            onChange={onChangeHandler}
                            checked={el.isDone}/>
                        {/*<span>{el.title}</span>*/}
                        <EditableSpan title={el.title} addItem={(title:string)=>EditTAskHandler(el.id, title)}/>
                    </li>
                })
                }
            </ul>
            <div>
                <button className={props.filter === "All" ? style.activeFilter : ''}
                        onClick={() => onChangeFilterHandler("All")}>All
                </button>
                <button className={props.filter === "Active" ? style.activeFilter : ''}
                        onClick={() => onChangeFilterHandler("Active")}>Active
                </button>
                <button className={props.filter === "Completed" ? style.activeFilter : ''}
                        onClick={() => onChangeFilterHandler("Completed")}>Completed
                </button>
            </div>
        </div>
    );
};

