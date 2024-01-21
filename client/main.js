import axios from "axios"

const form = document.getElementById("form");
const button = document.getElementById("button")


button.addEventListener('click', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)
  const obj = {
    description: data.description,
    photo: data.upload
  }
  axios.post("http://localhost:3000/upload", obj, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(res => {
    console.log(res.data.data)
  }).catch(e => console.log(e))
})