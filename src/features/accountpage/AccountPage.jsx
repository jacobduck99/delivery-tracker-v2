
export default function AccountPage({ logoutUser }) {

    function handleOnClick() {
        logoutUser()
    }

    return (
    <div className="flex justify-center mt-19">
    <button className="w-50 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700" onClick={handleOnClick}>logout</button>
    </div>
    )
}


