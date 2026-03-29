"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";
import useAuth from "@/context/authcontext/AuthContext";

const Login = () => {
  const { handleLoginChange, loginSubmit, state } = useAuth();

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.top}>
          <p className={styles.badge}>Welcome Back</p>
          <h1 className={styles.title}>Login to your account</h1>
          <p className={styles.subtitle}>
            Enter your email and password to continue
          </p>
        </div>

        <form className={styles.form} onSubmit={(e)=>loginSubmit(e)}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={state.loginObj.email}
              onChange={(e) => handleLoginChange(e)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label}>Password</label>
              <span className={styles.forgot}>Forgot?</span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={state.loginObj.password}
              onChange={(e) => handleLoginChange(e)}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button} >
         Login Now
          </button>
        </form>

     

        <p className={styles.bottomText}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.registerLink}>
            Register first
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
