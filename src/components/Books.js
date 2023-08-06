import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from './Card'
import CE from "../img/ce.png"
import Civil from "../img/civil.jpg"
import Electrical from "../img/electrical.jpg"
import Mechanical from "../img/mechanical.jpg"
import EC from "../img/ec.jpg"
import IC from "../img/ic.png"
import Engineering from "../img/engineering.jpg"

const Books = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // getNotes()
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className='text-light row my-3' style={{ justifyContent: "center" }}>
            <h2 className='text-center'>Department wise Book List</h2>
            <Card title="Computer" description= "Make everything as simple as possible, but not simpler" imgUrl={CE} sheetUrl="https://docs.google.com/spreadsheets/d/1-QRIhB9dcmnCu_J8e1jiHerIwoWD3VUJ/edit?usp=sharing&ouid=109529529578667329645&rtpof=true&sd=true" />
            <Card title="EC" description= "The fantastic advances in the field of electronic communication constitute a great danger to the privacy of the individual" imgUrl={EC} sheetUrl="https://docs.google.com/spreadsheets/d/1pHtXm1x7LP8ZieXHEMnV0shIDqtwZ6CC/edit?usp=sharing&ouid=109529529578667329645&rtpof=true&sd=true" />
            <Card title="Civil" description= "We shape our buildings, thereafter they shape us." imgUrl={Civil} sheetUrl="https://docs.google.com/spreadsheets/d/10tKKnCiDFl6nLeWOQcdHr5rE40aD9LZM/edit?usp=sharing&ouid=109529529578667329645&rtpof=true&sd=true" />
            <Card title="Electrical" description= "No resistance can drop our potential." imgUrl={Electrical} sheetUrl="https://docs.google.com/spreadsheets/d/13jWjJ3VGtwZy2dqv2sA_Lb5BiJr_ECKC/edit?usp=sharing&ouid=109529529578667329645&rtpof=true&sd=true" />
            <Card title="IC" description= "I need your HEART to calibrate me, as like how HART calibrates instrument." imgUrl={IC} sheetUrl="https://docs.google.com/spreadsheets/d/1vJ2cZt-_mGNMJaGF1KFX-jjVhBuXqIDJ/edit?usp=sharing&ouid=109529529578667329645&rtpof=true&sd=true" />
            <Card title="Mechenical" description= "We screw those who screw normal people." imgUrl={Mechanical} sheetUrl="https://docs.google.com/spreadsheets/d/12OHtbFLKNNNOMm_mQ0KWu56vvGHk1XVY/edit?usp=sharing&ouid=109529529578667329645&rtpof=true&sd=true" />
            <Card title="General" description= "Science can amuse and fascinate us all, but it is engineering that changes the world." imgUrl={Engineering} sheetUrl="https://docs.google.com/spreadsheets/d/17mb-AMc_U19y5mIdbcZ3IipVaMpV6FRM/edit?usp=sharing&ouid=109529529578667329645&rtpof=true&sd=true" />

        </div>
    )
}

export default Books
