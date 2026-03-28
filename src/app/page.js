import Image from "next/image";
import styles from "./home.module.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.content}>
            <h1>Welcome to My Blog 🚀</h1>
            <p>
              Discover amazing articles, tutorials, and insights. Stay updated
              with the latest trends in tech and design.
            </p>
            <button className={styles.btn}>Explore Blogs</button>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
              alt="Hero Image"
              fill
              className={styles.image}
            />
          </div>
        </section>

        {/* BLOG SECTION */}
        <section className={styles.blogs}>
          <h2>Latest Posts</h2>

          <div className={styles.blogGrid}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.card}>
                <Image
                  src="/blog.jpg"
                  alt="blog"
                  width={300}
                  height={200}
                  className={styles.cardImg}
                />
                <h3>Blog Title {item}</h3>
                <p>Short description of the blog post goes here.</p>
                <button className={styles.readBtn}>Read More</button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
