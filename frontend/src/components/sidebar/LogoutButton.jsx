import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const [loading, logout] = useLogout();
  return (
    <div>
      {!loading ? (
        <button
          className="w-fit text-2xl px-4 py-2 text-base-content rounded-lg hover:bg-base-100"
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