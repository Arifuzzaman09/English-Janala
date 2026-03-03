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

    words.forEach(word => {
      const card = document.createElement('div')
      card.innerHTML=`
      <p>akash</p>
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