import {MessageSchema} from "@/pages";
import {Box} from "@mui/system";
import styles from "@/styles/Home.module.css";
import {Grid, Typography} from "@mui/material";
import React from "react";

interface ChatPresentationProps {
    messagesArray: MessageSchema[];
}

export default function ChatPresentation(props: ChatPresentationProps) {
    const {messagesArray} = props;
    console.log("MESSAGES ARRAY",messagesArray);
    return (
        <Box sx={{paddingX: '5rem',paddingY:'10rem'}}>
            <div className={`${styles.gridContainer} ${styles.gridScrollbar}`}>
                <Grid container spacing={1} justifyContent={"center"} alignItems={"center"} >
                    <Grid item container alignItems={"center"} justifyContent={"center"} xs={10}
                          direction={"column"}>
                        {
                            messagesArray.map((message, index) => {
                                return (
                                    <Grid item justifyContent={"center"} p={10} key={index}>
                                        <div className={styles.description}>
                                            <Typography fontSize={'2rem'}>
                                                {message.content}
                                            </Typography>
                                        </div>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}