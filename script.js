const clientId = '1388210958702215329';
const redirectUri = encodeURIComponent('https://beben2.com/auth/discord/callback');
const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=identify`;

const authButton = document.getElementById('auth-button');

function createLoginButton() {
  authButton.innerHTML = `
    <a href="${authUrl}" style="display: flex; align-items: center; gap: 8px;">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discord/discord-original.svg" width="20" />
      התחבר עם דיסקורד
    </a>
  `;
}

function createUserButton(user) {
  authButton.innerHTML = `
    <div class="auth">
      <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" />
      ${user.username}
      <div class="logout" onclick="logout()">התנתק</div>
    </div>
  `;
}

function logout() {
  localStorage.removeItem('discord_user');
  location.reload();
}

function init() {
  const user = JSON.parse(localStorage.getItem('discord_user'));
  if (user) {
    createUserButton(user);
  } else {
    createLoginButton();
  }
}

init();
