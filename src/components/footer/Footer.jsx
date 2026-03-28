import React from "react";
import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Brand */}
        <div className={styles.brand}>
          <h2>MyBlog</h2>
          <p>Sharing ideas, stories, and knowledge with the world.</p>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <div>
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/about">About</Link>
          </div>

          <div>
            <h4>Resources</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h4>Subscribe</h4>
          <p>Get latest posts directly in your inbox.</p>
          <div className={styles.inputBox}>
            <input type="email" placeholder="Enter your email" />
            <button>Join</button>
          </div>
        </div>

      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;