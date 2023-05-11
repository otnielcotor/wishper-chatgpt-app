import {MessageSchema} from "@/pages";
import {Box, padding} from "@mui/system";
import styles from "@/styles/Home.module.css";
import {Grid, Typography} from "@mui/material";
import React from "react";
import CustomDrawer from "@/rcs/CustomDrawer";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface ChatPresentationProps {
    messagesArray: MessageSchema[];
}

export default function ChatPresentation(props: ChatPresentationProps) {
    const {messagesArray} = props;
    console.log("MESSAGES ARRAY", messagesArray);
    return (
        <>
            <CustomDrawer/>
            <Box sx={{paddingX: '5rem', paddingY: '10rem'}}>
                <div className={`${styles.gridContainer} ${styles.gridScrollbar}`}>
                    <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>
                        <Grid item container alignItems={"center"} justifyContent={"center"} xs={10}
                              direction={"column"}>
                            {
                                messagesArray.map((message, index) => {
                                    return (
                                        <>
                                            <Grid item justifyContent={"center"} p={5} key={index}>
                                                <div className="replyIcon">
                                                    {
                                                        message.role === "system" && (
                                                            <>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'start'
                                                                }}>
                                                                    <div style={{paddingTop:'1.5rem', paddingRight:'1rem'}}>
                                                                        <SmartToyIcon sx={{fontSize: '2.5rem'}}/>
                                                                    </div>
                                                                    <Typography fontSize={'2rem'}
                                                                        // className={styles.description}>
                                                                    >
                                                                        {message.content}
                                                                    </Typography>
                                                                </div>
                                                            </>
                                                        )
                                                    }

                                                    {
                                                        message.role === "user" && (
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'start'
                                                            }}>
                                                            <div style={{paddingTop:'1.5rem', paddingRight:'1rem'}}>
                                                                    <AccountBoxIcon sx={{fontSize: '2.5rem'}}/>
                                                            </div>

                                                                    <Typography fontSize={'2rem'}
                                                                                className={styles.description}>
                                                                        {message.content}
                                                                    </Typography>
                                                            </div>

                                                        )
                                                    }
                                                </div>
                                            </Grid>
                                        </>
                                    );
                                })
                            }
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </>
    );
}