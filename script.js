document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault(); // מונע את שליחת הטופס הרגילה

    // קבלת ערכים מהטופס
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const device = document.getElementById('device').value;
    const description = document.getElementById('description').value;

    // נתונים של ה-Embed שישלח ל-Discord webhook
    const data = {
        embeds: [{
            title: "דיווח באגים",
            color: 0x7289DA, // צבע כחול ל-Embed
            fields: [
                {
                    name: "שם פרטי",
                    value: firstName,
                    inline: true
                },
                {
                    name: "שם משפחה",
                    value: lastName,
                    inline: true
                },
                {
                    name: "מכשיר",
                    value: device,
                    inline: true
                },
                {
                    name: "תיאור הבעיה",
                    value: description
                }
            ],
            timestamp: new Date(), // מוסיף זמן לשליחת ה-Embed
        }]
    };

    // שליחת הנתונים ל-Discord webhook
    fetch('https://discord.com/api/webhooks/1285518574969946194/NToctZlJv7C3h3fpvZbjx-QBHaa9IM3tzf0ybvOWi4mD6g49ZFQtG1nLKJtsZj17fEA4', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // הצגת הודעת תודה למשתמש אם הבקשה הצליחה
            alert('תודה על הדיווח! אנחנו נבדוק את הבעיה בהקדם.');
            // ניתן גם לנקות את הטופס אם רוצים
            document.getElementById('reportForm').reset();
        } else {
            // טיפול במקרה של שגיאה
            alert('הייתה שגיאה בשליחת הדיווח. נסה שוב מאוחר יותר.');
        }
    })
    .catch(error => {
        // טיפול במקרה של שגיאה בקישור
        console.error('שגיאה בשליחת הדיווח:', error);
        alert('הייתה שגיאה בשליחת הדיווח. נסה שוב מאוחר יותר.');
    });
});
