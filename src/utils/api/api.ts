import { API_HOST, API_PATHS } from "../consts/consts";

export async function sendForm(data: FormData) {
  try {
    const result = await fetch(`${API_HOST}/${API_PATHS.submit}`, {
      method: "POST",
      body: data
    })
    const json = await result.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}