export interface Recipe {
    calories: number,
    cautions: Array<string>,
    cuisineType: Array<string>,
    dietLabels: Array<string>,
    healthLabels: Array<string>,
    image: string,
    ingredientLines: Array<string>,
    totalNutrients: object,
    label: string,
    mealType: Array<string>,
    shareAs: string,
    totalTime: number,
    totalWeight: number,
    yield: number,
    url: string
}