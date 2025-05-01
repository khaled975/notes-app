import { getNameLetters } from "../utils/helpers";

function ProfileInfo({ userName, onLogout }) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-slate-400 w-10 h-10 rounded-full flex items-center justify-center">
        {userName && getNameLetters(userName)}
      </div>
      <div className="flex flex-col items-start">
        <p className="hidden sm:block">
          {userName.length > 10 ? `${userName.slice(0, 10)}...` : userName}
        </p>
        <button
          onClick={onLogout}
          className="cursor-pointer underline text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
