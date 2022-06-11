import React, {useState} from 'react';
import {FilterValueType} from "./App";

type PropsTodolistType = {
    title:string
    tasks: Array<TaskType>
    removeTask: (taskId: string)=>void
    changeFilter: (value:FilterValueType)=>void
    addTask: (value:string)=>void
}

type TaskType = {
    id:string
    title:string
    isDone: boolean
}

export const Todolist = (props: PropsTodolistType) => {

const [title, setTitle] = useState<string>('')

    const onChangeFilterHandler =(filter: FilterValueType)=>{
        props.changeFilter(filter)
    }

    const onClickHandler = ()=>{
        props.addTask(title)
        setTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={(e)=>{setTitle(e.currentTarget.value)}} value={title}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(el=>
                    <li key={el.id}>
                        <button onClick={()=>props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>)}

            </ul>
            <div>
                <button onClick={()=>onChangeFilterHandler("All")}>All</button>
                <button onClick={()=>onChangeFilterHandler("Active")}>Active</button>
                <button onClick={()=>onChangeFilterHandler("Completed")}>Completed</button>
            </div>
        </div>
    );
};

