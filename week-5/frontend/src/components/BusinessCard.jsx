import {useState} from 'react';
import axios from 'axios';
import { AddEditCard } from './AddEditCard';

export function BusinessCard(props) {
  const [edit,setEdit] = useState(false);

  function removeCard(id){
    axios.delete(`http://localhost:3000/card/${id}`).then(response =>{
      props.setFlag((prev) => !prev);
    }) 
  }
  if(edit){
    return <AddEditCard name={props.name} description={props.description} interests={props.interests} _id={props._id} setFlag={props.setFlag} setEdit={setEdit}/>
  }
  else{
    return (
          <div className="card">
            <div className="header">
              <h1>{props.name}</h1>
              <button onClick={() => setEdit(!edit)}>Edit</button>
              <button onClick={() => removeCard(props._id)} style={{marginLeft:"1em"}}>X</button>
            </div>
            <p>{props.description}</p>
            <h3>Interests</h3>
            {props.interests.map((interest,idx) => {
              return <p key={idx}>{interest}</p>
            })}
            
            <div className="btn-group">
                {props.social.map((s,i) => {
                  return <button key={i} className="social-btn">{s}</button>
                })}
            </div>
          </div>
      )
    }
}