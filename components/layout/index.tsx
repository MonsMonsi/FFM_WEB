import { NavBar, navBarHeight } from "./NavBar";
import Head from "next/head";
import styles from "./Layout.module.css"

export default function Layout({ children }: any) {
    return (
        <>
            <Head>
                <title>FFM-WEB</title>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <NavBar/>
            <main className={styles.content} style={{ marginTop: `${navBarHeight}px` }}>
                {children}
            </main>
        </>
    )
}