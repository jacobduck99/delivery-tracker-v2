
export default function AccountPage({ logoutUser }) {

    function handleOnClick() {
        logoutUser()
    }




return (
  <div className="account-page min-h-screen w-screen flex justify-center border border-red-400 mt-20">
    
    {/* CONTENT CONTAINER */}
    <div className="w-full max-w-[100rem] flex flex-col p-4">
      
      {/* TOP BAR */}
      <div className="h-[10rem] border border-blue-600 flex items-center justify-center">
        another
      </div>

      {/* MAIN CONTENT ROW */}
      <div className="flex gap-10 mt-4">
        
        {/* SIDEBAR */}
        <div className="account-sidebar flex flex-col justify-between border border-gray-400 h-[40rem] w-[30rem]">
          <div className="sidebar-section border border-blue-400 h-[20rem]">
            box 1
          </div>
          <div className="sidebar-section border border-blue-400 h-[20rem]">
            box 2
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className="account-main flex flex-col flex-1 border border-orange-400">
          <div className="account-header h-[10rem] border border-pink-400" />

          <div className="account-body flex justify-center gap-10 flex-1 border border-red-400">
            <div>name</div>
            <div>Pick which mode</div>
          </div>
        </div>

      </div>
    </div>
  </div>
);



}


