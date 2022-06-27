import {TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter(el => el.id !== action.payload.todolistId1)
        }
        case "ADD-TODOLIST":{
            return  [...state, {id: v1(), title: action.payload.newTodolistTitle, filter: 'All'} ]
        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(el => el.id === action.payload.todolistId2 ? {...el, title: action.payload.newTodolistTitle} : el)
        }
        default:
            return state
    }
}


type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1},
    } as const
}


type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string)=>{
    return{
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle},
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId2:string, newTodolistTitle: string)=>{
    return{
        type: 'CHANGE-TODOLIST-TITLE',
       payload: {todolistId2, newTodolistTitle},
    } as const
}