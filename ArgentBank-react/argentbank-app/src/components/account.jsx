function Account(infos) {

    return(
        <>
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{infos.title}</h3>
                <p className="account-amount">{infos.amount}</p>
                <p className="account-amount-description">{infos.description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
        </>
    )
}

export default Account