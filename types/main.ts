export type ErrorMsg = {
  status: number | null,
  msg: string | null
}

export type AssistantResponse = {
  success: boolean,
  recipe: {
    name: string,
    description: string,
    tags: string[], // multiple tags
    cooking_time: string, // eg: 1 hour 30 mins
    ingredients: string[], // List of ingredients, also includes measurement eg: 2 eggs
    instructions: string[] // list of instructions
  }
}