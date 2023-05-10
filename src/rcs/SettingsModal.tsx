import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Modal, Typography} from "@mui/material";
import {Box} from "@mui/system";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {pink, yellow} from "@mui/material/colors";
import CloseIcon from '@mui/icons-material/Close';

type SettingsModalProps = {
    open:boolean
    onClose: (language:string,role:string) => void
}



export default function SettingsModal(props:SettingsModalProps) {

    const [language, setLanguage]=useState("EN");
    const [role, setRole]=useState("1");

    const languageOptions=(<List>
            {['RO', 'FR', 'EN'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemText disableTypography primary={text}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>);

    const roleOptions=(<List>
        {['1', '2', '3'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemText disableTypography primary={text}/>
                </ListItemButton>
            </ListItem>
        ))}
    </List>);


    return(
        <React.Fragment>

            <Modal
                open={props.open}
                onClose= { () => {props.onClose(language, role)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="css-su28s1">
                    <div id="closeBtn">
                    <Button  onClick={ () => {props.onClose(language, role)} } startIcon={<CloseIcon />}></Button>
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2" pl={'1rem'}>
                        Language
                    </Typography>
                    <div className="languageOptions">
                        <Button className="optionButton">EN</Button>
                        <Button className="optionButton">FR</Button>
                        <Button className="optionButton">RO</Button>
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2" pl={'1rem'}>
                        Chatbot Role
                    </Typography>
                    <div className="roleOptions">
                        <Button className="optionButton">1</Button>
                        <Button className="optionButton">2</Button>
                        <Button className="optionButton">3</Button>
                    </div>

                    <div className="okBtn">
                        <Button className="okButton">OK</Button>
                    </div>
                </Box>
            </Modal>
        </React.Fragment>);
}
