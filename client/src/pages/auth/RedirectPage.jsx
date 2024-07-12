import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAuthSuccess } from "../../../state/actions/authActions";
import { useDispatch } from "react-redux";

function RedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const encodedUser = params.get("user");
    const user = JSON.parse(decodeURIComponent(encodedUser));

    dispatch(fetchAuthSuccess(user, token));
    navigate(`/Dashboard`);
  }, []);

  return null;
}

export default RedirectPage;
