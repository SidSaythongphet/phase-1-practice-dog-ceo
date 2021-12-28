console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let dogs = []
const dogContainer = document.querySelector("div#dog-image-container")
let dogBreeds = document.querySelector('ul#dog-breeds')
const dropDown = document.querySelector('#breed-dropdown')
let breedsArr = []

const fetchDog = () => {
    fetch (imgUrl)
        .then (res => res.json())
        .then (dogs => {
            dogs.message.forEach(url => {
                const img = document.createElement('img')
                img.src = url
                dogContainer.appendChild(img)
            })
        })
}

const fetchBreed = () => {
    fetch (breedUrl)
        .then (res => res.json())
        .then (breeds => {
            breedsArr = Object.keys(breeds.message)
            breedsArr.forEach(breed => {
                const li = document.createElement('li')
                li.innerText = breed
                li.addEventListener('click', (event) => event.target.style.color = 'blue')
                dogBreeds.appendChild(li)
            })
        })
    
}

const blankDropDown = () => {
    const opt = document.createElement('option')
    opt.setAttribute('selected', 'selected')
    dropDown.add(opt, 0)

}

function filterBreeds(e) {
    const letter = e.target.value
    const filter = breedsArr.filter(breed => breed.startsWith(letter))
    dogBreeds.innerHTML = ''
    filter.forEach(breed => {
        const li = document.createElement('li')
        li.innerText = breed
        dogBreeds.appendChild(li)
    })
}


document.addEventListener("DOMContentLoaded", () => {
    blankDropDown()
    fetchDog()
    fetchBreed()
    dropDown.addEventListener('change', filterBreeds)
})