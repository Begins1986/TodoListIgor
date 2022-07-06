
import {TasksType} from "../App";

export const tasksReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {
                ...state,
                [action.payload.todolistId]:state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        // case "ADD-TODOLIST":{
        //     return  [...state, {id: v1(), title: action.payload.newTodolistTitle, filter: 'All'} ]
        // }
        // case "CHANGE-TODOLIST-TITLE":{
        //     return state.map(el => el.id === action.payload.todolistId2 ? {...el, title: action.payload.newTodolistTitle} : el)
        // }
        // case "CHANGE-TODOLIST-FILTER":{
        //     return state.map(el => el.id === action.payload.todolistId2 ? {...el, filter: action.payload.newFilter} : el)
        // }
        default:
            return state
    }
}

type ActionType = removeTaskACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId:string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskId, todolistId},
    } as const
}
//
// type addTodolistACType = ReturnType<typeof addTodolistAC>
// export const addTodolistAC = (newTodolistTitle: string)=>{
//     return{
//         type: 'ADD-TODOLIST',
//         payload: {newTodolistTitle},
//     } as const
// }

