import styles from "./NotFound.module.css";

const NotFound = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.icon}>⚠️</div>

        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  );
};

export default NotFound;
