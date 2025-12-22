
export default function AccountPage({ logoutUser }) {

    function handleOnClick() {
        logoutUser()
    }


    return (
      <div className="account-page flex border border-red-400 p-4 h-screen w-screen">
        hi

        <div className="account-sidebar flex flex-col justify-between border border-gray-400 h-[40rem] w-[30rem] ml-120 mt-60">
          <div className="sidebar-section border border-blue-400 h-[20rem]">
            box 1
          </div>

          <div className="sidebar-section border border-blue-400 h-[20rem]">
            box 2
          </div>
        </div>

    <div className="account-main flex flex-col h-[50rem] w-[60rem] ml-10 mt-60 border border-orange-400">
      <div className="account-header h-[10rem] w-full border border-pink-400" />

      <div className="account-body flex justify-center w-full space-x-10 border border-red-400">
        <div className="">name</div>

        <div>Pick which mode</div>

    </div>
    </div>

      </div>
    );

}


