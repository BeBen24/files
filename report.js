document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const discordName = document.getElementById('discordName').value;
    const platform = document.getElementById('platform').value;
    const reportedPlayer = document.getElementById('reportedPlayer').value;
    const incident = document.getElementById('incident').value;
    const webhookURL = 'https://discord.com/api/webhooks/1271142733934756051/lIp4xk3vOd4YkpZWIADrlRmKsjdEKFMx0q9rF0hDsih4UlAUr5zS7HktE1ZzctUYWF_f';

    if (discordName && platform && reportedPlayer && incident) {
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [{
                    title: "תלונה על שחקן",
                    color: 15158332,
                    fields: [
                        {
                            name: "שם בדיסקורד",
                            value: discordName,
                            inline: false
                        },
                        {
                            name: "פלטפורמה",
                            value: platform,
                            inline: false
                        },
                        {
                            name: "שם השחקן עליו התלוננו",
                            value: reportedPlayer,
                            inline: false
                        },
                        {
                            name: "פרטי המקרה",
                            value: incident,
                            inline: false
                        }
                    ],
                    timestamp: new Date()
                }]
            })
        }).then(response => {
            if (response.ok) {
                alert('התלונה נשלחה בהצלחה!');
                document.getElementById('reportForm').reset();
            } else {
                alert('שגיאה בשליחת התלונה.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('שגיאה בשליחת התלונה.');
        });
    } else {
        alert('אנא מלא את כל השדות.');
    }
});
