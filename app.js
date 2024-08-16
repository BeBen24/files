// פונקציה להצפנה
function encrypt(text, key) {
    let cipher = CryptoJS.AES.encrypt(text, key);
    return cipher.toString();
}

// פונקציה לפענוח
function decrypt(text, key) {
    let bytes = CryptoJS.AES.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// הגדרת הקוד הנכון והקישור המוצפן
const correctCode = 'FLpn@#$d'; // הקוד הנכון
const secretPageUrl = 'secure-hpdl-mmi.html'; // הכתובת המקורית של הדף הסודי
const secretPageUrlEncrypted = encrypt(secretPageUrl, correctCode); // הצפנת הקישור

document.getElementById('loginButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;

    if (code === correctCode) {
        const decryptedUrl = decrypt(secretPageUrlEncrypted, code); // פענוח הכתובת
        document.getElementById('redirectButton').style.display = 'block';
        document.getElementById('redirectButton').onclick = function() {
            window.location.href = decryptedUrl; // נווט לדף הסודי
        };
    } else {
        alert('קוד לא נכון');
    }
});
