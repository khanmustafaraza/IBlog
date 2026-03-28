import React from "react";
import styles from "./topbar.module.css";
// import { FaBell, FaSearch } from "react-icons";

const Topbar = () => {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <h2 className={styles.logo}>Dashboard</h2>
      </div>

      <div className={styles.center}>
        <div className={styles.searchBox}>
          {/* <FaSearch size={18} className={styles.searchIcon} /> */}
          <input
            type="text"
            placeholder="Search anything..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          {/* <FaBell size={20} /> */}
          <span className={styles.dot}></span>
        </button>

        <div className={styles.profile}>
          <div className={styles.avatar}>M</div>
          <div className={styles.userInfo}>
            <p className={styles.name}>Mustafa</p>
            <span className={styles.role}>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
