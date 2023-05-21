import React, {useState, useEffect} from 'react';
import './MainArea.css';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";


export default function MainArea() {
  const [inputInfo, setInputInfo] = useState({
    title: "",
    subtitle: "",
    body: ""
  });
  
  
  const [inputModify, setInputModify] = useState({
    title: "",
    subtitle: "",
    body: ""
  });
  
  const [validationTitle, setValidationTitle] = useState(true);
  const [validationBody, setValidationBody] = useState(true);
  
  const selected = useSelector(state => state.selectedReducer.selectedNote);
  
  useEffect(() => {
    setInputModify(selected);
  }, [selected]);

  const dispatch = useDispatch();
  
  

  const updateInputs = (e) => {
    const actualInput = e.target.getAttribute('id');

    if(selected.toggle){
      const newObjectState = {...inputModify, [actualInput]: e.target.value};
      setInputModify(newObjectState);
    }else if(!selected.toggle) {
      const newObjectState = {...inputInfo, [actualInput]: e.target.value};
      setInputInfo(newObjectState);
    }

  };

  const handleForm = (e) => {
    e.preventDefault();

    if(selected.toggle) {
      if(selected.title.length < 1) {
        setValidationTitle(false);
        return;
      };

      if(selected.body.length < 1) {
        console.log("faux body");
        setValidationBody(false);
        return;
      };
  
      setValidationTitle(true);
      setValidationBody(true);

      dispatch({
        type: "UPDATENOTE",
        payload: inputModify
      });
      dispatch({
        type: "RESETNOTE"
      });
      setInputModify({
        title: "",
        subtitle: "",
        body: ""
      });

    }else if(!selected.toggle) {
      if(inputInfo.title.length < 1) {
        setValidationTitle(false);
        return;
      };
  
      if(inputInfo.body.length < 1) {
        setValidationBody(false);
        return;
      };
  
      setValidationTitle(true);
      setValidationBody(true);
      
      dispatch({
        type: "ADDNOTE",
        payload: {
          ...inputInfo,
          id: uuidv4()
        }
      });
      setInputInfo({
        title: "",
        subtitle: "",
        body: ""
      });
      
    };


  };


  return (
    <div className='container-content'>
        <h2>Votre plume</h2>
        <form onSubmit={handleForm}>
            <label htmlFor="title">Le Titre</label>
            <input 
            value={inputModify.toggle ? inputModify.title : inputInfo.title}
            onChange={updateInputs}
            type="text" 
            id="title" />
            {!validationTitle && (<span className='info-validation'>Veuillez renseigner un titre.</span>)}

            <label htmlFor="subtitle">Sous-titre</label>
            <input 
            value={inputModify.toggle ? inputModify.subtitle : inputInfo.subtitle}
            onChange={updateInputs}
            type="text" 
            id="subtitle" />

            <label htmlFor="body">Votre Text</label>
            <textarea 
            value={inputModify.toggle ? inputModify.body : inputInfo.body}
            onChange={updateInputs}
            id="body" 
            placeholder='Votre text...'></textarea>
            {!validationBody && (<span className='info-validation'>Veuillez renseigner une note.</span>)}
            <button>Enregistrer</button>
        </form>
    </div>
  )
}
