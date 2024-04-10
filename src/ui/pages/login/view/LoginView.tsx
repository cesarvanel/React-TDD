import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../app/store/Store";
import { AuthenticateWithGoogleAccount } from "../../../../auth/usecase/AuthenticateWithGoogleAccount";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../../../auth/feature/AuthSlice";

const LoginView = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleAuthWithGoogle = () => {
    setLoading(true);
    dispatch(AuthenticateWithGoogleAccount())
      .unwrap()
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className={styles["Login"]}>
      <div className={styles["container"]}>
        <h1>Login Page</h1>

        <button onClick={handleAuthWithGoogle}>
          {loading ? "..." : "Login in our app"}
        </button>
      </div>
    </div>
  );
};

export default LoginView;
