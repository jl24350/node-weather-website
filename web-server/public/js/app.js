const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const pic = document.querySelector('#weather_pic')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) =>{

        if(data.error){
          messageOne.textContent = data.error
        }
        else{
            pic.src = data.forcast.img
            pic.style.height = '20%'
            pic.style.width = '20%'
            messageOne.textContent = "In " + data.location
            messageTwo.textContent = "It is " + data.forcast.desc 
            messageThree.textContent =  'The temperature is ' + data.forcast.temp + ", but it feels like " + data.forcast.feels
            messageFour.textContent = 'Enter another location to get more weather!'
        }
    })
})

})