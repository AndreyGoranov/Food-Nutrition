import React, { useContext, useEffect } from 'react'
import { Table, Button, Accordion, Container, Row, Col, Collapse, Card, Jumbotron } from 'react-bootstrap'
import MyContext from '../AppContext';
import { Recipe } from '../interfaces/recipe-interface';
import styles from './recipes.module.css'

const Recipes = () => {
    const value = useContext(MyContext);
    const { hits } = value.data; // hits represents an array with all the recipes found;
    useEffect(() => {
        console.log('from recipes', value);
        console.log('from recipes - hits', hits);
    })


    return (
        <Container fluid>

            {hits.map(hit => {
                const currentRecipe: Recipe = hit.recipe;
                return (<Row className={styles.recipeContainer}>
                    <Col xs={12}><h2>{currentRecipe.label}</h2></Col>
                    <Col lg={3}><img src={currentRecipe.image}></img></Col>
                    <Col lg={9}>
                      
                    </Col>
                </Row>)

            })}
        </Container>
    )
}

export default Recipes