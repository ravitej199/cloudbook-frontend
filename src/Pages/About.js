import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      
      <section className={styles.section}>
        <h2>Our Mission</h2>
        <p>
          Our web application is designed to help you organize, manage, and keep track of your personal notes with ease. 
          Whether you're a student, professional, or just someone who loves to stay organized, our app provides a simple 
          yet powerful solution for your note-taking needs.
        </p>
      </section>

      <section className={styles.section}>
        <h2>The Story Behind the App</h2>
        <p>
          The idea for this application started when I realized the need for a web version application to manage personal notes. 
        </p>
      </section>

       
    </div>
  );
};

export default About;
