if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'he-IL'; // זיהוי קול בעברית
    recognition.continuous = false;
    recognition.interimResults = false;

    const startListeningButton = document.getElementById('start-listening');
    const resultDisplay = document.getElementById('result');

    startListeningButton.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onstart = function() {
        resultDisplay.textContent = "מקשיב...";
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.trim();
        resultDisplay.textContent = `שמעת: ${transcript}`;
        speakOutLoud(transcript);
    };

    recognition.onerror = function(event) {
        resultDisplay.textContent = 'שגיאה בזיהוי קול: ' + event.error;
    };

    recognition.onend = function() {
        resultDisplay.textContent = "סיים להקשיב.";
    };
} else {
    alert('דפדפן זה אינו תומך ב-Web Speech API');
}

// פונקציה שמקריאה תשובות
function speakOutLoud(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'he-IL'; // שפה עברית

    if (text.includes('שלום יורי')) {
        speech.text = 'שלום! איך אפשר לעזור לך היום?';
    } else if (text.includes('מה השעה')) {
        const currentTime = new Date().toLocaleTimeString('he-IL');
        speech.text = `השעה היא: ${currentTime}`;
    } else if (text.includes('מזג אוויר')) {
        speech.text = 'בדיקת מזג האוויר כרגע...'; // כאן אפשר להוסיף חיבור ל-API למזג אוויר
    } else if (text.includes('יורי אתה מצחיק')) {
        speech.text = 'תודה אני תמיד ידעתי שאני מצחיק  אני כל יום מתאמן על הבדיחות שלי מול המראה בחדר';
    } else if (text.includes('יורי תציג את עצמך')) {
        speech.text = 'שלום אני יורי אני העוזר של אא  ב   טכנולוגיה וחשמל';
    } else if (text.includes('איך קוראים לראש הממשלה')) {
        speech.text = 'ביבי נתניהו';
    } else if (text.includes('יורי במה אנחנו מתעסקים')) {
        speech.text = 'אשמח לספר! אנחנו מתעסקים בעיצוב גרפי  וגם מתעסקים  במערכות כגון מערכות למסעדות וגם אנחנו מתעסקים  בבניית אתרים  אנחנו בנוסף יודעים להתעסק עם באגים ודברים פשוטים בטלפונים ובמחשבים וכמובן שעוד כמה דברים';
    } else if (text.includes('יורי תרים ידיים')) {
        speech.text = 'אני כל כך מפחד אני מרים ידיים    סתם  חחח  בדיחה מצחיקה';
    } else {
        speech.text = 'מצטער, לא הבנתי.';
    }

    window.speechSynthesis.speak(speech);
}
