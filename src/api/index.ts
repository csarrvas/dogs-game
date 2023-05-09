export const getBreeds = async () => {
  try {
    const api = await fetch('https://dog.ceo/api/breeds/list/all')
    const response = await api.json()
    return response
  } catch (e) {
    throw new Error(String(e));
  }
}

export const getDogImage = async (breed: string) => {
  try {
    const api = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    const response = await api.json()
    return response
  } catch (e) {
    throw new Error(String(e));
  }
}
