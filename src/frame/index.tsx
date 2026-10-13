import styles from "./style.module.css";

export function Frame({ nowPlaying }: { nowPlaying?: { name: string; artist: string } }) {
  return (
    <header className={`frame ${styles.frame}`}>
      <h1 className={styles.frame__title}>Denzel Rigaud</h1>
      <p className={styles.frame__subtitle}>
        <a
          href="https://www.google.com/search?q=full+stack+developer"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          full-stack developer
        </a>
      </p>
      <a className={styles.frame__github} href="https://www.tiktok.com/@smiledenzel">
        TikTok
      </a>
      <a className={styles.frame__archive} href="https://www.instagram.com/smiledenzel/">
        Instagram
      </a>
      <a className={styles.frame__linkedin} href="https://www.linkedin.com/feed/">
        LinkedIn
      </a>
      <a className={styles.frame__snapchat} href="https://snapchat.com/t/NsQxXMoF">
        Snapchat
      </a>
      <p className={styles.frame__music}>{nowPlaying ? `♫ "${nowPlaying.name}" — ${nowPlaying.artist}` : "♫ select a track"}</p>
    </header>
  );
}
