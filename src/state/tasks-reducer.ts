
import {TasksType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";

export const tasksReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {
                ...state,
                [action.payload.todolistId]:state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK":{
            return{
                ...state,
                [action.payload.todolistId]:[{id: v1(), title: action.payload.newTodolistTitle, isDone: false},...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS":{
            return {
                ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map(el=>el.id===action.payload.taskId?{...el,isDone:action.payload.isDone}:el)
            }
        }
        case "CHANGE-TASK-TITLE":{
            return  {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el=>el.id===action.payload.taskId?{...el,title:action.payload.title}:el)
            }
        }
        case "ADD-TODOLIST":{
            return {
                ...state,
                [action.payload.todolistId]:[]
            }
        }
        case "REMOVE-TODOLIST":{
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        default:
            return state
    }
}

type ActionType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType |addTodolistACType |removeTodolistACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId:string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskId, todolistId},
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (newTodolistTitle: string, todolistId:string)=>{
    return{
        type: 'ADD-TASK',
        payload: {newTodolistTitle, todolistId},
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone:boolean, todolistId:string)=>{
    return{
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, isDone,todolistId},
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title:string, todolistId:string)=>{
    return{
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId, title,todolistId},
    } as const
}




