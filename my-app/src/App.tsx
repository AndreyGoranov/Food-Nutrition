import React, { useContext, useState } from 'react'
import { Form, FormControl, Button, Accordion, Container, Row, Col, Collapse, Card, Jumbotron } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './App.css';
import { dietLabels } from './helper/constants/diet-labels'
import { SearchValue } from './interfaces/search-interface'
import Checkbox  from './components/checkbox'
import MyContext from './AppContext'


function App() {
  let appData;
  const history = useHistory();
  const value = useContext(MyContext);
  const {setContextState} = value;
  let chckedDietBoxes: Array<string> = [];
  const [showSearchExtension, setShowSearchExtension] = useState(false);
  const [search, setSearch] = useState<SearchValue>({
    searchText: ''
  })

  const MAIN_URL = "https://api.edamam.com/search?"
  const APP_ID = 'app_id=a6beb29e';
  const APP_KEY = '&app_key=5db2a472007987f8762a12dda5bf2e3a';
   
  const createSearchUrl = (): string => {
    let URL: string = MAIN_URL + APP_ID + APP_KEY;
    for (let searchValue in search) {
      if (searchValue === "searchText") {
        URL += `&q=${search[searchValue]}`
      } else if (searchValue === "calories" && search[searchValue] > 0) {
        URL += `&${searchValue}=${search[searchValue]}`
      }
    }
    if (chckedDietBoxes.length > 0) {
      chckedDietBoxes.forEach(boxLabel => {
        URL += `&diet=${boxLabel.toLowerCase()}`
      })
    }
    return URL
  }

  const getRecipes = async () => {
    let response = await fetch(createSearchUrl());
    const data = await response.json();
    appData = data;
      console.log('data:', data);
      console.log('data:', data['hits']);
      console.log('kst',setContextState);
      setContextState(data);
      console.log('appData', appData);
      console.log('contxt', value);
      history.push("/recipes")
    }
  
  const onChangeHandler = (event: any) => {
    let targetName = event.target.name;
    let targetValue = event.target.value;
      setSearch({
        ...search,
        [targetName]: targetValue
      });
      console.log(search);
  }
 
  const getSearch = (event: any) => {
    event.preventDefault();
    getRecipes();
    setSearch({
      searchText: ''
    });
  }

  const handlechckedDietBoxes = (label: string, isChecked: boolean) => {
    if (isChecked) {
      chckedDietBoxes.push(label);
    } else {
      chckedDietBoxes.splice(chckedDietBoxes.indexOf(label), 1); 
    }
  }

  return (
    <div className="App">
      {console.log('value', value)}
      <Form inline onSubmit={getSearch}>
        <FormControl name="searchText" type="text" placeholder="Dish, product, keyword..."  onChange={onChangeHandler} />
        <Button type="submit" variant="success" className="search-button" disabled={!search.searchText}>Search</Button>
        <Button variant="danger" onClick={() => setShowSearchExtension(!showSearchExtension)}>Specify search</Button>
      </Form>
        
      <Collapse in={showSearchExtension}>
        <Container>
          <Container className="search-extension">

            <Row>
              <Accordion className="accordeon">
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="dark" eventKey="0">

                    <div className="search-type"><h3>Calories</h3></div>

                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Container className="calories-input-container">
                      
                         <input className="calories-input" name="calories" type="text" placeholder="Maximum calories" onChange={onChangeHandler} />
                          <p className="units">kcal</p>

                    </Container>

                  </Accordion.Collapse>
                </Card>
              </Accordion >
            </Row>

            <Row>
              <Accordion className="accordeon">
                <Card>
                  <Accordion.Toggle as={Card.Header} variant="dark" eventKey="0">
                    <div className="search-type"><h3>Diet labels</h3></div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <div className="checkbox-container">
                      {dietLabels.map(label => {
                       return <Checkbox key={label} label={label} boxStatus={handlechckedDietBoxes} />
                    })}
                    </div>
                    
                  </Accordion.Collapse>
                </Card>
              </Accordion>

            </Row>
          </Container>
        </Container>
      </Collapse>


    </div>
  );
}

export default App;
