console.log('This is in the js folder')



//connect to the search form in index.hbs
const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const message_one = document.querySelector('#message-1')
const message_two = document.querySelector('#message-2')
 

//add event listener to listen for search click
weather_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    //loading message
    message_one.textContent = 'Loading...'
    //reset message two 
    message_two.textContent = ''

    //fetch weather data
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //error in getting weather info.
                 
                return message_one.textContent = data.error
            }

            message_one.textContent = data.address
            message_two.textContent = data.forecast
        })
    })

    
})