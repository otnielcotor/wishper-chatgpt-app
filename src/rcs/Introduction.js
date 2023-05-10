import styles from '@/styles/Home.module.css'
import {Roboto, Roboto_Condensed} from 'next/font/google'
import {Typography} from "@mui/material";
const roboto = Roboto_Condensed({ subsets: ['latin'], weight:"400" })
const introductionStyle ={
    alignContent:"center",
    display: "flex",
    justifyContent: "center",
    paddingTop: '2rem',
    fontFamily: `${roboto.className}`,
    fontWeight: "400",
    fontSize: '4.5rem'
}
export default  function Introduction ()
{
    return (
        <>
            <Typography sx={introductionStyle}>WHISHPER-CHATGPT</Typography>
        <h2 className={`${styles.center} ${styles.white} ${roboto.className}` }>Hello! Welcome to WHISPER-CHATGPT App page</h2>
        </>
    );
}