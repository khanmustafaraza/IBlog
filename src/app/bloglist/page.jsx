"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./bloglist.module.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllBlogs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/posts"); // make sure API route matches
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (isLoading) return <p className={styles.message}>Loading blogs...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;
  if (blogs.length === 0) return <p className={styles.message}>No blogs found.</p>;

  return (
    <div className={styles.blogListContainer}>
      <h1 className={styles.pageTitle}>Latest Blogs</h1>
      <div className={styles.blogGrid}>
        {blogs.map((post) => (
          <div key={post._id} className={styles.blogCard}>
            {post.image && (
              <div className={styles.imageWrapper}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={styles.blogImage}
                  priority={true}
                />
              </div>
            )}
            <div className={styles.blogContent}>
              <h2 className={styles.blogTitle}>{post.title}</h2>
              <p className={styles.blogDesc}>{post.desc}</p>
              <button className={styles.readMoreBtn}>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;