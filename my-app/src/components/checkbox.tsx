import React, { useState } from 'react'

const Checkbox = ({label, boxStatus} ) => {
    const [checked, setChecked] = useState(false);

    const onChangeHandler = (event: any) => {
        let isChecked = event.target.checked;
        setChecked(isChecked);
        console.log('isChecked:',isChecked); 
        boxStatus(label, isChecked);
    }

    return (
        <div>
            <label><input type='checkbox' checked={checked} onChange={onChangeHandler}></input>{label}</label>
        </div>
    )
}

export default Checkbox