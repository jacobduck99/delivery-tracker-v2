import { LogoutBtn } from "../../components/buttons.jsx";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveProfile } from "../../lib/api/profileApi.js";
import { updatePassword } from "../../lib/api/authApi.js";
import { saveDisplayName } from "../../lib/storage/accountPageStorage.js";
import { getUserId } from "../../lib/storage/userStorage.js";
import { LoaderCircle } from 'lucide-react';

export default function AccountPage({ logoutUser, displayName, setDisplayName }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile"); // "profile" | "security" | "preferences"
    const [newPassword, setnewPassword] = useState("");
    const [displayNameStatus, setDisplayNameStatus] = useState("idle"); // "saving" | "success" | "error"
    const [displayNameDraft, setDisplayNameDraft] = useState("");
    const [passwordStatus, setPasswordStatus] = useState("idle"); // "saving" | "success" | "error"
    const userId = getUserId();

    function handleLogout() {
        logoutUser();
      }

    function redirectToRun() {
        navigate("/run");
      }

    async function onClickUpdateName() {
        const payload = { displayName: displayNameDraft.trim(), userId };
        try {
            setDisplayNameStatus("saving");
            await saveProfile(payload);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setDisplayNameStatus("success");
            saveDisplayName(displayNameDraft);
            setDisplayName(displayNameDraft);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setDisplayNameStatus("idle");
          } catch (e) {
            setDisplayNameStatus("error"); console.log("Couldn't save name", e); }
        }

    async function onClickUpdatePassword() {
        const payload = { updatedPassword: newPassword.trim(), userId };
        try {
            setPasswordStatus("saving");
            await updatePassword(payload);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setPasswordStatus("success");
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setPasswordStatus("idle");
        } catch (e) {
            setPasswordStatus("error");
            console.log("Couldn't update password");
        }

    }
   
    function renderButtonContent(status) {
      if (status === "saving") {
        return (
          <span className="inline-flex items-center gap-2">
            <LoaderCircle className="h-4 w-4 animate-spin" />
          </span>
        );
      }
      if (status === "success") return "Updated";
      if (status === "error") return "Error";
      return "Update";
    }

      const tabBase =
        "flex-1 rounded-lg font-medium py-2 text-sm min-[390px]:py-2.5 min-[390px]:text-base transition";
      const tabActive = "bg-white shadow-sm text-gray-900";
      const tabInactive = "text-gray-600 hover:text-gray-900";

return (
  <div className="h-[100dvh] bg-background text-foreground px-4 min-[390px]:px-5 min-[430px]:px-6 overflow-hidden">
    <div className="mx-auto w-full min-[430px]:max-w-[28rem] md:max-w-[90rem] h-full overflow-y-auto space-y-4 min-[390px]:space-y-4">

      {/* TOP BAR */}
      <div className="px-4 py-4 min-[390px]:px-1 min-[390px]:py-1">
        <div className="grid grid-cols-[40px_1fr_40px] items-center">
          {/* LEFT: Back */}
          <button
            type="button"
            onClick={redirectToRun}
            className="justify-self-start inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted active:scale-95 transition"
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>

          {/* CENTER: Title */}
          <h2 className="justify-self-center text-lg min-[390px]:text-lg min-[430px]:text-2xl font-semibold text-foreground">
            Settings and activity
          </h2>

        </div>
      </div>

      {/* TABS */}
      <div className="bg-card text-card-foreground border border-border shadow-sm rounded-2xl p-3 min-[390px]:p-4">
        <div className="bg-muted rounded-xl p-1 min-[390px]:p-1.5 flex gap-1">
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
        <div className="bg-card text-card-foreground border border-border shadow-sm rounded-2xl p-4 min-[390px]:p-5 min-[430px]:p-6">
          <div className="mb-4 min-[390px]:mb-5">
            <h2 className="text-base min-[390px]:text-lg min-[430px]:text-xl font-semibold text-foreground">
              Personal information
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your personal information such as name and preferences.
            </p>
          </div>

          <div className="divide-y divide-border">
            <div className="py-3 flex flex-col min-[390px]:py-1">
              <form
                className="space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  onClickUpdateName();
                }}
              >
                <label
                  className="text-xs min-[390px]:text-sm px-1 text-muted-foreground"
                  htmlFor="name"
                >
                  Display name
                </label>

                <div className="flex items-center gap-2">
                  <input
                    id="name"
                    type="text"
                    value={displayNameDraft}
                    onChange={(e) => setDisplayNameDraft(e.target.value)}
                    className="w-[14rem] mt-1 min-[390px]:w-[13rem] rounded-xl border border-input bg-background px-3 py-2
                               text-sm min-[390px]:text-base text-foreground
                               placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter a display name"
                  />

                  <button
                    type="submit"
                    disabled={!displayNameDraft.trim() || displayNameStatus === "saving"}
                    className="inline-flex mt-1 items-center justify-center rounded-xl px-4 text-sm min-[390px]:text-base font-semibold
                               bg-blue-600 text-white shadow-sm min-w-[90px] h-10.5
                               hover:bg-blue-700 active:scale-[0.98] transition
                               disabled:opacity-80
                               disabled:hover:bg-blue-600 disabled:active:scale-100"
                  >
                    {renderButtonContent(displayNameStatus)}
                  </button>
                </div>
              </form>
            </div>

            <div className="py-3 min-[390px]:py-4">
              <p className="text-xs min-[390px]:text-sm text-muted-foreground">Appearance</p>
              <p className="text-base min-[390px]:text-lg py-2 font-ms text-foreground">
                Theme settings
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECURITY TAB */}
      {activeTab === "security" && (
        <div className="bg-card text-card-foreground border border-border shadow-sm rounded-2xl p-4 min-[390px]:p-5 min-[430px]:p-6">
          <div className="mb-4 min-[390px]:mb-5">
            <h2 className="text-base min-[390px]:text-lg min-[430px]:text-xl font-semibold text-foreground">
              Security
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Update your password and login protection.
            </p>
          </div>

          <div className="divide-y divide-border">
            <form
              className="space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                onClickUpdatePassword();
              }}
            >
              <label
                className="text-xs min-[390px]:text-sm px-1 text-muted-foreground"
                htmlFor="newPassword"
              >
                Change password
              </label>

              <div className="flex items-center gap-2">
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  className="w-[14rem] mt-1 min-[390px]:w-[13rem] rounded-xl border border-input bg-background px-3 py-2
                             text-sm min-[390px]:text-base text-foreground
                             placeholder:text-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Change your password"
                />

                <button
                  type="button"
                  onClick={onClickUpdatePassword}
                  disabled={!newPassword.trim()}
                  className="inline-flex mt-1 items-center justify-center rounded-xl px-4
                             text-sm min-[390px]:text-base font-semibold min-w-[90px]
                             h-10.5
                             bg-blue-600 text-white shadow-sm
                             hover:bg-blue-700 active:scale-[0.98] transition
                             disabled:opacity-90
                             disabled:hover:bg-blue-600 disabled:active:scale-100"
                >
                  {renderButtonContent(passwordStatus)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREFERENCES TAB */}
      {activeTab === "preferences" && (
        <div className="bg-card text-card-foreground border border-border shadow-sm rounded-2xl p-4 min-[390px]:p-5 min-[430px]:p-6">
          <div className="mb-4 min-[390px]:mb-5">
            <h2 className="text-base min-[390px]:text-lg min-[430px]:text-xl font-semibold text-foreground">
              Preferences
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Customize how the app looks and behaves.
            </p>
          </div>

          <div className="divide-y divide-border">
            <button
              type="button"
              className="w-full text-left py-3 min-[390px]:py-4 hover:bg-muted rounded-xl px-2 -mx-2"
            >
              <p className="text-sm font-medium text-foreground">Theme</p>
              <p className="text-xs min-[390px]:text-sm text-muted-foreground">
                Light / Dark / System
              </p>
            </button>

            <button
              type="button"
              className="w-full text-left py-3 min-[390px]:py-4 hover:bg-muted rounded-xl px-2 -mx-2"
            >
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="text-xs min-[390px]:text-sm text-muted-foreground">
                Control alerts and reminders
              </p>
            </button>
          </div>
        </div>
      )}

      {/* QUICK ACTIONS (shows on all tabs) */}
      <div className="bg-card text-card-foreground border border-border shadow-sm rounded-2xl overflow-hidden">
        <div className="px-4 py-3 min-[390px]:px-5 min-[390px]:py-4 border-b border-border">
          <h3 className="text-sm min-[390px]:text-base font-semibold text-foreground">
            Quick actions
          </h3>
          <p className="text-xs min-[390px]:text-sm text-muted-foreground mt-1">
            Common things you might want to do.
          </p>
        </div>

        <button
            onClick={() => setActiveTab(activeTab === "security" ? "profile" : "security")}
          className="w-full text-left px-4 py-4 min-[390px]:px-5 hover:bg-muted flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-medium text-foreground">{activeTab === "security" ? "Update name" : "Update password" }</p>
            <p className="text-xs min-[390px]:text-sm text-muted-foreground">{activeTab === "security" ? "Update your display name" : "Update your login info"}
            </p>
          </div>
          <span className="text-muted-foreground text-xl leading-none">›</span>
        </button>

        <button
            onClick={() => setActiveTab("preferences")}
          className="w-full text-left px-4 py-4 min-[390px]:px-5 hover:bg-muted flex items-center justify-between border-t border-border"
        >
          <div>
            <p className="text-sm font-medium text-foreground">Theme</p>
            <p className="text-xs min-[390px]:text-sm text-muted-foreground">
              Light / Dark / System
            </p>
          </div>
          <span className="text-muted-foreground text-xl leading-none">›</span>
        </button>

        <button
          className="w-full text-left px-4 py-4 min-[390px]:px-5 hover:bg-muted flex items-center justify-between border-t border-border"
        >
          <div>
            <p className="text-sm font-medium text-foreground">Support</p>
            <p className="text-xs min-[390px]:text-sm text-muted-foreground">
              Get help or send feedback
            </p>
          </div>
          <span className="text-muted-foreground text-xl leading-none">›</span>
        </button>
      </div>

      <div className="flex mt-5 justify-center">
        <LogoutBtn handleOnClick={handleLogout} className="w-[8.75rem] font-bold" />
      </div>
    </div>
  </div>
);

}
