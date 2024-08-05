// ניהול הצבעות
let votes = {
    option1: localStorage.getItem('votesOption1') ? parseInt(localStorage.getItem('votesOption1')) : 0,
    option2: localStorage.getItem('votesOption2') ? parseInt(localStorage.getItem('votesOption2')) : 0,
};

// הצגת מספר ההצבעות בהתחלה
document.getElementById("count1").innerText = votes.option1;
document.getElementById("count2").innerText = votes.option2;

// בדוק אם כבר הצביעו
let lastVoteTime = localStorage.getItem('lastVoteTime') ? parseInt(localStorage.getItem('lastVoteTime')) : 0;
const currentTime = new Date().getTime();
let userVoted = localStorage.getItem('userVoted') === 'true';

if (userVoted) {
    document.getElementById("button1").disabled = true;
    document.getElementById("button2").disabled = true;
}

// פונקציה להצבעה
function vote(option) {
    if (!userVoted) { // בדוק אם המשתמש לא הצביע
        if (option === 1) {
            votes.option1++;
            localStorage.setItem('votesOption1', votes.option1); // שמירה ב-localStorage
            document.getElementById("count1").innerText = votes.option1;
        } else if (option === 2) {
            votes.option2++;
            localStorage.setItem('votesOption2', votes.option2); // שמירה ב-localStorage
            document.getElementById("count2").innerText = votes.option2;
        }

        // חסום את הכפתורים
        document.getElementById("button1").disabled = true;
        document.getElementById("button2").disabled = true;

        // שמור את מצב ההצבעה של המשתמש
        localStorage.setItem('userVoted', 'true');

        // שמור את הזמן של ההצבעה הנוכחית
        localStorage.setItem('lastVoteTime', new Date().getTime());

        // מחזיר את הכפתורים לפעולה אחרי 10 דקות
        setTimeout(() => {
            document.getElementById("button1").disabled = false;
            document.getElementById("button2").disabled = false;
        }, 600000); // 10 דקות
    } else {
        alert("כבר הצבעת!");
    }
}
