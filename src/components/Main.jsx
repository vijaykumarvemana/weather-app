import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { Navbar, Form, Container, Row, Col, Card } from "react-bootstrap";
import { weatherData } from "../actions";
import "./styles.css";

const Main = () => {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line
  const [data, setData] = useState(null);
  const dispatch = useDispatch()
  // const datafetched = async () => {
  //     try {
  //       const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=rome&appid=249b512fd8890b5a388430ba20b72272',{})
  //       const data = await response.json()
  //       console.log(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  // } 
  // useEffect(()=>{
  //    datafetched()
  // },[]

  // )

  const handleChange = (e) => {
    setQuery(e.target.value);
   
  };
 
  const handleSubmit = async (e) => {

    e.preventDefault()
        try {
          const API_KEY= process.env.REACT_APP_API_KEY
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`)

        if (response.ok) {
          const data  = await response.json()
          setData(data)
          dispatch(weatherData(data))
          console.log(data)
          
        } else{
          console.log("something went wrong!")
        }
          
        } catch (error) {
          console.log(error)
        }     
  };

  const f = Math.floor(((data.main.temp-273.15) * 9/5 )+ 32)
  const l = Math.floor(((data.main.feels_like-273.15) * 9/5 )+ 32)
  const c = Math.floor( 5/9 * (f-32))
  const fl = Math.floor(5/9 * (l-32))

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand className="nav-bar-title" bg="dark" href="#home">
          Weather App
        </Navbar.Brand>
      </Navbar>
      <Container className="my-4">
        <Row>
          <Col xs={10} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Control 
                type="search"
                value={query}
                onChange={(e) => handleChange(e)}
                placeholder="type city and press Enter"
              />
            </Form>
          </Col>
          <Col className="col-card">
          {query? <Card
            bg="dark"
            text="white"
            style={{ width: "18rem" }}
            className="mb-2 my-4 "
          >
            
            <Card.Header><h4>{(data ||{}).name}</h4></Card.Header>
            <Card.Body>
              <h5>Temperature:</h5>
              <Card.Title>{c} <span>&#8451;</span></Card.Title>
              <p>feels_like: {fl} <span>&#8451;</span></p>
              <Card.Text>
                <span>Humidity: {data.main.humidity}&#37;</span>

                <p>Wind: {data.wind.speed} km/hr</p>
              </Card.Text>
            </Card.Body>
          </Card>:
          <h6 className="my-5">Search for weather</h6>
          }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main;
