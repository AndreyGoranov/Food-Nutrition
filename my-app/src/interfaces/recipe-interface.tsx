export interface Recipe {
    calories: number,
    cautions: Array<string>,
    cuisineType: Array<string>,
    dietLabels: Array<string>,
    healthLabels: Array<string>,
    image: string,
    ingredientLines: Array<string>,
    label: string,
    mealType: Array<string>,
    shareAs: string,
    totalTime: number,
    totalWeight: number,
    yield: number,
    url: string
}