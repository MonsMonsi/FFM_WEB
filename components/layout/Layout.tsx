import { NavBar } from "./NavBar";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import SideBar from "./SideBar";
import { drawerWidth } from './SideBar';
import styles from "./Layout.module.css"

export default function Layout({ children }: any) {
    return (
        <div>
            <Head>
                <title>FFM-WEB</title>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <NavBar/>
            <main className={styles.content}
                style={{ marginLeft: `${drawerWidth}px` }}
            >
                <SideBar/>
                {children}
            </main>
            
            {/* <Grid container
                sx={{ 
                    width: "auto", height: "auto", minHeight: "100vh", marginLeft: `${drawerWidth}px`, 
                    backgroundColor: "#5e87c250" 
                }}
            >
                <Grid item>
                    {children}
                </Grid>
            </Grid> */}
        </div>
    )
}