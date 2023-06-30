import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { PinInput } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const GameScreen = () => {
  const navigate = useNavigate()
  const [askScreen, setAskScreen] = useState(false)
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [allBoxMarked, setAllBoxMarked] = useState([])
  const [isActive, setIsActive] = useState(askScreen == true ? true : false);
  const numRows = xValue;
  const numCols = yValue;
  const [boxColors, setBoxColors] = useState(Array(numRows * numCols).fill('red'));
  const rowConfig = `repeat(${numRows}, ${numRows > 2 ? '150px' : '200px'})`;
  const colConfig = `repeat(${numCols},  ${numRows > 2 ? '150px' : '200px'})`;

  const userData = useSelector((state) => state.loginReducers)

 

  const handleBoxClick = (index) => {
    setIsActive(true)
    const newBoxColors = [...boxColors];
    setTimeout(() => {
      setAllBoxMarked(numRows * numCols == newBoxColors.length && newBoxColors.every(color => color === '#a7a7a7'))

    }, [1000])
    console.log(numRows * numCols, newBoxColors)
    if (newBoxColors[index] == undefined) {
      newBoxColors[index] = 'red';
      setBoxColors(newBoxColors);
    } else if (newBoxColors[index] === 'red') {
      newBoxColors[index] = 'yellow';
      setBoxColors(newBoxColors);
    } else if (newBoxColors[index] === 'yellow') {
      newBoxColors[index] = '#a7a7a7';
      setBoxColors(newBoxColors);
    }
  };

  if (allBoxMarked == true) {
    setTimeout(() => {
      navigate("/gameover");
    }, [1000])
    localStorage.setItem('minutes', minutes)
    localStorage.setItem('seconds', seconds)

  }

  const boxes = Array.from({ length: numRows * numCols }, (_, index) => (
    <div key={index} className="box"
      style={{ backgroundColor: boxColors[index] }}
      onClick={() => handleBoxClick(index)}>
      {index + 1}
    </div>
  ));


  const submitBoxSize = () => {
    if (numRows.length > 0 && numCols.length > 0) {
      setAskScreen(true)
      setIsActive(true)

    }
  }

  function toggle({id}) {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setMinutes(0);
    setIsActive(false);
    setBoxColors('')
    setIsActive(true)
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    } else if (!isActive && (seconds !== 0 || minutes !== 0)) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);
  return (
    <>
      {
        !askScreen ?
          <div className="askscreen">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Text fw={700} style={{ textAlign: 'center', paddingTop: '10px', color: '' }}>Enter The Number of Grid</Text>
              </Card.Section>
              <Card.Section>
                <Group position="center" style={{ marginTop: '10px' }}>
                  {/* <PinInput length={2} onChange={handlePinChange} /> */}
                  <PinInput type="number" value={xValue} onChange={setXValue} length={1} required />
                  <PinInput type="number" value={yValue} onChange={setYValue} length={1} required />
                </Group>
              </Card.Section>
              <Button variant="light" color="blue" onClick={() => submitBoxSize()} fullWidth mt="md" radius="md">
                Proceed
              </Button>
            </Card>
          </div>
          :
          <div className='listofsection'>
            <section className='profile_section'>

              <div className='basicinfo'>
                <div className='profile_home'>
                  <img src={userData.photo} alt="" />
                </div>
                <div className='information'>
                  <p className='name'>{userData.name}</p>
                  <p>{userData.phone}</p>
                  <p>{userData.email}</p>

                </div>
              </div>


            </section>

            <section className='griditem'>
              <div className='actionbuttons'>
                <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
                <button disabled={!isActive} onClick={toggle} > Stop</button>
                <button onClick={reset}>Reset</button>
              </div>

              <div className='timer'>
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
              <div className="game-board" style={{ gridTemplateRows: rowConfig, gridTemplateColumns: colConfig }}>{boxes}</div>
            </section>
          </div>
      }


    </>
  )
}

export default GameScreen
