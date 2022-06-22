import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import style from './Todolist.module.css'

type PropsTodolistType = {
    todolistID:string
    title: string
    tasks: Array<TaskType>
    filter:FilterValueType
    removeTask: (todolistID:string, taskId: string) => void
    changeFilter: (todolistID:string, filter: FilterValueType) => void
    addTask: (todolistID:string, value: string) => void
    changeStatus: (todolistID:string, tId:string, newIsDone:boolean)=>void
    removeTodolist:(todolistID: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsTodolistType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string|null>(null)


    const onClickHandler = () => {
        if(title.trim()!==''){
            props.addTask(props.todolistID, title.trim())
            setTitle('')

        } else{
            setError('Title is required')

        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        console.log(e.key)
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    const onChangeFilterHandler = (filter: FilterValueType) => {
        props.changeFilter(props.todolistID, filter)
    }

    const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistID)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodolistHandler}>delete</button>
            <div>
                <input
                    className={error?style.error: ''}
                    onChange={onChangeHandler}
                    value={title}
                    onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickHandler}>+</button>
                {error && <div className={style.errorMessage}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                    const onClickHandler = ()=>{
                        props.removeTask(props.todolistID, el.id)
                    }
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(props.todolistID, el.id, newIsDoneValue)
                    }
                    return <li key={el.id} className={el.isDone? style.isDone:''}>
                        <button onClick={onClickHandler}>X</button>
                        <input
                            type="checkbox"
                            onChange={onChangeHandler}
                            checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                })
                }
            </ul>
            <div>
                <button className={props.filter==="All"?style.activeFilter:''} onClick={() => onChangeFilterHandler("All")}>All</button>
                <button className={props.filter==="Active"?style.activeFilter:''} onClick={() => onChangeFilterHandler("Active")}>Active</button>
                <button className={props.filter==="Completed"?style.activeFilter:''} onClick={() => onChangeFilterHandler("Completed")}>Completed</button>
            </div>
        </div>
    );
};

