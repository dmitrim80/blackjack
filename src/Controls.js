import React from 'react';
import chip5 from './images/5-chip-v2.png';
import chip10 from './images/10-chip-v2.png';
import chip25 from './images/25-chip-v2.png';
import chip50 from './images/50-chip-v2.png';
import chip100 from './images/100-chip-v2.png';
import chip250 from './images/250-chip-v2.png';
import btnStand from './images/stand-button2.png';
import btnDouble from './images/double-button2.png';
import btnHit from './images/hit-button2.png';
import btnClear from './images/clear-button2.png';
import btnBet from './images/bet-button2.png';
import btnSplit from './images/split-button.png';

const Controls = ({ onNewGame, 
                    handleStand, 
                    handleDouble, 
                    handleHit, 
                    gameRunning, 
                    onBetPlaced,
                    bet,
                    buttonsHidden,
                    handleChipClick,
                    standPressed,
                    handleSplit,
                    splitAvailable,
                    hitPressed,
                    twoHands,
                    setPreviousBet,
                    clearBet,
                    previousBet,
                    setBet,
                    setBetChips,
                    playerChips,
                    }) => 
    {
    const chips = [
        { value: 5, img: chip5 },
        { value: 10, img: chip10 },
        { value: 25, img: chip25 },
        { value: 50, img: chip50 },
        { value: 100, img: chip100 },
        { value: 250, img: chip250 },
    ];

    return (
        <>
        
            <div id='buttons-container'>
                {gameRunning ? (
                    <>
                        {!buttonsHidden && (
                            <>
                            <img    
                                    src={btnDouble}
                                    className={`btn-double ${standPressed || hitPressed ? 'disabled' : ''}`}
                                    alt='double-button' 
                                    title="Double"
                                    onClick={!standPressed ? ()=>handleDouble() : undefined}
                                    style={{cursor: standPressed?'not-allowed':'pointer'}}
                            />
                            <img    
                                    src={btnStand} 
                                    className={`btn-stand ${standPressed ? 'disabled' : ''}`}
                                    alt='stand-button' 
                                    title="Stand"
                                    onClick={!standPressed ? ()=>handleStand() : undefined}
                                    style={{cursor: standPressed?'not-allowed':'pointer'}}
                            />
                            <img    
                                    src={btnHit} 
                                    className={`btn-hit ${standPressed ? 'disabled': ''}`}
                                    alt='hit-button' 
                                    title="Hit"
                                    onClick={!standPressed ? ()=>handleHit() : undefined}
                                    style={{cursor:(standPressed) ? 'not-allowed':'pointer'}}
                            />
                            <img    
                                    src={btnSplit} 
                                    className={`btn-split ${(standPressed || !splitAvailable || hitPressed )? 'disabled': ''}`}
                                    alt='split-button' 
                                    title="Split"
                                    onClick={() => !standPressed && handleSplit()}
                                    style={{cursor:(standPressed) ? 'not-allowed':'pointer'}}
                            />
                            
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <img 
                            src={btnBet} 
                            className='btn-new-game' 
                            alt='bet-button' 
                            title="Place A Bet"
                            onClick={() => bet === 0 ? onBetPlaced(0):onNewGame()}
                        />
                        <img 
                            src={btnClear} 
                            className='btn-clear-bet' 
                            alt='clear-button' 
                            title="Clear"
                            onClick={() => {
                                
                                if(previousBet>0){
                                    setBetChips([]);
                                    setPreviousBet(0);
                                    setBet(0);
                                }else{
                                    onBetPlaced(0);

                                    
                                }
                                
                            }}
                        />
                    </>
                )}
            </div>
            
            <div id='chips-row-wrapper-arrows' style={{
                                        height: 'auto', 
                                        overflow: 'hidden'}}>
                <div id='pointer-row-animation' style={{
                                                visibility: !gameRunning ? 'visible' : 'hidden', 
                                                display: 'flex', 
                                                gap: '44px', 
                                                justifyContent: 'center', 
                                                transform: 'translateY(3px)'}}>

                    <div id='pointer-animation'>▼</div>
                    <div id='pointer-animation'>▼</div>
                    <div id='pointer-animation'>▼</div>
                    <div id='pointer-animation'>▼</div>
                    <div id='pointer-animation'>▼</div>
                    <div id='pointer-animation'>▼</div>
                </div>
            </div>
            <div id='chips-row-wrapper' style={{ visibility: gameRunning ? 'hidden' : 'visible' }}>

                {chips.map((chip, index) => (
                <img key={index}
                    src={chip.img}
                    alt={`Chip ${chip.value}`}
                    title={`$${chip.value}`}
                    className='chip-img'
                    onClick={(event) => {
                        if(chip.value > playerChips){
                            return;
                        }else{
                            if(previousBet > 0){
                                setPreviousBet(0);
                                setBet(0);
                                setBetChips([]);
                                onBetPlaced(chip.value); 
                                handleChipClick(chip.value, chip.img, event);
                            }else{
                                onBetPlaced(chip.value); 
                                handleChipClick(chip.value, chip.img, event);
                            }
                        }
                        
                        
                    }}
                    style={{ cursor: 'pointer' }} />
                ))}
                
            </div>  
        </>
    );
};

export default Controls;