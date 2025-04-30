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


// La fonction déclare le composant UserForm recevant les 3 props depuis User
// la const userName utilisant le hook useState et la const handleUserNameChange en dessous va permettre de pouvoir s'occuper du changement
// du userName directement dans le formulaire, enfin c'est unpeu compliqué à expliquer, mais le useState avec userName va permettre de
// mettre une valeure de départ que sera le nom d'utilisateur affiché et ce que ça permet également c'est d'avoir une variable qui peut
// changer, donc avec le setUserName dans la const handleUserNameChange on va pouvoir opérer la modification de cette valeure, mais bien
// sûr si userName est undefined ou null on renvoi une chaine vide pour éviter un plantage
// onSubmit={(e) => handleSubmit(e, userName)} est ensuite mis sur le form et pas sur le bouton pour rendre l'execution du déclenchement
// du submit plus pratique (soit en appuyant sur save soit en appuyant sur entrée sur le clavier)