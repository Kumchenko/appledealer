import styles from './footer.module.scss';
import clsx from 'clsx';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={clsx(styles.container, "container")}>
                <a href="https://github.com/Kumchenko/appledealer" className={styles.footer__about} target="_blank" rel="noopener noreferrer">
                    2023 - Created by Kumchenko
                </a>
            </div>
        </footer>
    )
}