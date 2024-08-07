document.getElementById('discordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const discordName = document.getElementById('discordName').value;
    const age = document.getElementById('age').value;
    const activity = document.getElementById('activity').value;
    const reason = document.getElementById('reason').value;
    const experience = document.getElementById('experience').value;
    const webhookURL = 'https://discord.com/api/webhooks/1270451518465904671/jsAXqd3mhx3_ScIKIBh7mHa7uqm8d4gtSuqRJK7h0h0mPd1IMPr7zw0W2YWrWry2oh5Q';

    if (discordName && age && activity && reason && experience) {
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [{
                    title: "בקשת הצטרפות לצוות",
                    color: 3447003,
                    fields: [
                        {
                            name: "שם בדיסקורד",
                            value: discordName,
                            inline: false
                        },
                        {
                            name: "גיל",
                            value: age,
                            inline: false
                        },
                        {
                            name: "שעות פעילות ביום",
                            value: activity,
                            inline: false
                        },
                        {
                            name: "סיבה להצטרפות",
                            value: reason,
                            inline: false
                        },
                        {
                            name: "נסיון קודם",
                            value: experience,
                            inline: false
                        }
                    ],
                    timestamp: new Date()
                }]
            })
        }).then(response => {
            if (response.ok) {
                alert('התשובה נשלחה בהצלחה!');
                document.getElementById('discordForm').reset();
            } else {
                alert('שגיאה בשליחת התשובה.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('שגיאה בשליחת התשובה.');
        });
    } else {
        alert('אנא מלא את כל השדות.');
    }
});
