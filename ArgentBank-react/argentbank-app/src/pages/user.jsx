import Account from "../components/account"
import { useSelector } from 'react-redux'

function User() {
    // Note : lorsque j'aurai accès à l'API et à ses donnés après l'appel à celle ci il faudra surement remplacer le prénom par un truc
    // genre props.name et même chose pour les title amount etc qu'il faudra remplacer par le nom de l'info présent dans l'API, même chose
    // pour les infos présentes (comme le nom) dans le composant navbar

    // On va chercher l'objet user dans le store Redux
    const user = useSelector(state => state.user.user)

    // Pour éviter les erreurs si user est encore null
    const firstName = user?.firstName || ''
    const lastName = user?.lastName || ''

    return(
        <>
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{firstName} {lastName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account title='Argent Bank Checking (x8349)' amount='$2,082.79' description='Available Balance' />
            <Account title='Argent Bank Savings (x6712)' amount='$10,928.42' description='Available Balance'/>
            <Account title='Argent Bank Credit Card (x8349)' amount='$184.30' description='Current Balance'/>
        </main>
        </>
    )
}

export default User

// la 1ere const va utiliser le selector pour récupérer les infos de l'utilisateur, unpeu de la même manière que pour privateroute
// les 2 autres const contiendra soit du vide si user est null soit le prénom et le nom de l'utilisateur