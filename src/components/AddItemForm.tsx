import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "../Todolist.module.css";
import {Button, TextField} from "@material-ui/core";

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
            {/*<input*/}
            {/*    className={error?style.error: ''}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    value={title}*/}
            {/*    onKeyPress={onKeyPressHandler}/>*/}

            <TextField
                id="outlined-basic"
                error={!!error}
                label={error}
                variant="outlined"
                size="small"
                className={error?style.error: ''}
                onChange={onChangeHandler}
                value={title}
                onKeyPress={onKeyPressHandler}
            />


            <Button variant="contained" size='small' style={{maxWidth:'40px',minWidth: '40px',height: '40px', backgroundColor: 'blueviolet', color: 'white'}} onClick={onClickHandler}>+</Button>
            {/*<button onClick={onClickHandler}>+</button>*/}
            {/*{error && <div className={style.errorMessage}>{error}</div>}*/}
        </div>
    );
};
