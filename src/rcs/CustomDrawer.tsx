import React from "react";
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

type Anchor = 'left';
export default function CustomDrawer() {
    const [state, setState] = React.useState({
        left: false
    });

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
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText disableTypography primary={text} style={textCustom}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={textCustom}>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText disableTypography primary={text} style={textCustom}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
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

                    {menu("left")}

                </Drawer>

            </React.Fragment>

        </div>
    );
}