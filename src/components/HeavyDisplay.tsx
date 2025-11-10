// src/components/HeavyDisplay.tsx
import React from 'react';


const HeavyDisplay = React.memo(({expensiveValue,onAction})=>{

   const calculateText = ()=>{
      console.log('*** HeavyDisplay: Выполняю сложный расчет! ***')
      let result ='';
      for(let i =0; i<100000;i++){
         result +='a';
      }
      return`Result:${expensiveValue}`;

   }
 const display =calculateText();
 return (
<div style={{ border: '1px solid gray',padding:'10px',marginTop:'10px' }}>
   <p>Дочерний компонент (Тяжелый)</p>
  <p>{display}</p>
  <button onClick={onAction}>Выполнить действие</button>
</div>
 )  
})

export default HeavyDisplay;