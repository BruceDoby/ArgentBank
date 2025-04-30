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
            console.log("Réponse de l'API :", data);

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

// la 1ere const (l9) va utiliser le selector pour récupérer les infos de l'utilisateur, unpeu de la même manière que pour privateroute
// les 2 autres const (l14-15) contiendra soit du vide si user est null soit le prénom et le nom de l'utilisateur
// on importe les hooks useSelector et useDispatch provenant de react-redux qui servent respectivement à lire les données depuis le store
// et à envoyer une action au store redux (pour mettre à jour le nom d'utilisateur)
// L10 et 11 on utilise la const dispatch pour l'envoi d'action donc et on récuèpre le token pour le stocker après connexion
// La const isEditing servira à indiquer si l'utilisateur va modifier son nom, on le mets en false par défaut pour dire que non, et
// setIsEditing sera utilisé plus tard avec la const handleEditClick pour que lorsque l'on clique sur le bouton éditer, on indique que 
// l'utilisateur est entrain de modifier son nom
// la const handleCancel servira à remettre isEditing à false dans le cas où on comptait modifier le nom mais qu'on a finalement annulé
// en appuyant sur le bouton cancel
// la const handleSubmit s'occupera ainsi de gérer l'envoie du nom mis à jour avec la method PUT, avant ça on a la récupération des donées
// de l'API, avec le headers on indique donc les données qu'on envoi (format JSON), on précise également que l'opération nécessite une
// autorisation impliquant la présence du token pour vérifier que l'utilisateur est connecté et a donc bien l'autorisation d'effectué cette
// opération, le body envoi ensuite le nouvel objet avec la valeure userName, on également une erreur dans le cas où l'on a pas la response
// avec le status actuel de la response, on récupère ensuite dans data les données JSON de la response
// on vérifie ensuite le status renvoyé par l'API, s'il correspond à 200, on envoie updateUserSuccess avec les nouvelles valeures pour
// procéder aux modifications dans le store et on remets isEditing à false pour revenir à l'état normal, si ce n'est pas le cas cependant
// on affiche une erreur dans la console avec les infos récupéré via data et on a bien sûr le try catch qui sert à intercepter les
// potentielles erreures
// dans le HTML on a ensuite la vérification de si l'on souhaite éditer ou nom le nom d'utilisateur avec isEditing ? : (opérateur ternaire)
// si c'est le cas, on affiche le user-form avec les informations qui luis sont passé, sinon on affiche le texte de base