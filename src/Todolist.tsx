import React from 'react';

type PropsTodolistType = {
    title:string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=>void
}

type TaskType = {
    id:number
    title:string
    isDone: boolean
}

export const Todolist = (props: PropsTodolistType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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
                <button onClick={()=>{console.log("All")}}>All</button>
                <button onClick={()=>{console.log("Active")}}>Active</button>
                <button onClick={()=>{console.log("Completed")}}>Completed</button>
            </div>
        </div>
    );
};

