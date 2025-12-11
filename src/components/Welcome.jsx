// export default function Welcome({className, classNumber}) {
import {useState} from 'react';

export default function Welcome(props) {
  const [num, setNum] = useState(45)

  function handleIncrement(){
    if(num <= 50 ){
      setNum(num + 1)
    }else{
      alert('Number is greater than 50')
    }
  }

  function handleDecrement(){
    if(num == 10){
      alert('Number is equal to 10')
    }else{
      setNum(num - 1)
    }
  }
    
  return (
    <>
        <h1>Welcome to my React app</h1>
        <h2>Class Name: {props.className}</h2>
        <h2>Class Number: {props.classNumber}</h2>
        <h2>Number : {num}</h2>
        
        <button onClick={handleIncrement}>Increment ++</button>
        <button onClick={handleDecrement}> Decrement -- </button>
    </>
  )
  
  

}