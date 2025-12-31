import { LogoutBtn } from "../../components/buttons.jsx";

export default function AccountPage({ logoutUser }) {

    function handleLogout() {
        logoutUser()
    }

return (
  <div className="h-[100dvh] bg-gray-50 px-4 pt-4 min-[390px]:px-5 min-[430px]:px-6 overflow-hidden">
    {/* pb-[88px] = space for your bottom nav */}
    <div className="mx-auto w-full min-[430px]:max-w-[28rem] md:max-w-[90rem] h-full overflow-y-auto space-y-4 min-[390px]:space-y-5">

      {/* TOP BAR */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-4 min-[390px]:px-5 min-[390px]:py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-semibold text-gray-700">
            JD
          </div>

          <div className="leading-tight">
            <h1 className="text-lg min-[390px]:text-xl min-[430px]:text-2xl font-semibold text-gray-900">
              Your Account
            </h1>
            <p className="text-xs min-[390px]:text-sm text-gray-500">
              Manage your profile and settings
            </p>
          </div>
        </div>

        <LogoutBtn handleOnClick={handleLogout} />
      </div>

      {/* TABS */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-3 min-[390px]:p-4">
        <div className="bg-gray-100 rounded-xl p-1 min-[390px]:p-1.5 flex gap-1">
          <button className="flex-1 rounded-lg bg-white shadow-sm text-gray-900 font-medium py-2 text-sm min-[390px]:py-2.5 min-[390px]:text-base">
            Profile
          </button>
          <button className="flex-1 rounded-lg text-gray-600 hover:text-gray-900 font-medium py-2 text-sm min-[390px]:py-2.5 min-[390px]:text-base">
            Security
          </button>
          <button className="flex-1 rounded-lg text-gray-600 hover:text-gray-900 font-medium py-2 text-sm min-[390px]:py-2.5 min-[390px]:text-base">
            Preferences
          </button>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 min-[390px]:p-5 min-[430px]:p-6">
        <div className="mb-4 min-[390px]:mb-5">
          <h2 className="text-base min-[390px]:text-lg min-[430px]:text-xl font-semibold text-gray-900">
            Personal information
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information such as name and preferences.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="py-3 min-[390px]:py-4">
            <p className="text-xs min-[390px]:text-sm text-gray-500">Name</p>
            <p className="text-base min-[390px]:text-lg font-medium text-gray-900">
              Jacob Duckworth
            </p>
          </div>

          <div className="py-3 min-[390px]:py-4">
            <p className="text-xs min-[390px]:text-sm text-gray-500">Appearance</p>
            <p className="text-base min-[390px]:text-lg font-medium text-gray-900">
              Theme settings
            </p>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="px-4 py-3 min-[390px]:px-5 min-[390px]:py-4 border-b border-gray-100">
          <h3 className="text-sm min-[390px]:text-base font-semibold text-gray-900">
            Quick actions
          </h3>
          <p className="text-xs min-[390px]:text-sm text-gray-500 mt-1">
            Common things you might want to do.
          </p>
        </div>

        <button className="w-full text-left px-4 py-4 min-[390px]:px-5 hover:bg-gray-50 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Change password</p>
            <p className="text-xs min-[390px]:text-sm text-gray-500">Update your login security</p>
          </div>
          <span className="text-gray-400 text-xl leading-none">›</span>
        </button>

        <button className="w-full text-left px-4 py-4 min-[390px]:px-5 hover:bg-gray-50 flex items-center justify-between border-t border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-900">Theme</p>
            <p className="text-xs min-[390px]:text-sm text-gray-500">Light / Dark / System</p>
          </div>
          <span className="text-gray-400 text-xl leading-none">›</span>
        </button>

        <button className="w-full text-left px-4 py-4 min-[390px]:px-5 hover:bg-gray-50 flex items-center justify-between border-t border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-900">Support</p>
            <p className="text-xs min-[390px]:text-sm text-gray-500">Get help or send feedback</p>
          </div>
          <span className="text-gray-400 text-xl leading-none">›</span>
        </button>
      </div>

    </div>
  </div>
);
}


