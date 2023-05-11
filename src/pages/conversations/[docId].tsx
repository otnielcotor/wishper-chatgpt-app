import {NextPage} from "next";
import {useRouter} from "next/router";
import ChatPresentation from "@/rcs/ChatPresentation";
import {db} from "../../../firebase";
import {collection, doc, DocumentData, getDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {MessageSchema} from "@/pages";
import {getDocs} from "@firebase/firestore";

export default function DocPage():JSX.Element {
    const router = useRouter();
    const index= router.query.docId as string;
    const [messages,setMessages] = useState<MessageSchema[]>([]);
    const [chats,setChats] = React.useState<DocumentData[]>([]);

    const fetchData = async ()=>{
        const querySnapshot = await getDocs(collection(db, "chats"));
        setChats(querySnapshot.docs.map(doc => doc.data()));
        console.log(chats)
    }

    useEffect(()=>{
        void fetchData();
    },[])

    return <>{chats.length>1 && <ChatPresentation messagesArray={chats[Number(index)].messages as MessageSchema[]}/>}</>;
}