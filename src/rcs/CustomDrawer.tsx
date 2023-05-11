import React, {useEffect} from "react";
import {Box} from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";
import {Drawer} from "@mui/material";
import {collection, DocumentData} from "firebase/firestore";
import {db} from "../../firebase";
import {getDocs} from "@firebase/firestore";
import {QuerySnapshot} from "@firebase/firestore-types";
import {router} from "next/client";
import {useRouter} from "next/router";
import AddCommentIcon from '@mui/icons-material/AddComment';


type Anchor = 'left';


export default  function CustomDrawer() {
    const [state, setState] = React.useState({
        left: false
    });
    const [chats,setChats] = React.useState<DocumentData[]>([]);
    const router = useRouter();
const fetchData = async ()=>{
    const querySnapshot = await getDocs(collection(db, "chats"));
    setChats(querySnapshot.docs.map(doc => doc.data()));
    console.log("querySnapshot",chats)
}

useEffect(()=>{
    void fetchData();
},[])

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    const textCustom = {
        color: "white",
        fontWeight: 400,
        fontSize: '2rem',
        fontFamily: "Roboto Condensed"
    }


    const menu = (anchor: Anchor) => (
        <Box
            sx={{width: 250, backgroundColor: "#143F46", paddingTop: '2rem'}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                    <ListItem key={"newChat"} disablePadding>
                        <ListItemButton onClick={ () => {
                            router.push('/')
                        }
                        }>
                            <ListItemIcon>
                               <AddCommentIcon/>
                            </ListItemIcon>
                            <ListItemText disableTypography primary={"New Chat"} style={textCustom}/>
                        </ListItemButton>
                    </ListItem>
            </List>
            <Divider/>
            <List>
                {chats.map((message, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={()=>{
                            router.push('/conversations/'+ index)}}>
                            <ListItemIcon style={textCustom}>
                                <MailIcon/>
                            </ListItemIcon>
                            <ListItemText disableTypography primary={<p>{index}</p>} style={textCustom}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (<div style={{zIndex:'100', position:'absolute'}}>
            <React.Fragment key={"left"}>
                <Button onClick={toggleDrawer("left", true)}
                        endIcon={<ArrowForwardIosTwoToneIcon sx={{fontSize: '2rem !important'}}/>}
                        className="customMenuButton"> </Button>
                <Drawer
                    anchor={"left"}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#143F46",
                            color: "orange"
                        }
                    }}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                    sx={{display: {xs: "none", sm: "block"}}}
                >

                    {chats && menu("left")}

                </Drawer>

            </React.Fragment>

        </div>
    );
}