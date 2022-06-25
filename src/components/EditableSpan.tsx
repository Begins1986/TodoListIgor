import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    addItem: (changeTitle: string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [newTitle, setNewTitle] = useState<string>(props.title)
    const [error, setError] = useState<string|null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        let changeTitle = newTitle.trim()
        if(changeTitle.trim()!==''){
            props.addItem(changeTitle)
        } else{
            setError('Title is required')
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
            : <input onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus value={newTitle}/>
    );
};
