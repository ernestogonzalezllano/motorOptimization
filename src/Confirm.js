import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid, Modal } from '@material-ui/core';
import logo from "./logo.svg"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import SendIcon from '@material-ui/icons/Send';

import imageC from "./imageC.png"


const useStyles = makeStyles((theme)=>({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(8)
    },  
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    avatar: {
        width: '25%',
        height: '25%'
      },
    sendIcon:{
        position:"fixed",
        bottom:"2em",
        right:"2em",
        color: "#2d3684" ,
        backgroundColor: "#d0e86f"
    },
    modalOpen:{
        background:"white",
        border: 'none',
        outline:"none",
        padding: theme.spacing(2, 4, 3)
    }
}));



export default function Confirm({data,contact,reset}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        console.log(reset);
        setOpen(false);
        reset()
      };
    

    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar} 
            src={logo}>
            </Avatar>
            <Typography component="h1" variant="h5">
            Ahorro Electrico Motores
            </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography component="h3" variant="subtitle1">
                   Nombre del Proyecto:  {contact.projectName}
                </Typography>
            </Grid>
            {data.map((e)=>{
            return (<Grid item xs={12}>
            <Card >
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={e.img?URL.createObjectURL(e.img):imageC}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {e.motorName}
                        </Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem >
                                <ListItemText primary="Factor" secondary={e.powerFactor} />
                                </ListItem>
                                <ListItem >
                                <ListItemText primary="Partida" secondary={e.startMode} />
                                </ListItem>
                            </List> 
                        </Grid>
                        <Grid item xs={3}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem >
                            <ListItemText primary="Voltaje" secondary={e.volts} />
                            </ListItem>
                            <ListItem >
                            <ListItemText primary="Amperes" secondary={e.ampers} />
                            </ListItem>
                        </List>   
                        </Grid>
                        <Grid item xs={3}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem >
                                <ListItemText primary="Kw" secondary={e.KW} />
                                </ListItem>
                                <ListItem >
                                <ListItemText primary="Hp" secondary={e.hp} />
                                </ListItem>
                            </List> 
                        </Grid>
                        <Grid item xs={3}>
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItem >
                                <ListItemText primary="Uso Mensual" secondary={e.monthyUse} />
                                </ListItem>
                                <ListItem >
                                <ListItemText primary="Uso Diario" secondary={e.dailyUse} />
                                </ListItem>
                            </List> 
                        </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>

            </Card>
        </Grid>)

            })
            }
        </Grid>
        <Button
        variant="contained"
        className={classes.sendIcon}
        endIcon={<SendIcon/>}
        onClick={handleOpen}
      >
        Enviar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            <div className={classes.modalOpen} >
                <h2 id="simple-modal-title">¡Muchas gracias!</h2>
                <p id="simple-modal-description">
                    Recibimos la informacion, pronto te contactaremos a : {contact.email}
                </p>
            </div>
        </Modal>
    </div>
    );
}