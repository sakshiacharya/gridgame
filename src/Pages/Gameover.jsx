import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
const Gameover = () => {
  const navigate = useNavigate()
  const restart = () => {
    navigate('/')
    localStorage.clear()
  }
  return (
    <div className='gameover'>
    <Card shadow="sm" padding="lg" radius="md" withBorder >
      <Card.Section style={{padding: '10px'}} >
      <h2 className='over-msg'>Game Over...!</h2>
      <div className='time-taken'> 
            Time Taken :  <b>{localStorage.getItem('minutes')}:{localStorage.getItem('seconds')}</b>
      </div>
      <Button onClick={() => restart()} mt="md" mb="md" variant="light" color="blue">Restart Game</Button>

      </Card.Section>
      </Card>
      </div>
  )
}

export default Gameover
