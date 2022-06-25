import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "../Todolist.module.css";

type AddItemFormType = {
    addItem: (newTitle:string)=>void
}

export const AddItemForm = (props:AddItemFormType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string|null>(null)

    const onClickHandler = () => {
        let newTitle = title.trim()
        if(title.trim()!==''){
            props.addItem(newTitle)
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

    return (
        <div>
            <input
                className={error?style.error: ''}
                onChange={onChangeHandler}
                value={title}
                onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    );
};
