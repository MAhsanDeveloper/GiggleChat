import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const [loading, logout] = useLogout();
  return (
    <div>
      {!loading ? (
        <button
          className="w-fit text-2xl px-4 py-2 text-white rounded-lg hover:bg-red-600"
          onClick={logout}
        >
          <CiLogout />
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;