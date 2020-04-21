console.log('This is a app.js page connect with this.')

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    const location = input.value
    if(!location){
        return messageOne.textContent = 'Please provide a location'
    }
    fetch(`/weather?address=${location }` ).then((response) =>{
        response.json().then((data) =>{
            if(data.error){

                messageOne.textContent = data.error
            }else {

                messageTwo.textContent = data.temperature
                messageTwo.textContent = data.location
            }
        })
    })
})
