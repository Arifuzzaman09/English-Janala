const createElement = (arr) => {
    const htmlElement = arr.map((elem) => `<span class="btn">${elem}</span>`);
    return htmlElement.join(" ")
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageLoading = (status) => {
    if (status === true) {
        document.getElementById("loading").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    } else {
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("loading").classList.add("hidden")
    }

}

const load = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLesson(data.data))
}


const removeActive = () => {
    const allBtn = document.querySelectorAll(".lesson-btn")
    allBtn.forEach((btn) => btn.classList.remove('active'))

}

const loadWord = (id) => {
    manageLoading(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active")


            displayWord(data.data)
        })
}

const cardDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`

    fetch(url)
        .then((res) => res.json())
        .then((detail) => displayWordDetails(detail.data))
}

// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }

const displayWordDetails = (word) => {

    const detailContainer = document.getElementById('detail-container')
    detailContainer.innerHTML = `
    
     <div>
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
    </div>
    <div>
        <h2 class=" font-bold">meaning</h2>
        <p>${word.meaning}</p>
    </div>
    <div>
        <h2 class=" font-bold">Example</h2>
        <p>${word.sentence}</p>
    </div>
    <div>
        <h2 class=" font-bold">সমার্থক শব্দ গুলো</h2>
        <div>${createElement(word.synonyms)} </div>
    </div>
    
    
    `
    document.getElementById('word_modal').showModal();
}



const displayWord = (words) => {

    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ""

    if (words.length == 0) {
        wordContainer.innerHTML = `
         <div class="text-center col-span-full space-y-6 p-3 font-bangla"> 
         <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl text-gray-400 font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
      </div>
        `
        manageLoading(false)
        return;
    }


    words.forEach(word => {
        const card = document.createElement('div')
        card.innerHTML = `
       <div class="bg-white py-10 px-5 text-center space-y-4 rounded-xl shadow-sm">
            <h2 class="text-2xl font-bold ">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bold text-2xl font-bangla">${word.meaning ? word.meaning : "অথ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায় নি"}</div>
            <div class="flex justify-between items-center">
                <button onclick="cardDetails(${word.id})" class="btn bg-[#1a90ff2d] hover:bg-[#1a90ff9f] "><i
                        class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1a90ff2d] hover:bg-[#1a90ff9f]"><i class="fa-solid fa-volume-high"></i></button>

            </div>
        </div>
      `
        wordContainer.append(card)
    });
    manageLoading(false)
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ""

    for (let lesson of lessons) {

        const div = document.createElement('div')

        div.innerHTML = `
           <button id="lesson-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
           <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `;
        levelContainer.append(div)


    }
}
load()

document.getElementById('btn-search').addEventListener('click', () => {
    removeActive();
    const input = document.getElementById('input-search')
    const searchValue = input.value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res)=>res.json())
    .then(data=>{
        const allWords = data.data;
        const filterWords = allWords.filter((word)=>
             word.word.toLowerCase().includes(searchValue))

        displayWord(filterWords)
    });
});
