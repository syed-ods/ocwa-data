"use client";

import Image from "next/image";
import styles from "./page.module.css";

import DataCard from "@/app/components/DataCard";
// import { OntarioButton } from "@ongov/ontario-design-system-component-library-react";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <OntarioButton type="primary">Ontario Primary</OntarioButton> */}
      <div className={`${styles.center} ${styles.description}`}>
        <p>Your web app powered by Next.js & SQL</p>
      </div>
      <div className={styles.center}>
        <Image
          src="/OCWA.svg"
          alt="Next.js Logo"
          width={360}
          height={74}
          priority
        />
      </div>
      <DataCard />
      <br />
      <h2>Next.js Resources</h2>
      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
