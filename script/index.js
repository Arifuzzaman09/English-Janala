const load = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLesson(data.data))
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ""

    for (let lesson of lessons) {

        const div = document.createElement('div')

        div.innerHTML = `
           <button class="btn btn-outline btn-primary">
           <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `;
        levelContainer.append(div)

        
    }
}
load()