"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./register.module.css";
import useAuth from "@/context/authcontext/AuthContext";

const Register = () => {
  const { state, handleRegisterChange, registerSubmit } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMessage("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.top}>
          <p className={styles.badge}>Get Started</p>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>
            Fill in your details to create a new account
          </p>
        </div>

        <form className={styles.form} onSubmit={registerSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={state.registerObj.name}
                onChange={handleRegisterChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={state.registerObj.email}
                onChange={(e) => handleRegisterChange(e)}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create password"
                value={state.registerObj.password}
                onChange={(e) => handleRegisterChange(e)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password</label>
              <input
                name="cpassword"
                type="password"
                placeholder="Confirm password"
                value={state.registerObj.cpassword}
                onChange={(e) => handleRegisterChange(e)}
                required
                className={styles.input}
              />
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Register Now
          </button>
        </form>

        {/* {message && (
          <p
            className={`${styles.message} ${
              message.toLowerCase().includes("successful")
                ? styles.success
                : styles.error
            }`}
          >
            {message}
          </p>
        )} */}

        <p className={styles.bottomText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.loginLink}>
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
