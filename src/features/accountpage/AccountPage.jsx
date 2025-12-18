
export default function AccountPage({ logoutUser }) {

    function handleOnClick() {
        logoutUser()
    }

    return (
    <button onClick={handleOnClick}>logout</button>
    )
}


