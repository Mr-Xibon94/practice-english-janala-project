const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWords(data.data))

};

const displayLevelWords = (words) => {

    //  get the container & empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""; 

    if(words.length == 0) {
        wordContainer.innerHTML = `
        <div class=" text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
    }

    // get into each word wordContainer 
    for(let word of words) {
        // create word div 
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML=`
         <div class="bg-white rounded-xl shadow-sm space-y-2 text-center py-10 px-5">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p>Meaning /Pronounciation</p>
            <h2 class="font-bold text-2xl font-bangla">"${word.meaning} / ${word.pronunciation}"</h2>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        // append into container 
        wordContainer.append(wordDiv);
    }

}



const displayLesson = (lessons) => {
    // 1. get the container & empty 
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML="";

    // 2. get into every lessons
    for(let lesson of lessons) {
        //     3.create Element
        const btnDiv = document.createElement ("div");
        btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        //     4.append into container 
        lessonContainer.append(btnDiv);

    }
}

loadLessons();