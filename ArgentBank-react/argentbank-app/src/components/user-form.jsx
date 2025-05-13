import { useState } from "react";

function UserForm({ user, handleCancel, handleSubmit }) {
    const [userName, setUserName] = useState(user?.userName || '');

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    return (
        <>
        <h1 className="form__h1">Edit user info</h1>
        <form className="change__form" onSubmit={(e) => handleSubmit(e, userName)}>
            <div className="username__form">
                <label htmlFor="username" className="form__title">User Name:</label>
                <input type="text" id="username" className="form__active" value={userName} onChange={handleUserNameChange} />
            </div>
            <div className="firstname__form">
                <label className="form__title center">First Name: </label>
                <p className="form__passive">{user?.firstName || ''}</p>
            </div>
            <div className="lastname__form">
                <label className="form__title center">Last Name: </label>
                <p className="form__passive">{user?.lastName || ''}</p>
            </div>
            <div className="user--info__button">
                <button type="submit" className="save-button">Save</button>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
        </>
    );
}

export default UserForm;

// On reçoit les 3 props depuis user et ainsi en fonction de si on valide ou si on annule, une modification sera faites sur le nom 
// d'utilisateur