"use client";

import Image from "next/image";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.text}>
          <h1>About MyBlog</h1>
          <p>
            Welcome to MyBlog! We are passionate about sharing insightful articles, tutorials, and
            resources to help you grow and stay informed.
          </p>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/about-hero.jpg"
            alt="About Image"
            fill
            className={styles.image}
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality content that inspires, educates, and empowers our readers.
          From tech tutorials to lifestyle insights, we cover a wide range of topics with clarity and passion.
        </p>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.card}>
            <Image src="/team1.jpg" alt="Team Member" width={200} height={200} className={styles.teamImage}/>
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className={styles.card}>
            <Image src="/team2.jpg" alt="Team Member" width={200} height={200} className={styles.teamImage}/>
            <h3>Jane Smith</h3>
            <p>Content Lead</p>
          </div>
          <div className={styles.card}>
            <Image src="/team3.jpg" alt="Team Member" width={200} height={200} className={styles.teamImage}/>
            <h3>Mike Johnson</h3>
            <p>Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
}