import { LogoutBtn } from "../../components/buttons.jsx";

export default function AccountPage({ logoutUser }) {

    function handleLogout() {
        logoutUser()
    }




return (
  <div className="account-page min-h-screen w-screen flex justify-center mt-20">
    
    {/* CONTENT CONTAINER */}
    <div className="w-full max-w-[80rem] flex flex-col p-4">
      
      {/* TOP BAR */}
    <div className="h-[8rem] border border-gray-200 shadow-sm rounded-md flex items-center justify-between px-10 pb-9">
      <h1 className="text-xl font-semibold mt-9">Your Account</h1>
      <LogoutBtn handleOnClick={handleLogout} />
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
        <div className="account-main flex flex-col flex-1">
          <div className="account-header h-[10rem]">
            <h1 className="text-[1.5rem] font-semibold mt-10 ml-3 ml-3">Personal information</h1> 
            <p className="ml-3 mt-4 font-light">Manage your personal information such as Name and password</p>
                        </div>

          <div className="account-body flex justify-left gap-10 flex-1 items-left ml-10">
            <div className="border border-gray-200 shadow-sm rounded-md font-semibold h-[10rem] w-[22rem] p-6">Name
            <p className="font-normal mt-2">Jacob duckworth</p>
            </div>
            <div className="border border-gray-200 shadow-sm rounded-md font-semibold h-[10rem] w-[22rem] p-6">Appearance Settings
            <p className="font-light mt-2">Theme settings</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);



}


