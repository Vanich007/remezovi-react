import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogProps = { title: string, text: string, agreeCb: () => void, cancelCb: () => void }
export default function AlertDialog({title, text, agreeCb, cancelCb}: AlertDialogProps) {
    // const [open, setOpen] = React.useState(false);
    //
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <React.Fragment>
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={cancelCb} autoFocus>
                        Отмена
                    </Button>
                    <Button onClick={agreeCb}>Согласен</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}