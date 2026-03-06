const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then((res) => res.json()) //promise of json data
        .then((json) => displayLesson(json.data));
};

const removeFunc = () => {
    const rmvBtn = document.querySelectorAll(".current-btn");
    rmvBtn.forEach(btn => btn.classList.remove("active"));
}

const manageSpinner=(status) => {
    if(status == true){
        document.getElementById('loadingSpiner').classList.remove('hidden');
        document.getElementById("word-container").classList.add("hidden");
    }else {
        document.getElementById('loadingSpiner').classList.add('hidden');
        document.getElementById("word-container").classList.remove("hidden");
        
    }
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const clickBtn = document.getElementById(`current-btn-${id}`)
            removeFunc(); //  remove active class 
            clickBtn.classList.add('active');
            displayLevelWords(data.data)

        });

        

};


const wordDetails = async (wordId) => {
    const url = `https://openapi.programming-hero.com/api/word/${wordId}`;
    // console.log(url); 
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }
const creatElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);

    return htmlElements.join(" ");

}

function displayWordDetails(word) {
    console.log(word);
    const detailsModal = document.getElementById("detailsModal");
    detailsModal.innerHTML = `
    <div class="space-y-5 border border-black/10 rounded p-5">
            <h2 class="font-bold text-3xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
            <div class="font-semibold text-base">
                <h3 class="">Meaning</h3>
                <h3 class="">${word.meaning}</h3>
            </div>
            <div>
                <h2 class="font-semibold text-base">Example</h2>
                <p class="opacity-50 text-base">${word.sentence}</p>
            </div>
            <div>
                <p class="font-semibold text-base mb-2">সমার্থক শব্দ গুলো</p>
                <div class="flex flex flex-wrap gap-2">
                    ${creatElements(word.synonyms)}
                </div>
            </div>
        </div>
    `;
    document.getElementById("wordModal").showModal();
}

const displayLevelWords = (words) => {

    //  get the container & empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class=" text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        
    }

    // get into each word wordContainer 
    for (let word of words) {
        // create word div 
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm space-y-2 text-center py-10 px-5">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "no word found"}</h2>
            <p>Meaning /Pronounciation</p>
            <h2 class="font-bold text-2xl font-bangla">"${word.meaning ? word.meaning : "No Meaning Found"} / ${word.pronunciation ? word.pronunciation : "No pronuncitaion found"}"</h2>
            <div class="flex justify-between items-center">
                <button onclick="wordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        // append into container 
        wordContainer.append(wordDiv);
    }

    manageSpinner(false);

}



const displayLesson = (lessons) => {
    // 1. get the container & empty 
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    // 2. get into every lessons
    for (let lesson of lessons) {
        //     3.create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="current-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary current-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;

        //     4.append into container 
        lessonContainer.append(btnDiv);

    }
}

loadLessons();