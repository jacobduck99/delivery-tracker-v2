import { LogoutBtn } from "../../components/buttons.jsx";

export default function AccountPage({ logoutUser }) {

    function handleLogout() {
        logoutUser()
    }

return (
  <div className="min-h-[100dvh] bg-gray-50 p-3 sm:p-4 md:p-6">
    {/* CONTENT CONTAINER */}
    <div className="mx-auto w-full max-w-[80rem] xl:max-w-[90rem] min-h-[calc(100dvh-1.5rem)]
                    flex flex-col gap-3 sm:gap-4 md:gap-6">

      {/* TOP BAR */}
      <div className="shrink-0 bg-white border border-gray-200 shadow-sm rounded-md
                      flex items-center justify-between
                      px-3 py-3 sm:px-4 sm:py-4 md:px-8 md:py-6">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
          Your Account
        </h1>

        {/* keep button compact on tiny screens */}
        <div className="scale-95 sm:scale-100 origin-right">
          <LogoutBtn handleOnClick={handleLogout} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-8">

        {/* SIDEBAR: tabs row on mobile, real sidebar on desktop */}
        <div className="shrink-0 bg-white border border-gray-200 rounded-md shadow-sm
                        p-2 sm:p-3 md:p-6
                        w-full md:w-[22rem] lg:w-[26rem]">
          <div className="flex gap-2 md:flex-col md:gap-3">
            <button className="flex-1 md:flex-none text-center md:text-left
                               px-3 py-2 sm:px-4 sm:py-2.5
                               rounded-md bg-gray-100 font-medium text-sm">
              Profile
            </button>

            <button className="flex-1 md:flex-none text-center md:text-left
                               px-3 py-2 sm:px-4 sm:py-2.5
                               rounded-md hover:bg-gray-100 text-sm">
              Security
            </button>

            <button className="flex-1 md:flex-none text-center md:text-left
                               px-3 py-2 sm:px-4 sm:py-2.5
                               rounded-md hover:bg-gray-100 text-sm">
              Preferences
            </button>
          </div>

          {/* show helper text only once there's vertical space */}
          <p className="hidden md:block text-sm text-gray-500 mt-6">
            Account settings
          </p>
        </div>

        {/* MAIN PANEL */}
        <div className="flex-1 bg-white border border-gray-200 rounded-md shadow-sm
                        p-3 sm:p-4 md:p-8">
          {/* SECTION HEADER */}
          <div className="mb-3 sm:mb-4 md:mb-6">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              Personal information
            </h2>
            <p className="hidden sm:block text-sm text-gray-500 mt-2">
              Manage your personal information such as name and preferences.
            </p>
          </div>

          {/* CONTENT CARDS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
            <div className="border border-gray-200 rounded-md shadow-sm
                            p-3 sm:p-4 md:p-6
                            w-full sm:w-[22rem]">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Name</p>
              <p className="text-sm sm:text-base font-medium text-gray-900">
                Jacob Duckworth
              </p>
            </div>

            <div className="border border-gray-200 rounded-md shadow-sm
                            p-3 sm:p-4 md:p-6
                            w-full sm:w-[22rem]">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Appearance</p>
              <p className="text-sm sm:text-base font-medium text-gray-900">
                Theme settings
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);


}


