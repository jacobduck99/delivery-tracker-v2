import { LogoutBtn } from "../../components/buttons.jsx";

export default function AccountPage({ logoutUser }) {

    function handleLogout() {
        logoutUser()
    }

return (
  <div className="min-h-[100dvh] bg-gray-50 px-4 pt-4 pb-24 min-[390px]:px-5 min-[430px]:px-6">
    <div className="mx-auto w-full min-[430px]:max-w-[28rem] md:max-w-[90rem] space-y-4 min-[390px]:space-y-5 md:space-y-6">

    {/* TOP BAR */}
<div className="bg-white border border-gray-200 shadow-sm rounded-2xl
                h-14 min-[390px]:h-16
                px-4 min-[390px]:px-5 min-[430px]:px-6
                flex justify-between">
  {/* Left: title vertically centered by the header height */}
  <div className="h-full flex items-center">
    <h1 className="text-lg min-[390px]:text-xl min-[430px]:text-2xl font-semibold text-gray-900 leading-none">
      Your Account
    </h1>
  </div>

  {/* Right: button vertically centered by the header height */}
  <div className="h-full flex items-center">
    <LogoutBtn handleOnClick={handleLogout} />
  </div>
</div>


      {/* TABS (segmented control) */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-3 min-[390px]:p-4 md:rounded-xl md:p-5">
        <div className="bg-gray-100 rounded-xl p-1 min-[390px]:p-1.5 flex gap-1">
          <button className="flex-1 rounded-lg bg-white shadow-sm text-gray-900 font-medium
                             py-2 text-sm
                             min-[390px]:py-2.5 min-[390px]:text-base
                             min-[430px]:py-3">
            Profile
          </button>

          <button className="flex-1 rounded-lg text-gray-600 hover:text-gray-900 font-medium
                             py-2 text-sm
                             min-[390px]:py-2.5 min-[390px]:text-base
                             min-[430px]:py-3">
            Security
          </button>

          <button className="flex-1 rounded-lg text-gray-600 hover:text-gray-900 font-medium
                             py-2 text-sm
                             min-[390px]:py-2.5 min-[390px]:text-base
                             min-[430px]:py-3">
            Preferences
          </button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 min-[390px]:p-5 min-[430px]:p-6 md:rounded-xl md:p-8">
        <div className="mb-4 min-[390px]:mb-5">
          <h2 className="text-base min-[390px]:text-lg min-[430px]:text-xl font-semibold text-gray-900">
            Personal information
          </h2>
          <p className="hidden min-[390px]:block text-sm text-gray-500 mt-1">
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

      {/* DESKTOP: optional future split layout */}
      <div className="hidden md:grid md:grid-cols-[22rem_1fr] md:gap-8">
        {/* leave empty for now */}
      </div>

    </div>
  </div>
);







}


