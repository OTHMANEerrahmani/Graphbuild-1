import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import moment from "moment";

export const isAuthenticated = () => {
  const auth = useSelector((state) => state.auth);
  if (auth.token && auth.user) return true;
  else return false;
};

export const isAdmin = () => {
  const auth = useSelector((state) => state.auth);
  if (auth?.user?.isAdmin) return true;
  else return false;
};

export function PrivateRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/" />;
}

export function PrivateRouteAuth({ element }) {
  return !isAuthenticated() ? element : <Navigate to="/" />;
}

export const isSubscribe = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth || !auth.user) return false;

  const subscription = auth?.user?.subscription;

  if (!subscription) return false;

  const endDate = moment(subscription.planEndDate);
  const currentDate = moment();

  if (endDate.isAfter(currentDate)) {
    return subscription.planType;
  } else {
    return false;
  }
};

