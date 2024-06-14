import { useEffect, useState } from 'react';
import './App.css';
import i18n from './i18next';
import { useTranslation } from 'react-i18next';

function App() {
  const column=6;
  const row=7;
  const {t}=useTranslation();
  const [won,setWon]=useState(null)
  const player1Settings={
    chance:true,
    areas:[]
  }
  const player2Settings={
    chance:false,
    areas:[]
  }
  const [player1,setPlayer1]=useState(player1Settings)
  const [player2,setPlayer2]=useState(player2Settings)


  useEffect(()=>{
    if(!won){
      if(player1.areas.length>3){
        let arr=player1.areas.sort((a,b)=>a-b)
        let areaSet=new Set(arr)
        for(let i=0;i<arr.length;i++){
          if(areaSet.has(arr[i]+1) && areaSet.has(arr[i]+2) && areaSet.has(arr[i]+3)){
            setPlayer1({...player1,chance:true})
            return setWon('Player 1 wins');
          }
          else if(areaSet.has(arr[i]+column) && areaSet.has(arr[i] + 2*column) && areaSet.has(arr[i]+ 3*column)){
            setPlayer1({...player1,chance:true})
            return setWon('Player 1 wins');
          }
          else if((areaSet.has(arr[i]+row)||areaSet.has(arr[i]+row-2)) && 
          (areaSet.has(arr[i] + 2*row)||areaSet.has(arr[i]+ 2*(row-2))) &&
           (areaSet.has(arr[i]+ 3*row) || areaSet.has(arr[i]+ 3*(row-2)))){
            setPlayer1({...player1,chance:true})
            return setWon('Player 1 wins');
          }
        }
      }
  
      if(player2.areas.length>3){
        let arr=player2.areas.sort((a,b)=>a-b)
        let areaSet=new Set(arr)
        for(let i=0;i<arr.length;i++){
          if(areaSet.has(arr[i]+1) && areaSet.has(arr[i]+2) && areaSet.has(arr[i]+3)){
            setPlayer2({...player2,chance:true})
            return setWon('Player 2 wins');
        }
        else if(areaSet.has(arr[i]+column) && areaSet.has(arr[i] + 2*column) && areaSet.has(arr[i]+ 3*column)) {
          setPlayer2({...player2,chance:true})
          return setWon('Player 2 wins');
      }
      else if((areaSet.has(arr[i]+row)||areaSet.has(arr[i]+row-2)) && 
      (areaSet.has(arr[i] + 2*row)||areaSet.has(arr[i]+ 2*(row-2))) &&
       (areaSet.has(arr[i]+ 3*row) || areaSet.has(arr[i]+ 3*(row-2)))){
        setPlayer2({...player2,chance:true})
        return setWon('Player 2 wins');
    }
        }
      }
    }
  },[player1,player2])

  const handlePlayerChange = (e) =>{
    const index=e.target.getAttribute('id')
    if(!index || won) return null
  
    let tempRow=row-1

    if(player2.chance){
      for(tempRow;tempRow>=0;tempRow--){
        if(player1.areas.includes((column*(tempRow)+(+index%column===0?column:+index%column))) 
          || player2.areas.includes((column*(tempRow)+(+index%column===0?column:+index%column)))){
          continue;
        }
        else{
          setPlayer1({...player1,chance:true})
          setPlayer2((prev)=>({...prev,areas:[...prev.areas,column*(tempRow)+(+index%column===0?column:+index%column)],chance:false}))
          break;
        }
       }
    }
    else if (player1.chance){
       for(tempRow;tempRow>=0;tempRow--){
        if(player1.areas.includes((column*(tempRow)+(+index%column===0?column:+index%column))) 
          || player2.areas.includes((column*(tempRow)+(+index%column===0?column:+index%column)))){
          continue;
        }
        else{
          setPlayer1((prev)=>({...prev,areas:[...prev.areas,column*(tempRow)+(+index%column===0?column:+index%column)],chance:false}))
          setPlayer2({...player2,chance:true})
          break;
        }
       }
    }
    else return
  }

  const getBackgroundColor=(index)=>{
    console.log(player1,index)
    if(player1.areas.includes(index)) return 'pink'
    else if(player2.areas.includes(index)) return 'green'
    else return null
  }

  const handleReset = () =>{
    setWon(null)
    setPlayer1(player1Settings)
    setPlayer2(player2Settings)
  }

  const changeLanguage = () =>{
    if(i18n.language==='en'){
      i18n.changeLanguage('hi')
    }
    else{
      i18n.changeLanguage('en')
    }
  }

  return (
    <div className='parent-container'>
      <button className='language-button' onClick={changeLanguage}>Change Language</button>
      <h1 className={`${player1.chance ? null:'player-name-visible'}`}>{t('reset.player1')}</h1>
    <div className='grid-container' onClick={handlePlayerChange}>
      {Array(row*column).fill('').map((_,index)=>{
        return(
          <div key={index} className='grid' id={index+1} style={{backgroundColor:getBackgroundColor(index+1)}}></div>
        )
      })}
    </div>
    <h1 className={`${player2.chance ? null : 'player-name-visible'}`}>{t('reset.player1')}</h1>
    <h1 className={`winning-style ${won=== 'Player 1 wins'? 'player1' : 'player2'}`}>{won}</h1>
    {won && <button onClick={handleReset}>{t("reset.reset1")}</button>}
    </div>
  );
}

export default App;
