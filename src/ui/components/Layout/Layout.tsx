import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";
import { Sidebar } from "../sidebar/Sidebar";
import { Header } from "../header/Header";
import { useAppSelector } from "../../../app/store/Store";
import { selectIsAuthenticated } from "../../../auth/feature/AuthSlice";

export const Layout: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className={styles["Layout"]}>
      <Header />
      <Sidebar />
      <main className={styles["main"]}>
        <Outlet />
      </main>
    </div>
  );
};
