const load = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLesson(data.data))
}

const loadWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}
`
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayWord(data.data))
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
    }

    //     {
    // "id": 4,
    // "level": 5,
    // "word": "Diligent",
    // "meaning": "পরিশ্রমী",
    // "pronunciation": "ডিলিজেন্ট"
    // }

    words.forEach(word => {
        const card = document.createElement('div')
        card.innerHTML = `
       <div class="bg-white py-10 px-5 text-center space-y-4 rounded-xl shadow-sm">
            <h2 class="text-2xl font-bold ">${word.word?word.word:"শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bold text-2xl font-bangla">${word.meaning?word.meaning:"অথ পাওয়া যায় নি"} / ${word.pronunciation?word.pronunciation:"pronunciation পাওয়া যায় নি"}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1a90ff2d] hover:bg-[#1a90ff9f] "><i
                        class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a90ff2d] hover:bg-[#1a90ff9f]"><i class="fa-solid fa-volume-high"></i></button>

            </div>
        </div>
      `
        wordContainer.append(card)
    });
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ""

    for (let lesson of lessons) {

        const div = document.createElement('div')

        div.innerHTML = `
           <button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary">
           <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `;
        levelContainer.append(div)


    }
}
load()