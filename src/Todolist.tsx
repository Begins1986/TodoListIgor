import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import style from './Todolist.module.css'

type PropsTodolistType = {
    todolistID:string
    title: string
    tasks: Array<TaskType>
    filter:FilterValueType
    removeTask: (taskId: string) => void
    changeFilter: (todolistID:string, filter: FilterValueType) => void
    addTask: (value: string) => void
    changeStatus: (tId:string, newIsDone:boolean)=>void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsTodolistType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string|null>(null)


    const onClickHandler = () => {
        if(title.trim()!==''){
            props.addTask(title.trim())
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
    return (
        <div>
            <h3>{props.title}</h3>
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
                        props.removeTask(el.id)
                    }
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(el.id, newIsDoneValue)
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

