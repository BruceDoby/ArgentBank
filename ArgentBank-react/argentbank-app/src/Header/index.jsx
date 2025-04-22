import Navigation from "../components/navbar";
import Logo from "../assets/img/argentBankLogo.webp"
import { NavLink } from "react-router-dom";

function Header() {

    return (
        <>
            <nav className="main-nav">
                <NavLink to="/" className="main-nav-logo">
                    <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo"/>
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    <Navigation />
                </div>
            </nav>
        </>
    )
}

export default Header