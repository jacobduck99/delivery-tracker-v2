import { LogoutBtn } from "../../components/buttons.jsx";

export default function AccountPage({ logoutUser }) {

    function handleLogout() {
        logoutUser()
    }

return (
  <div className="account-page w-screen flex justify-center bg-gray-50 px-4 py-6">
    {/* CONTENT CONTAINER */}
    <div className="w-full max-w-[80rem] xl:max-w-[90rem] flex flex-col gap-6 mt-10 xl:mt-14">

      {/* TOP BAR */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-md flex items-center justify-between px-4 py-6 md:px-10 md:py-8">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
          Your Account
        </h1>
        <LogoutBtn handleOnClick={handleLogout} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">

        {/* SIDEBAR */}
        <div className="account-sidebar flex flex-col bg-white border border-gray-200 rounded-md shadow-sm p-4 md:p-6 w-full md:w-[30rem]">
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 rounded-md bg-gray-100 font-medium">
              Profile
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">
              Security
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">
              Preferences
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Account settings
          </p>
        </div>

        {/* MAIN PANEL */}
        <div className="account-main flex flex-col flex-1 bg-white border border-gray-200 rounded-md shadow-sm p-4 md:p-8">
          {/* SECTION HEADER */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Personal information
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Manage your personal information such as name and preferences.
            </p>
          </div>

          {/* CONTENT CARDS */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="border border-gray-200 rounded-md p-4 sm:p-6 w-full sm:w-[22rem] shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="font-medium text-gray-900">Jacob Duckworth</p>
            </div>

            <div className="border border-gray-200 rounded-md p-4 sm:p-6 w-full sm:w-[22rem] shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Appearance</p>
              <p className="font-medium text-gray-900">Theme settings</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);


}


