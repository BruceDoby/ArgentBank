import Account from "../components/account"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import UserForm from "../components/user-form"
import { updateUserSuccess } from "../redux/userSlice"

function User() {
    // On va chercher l'objet user dans le store Redux
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();
    const token = localStorage.getItem('authToken');

    // Pour éviter les erreurs si user est encore null
    const firstName = user?.firstName || ''
    const lastName = user?.lastName || ''

    const [isEditing, setIsEditing] = useState(false); 

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false); 
    };

    const handleSubmit = async (e, userName) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                 },
                body: JSON.stringify({ userName })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 200) {
                dispatch(updateUserSuccess({ userName }));
                setIsEditing(false);
            } else {
                console.error("Erreur lors de la mise à jour. Détails de la réponse : ", data);
            }
        } catch (err) {
            console.error("Erreur réseau:", err);
        }
    };
    
    return(
        <>
        <main className="main bg-dark">
                    {isEditing ? (
                        <UserForm user={user} handleCancel={handleCancel} handleSubmit={handleSubmit} />
                    ) : (
                        <div className="header">
                            <h1>Welcome back<br />{firstName} {lastName}!</h1>
                            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
                        </div>
                    )}
            <h2 className="sr-only">Accounts</h2>
            <Account title='Argent Bank Checking (x8349)' amount='$2,082.79' description='Available Balance' />
            <Account title='Argent Bank Savings (x6712)' amount='$10,928.42' description='Available Balance'/>
            <Account title='Argent Bank Credit Card (x8349)' amount='$184.30' description='Current Balance'/>
        </main>
        </>
    )
}

export default User

// status 200 correspond aux infos utilisateur modifié qui ont bien été récupérée/envoyée
// dans le jsx on a ensuite soit le user-form si l'on veut modifier le nom, soit la page de présentation sinon