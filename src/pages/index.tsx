import Head from 'next/head'
import Image from 'next/image'
import {Roboto, Roboto_Condensed} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, {ReactNode, useEffect, useState} from 'react'
import Introduction from '../rcs/Introduction.js'
import ReactDOM from "react-dom/client";
import {AudioRecorder} from 'react-audio-voice-recorder';
import {CssBaseline, Drawer, Grid, Modal, Paper, Typography,} from "@mui/material";
import {Box} from "@mui/system";
import Button from '@mui/material/Button';

import SettingsIcon from '@mui/icons-material/Settings';
import CustomDrawer from "@/rcs/CustomDrawer";
import SettingsModal from "@/rcs/SettingsModal";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const robotoCon = Roboto_Condensed({subsets: ['latin'], weight: '400'});
import {addDoc, collection, doc, DocumentData, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

export interface MessageSchema {
    role: 'assistant' | 'user' | 'system';
    content: string;
}

// roles
const botRolePairProgrammer =
    'You are an expert pair programmer helping build an AI bot application with the OpenAI ChatGPT and Whisper APIs. The software is a web application built with NextJS with serverless functions, React functional components using TypeScript.';
const funBotRole = 'You are a translation mastermind. You translate from any language into romanian';
const nocontext = '';
const chatbotRole = ' Esti un robot care ma ajuta sa rezolv probleme personale.'

// personalities
const quirky =
    'You are quirky with a sense of humor. You crack jokes frequently in your responses.';
const drugDealer =
    'You are a snarky black market drug dealer from the streets of Los Angeles. Sometimes you are rude and disrespectful. You often curse in your responses.';
const straightLaced =
    'You are a straight laced corporate executive and only provide concise and accurate information.';
const memeLord = 'You are a good translator. You translate from any language into romanian';
// brevities
const briefBrevity = 'Your responses are always 1 to 2 sentences.';
const longBrevity = 'Your responses are always 3 to 4 sentences.';
const whimsicalBrevity = 'Your responses are always 5 to 6 sentences.';

// dials
const role = chatbotRole;
const personality = straightLaced;
const brevity = briefBrevity;

// FULL BOT CONTEXT/*${personality} ${brevity}*/
const botContext = `${role} `;

const defaultContextSchema: MessageSchema = {
    role: 'assistant',
    content: botContext,
};

export default function Home() {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("EN");
    const [role, setRole] = useState(chatbotRole);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [messagesArray, setMessagesArray] = useState([defaultContextSchema]);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [docRef, setDocRef] = useState<DocumentReference<DocumentData> | null>(null);
    if (messagesArray.length > 1 && !docRef) {
        const document = doc(collection(db, "chats"));
        // @ts-ignore
        setDocRef(document);
    }
    const handleOpen = () => setOpen(true);
    const handleClose = (language: string, role: string) => {

        setLanguage(language);
        setRole(role);
        setOpen(false);
    }

    useEffect(() => {
        if (
            messagesArray.length > 1 &&
            messagesArray[messagesArray.length - 1].role !== 'system'
        ) {
            gptRequest();
            if (docRef)
                setDoc(doc(db, "chats", docRef.id), {
                    messages: messagesArray,
                });
        }
        if (messagesArray[messagesArray.length - 1].role === 'system')
            handleAudioGeneration(messagesArray[messagesArray.length - 1].content);

    }, [messagesArray]);

    // gpt request
    const gptRequest = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: messagesArray,
                }),
            });

            const gptResponse = await response.json();
            setLoading(false);
            if (gptResponse.content) {
                setMessagesArray((prevState) => [...prevState, gptResponse]);
            } else {
                setError('No response returned from server.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const googlettsRequest = async (text: string, language: string) => {
        const response = await fetch('/api/googletts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text, language}),
        });
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioSrc(audioUrl);
    };
    const updateMessagesArray = (newMessage: string) => {
        const newMessageSchema: MessageSchema = {
            role: 'user',
            content: newMessage,
        };
        console.log({messagesArray});
        setMessagesArray((prevState) => [...prevState, newMessageSchema]);
    };

    // whisper request
    const whisperRequest = async (audioFile: Blob) => {
        setError(null);
        setLoading(true);
        const formData = new FormData();
        formData.append('file', audioFile, 'audio.wav');
        try {
            const response = await fetch('/api/whisper', {
                method: 'POST',
                body: formData,
            });
            const {text, error} = await response.json();
            if (response.ok) {
                updateMessagesArray(text);
            } else {
                setLoading(false);
                setError(error.message);
            }
        } catch (error) {
            console.log({error});
            setLoading(false);
            if (typeof error === 'string') {
                setError(error);
            }
            if (error instanceof Error) {
                setError(error.message);
            }
            console.log('Error:', error);
        }
    };

    function handleAudioGeneration(text: string) {
        const language = 'ro-RO';
        googlettsRequest(text, language);
    }

    return (
        <div className={`${robotoCon.className}  customBackgr`}>
            <div className="customBackgr">
                <Head>
                    <title>Whisper x ChatGpt</title>
                    <meta name="description" content="Generated by create next app"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <Introduction/>

                <div id="audio-recorder-grid">
                    {audioSrc && (
                        <audio style={{paddingRight: '1rem'}} src={audioSrc} controls onPlay={() => {
                            console.log("logged", audioSrc)
                        }}/>)
                    }
                    <AudioRecorder
                        onRecordingComplete={(audioBlob) => whisperRequest(audioBlob)}
                    />

                </div>

                <CustomDrawer/>

                <div className="alignSettingsButton">
                    <Button onClick={handleOpen} startIcon={<SettingsIcon sx={{fontSize: '2.5rem !important'}}/>}
                            className="settingsButton"></Button>
                </div>

                <SettingsModal open={open} onClose={handleClose}/>

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
                                                                        <div style={{
                                                                            paddingTop: '1.5rem',
                                                                            paddingRight: '1rem'
                                                                        }}>
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
                                                                    <div style={{
                                                                        paddingTop: '1.5rem',
                                                                        paddingRight: '1rem'
                                                                    }}>
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

                                                <div className={styles.description}>
                                                    <Typography fontSize={'2rem'}>
                                                        {message.content}
                                                    </Typography>
                                                </div>

                                            </>
                                        );
                                    })
                                }


                            </Grid>
                        </Grid>
                    </div>
                </Box>


            </div>
        </div>
    )

}
