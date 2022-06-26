import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    title: string
    addItem: (changeTitle: string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [newTitle, setNewTitle] = useState<string>(props.title)



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        let changeTitle = newTitle.trim()
        if(changeTitle.trim()!==''){
            props.addItem(changeTitle)
        }
    }


    const [edit, setEdit] = useState<boolean>(true)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        onClickHandler()
    }



    return (
        edit
            ? <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            : <TextField
                id="outlined-basic"
                label="Изменить"
                variant="outlined"
                onChange={onChangeHandler}
                onBlur={onDoubleClickHandler}
                autoFocus
                value={newTitle}
            />
            // : <input onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus value={newTitle}/>
    );
};
