import React , { useEffect, useState }from 'react';
import logo from "./logo.svg"
import { createWorker } from 'tesseract.js';
//import Resizer from 'react-image-file-resizer';
import Confirm from './Confirm';
import imageC from "./imageC.png"
import logoOCR from "./ocr.png"

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Divider, Input, Modal } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CircularProgress from '@material-ui/core/CircularProgress';



function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    width: '25%',
    height: '25%'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  labelInput:{
    width: "100%",
    display: "flex",
    backgroundColor: "silver",
    padding: "1em",
    borderRadius:" 5px",
    justifyContent: "center",
    boxShadow: "1px 1px 1px 0px grey"
  },
  inputFile:{
    display: "none"
  },
  contador:{
    width: "100%",
    backgroundColor: "#b3db4b",
    display: "flex",
    padding: "1em",
    borderRadius:" 5px",
    justifyContent: "center"
    },
    imageReadContainer:{
      display:"flex"
    },
    readedContainer:{
      justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    },
    modalOpen:{
      background:"white",
      border: 'none',
      outline:"none",
      padding: theme.spacing(2, 4, 3)
   },
   loadContainer:{
    flexDirection: "column",
    alignItems: "center",
    color: "grey",
    textAlign:"center"
   },
   containerImageOcr:{
     display: "flex",
     alignItems: "center"
   }

}));


export function validate(input) {
  
  let error={}
  if (!input.email) {
    error.email = true;
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    error.email = true;
  }
  if (!input.projectName) {
    error.projectName = true;
  }
  if (!input.country) {
    error.country = true;
  }
  if (!input.kwh) {
    error.kwh = true;
  }
  return error;
}

export function validateMotor(input) {
  let error={}
  if (!input.motorName) {
    error.motorName = true;
  }
  if (!input.volts) {
    error.volts = true;
  }
  if (!input.ampers) {
    error.ampers = true;
  }
  if (!input.powerFactor) {
    error.powerFactor = true;
  }
  if (!input.startMode) {
    error.startMode = true;
  }
  if (!input.hp) {
    error.hp = true;
  }
  if (!input.KW) {
    error.KW = true;
  }
  if (!input.dailyUse) {
    error.dailyUse = true;
  }
  if (!input.monthyUse) {
    error.monthyUse = true;
  }
  return error;
}


export default function AppMaterialUi() {
  const classes = useStyles();

  const [carga, setCarga] = useState(false);
  const [imagen, setImagen] = useState()
  const [contact,setContact] = useState({projectName:"", email:"", kwh:"", country:"" })
  const [errorContact, setErrorContact] = useState({projectName:true, email:true, kwh:true, country:true })
  const [read, setRead] = useState(false)
  const [errorMotor, setErrorMotor] = useState({
    motorName:true,
  volts:true,
  ampers:true,
  powerFactor:true, 
  startMode: true,
  hp:true, 
  KW:true, 
  dailyUse:true,
  monthyUse:true
  })
  const [dataMotor, setDataMotor] = useState({
  motorName:"",
  volts:"",
  ampers:"",
  powerFactor:"", 
  startMode: "",
  hp:"", 
  KW:"", 
  dailyUse:"",
  monthyUse:"",
  img:false
})
  const [motor, setMotor] = useState([])
  const [cotiz,setCotiz] = useState(false)
  const [ocr, setOcr] = useState(false);

  const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open);
      };
  
/*   const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 200, 600, 'PNG', 5, 0,
    uri => {
      resolve(uri);
    },
    'base64'
    );
  }); */

  const worker = createWorker({
    logger: m =>{
      if(m.length!==0) setCarga({status:m.status,progress:m.progress===0?0.05:m.progress})
    },
  });
  const doOCR = async (imagen) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imagen);
    setOcr(text);
  };

  async function handleRead (e){
    const file = e.target.files[0];
    /* const image = await resizeFile(file);*/ 
    
    setImagen(URL.createObjectURL(file)); 
    doOCR(file);
  }

  function handleAddPic(e){
    setDataMotor({...dataMotor,img:e.target.files[0]})
  }

  function handleChangeContact(e){
    setErrorContact(validate({...contact,[e.target.name] :e.target.value}))
    setContact({...contact, [e.target.name] :e.target.value} )
  }

  function handleChangeMotor(e){
    setErrorMotor(validateMotor({...dataMotor,[e.target.name] :e.target.value}))
    setDataMotor({...dataMotor, [e.target.name] :e.target.value} )
  }

  function handleAdd(e){
    e.preventDefault()
    if(Object.keys(errorContact).length!==0){
      handleOpen();
      return false
    }
    if(Object.keys(errorMotor).length!==0){
      handleOpen();
      return false
    }
    setRead(true)
    setMotor([...motor,dataMotor])
    setDataMotor({
      motorName:"",
      volts:"",
      ampers:"",
      powerFactor:"", 
      hp:"", 
      KW:"", 
      dailyUse:"",
      monthyUse:"",
      img:false
    })
    return true
  }
  function handleQuote(e){
    e.preventDefault()
     if(motor.length!==0 && Object.keys(errorMotor).length === 0 && Object.keys(errorMotor).length === 0){
      setCotiz(!cotiz)
      return
    }
    handleAdd(e) && setCotiz(!cotiz) 
  }

  function reset(){
    setCarga(false);
    setImagen()
    setContact({})
    setRead(false)
    setDataMotor({
      motorName:"",
      volts:"",
      ampers:"",
      powerFactor:"", 
      startMode: "",
      hp:"", 
      KW:"", 
      dailyUse:"",
      monthyUse:"",
      img:false
    })
    setMotor([])
    setCotiz(false)
    setOcr(false);
    setErrorMotor({
      motorName:true,
    volts:true,
    ampers:true,
    powerFactor:true, 
    startMode: true,
    hp:true, 
    KW:true, 
    dailyUse:true,
    monthyUse:true
    })
    setErrorContact({projectName:true, email:true, kwh:true, country:true })

  }

  useEffect(()=>{
    console.log(carga);
  })
  


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {!cotiz
      ?
      <div className={classes.paper}>
        
        <Avatar className={classes.avatar} 
        src={logo}>
        </Avatar>
        <Typography component="h1" variant="h5">
        Ahorro Electrico Motores
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errorContact.projectName}
                autoComplete="pname"
                name="projectName"
                variant="outlined"
                disabled={read}
                fullWidth
                id="projectMame"
                label="Nombre del Proyecto"
                autoFocus
                onChange={handleChangeContact}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errorContact.email}
                variant="outlined"
                disabled={read}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="Email"
                onChange={handleChangeContact}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                error={errorContact.country}
                variant="outlined"
                disabled={read}
                fullWidth
                id="country"
                label="Pais"
                name="country"
                autoComplete="country"
                onChange={handleChangeContact}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                error={errorContact.kwh}
                variant="outlined"
                disabled={read}
                fullWidth
                id="kwh"
                label="Kwh $"
                name="kwh"
                autoComplete="kwh"
                type="number"
                onChange={handleChangeContact}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={6} sm={6} className={classes.containerImageOcr}>
              <label className={classes.labelInput} 
              for="placa" 
              component="h1" 
              variant="h5"
              >
              OCR Placa Motor
              </label>
              <Input className={classes.inputFile}
              id="placa"
              type= "file"
              onChangeCapture={handleRead}
                ></Input>
            </Grid>

            <Grid className={classes.imageReadContainer} justify="center" justifyContent="center" item xs={6} sm={6}>
              {imagen?
              <img width="100px" height="100px" alt="imagen" src={imagen}/>
              :
              <img width="100px" height="100px" alt="imagen" src={logoOCR} />
              }
            </Grid> 

            <Grid item xs={12} sm={12} className={classes.readedContainer} >
              {ocr?
              <Typography style={{color:"grey"}} >
                {ocr}
              </Typography>
              :
              ""
              }
              {Math.round(carga.progress*100)>1 && <Box flex className={classes.loadContainer} >
                  <CircularProgressWithLabel value={Math.round(carga.progress*100)} />
                  <Typography>
                  {carga.status}
                  </Typography>
                </Box> 
              }
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
        
            <Grid item xs={12}>
              <TextField
                error={errorMotor.motorName}
                variant="outlined"
                required
                fullWidth
                id="motorName"
                label="Nombre del Motor"
                name="motorName"
                autoComplete="mname"
                value={dataMotor.motorName}
                onChange= {handleChangeMotor}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl error={errorMotor.startMode} item xs={12} variant="outlined" className={classes.formControl} >
              <InputLabel error={errorMotor.startMode} id="demo-simple-select-outlined-label">Tipo de Partida</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="startMode"
                  label="Tipo de Partida"
                  value= {dataMotor.startMode}
                  onChange={handleChangeMotor}
                >
                  <MenuItem value='Directa / (Y-D)'>Directa / (Y-D)</MenuItem>
                  <MenuItem value='Variador de frecuencia'>Variador de frecuencia</MenuItem>
                  <MenuItem value= 'Partidor suave'>Partidor suave</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                error={errorMotor.volts}
                variant="outlined"
                required
                fullWidth
                id="volts"
                label="Voltaje"
                name="volts"
                autoComplete="volts"
                type="number"
                value={dataMotor.volts}
                onChange= {handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                error={errorMotor.ampers}
                variant="outlined"
                required
                fullWidth
                id="ampers"
                label="Amperes"
                name="ampers"
                autoComplete="ampers"
                type="number"
                value= {dataMotor.ampers}
                onChange= {handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                error={errorMotor.powerFactor}
                variant="outlined"
                required
                fullWidth
                id="powerFactor"
                label="Factor de Potencia"
                name="powerFactor"
                autoComplete="pfactor"
                type="number"
                value= {dataMotor.powerFactor}
                onChange={handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                error={errorMotor.hp}
                variant="outlined"
                required
                fullWidth
                id="hp"
                label="Hp"
                name="hp"
                autoComplete="hp"
                type="number"
                value={dataMotor.hp}
                onChange={handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                error={errorMotor.KW}
                variant="outlined"
                required
                fullWidth
                id="KW"
                label="KW"
                name="KW"
                autoComplete="KW"
                type="number"
                value={dataMotor.KW}
                onChange={handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                error={errorMotor.dailyUse}
                variant="outlined"
                required
                fullWidth
                id="dailyUse"
                label="Uso Diario"
                name="dailyUse"
                autoComplete="dailyUse"
                type="number"
                value={dataMotor.dailyUse}
                onChange={handleChangeMotor}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                error={errorMotor.monthyUse}
                variant="outlined"
                required
                fullWidth
                id="monthyUse"
                label="Uso Mensual"
                name="monthyUse"
                autoComplete="monthyUse"
                type="number"
                value={dataMotor.monthyUse}
                onChange= {handleChangeMotor}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <label className={classes.labelInput}
                for="archivo" 
                component="h1" 
                variant="h5"
              >
            Foto del Motor
              </label>
              <Input className={classes.inputFile}
                id="archivo"
                type= "file"
                capture="camera"
                onChangeCapture={handleAddPic}
              >
              </Input>
            </Grid>

            <Grid className={classes.imageReadContainer} justify="center" justifyContent="center" item xs={12}>
              {dataMotor.img?
              <img width="100px" height="100px" alt="imagen" src={URL.createObjectURL(dataMotor.img)}/>
              :
              <img width="100px" height="100px" alt="imagen" src={imageC} />
              }
            </Grid>

            <Grid item xs={12} sm={12}>
              <label className={classes.contador}
                component="h1" 
                variant="h5"
              > 
              Proyecto con {motor.length} Motores
              </label>

            </Grid>
         </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                display="flex"
                onClick= {(e)=>{     
                  handleAdd(e)
                }}
              > 
              Agregar
              </Button>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                display="flex"
                onClick={handleQuote}
              > Cotizar
              </Button>
            </Grid>
        </Grid>
        
      </form>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            <div className={classes.modalOpen} >
                <h2 id="simple-modal-title">Debes llenar todos los campos:</h2>
                  <p id="simple-modal-description">
                      {Object.keys(errorContact).join(", ")}
                  </p>
                  <p id="simple-modal-description">
                      {Object.keys(errorMotor).join(", ")}
                  </p>
            </div>
        </Modal>
    </div>
    :
   <Confirm data={motor} contact={contact} reset={reset} />}

    </Container>
  );
}