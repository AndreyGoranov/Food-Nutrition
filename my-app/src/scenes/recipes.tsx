import React, { useContext, useEffect } from 'react'
import { Button, Container, Row, Col, ProgressBar} from 'react-bootstrap'
import MyContext from '../AppContext';
import { Recipe } from '../interfaces/recipe-interface';
import styles from './recipes.module.css'
import { faHome, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Recipes = () => {
    const value = useContext(MyContext);
    const { hits } = value.data; // hits represents an array with all the recipes found;
    useEffect(() => {
        console.log('from recipes', value);
        console.log('from recipes - hits', hits);
    });

    return (
        <Container fluid className={styles.recipesSceneContainer}>
            <h1 className={styles.heading}>Top ten recipes we found for you</h1>
            {hits.map(hit => {
                const currentRecipe: Recipe = hit.recipe;
                const {totalNutrients} = currentRecipe;
                const total = Math.round(totalNutrients['CHOCDF'].quantity +  totalNutrients['PROCNT'].quantity + totalNutrients['FAT'].quantity);
                const carbs = Math.round(totalNutrients['CHOCDF'].quantity / total * 100);
                const protein = Math.round(totalNutrients['PROCNT'].quantity / total * 100);
                const fat = Math.round(totalNutrients['FAT'].quantity / total * 100);
                return (<Row className={styles.recipeContainer}>
                    <Col lg={3} className={styles.recipeImage}>
                        <h2>{currentRecipe.label}</h2>
                        <img src={currentRecipe.image} className="img-responsive"></img>
                        <div><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> {currentRecipe.totalTime}min</div>
                        <Button onClick={() => {window.open(currentRecipe.url)}}>Instructions</Button>
                    </Col>
                    <Col lg={4} xs={12} className={styles.nutrientsContainer}>
                        <div className={styles.equalColumnContent}>
                            <h2 className={styles.recipeHeading}>Nutrients</h2>
                            <Container className={styles.nutrientsInfoContainer}>
                                <ProgressBar max={total}>
                                    <ProgressBar variant="warning" now={carbs} key={1} label={'Carbs'} />
                                    <ProgressBar variant="success" now={protein} key={2} label={'Protein'}/>
                                    <ProgressBar variant="danger" now={fat} key={3} label={'Fat'}/>
                                </ProgressBar> 
                                <p className={styles.carbsContainer}>
                                    Carbs: {Math.round(totalNutrients['CHOCDF'].quantity)}g     Total: {carbs}%
                                </p>

                                <p className={styles.proteinContainer}>
                                    Protein: {Math.round(totalNutrients['PROCNT'].quantity)}g     Total: {protein}%
                                </p>
                                <p className={styles.fatContainer}>
                                    Fat: {Math.round(totalNutrients['FAT'].quantity)}g     Total: {fat}%
                                </p>
                                <h3>Total calories: <span>{Math.round(currentRecipe.calories)}</span></h3>
                                <h3>Calories per serving: <span>{Math.round(currentRecipe.calories / currentRecipe.yield)}</span></h3>
                                <hr/>
                                <h3>Health labels: {currentRecipe.healthLabels.map(label => {
                                    const labels = currentRecipe.healthLabels;
                                    return (<span className={styles.healthLabels}>
                                        { label}{labels.indexOf(label) !== labels.length - 1 ? ',' : null}
                                    </span>)
                                })}</h3>
                                <hr/>
                                

                            </Container>
                            
                        </div>
                    </Col>
                    <Col lg={4} xs={12} className={styles.ingridientsContainer}>
                        <div className={styles.equalColumnContent}>
                            <h2 className={styles.recipeHeading}>Ingredients</h2>
                            <h5 className={styles.recipeHeading}>for total of {currentRecipe.yield} servings</h5>
                            <Container className={styles.recipeInfoContainer}>
                                <ul className={styles.ingredientList}>
                                    {currentRecipe.ingredientLines.map(line => {
                                        return <li>{line}</li>
                                    })}
                                </ul>
                            </Container>
                        </div>
                    </Col>
                </Row>)

            })}
        </Container>
    )
}

export default Recipes