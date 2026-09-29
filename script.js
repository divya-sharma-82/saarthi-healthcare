const supabaseUrl = "https://ihwhbfkucocbwmaxnobd.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_vFA7NdiYzfpYgBmqRRC4Wg_9GN57zzg";

const db = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

/* =========================================================
   SAARTHI AI HEALTHCARE
   INTERACTIVE JAVASCRIPT
========================================================= */


/* =========================
   PATIENT ASSESSMENT
========================= */

const questions = {

    en: [
        "Hello! I'm SAARTHI AI. What is your name?",
        "What is your age?",
        "What is your main health problem?",
        "How long have you had this problem?",
        "Do you have any previous medical history?",
        "Are you currently taking any medicines?"
    ],

    hi: [
        "नमस्ते! मैं SAARTHI AI हूँ। आपका नाम क्या है?",
        "आपकी उम्र कितनी है?",
        "आपकी मुख्य स्वास्थ्य समस्या क्या है?",
        "यह समस्या आपको कितने समय से है?",
        "क्या आपको पहले से कोई बीमारी या मेडिकल हिस्ट्री है?",
        "क्या आप अभी कोई दवा ले रहे हैं?"
    ]
   /* =========================
   SAARTHI IMPACT INTERACTION
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    const impactCards = document.querySelectorAll(".impact-card");

    impactCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-7px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });

    });

});

};


let currentQuestion = 0;

let selectedLanguage = "en";

let answers = [];

let uploadedFile = null;


/* =========================
   START ASSESSMENT
========================= */

function startAssessment() {

    document
        .getElementById("assessment")
        .scrollIntoView({
            behavior: "smooth"
        });

    setTimeout(() => {

        document
            .getElementById("answer")
            .focus();

    }, 700);
}


/* =========================
   LANGUAGE
========================= */

function setLanguage(language) {

    selectedLanguage = language;

    currentQuestion = 0;

    answers = [];

    updateLanguageButtons();

    updateQuestion();

}


/* =========================
   LANGUAGE BUTTONS
========================= */

function updateLanguageButtons() {

    const englishBtn =
        document.getElementById("englishBtn");

    const hindiBtn =
        document.getElementById("hindiBtn");


    englishBtn.classList.remove("active");

    hindiBtn.classList.remove("active");


    if (selectedLanguage === "en") {

        englishBtn.classList.add("active");

    } else {

        hindiBtn.classList.add("active");

    }

}


/* =========================
   UPDATE QUESTION
========================= */

function updateQuestion() {

    const questionElement =
        document.getElementById("question");

    const numberElement =
        document.getElementById("questionNumber");

    const percentElement =
        document.getElementById("progressPercent");

    const progressBar =
        document.getElementById("progressBar");

    const answerInput =
        document.getElementById("answer");


    const currentQuestions =
        questions[selectedLanguage];


    questionElement.innerText =
        currentQuestions[currentQuestion];


    numberElement.innerText =
        `Question ${currentQuestion + 1} of ${currentQuestions.length}`;


    const percent =
        Math.round(
            ((currentQuestion + 1) /
            currentQuestions.length) * 100
        );


    percentElement.innerText =
        `${percent}%`;


    progressBar.style.width =
        `${percent}%`;


    answerInput.value = "";


    if (selectedLanguage === "hi") {

        answerInput.placeholder =
            "अपना उत्तर लिखें...";

    } else {

        answerInput.placeholder =
            "Type your answer...";

    }

}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

    const answerInput =
        document.getElementById("answer");

    const answer =
        answerInput.value.trim();


    if (!answer) {

        if (selectedLanguage === "hi") {

            alert("कृपया अपना उत्तर दर्ज करें।");

        } else {

            alert("Please enter your answer.");

        }

        return;
    }


    answers[currentQuestion] = answer;


    /* Emergency check */

    checkEmergency(answer);


    currentQuestion++;


    if (
        currentQuestion >=
        questions[selectedLanguage].length
    ) {

        generateSummary();

        showCompletionMessage();

        setTimeout(() => {

            document
                .getElementById("summary")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 500);


        currentQuestion = 0;

        return;

    }


    updateQuestion();

}


/* =========================
   ENTER KEY
========================= */

function handleEnter(event) {

    if (event.key === "Enter") {

        nextQuestion();

    }

}


/* =========================
   VOICE INPUT
========================= */

function voiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice input is not supported in this browser. Please use Chrome or type your answer."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;


    if (selectedLanguage === "hi") {

        recognition.lang = "hi-IN";

    } else {

        recognition.lang = "en-IN";

    }


    const micButton =
        document.querySelector(".mic-btn");


    micButton.innerText = "🔴";


    recognition.start();


    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;


        document
            .getElementById("answer")
            .value = transcript;


        micButton.innerText = "🎤";

    };


    recognition.onerror = function() {

        micButton.innerText = "🎤";

        alert(
            "Voice input could not be detected. Please try again or type your answer."
        );

    };


    recognition.onend = function() {

        micButton.innerText = "🎤";

    };

}


/* =========================
   COMPLETION MESSAGE
========================= */

function showCompletionMessage() {

    if (selectedLanguage === "hi") {

        alert(
            "Assessment complete!\n\n" +
            "Aapka case summary generate ho gaya hai."
        );

    } else {

        alert(
            "Assessment complete!\n\n" +
            "Your case summary has been generated."
        );

    }

}


/* =========================
   GENERATE CASE SUMMARY
========================= */

function generateSummary() {

    const name =
        answers[0] || "Not provided";


    const age =
        answers[1] || "Not provided";


    const complaint =
        answers[2] || "Not provided";


    const duration =
        answers[3] || "Not provided";


    document
        .getElementById("summaryName")
        .innerText = name;


    document
        .getElementById("summaryAge")
        .innerText = age;


    document
        .getElementById("summaryComplaint")
        .innerText = complaint;


    document
        .getElementById("summaryDuration")
        .innerText = duration;


    if (uploadedFile) {

        document
            .getElementById("reportStatus")
            .innerText =
            "Document uploaded ✓";

    }


    checkEmergency(complaint);

}


/* =========================
   EMERGENCY DETECTION
========================= */

function checkEmergency(text) {

    const emergencyKeywords = [

        "chest pain",
        "difficulty breathing",
        "breathing problem",
        "unconscious",
        "severe bleeding",
        "stroke",
        "heart attack",

        "सीने में दर्द",
        "सांस लेने में दिक्कत",
        "बेहोशी",
        "बहुत ज्यादा खून",
        "स्ट्रोक",
        "हार्ट अटैक"

    ];


    const lowerText =
        text.toLowerCase();


    const found =
        emergencyKeywords.some(
            keyword =>
                lowerText.includes(
                    keyword.toLowerCase()
                )
        );


    if (found) {

        document
            .getElementById("emergencyAlert")
            .classList.remove("hidden");

    }

}


/* =========================
   FILE UPLOAD
========================= */

const fileInput =
    document.getElementById("fileInput");


if (fileInput) {

    fileInput.addEventListener(
        "change",
        function() {

            if (!this.files.length) {

                uploadedFile = null;

                document
                    .getElementById("fileName")
                    .innerText =
                    "No file selected";

                return;
            }


            uploadedFile =
                this.files[0];


            document
                .getElementById("fileName")
                .innerText =
                `✓ ${uploadedFile.name}`;


            document
                .getElementById("reportStatus")
                .innerText =
                "Document uploaded ✓";

        }
    );

}


/* =========================
   DOCUMENT ANALYSIS
========================= */

function analyzeDocument() {

    if (!uploadedFile) {

        alert(
            "Please choose a medical document first."
        );

        return;
    }


    const result =
        document.getElementById(
            "analysisResult"
        );


    result.innerText =
        "⏳ Analyzing document...";


    setTimeout(() => {

        result.innerText =
            "✓ Demo analysis completed successfully.";


        const steps =
            document.querySelectorAll(
                ".process-step"
            );


        steps.forEach(step => {

            step.classList.add("active");

        });


        document
            .getElementById("reportStatus")
            .innerText =
            "Analyzed ✓";


    }, 1800);

}


/* =========================
   VERIFY CASE
========================= */

function verifyCase() {

    const status =
        document.querySelector(
            ".pending-status"
        );


    status.innerText =
        "● Verified";


    status.style.background =
        "#e3f6e9";


    status.style.color =
        "#16834b";


    alert(
        "Case verified successfully!\n\nDoctor verification completed."
    );

}


/* =========================
   EDIT SUMMARY
========================= */

function editSummary() {

    const complaint =
        document.getElementById(
            "summaryComplaint"
        );


    const newValue =
        prompt(
            "Edit Chief Complaint:",
            complaint.innerText
        );


    if (
        newValue !== null &&
        newValue.trim() !== ""
    ) {

        complaint.innerText =
            newValue.trim();

    }

}


/* =========================
   PATIENT SEARCH
========================= */

function searchPatients() {

    const searchInput =
        document.getElementById(
            "patientSearch"
        );


    const searchValue =
        searchInput.value.toLowerCase();


    const rows =
        document.querySelectorAll(
            "#patientTable tbody tr"
        );


    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();


        if (text.includes(searchValue)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


/* =========================
   VIEW PATIENT
========================= */

function viewPatient(name) {

    alert(
        "Patient Case\n\n" +
        "Name: " + name +
        "\n\nOpening detailed medical case..."
    );


    document
        .getElementById("summary")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   INITIAL SETUP
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateLanguageButtons();

        updateQuestion();

    }
);
/* =========================
   SUPABASE CONNECTION TEST
========================= */

async function testSupabase() {
    const { data, error } = await db
        .from("appointments")
        .select("*")
        .limit(1);

    if (error) {
        console.error("Supabase connection error:", error);
    } else {
        console.log("Supabase connected successfully:", data);
    }
}
testSupabase();
