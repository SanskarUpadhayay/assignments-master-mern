import { useState } from "react";
import axios from 'axios';

export function AddEditCard(props){
    const [name,setName] = useState(props.name);
    const [description,setDescription] = useState(props.description);
    const [interest,setInterest] = useState("");
    const [interests,setInterests] = useState(props.interests);

  async function addCard(){
    const newCard = {
      'id': props._id,
      'name' : name,
      'description' : description,
      'interests' : interests,
      // 'social' : ["LinkedIn","Twitter"]
      }
      if(props._id.length == 0){
        const response = axios.post('http://localhost:3000/card',newCard);
      }
      else{
        const response = await axios.put('http://localhost:3000/card',newCard);
      }
      props.setFlag((prev) => !prev);
      if(props.setEdit){
        props.setEdit(false);
      }
      setInterests([])
      setName("");
      setDescription("");
  }

  function addInterest(){                                                                                                                                                      
    setInterests([...interests,interest]);
    setInterest("");
  }

  function removeInterest(idx){
    const newInterests = interests.filter((interest,i) => {
      return i!==idx;
    })
    setInterests(newInterests);
  }
    return(
        <div>
        <input type='text' placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <input type='text' placeholder="interests" value={interest} onChange={(e) => setInterest(e.target.value)} />
        <button onClick={addInterest}>Add Interest</button>
        <div>
          {interests.map((interest,idx) => {
            return <p key={idx}>{interest} <button id={idx} onClick={() => removeInterest(idx)}>X</button></p>
          })}
        </div>
        <button onClick={addCard}>Submit</button>
      </div>
    )
}