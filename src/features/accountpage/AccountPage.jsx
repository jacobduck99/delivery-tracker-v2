import { LogoutBtn } from "../../components/buttons.jsx";

export default function AccountPage({ logoutUser }) {

    function handleLogout() {
        logoutUser()
    }

return (
  <div className="min-h-[100dvh] bg-gray-50 px-3 py-3 sm:px-6 sm:py-6 lg:px-10 lg:py-10">
    {/* CONTENT CONTAINER */}
    <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-3 sm:gap-5 lg:gap-8">
      {/* TOP BAR */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-md lg:rounded-xl
                      flex items-center justify-between
                      px-3 py-3 sm:px-5 sm:py-4 lg:px-10 lg:py-6">
        <h1 className="text-base sm:text-lg lg:text-2xl font-semibold text-gray-900">
          Your Account
        </h1>

        <div className="scale-95 sm:scale-100 origin-right">
          <LogoutBtn handleOnClick={handleLogout} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="
          flex flex-col gap-3 sm:gap-5
          lg:grid lg:grid-cols-[22rem_1fr] lg:gap-8
        "
      >
        {/* SIDEBAR */}
        <div className="bg-white border border-gray-200 rounded-md lg:rounded-xl shadow-sm
                        p-2 sm:p-3 lg:p-6">
          {/* Mobile: tabs row */}
          <div className="flex gap-2 lg:hidden">
            <button className="flex-1 text-center px-3 py-2 rounded-md bg-gray-100 font-medium text-sm">
              Profile
            </button>
            <button className="flex-1 text-center px-3 py-2 rounded-md hover:bg-gray-100 text-sm">
              Security
            </button>
            <button className="flex-1 text-center px-3 py-2 rounded-md hover:bg-gray-100 text-sm">
              Preferences
            </button>
          </div>

          {/* Desktop: real sidebar */}
          <div className="hidden lg:flex lg:flex-col lg:gap-3">
            <button className="w-full text-left px-4 py-2.5 rounded-md bg-gray-100 font-medium">
              Profile
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-md hover:bg-gray-100">
              Security
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-md hover:bg-gray-100">
              Preferences
            </button>

            <p className="text-sm text-gray-500 mt-6">
              Account settings
            </p>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className="bg-white border border-gray-200 rounded-md lg:rounded-xl shadow-sm
                        p-3 sm:p-5 lg:p-8">
          {/* SECTION HEADER */}
          <div className="mb-3 sm:mb-5 lg:mb-8">
            <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">
              Personal information
            </h2>
            <p className="hidden sm:block text-sm lg:text-base text-gray-500 mt-2">
              Manage your personal information such as name and preferences.
            </p>
          </div>

          {/* CARDS */}
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-5 lg:gap-6">
            <div className="border border-gray-200 rounded-md lg:rounded-xl shadow-sm p-3 sm:p-5 lg:p-6">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Name</p>
              <p className="text-sm sm:text-base font-medium text-gray-900">Jacob Duckworth</p>
            </div>

            <div className="border border-gray-200 rounded-md lg:rounded-xl shadow-sm p-3 sm:p-5 lg:p-6">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Appearance</p>
              <p className="text-sm sm:text-base font-medium text-gray-900">Theme settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);



}


