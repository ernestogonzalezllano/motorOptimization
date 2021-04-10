import React, { useEffect, useState } from 'react';
import logo from "./logo.png"
import { createWorker } from 'tesseract.js';
import './App.css';
import Resizer from 'react-image-file-resizer';
import Modal from './Confirm';

function App() {
  
  const [carga, setCarga] = useState("");
  const [imagen, setImagen] = useState()
  const [contact,setContact] = useState({})
  const [read, setRead] = useState(false)
  const [dataMotor, setDataMotor] = useState({
  motorName:"",
  volts:"",
  ampers:"",
  powerFactor:"", 
  hp:"", 
  KW:"", 
  dailyUse:"",
  monthyUse:""})
  const [motor, setMotor] = useState([])
  const [cotiz,setCotiz] = useState(false)

  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 200, 600, 'PNG', 5, 0,
    uri => {
      resolve(uri);
    },
    'base64'
    );
  });

  const worker = createWorker({
    logger: m => setCarga(m.progress),
  });
  const doOCR = async (imagen) => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imagen);
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');

  async function handleRead (e){
    const file = e.target.files[0];
    /* const image = await resizeFile(file);*/ 
    setImagen(file); 
    doOCR(file);
  }

  function handleAddPic(e){
    setDataMotor({...dataMotor,img:e.target.files[0]})
  }

  function handleChangeContact(e){
    setContact({...contact, [e.target.name] :e.target.value} )
  }

  function handleChangeMotor(e){
    setDataMotor({...dataMotor, [e.target.name] :e.target.value} )
  }

  function handleAdd(){
    setMotor([...motor,dataMotor])
    setDataMotor({
      motorName:"",
      volts:"",
      ampers:"",
      powerFactor:"", 
      hp:"", 
      KW:"", 
      dailyUse:"",
      monthyUse:""})
  }

  useEffect(()=>{
    if(motor.length!==0){
      setRead(true)
    }
  },[motor])

  return (
    <div className="App">
      <div className="App-header">
        <img className="App-logo" src={logo}></img>
      </div>
      {!cotiz
      ?
      <div className="App-containerForm">
        <form className="App-form">
          <label for="inputCamera">
            <div className="App-form__readButton">
              Leer Placa
            </div>
          </label>
          <input 
          className="App-form__inputCamera" 
          id="inputCamera" 
          type="file" 
          capture="camera" 
          onChangeCapture={handleRead}/>
          <p>{ocr}</p>
          <p>{carga}</p>
          <div className="App-form__imgContainer" >
            <img src={imagen} />
          </div>
          
          <div className="App-form__containersInput">
            <label for="projectName">projectName</label>
            <input readOnly={read} type="text" id="projectName" name="projectName" onChange={handleChangeContact} />
          </div>
          <div className="App-form__containersInput">
            <label for="email">email</label>
            <input readOnly={read}  type="email" id="email" name="email" onChange={handleChangeContact} />
          </div>
          <div className="App-form__containersInput">
            <label for="country">country</label>
            <input readOnly={read}  type="text" id="country" name="country" onChange={handleChangeContact} />
          </div>
          <div className="App-form__containersInput">
            <label for="KWh">KWh</label>
            <input readOnly={read}  type="text" id="Kwh" name="Kwh" onChange={handleChangeContact} />
          </div>
          <div className="App-form__containersInput">
            <label for="motorName">motorName</label>
            <input value={dataMotor.motorName} type="text" id="motorName" name="motorName" onChange={handleChangeMotor} />
          </div>
          <div className="App-form__containersInput">
            <label for="startMode">startMode</label>
            <select name="startMode" id="startMode" onChange={handleChangeMotor}>
                <option value="Directa / (Y-D)">Directa / (Y-D)</option>
                <option value="Variador de frecuencia">Variador de frecuencia</option>
                <option value="Partidor suave">Partidor suave</option>
            </select>
          </div>
          <div className="App-form__containersInput">
            <label for="volts">volts</label>
            <input value={dataMotor.volts} type="number" id="volts" name="volts" onChange={handleChangeMotor} />
          </div>
          <div className="App-form__containersInput">
            <label for="ampers">ampers</label>
            <input value={dataMotor.ampers} type="number" id="ampers" name="ampers" onChange={handleChangeMotor} />
          </div>
          <div className="App-form__containersInput">
            <label for="powerFactor">powerFactor</label>
            <input value={dataMotor.powerFactor} type="number" id="powerFactor" name="powerFactor" onChange={handleChangeMotor} />
          </div>
          <div className="App-form__containersInput">
            <label for="hp">hp</label>
            <input value={dataMotor.hp} type="number" id="hp" name="hp" onChange={handleChangeMotor} />
          </div>
          <div className="App-form__containersInput">
            <label for="KW">KW</label>
            <input value={dataMotor.KW} type="number" id="KW" name="KW" onChange={handleChangeMotor} />
          </div>
          <div className="App-form__containersInput">
            <label for="dailyUse">dailyUse</label>
            <input value={dataMotor.dailyUse} type="number" id="dailyUse" name="dailyUse" onChange={handleChangeMotor} />
          </div>
          <div className="App-form__containersInput">
            <label for="monthyUse">monthyUse</label>
            <input value={dataMotor.monthyUse} type="number" id="monthyUse" name="monthyUse" onChange={handleChangeMotor} />
          </div>
          <label for="addPic">
            <div className="App-form__addPic">
              FOTO MOTOR
            </div>
          </label>
          <input 
          className="App-form__inputPic" 
          id="addPic" 
          type="file" 
          capture="camera" 
          onChangeCapture={handleAddPic}/>
        </form>
        <div className="App-form__informationContainer" >
          <label className="App-form__informationContainer__number">{motor.length}</label>
          <label className="App-form__informationContainer__text">
            Motores Añadidos
          </label>
        </div>
        <div className="App-form__buttonsContainer">
          <button onClick={handleAdd}>Añadir motor</button>
          <button onClick={()=>setCotiz(true)}>Cotizar</button>
        </div>
      </div>
      :
      <Modal/>}
    </div>
  );
}

export default App;
