import React, {useEffect, useState} from 'react';
import clas from './ProfileInfo.module.css'

const ProfileStatusWithHook = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

   /*  useEffect( () => {
        setStatus(props.status)
    }, [props.status])
 */
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }



    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '-----'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={ onStatusChange } autoFocus={true} onBlur={ deactivateEditMode } value={status} />
                </div>
            }
        </div>

    )

}



export default ProfileStatusWithHook;