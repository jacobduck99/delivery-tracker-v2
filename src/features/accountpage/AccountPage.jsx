import { LogoutBtn } from "../../components/buttons.jsx";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveProfile } from "../../lib/api/profileApi.js";
import { getUserId } from "../../lib/storage/userStorage.js";

export default function AccountPage({ logoutUser, displayName, setDisplayName }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile"); // "profile" | "security" | "preferences"
    const userId = getUserId();

    console.log("this is ur name", displayName);

    function handleLogout() {
        logoutUser();
      }

    function redirectToRun() {
        navigate("/run");
      }

    async function onClickUpdateName() {
        const payload = { displayName: displayName.trim(), userId };
        try {
            await saveProfile(payload);
          } catch (e) {
            console.log("Couldn't save name", e);
          }
        }

  const tabBase =
    "flex-1 rounded-lg font-medium py-2 text-sm min-[390px]:py-2.5 min-[390px]:text-base transition";
  const tabActive = "bg-white shadow-sm text-gray-900";
  const tabInactive = "text-gray-600 hover:text-gray-900";

  return (
    <div className="h-[100dvh] bg-gray-100 px-4 min-[390px]:px-5 min-[430px]:px-6 overflow-hidden">
      <div className="mx-auto w-full min-[430px]:max-w-[28rem] md:max-w-[90rem] h-full overflow-y-auto space-y-4 min-[390px]:space-y-4">

        {/* TOP BAR */}
        <div className="px-4 py-4 min-[390px]:px-1 min-[390px]:py-1">
          <div className="grid grid-cols-[40px_1fr_40px] items-center">
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
            <h2 className="justify-self-center text-lg min-[390px]:text-lg min-[430px]:text-2xl font-semibold text-gray-900">
              Settings and activity
            </h2>

            {/* RIGHT: Spacer */}
            <div className="justify-self-end h-10 w-10" />
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-3 min-[390px]:p-4">
          <div className="bg-gray-100 rounded-xl p-1 min-[390px]:p-1.5 flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`${tabBase} ${activeTab === "profile" ? tabActive : tabInactive}`}
            >
              Profile
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`${tabBase} ${activeTab === "security" ? tabActive : tabInactive}`}
            >
              Security
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preferences")}
              className={`${tabBase} ${activeTab === "preferences" ? tabActive : tabInactive}`}
            >
              Preferences
            </button>
          </div>
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
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
              <div className="py-3 flex flex-col min-[390px]:py-4">
            

<form className="space-y-2">
  <label
    className="text-xs min-[390px]:text-sm text-gray-500"
    htmlFor="name"
  >
    Display name
  </label>

  <div className="flex items-center gap-2">
    <input
      id="name"
      type="text"
      value={displayName}
      onChange={(e) => setDisplayName(e.target.value)}
      className="w-[14rem] min-[390px]:w-[16rem] rounded-xl border border-gray-200 bg-white px-3 py-2.5
                 text-sm min-[390px]:text-base text-gray-900
                 placeholder:text-gray-400
                 focus:outline-none focus:ring-2 focus:ring-gray-200"
      placeholder="Enter a display name"
    />

    <button
      type="button"
      onClick={onClickUpdateName}
      disabled={!displayName.trim()}
      className="inline-flex items-center justify-center rounded-xl px-4 py-2.5
                 text-sm min-[390px]:text-base font-semibold
                 bg-gray-900 text-white shadow-sm
                 hover:bg-gray-800 active:scale-[0.98] transition
                 disabled:opacity-50 
                 disabled:hover:bg-gray-900 disabled:active:scale-100"
    >
      Update
    </button>
  </div>
</form>


              </div>

              <div className="py-3 min-[390px]:py-4">
                <p className="text-xs min-[390px]:text-sm text-gray-500">Appearance</p>
                <p className="text-base min-[390px]:text-lg font-medium text-gray-900">
                  Theme settings
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 min-[390px]:p-5 min-[430px]:p-6">
            <div className="mb-4 min-[390px]:mb-5">
              <h2 className="text-base min-[390px]:text-lg min-[430px]:text-xl font-semibold text-gray-900">
                Security
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your password and login protection.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              <button
                type="button"
                className="w-full text-left py-3 min-[390px]:py-4 hover:bg-gray-50 rounded-xl px-2 -mx-2"
              >
                <p className="text-sm font-medium text-gray-900">Change password</p>
                <p className="text-xs min-[390px]:text-sm text-gray-500">
                  Update your login security
                </p>
              </button>

              <button
                type="button"
                className="w-full text-left py-3 min-[390px]:py-4 hover:bg-gray-50 rounded-xl px-2 -mx-2"
              >
                <p className="text-sm font-medium text-gray-900">Active sessions</p>
                <p className="text-xs min-[390px]:text-sm text-gray-500">
                  Review devices signed in
                </p>
              </button>
            </div>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && (
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 min-[390px]:p-5 min-[430px]:p-6">
            <div className="mb-4 min-[390px]:mb-5">
              <h2 className="text-base min-[390px]:text-lg min-[430px]:text-xl font-semibold text-gray-900">
                Preferences
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Customize how the app looks and behaves.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              <button
                type="button"
                className="w-full text-left py-3 min-[390px]:py-4 hover:bg-gray-50 rounded-xl px-2 -mx-2"
              >
                <p className="text-sm font-medium text-gray-900">Theme</p>
                <p className="text-xs min-[390px]:text-sm text-gray-500">
                  Light / Dark / System
                </p>
              </button>

              <button
                type="button"
                className="w-full text-left py-3 min-[390px]:py-4 hover:bg-gray-50 rounded-xl px-2 -mx-2"
              >
                <p className="text-sm font-medium text-gray-900">Notifications</p>
                <p className="text-xs min-[390px]:text-sm text-gray-500">
                  Control alerts and reminders
                </p>
              </button>
            </div>
          </div>
        )}

        {/* QUICK ACTIONS (shows on all tabs) */}
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
              <p className="text-xs min-[390px]:text-sm text-gray-500">
                Update your login security
              </p>
            </div>
            <span className="text-gray-400 text-xl leading-none">›</span>
          </button>

          <button className="w-full text-left px-4 py-4 min-[390px]:px-5 hover:bg-gray-50 flex items-center justify-between border-t border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Theme</p>
              <p className="text-xs min-[390px]:text-sm text-gray-500">
                Light / Dark / System
              </p>
            </div>
            <span className="text-gray-400 text-xl leading-none">›</span>
          </button>

          <button className="w-full text-left px-4 py-4 min-[390px]:px-5 hover:bg-gray-50 flex items-center justify-between border-t border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Support</p>
              <p className="text-xs min-[390px]:text-sm text-gray-500">
                Get help or send feedback
              </p>
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
