import { LogoutBtn } from "../../components/buttons.jsx";
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function AccountPage({ logoutUser }) {
    
    const navigate = useNavigate();
    function handleLogout() {
        logoutUser()
    }

    function redirectToRun() {
        navigate("/run");
    }

return (
  <div className="h-[100dvh] bg-gray-50 px-4 pt-4 min-[390px]:px-5 min-[430px]:px-6 overflow-hidden">

    <div className="mx-auto w-full min-[430px]:max-w-[28rem] md:max-w-[90rem] h-full overflow-y-auto space-y-4 min-[390px]:space-y-3">


{/* TOP BAR */}
<div className="px-4 py-4 min-[390px]:px-5 min-[390px]:py-3">
  <div className="grid grid-cols-3 items-center">
    {/* LEFT: Back */}
    <button
      type="button"
      onClick={redirectToRun}
      className="justify-self-start inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 active:scale-95 transition"
      aria-label="Go back"
    >
      <ChevronLeft className="h-6 w-6 text-gray-700" />
    </button>

    {/* CENTER: Title */}
    <h2 className="justify-self-center text-lg min-[390px]:text-xl min-[430px]:text-2xl font-semibold text-gray-900">
      Settings and activity
    </h2>

    {/* RIGHT: Spacer (or put a button here later) */}
    <div className="justify-self-end h-10 w-10" />
  </div>
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
        <div className="flex mt-5 justify-center">
            <LogoutBtn handleOnClick={handleLogout} className="w-[8.75rem] font-bold" />
    </div>
    </div>

  </div>
);
}


