import { useState,useEffect } from 'react'
import axios from 'axios';
// import {formik} from 'formik';
import './App.css'
import { BusinessCard } from './components/BusinessCard'
import { AddEditCard } from './components/AddEditCard';

function App() {
  const [cards, setCards] = useState([]);
  const [addCard,setAddCard] = useState(false);
  const [flag,setFlag] = useState(false);

  useEffect(() => {
    function postCard (){
      axios.get('http://localhost:3000/cards').then(response => {
        setCards(response.data);
      })
    }
    postCard();
    },[flag])

  return (
    <div>
      <button onClick={() => setAddCard(!addCard)}>Add Card</button>
      {addCard && <AddEditCard name="" description="" interests={[]} _id={''} setFlag={setFlag} setEdit={null} />}
      
      <div className="container">
        {cards.map((card) => {
          return <BusinessCard  key={card._id} setFlag={setFlag} flag={flag} _id={card._id} name={card.name} description={card.description} interests = {card.interests} social = {["LinkedIn","Twitter"]} ></BusinessCard>
        })}
      </div>
    </div>
  )
}

export default App