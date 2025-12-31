import { LogoutBtn } from "../../components/buttons.jsx";

export default function AccountPage({ logoutUser }) {

    function handleLogout() {
        logoutUser()
    }

return (
  <div className="min-h-[100dvh] bg-gray-50 px-4 pt-4 pb-24
                  min-[390px]:px-5 min-[430px]:px-6">
    {/* NOTE: no max-w-md lock on phones */}
    <div className="mx-auto w-full
                    min-[430px]:max-w-[28rem]
                    md:max-w-[90rem]
                    space-y-4 min-[390px]:space-y-5 md:space-y-6">

      {/* Header */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl
                      px-4 py-4
                      min-[390px]:px-5 min-[390px]:py-5
                      min-[430px]:px-6
                      md:rounded-xl md:px-10 md:py-6
                      flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900
                       min-[390px]:text-xl min-[430px]:text-2xl
                       md:text-2xl">
          Your Account
        </h1>

        <div className="scale-95 origin-right min-[390px]:scale-100">
          <LogoutBtn handleOnClick={handleLogout} />
        </div>
      </div>

      {/* Tabs (segmented control) */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl
                      p-3
                      min-[390px]:p-4
                      min-[430px]:p-4
                      md:rounded-xl md:p-5">
        <div className="bg-gray-100 rounded-xl p-1 flex gap-1
                        min-[390px]:p-1.5">
          <button
            className="flex-1 rounded-lg
                       py-2 text-sm font-medium
                       min-[390px]:py-2.5 min-[390px]:text-base
                       min-[430px]:py-3
                       bg-white shadow-sm text-gray-900"
          >
            Profile
          </button>

          <button
            className="flex-1 rounded-lg
                       py-2 text-sm font-medium
                       min-[390px]:py-2.5 min-[390px]:text-base
                       min-[430px]:py-3
                       text-gray-600 hover:text-gray-900"
          >
            Security
          </button>

          <button
            className="flex-1 rounded-lg
                       py-2 text-sm font-medium
                       min-[390px]:py-2.5 min-[390px]:text-base
                       min-[430px]:py-3
                       text-gray-600 hover:text-gray-900"
          >
            Preferences
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl
                      p-4
                      min-[390px]:p-5
                      min-[430px]:p-6
                      md:rounded-xl md:p-8">
        <div>
          <h2 className="text-base font-semibold text-gray-900
                         min-[390px]:text-lg min-[430px]:text-xl
                         md:text-xl">
            Personal information
          </h2>
          <p className="mt-1 text-sm text-gray-500 hidden min-[390px]:block">
            Manage your personal information such as name and preferences.
          </p>
        </div>

        <div className="mt-4 divide-y divide-gray-100
                        min-[390px]:mt-5">
          <div className="py-3 min-[390px]:py-4">
            <p className="text-xs text-gray-500 min-[390px]:text-sm">Name</p>
            <p className="text-base font-medium text-gray-900
                          min-[390px]:text-lg">
              Jacob Duckworth
            </p>
          </div>

          <div className="py-3 min-[390px]:py-4">
            <p className="text-xs text-gray-500 min-[390px]:text-sm">Appearance</p>
            <p className="text-base font-medium text-gray-900
                          min-[390px]:text-lg">
              Theme settings
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
);






}


