import Link from "next/link";
import React from "react";
import styles from "./sidebar.module.css";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ data }) => {
  const iconMap = {
    dashboard: <FaTachometerAlt size={18} />,
    users: <FaUsers size={18} />,
    posts: <FaFileAlt size={18} />,
    settings: <FaCog size={18} />,
  };

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>AdminPanel</h1>
          <p className={styles.subText}>Manage your dashboard</p>
        </div>

        <nav className={styles.nav}>
          {data.map((item) => (
            <Link key={item.id} href={item.link} className={styles.navItem}>
              <span className={styles.icon}>
                {iconMap[item.icon] || <FaTachometerAlt size={18} />}
              </span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button className={styles.logoutBtn}>
        <FaSignOutAlt size={18} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
