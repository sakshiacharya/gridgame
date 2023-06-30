import React, { useState, useRef, useEffect } from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { FileInput, rem } from '@mantine/core';
import { Input } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/action/loginAction';
const UserInfo = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState('');
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState('')

  console.log(photo)


  const Login = () => {
    dispatch(loginAction(photo, name, email, phone))
  }


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file)
    const reader = new FileReader();

    reader.onload = () => {
      const imageBase64 = reader.result;
      setPhoto(imageBase64)
      // localStorage.setItem('profileImage', imageBase64);
    };

    reader.readAsDataURL(file);
  };


  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

  const handleClearFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = ''; // Clear the file input value
    }
  };
  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);

  }

  // Handle email input change
  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);

  }



  function handlePhoneChange(e) {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, ''); // Remove all non-digit characters

    if (sanitizedValue.length <= 10) {
      setPhone(sanitizedValue);
    }
  }



  return (
    <div className='userinfo'>
      
      <Card shadow="sm" padding="lg" radius="md" withBorder >
        <Card.Section style={{ padding: '10px' }} >
          <br />
          <h2>USER DETAILS</h2>
          <input ref={fileInputRef} style={{ display: "none" }} label='profile photo' type='file' className="inputfile" value={selectedImage} onChange={handleImageUpload} placeholder="Profile Photo" icon={<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.002 4h-10a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1zm-10-1a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-10z" clip-rule="evenodd"></path><path d="M10.648 8.646a.5.5 0 01.577-.093l1.777 1.947V14h-12v-1l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"></path><path fill-rule="evenodd" d="M4.502 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4 2h10a1 1 0 011 1v8a1 1 0 01-1 1v1a2 2 0 002-2V3a2 2 0 00-2-2H4a2 2 0 00-2 2h1a1 1 0 011-1z" clip-rule="evenodd"></path></svg>} />
          <button className='profilephotobtn' onClick={() => fileInputRef.current.click()}>Upload Profile Photo</button>




          {selectedFile && (
            <div>
              <p className='selectedfile'>Selected File: {selectedFile.name}</p>

              <Button onClick={handleClearFile} variant="light" color="blue" mt="md" radius="md">
                Clear
              </Button>
            </div>
          )}
        </Card.Section>

        <Card.Section style={{ padding: '10px' }} >
          <Input
            value={name}
            onChange={handleNameChange}
            icon={<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>}
            placeholder="Enter Your Name"
          />


        </Card.Section>

        <Card.Section style={{ padding: '10px' }} >
          <Input
            value={email}
            onChange={handleEmailChange}
            className='inputfield'
            icon={<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>}
            placeholder="Enter Your Email"
          />
        </Card.Section>

        <Card.Section style={{ padding: '10px' }} >
          <Input
            value={phone}
            type='number'
            length={10}
            onChange={handlePhoneChange}
            className='inputfield'
            icon={<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.707,12.293c-0.391-0.391-1.023-0.391-1.414,0l-1.594,1.594c-0.739-0.22-2.118-0.72-2.992-1.594 s-1.374-2.253-1.594-2.992l1.594-1.594c0.391-0.391,0.391-1.023,0-1.414l-4-4c-0.391-0.391-1.023-0.391-1.414,0L3.581,5.005 c-0.38,0.38-0.594,0.902-0.586,1.435c0.023,1.424,0.4,6.37,4.298,10.268s8.844,4.274,10.269,4.298c0.005,0,0.023,0,0.028,0 c0.528,0,1.027-0.208,1.405-0.586l2.712-2.712c0.391-0.391,0.391-1.023,0-1.414L17.707,12.293z M17.58,19.005 c-1.248-0.021-5.518-0.356-8.873-3.712c-3.366-3.366-3.692-7.651-3.712-8.874L7,4.414L9.586,7L8.293,8.293 C8.054,8.531,7.952,8.875,8.021,9.205c0.024,0.115,0.611,2.842,2.271,4.502s4.387,2.247,4.502,2.271 c0.333,0.071,0.674-0.032,0.912-0.271L17,14.414L19.586,17L17.58,19.005z"></path></svg>}
            placeholder="Enter Your Phone"
          />
        </Card.Section>
        <Link style={{ textDecoration: 'none' }} to={(photo?.length > 0 && name?.length > 0 && email?.length > 0 && phone?.length > 0) ? '/gamedscreen' : '/'} onClick={() => Login()}>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Start Game
          </Button>
        </Link>
      </Card>
    </div>
  )
}

export default UserInfo
