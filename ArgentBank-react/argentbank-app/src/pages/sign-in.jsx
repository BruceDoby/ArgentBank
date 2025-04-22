import Form from "../components/form"

function SignIn() {
    return(
        <div className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <Form />
            </section>
        </div>
    )
}

export default SignIn