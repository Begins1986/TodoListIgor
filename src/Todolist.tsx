import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";

type PropsTodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (value: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsTodolistType) => {

    const [title, setTitle] = useState<string>('')


    const onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    const onChangeFilterHandler = (filter: FilterValueType) => {
        props.changeFilter(filter)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    onChange={onChangeHandler}
                    value={title}
                    onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    const onClickHandler = ()=>{
                        props.removeTask(el.id)
                    }
                    return <li key={el.id}>
                        <button onClick={onClickHandler}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                })
                }
            </ul>
            <div>
                <button onClick={() => onChangeFilterHandler("All")}>All</button>
                <button onClick={() => onChangeFilterHandler("Active")}>Active</button>
                <button onClick={() => onChangeFilterHandler("Completed")}>Completed</button>
            </div>
        </div>
    );
};

