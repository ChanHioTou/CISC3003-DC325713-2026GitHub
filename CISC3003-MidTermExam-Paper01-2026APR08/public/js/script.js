const container = document.getElementById('container');
const signUp = document.getElementById('signup');
const signIn = document.getElementById('signin');

signUp.addEventListener('click', function() {
    container.classList.add('right-panel-active');
});

signIn.addEventListener('click', function() {
    container.classList.remove('right-panel-active');
});