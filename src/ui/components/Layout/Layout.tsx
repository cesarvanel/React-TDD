import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss"
import { Sidebar } from "../sidebar/Sidebar";

export const Layout: React.FC = () => {
  return (
    <div className={styles["Layout"]}>
      <Sidebar />
      <main className={styles["main"]}>
        <Outlet />
      </main>
    </div>
  );
};
