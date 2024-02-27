// Sélection des éléments du DOM
const player = document.querySelector('.game__player');
const gameContainer = document.querySelector('.game');
const scoreDisplay = document.getElementById('score');

// État du jeu
let score = 0;
let isJumping = false;
let moveIntervals = [];
let gameIsOver = false;

// Gestion du saut
function jump() {
    if (isJumping) return;
    isJumping = true;
    togglePlayerJumpState(true);
    setTimeout(() => togglePlayerJumpState(false), 500);
}

function togglePlayerJumpState(jumping) {
    player.classList[jumping ? 'add' : 'remove']('jump');
    isJumping = jumping;
}

document.addEventListener('keydown', jump);

// Création et gestion des obstacles
function createObstacle() {
    const obstacle = createAndAppendObstacle();
    const moveInterval = startMovingObstacle(obstacle);
    moveIntervals.push(moveInterval);
}

function createAndAppendObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('game__obstacles');
    gameContainer.appendChild(obstacle);
    return obstacle;
}

function startMovingObstacle(obstacle) {
    let obstaclePosition = window.innerWidth;
    return setInterval(() => {
        moveObstacle(obstacle, obstaclePosition -= 10);
    }, 20);
}

function moveObstacle(obstacle, newPosition) {
    obstacle.style.right = `${newPosition}px`;
    if (newPosition < -20) {
        stopAndRemoveObstacle(obstacle);
        incrementScore();
    }
}

function stopAndRemoveObstacle(obstacle) {
    clearInterval(moveIntervals.shift());
    if (gameContainer.contains(obstacle)) {
        gameContainer.removeChild(obstacle);
    }
}


function incrementScore() {
    scoreDisplay.textContent = ++score;
}

// Gestion de fin de jeu
function checkGameOver() {
    if (gameIsOver) stopAllObstacles();
    else requestAnimationFrame(checkGameOver);
}

function stopAllObstacles() {
    moveIntervals.forEach(clearInterval);
    moveIntervals = [];
}

setInterval(createObstacle, 2000);
requestAnimationFrame(checkGameOver);

let level = 1;
const obstaclesSpeed = 2000; // Délai initial entre la création d'obstacles
const difficultyIncrease = 3; // Augmentation de la difficulté tous les X niveaux

// Fonction pour augmenter le niveau
function increaseLevel() {
    level++;
    document.getElementById('level').textContent = level;
    // Augmenter la vitesse des obstacles ou ajouter d'autres défis en fonction du niveau
    if (level % difficultyIncrease === 0) {
        // Augmenter la vitesse des obstacles, par exemple
        clearInterval(obstacleInterval);
        obstacleInterval = setInterval(createObstacle, obstaclesSpeed / level);
    }
}

// Fonction pour vérifier si le joueur atteint un nouveau niveau
function checkLevel() {
    if (score !== 0 && score % 10 === 0) { // Augmenter le niveau tous les 10 points
        increaseLevel();
    }
}

// Fonction pour mettre à jour le score
function updateScore() {
    scoreDisplay.textContent = score;
    checkLevel(); // Vérifier si le joueur atteint un nouveau niveau à chaque mise à jour du score
}
// Fonction pour créer différents types d'obstacles
function createObstacle() {
    const obstacleTypes = ['normal', 'moving', 'changing', 'destroyable', 'multi-level', 'width-height', 'temporal', 'interactive'];
    const obstacleType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const obstacle = createAndAppendObstacle(obstacleType);
    const moveInterval = startMovingObstacle(obstacle);
    moveIntervals.push(moveInterval);
}

// Fonction pour créer et ajouter un obstacle avec un type spécifique
function createAndAppendObstacle(type) {
    const obstacle = document.createElement('div');
    obstacle.classList.add('game__obstacles', type);
    gameContainer.appendChild(obstacle);
    return obstacle;
}

// Ajoutez des variables pour gérer les power-ups
let powerUps = 0;

// Fonction pour créer un power-up
function createPowerUp() {
    const powerUp = document.createElement('div');
    powerUp.classList.add('power-up');
    document.querySelector('.power-ups').appendChild(powerUp);
}

// Fonction pour gérer la collecte de power-ups
function collectPowerUp() {
    powerUps++;
    updatePowerUps();
    // Ajoutez ici le code pour activer le pouvoir du power-up
}

// Fonction pour mettre à jour l'affichage des power-ups
function updatePowerUps() {
    const powerUpsDisplay = document.querySelector('.power-ups');
    powerUpsDisplay.innerHTML = ''; // Efface les anciens power-ups affichés
    for (let i = 0; i < powerUps; i++) {
        createPowerUp();
    }
}
// Ajoutez des variables pour gérer les vies ou les boucliers
let lives = 3;

// Fonction pour créer une vie ou un bouclier
function createLife() {
    const life = document.createElement('div');
    life.classList.add('life');
    document.querySelector('.lives').appendChild(life);
}

// Fonction pour perdre une vie ou un bouclier
function loseLife() {
    lives--;
    updateLives();
    if (lives === 0) {
        gameOver(); // Appeler la fonction de fin de jeu si le joueur n'a plus de vies
    }
}

// Fonction pour mettre à jour l'affichage des vies ou des boucliers
function updateLives() {
    const livesDisplay = document.querySelector('.lives');
    livesDisplay.innerHTML = ''; // Efface les anciennes vies affichées
    for (let i = 0; i < lives; i++) {
        createLife();
    }
}
// Ajoutez des variables pour suivre le mode de jeu actuel
let currentMode = 'normal'; // Par défaut, le mode normal est sélectionné

// Écoutez les clics sur les boutons de sélection de mode de jeu
document.getElementById('normal-mode').addEventListener('click', () => {
    currentMode = 'normal';
    startGame(); // Appeler la fonction pour démarrer le jeu en mode normal
});

document.getElementById('timed-mode').addEventListener('click', () => {
    currentMode = 'timed';
    startTimedGame(); // Appeler la fonction pour démarrer le jeu en mode chronométré
});

// Fonction pour démarrer le jeu en mode normal
function startGame() {
    // Ajoutez ici la logique spécifique au mode normal
}

// Fonction pour démarrer le jeu en mode chronométré
function startTimedGame() {
    // Ajoutez ici la logique spécifique au mode chronométré
}
// Créer un objet Audio pour l'effet sonore
const jumpSound = new Audio('jump-sound.mp3');

// Fonction pour jouer l'effet sonore du saut
function playJumpSound() {
    jumpSound.play();
}

// Ajouter cet appel de fonction à l'endroit approprié de votre code où le saut est déclenché
playJumpSound();

// Initialiser le niveau à l'écran
document.getElementById('level').textContent = level;

// Écoutez les changements dans les sélecteurs de personnage et de thème
document.getElementById('character-select').addEventListener('change', (event) => {
    const selectedCharacter = event.target.value;
    changeCharacter(selectedCharacter); // Appeler une fonction pour changer le personnage
});

document.getElementById('theme-select').addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    changeTheme(selectedTheme); // Appeler une fonction pour changer le thème
});

// Fonction pour changer le personnage
function changeCharacter(character) {
    // Ajoutez ici la logique pour changer le personnage selon la sélection
}

// Fonction pour changer le thème
function changeTheme(theme) {
    // Ajoutez ici la logique pour changer le thème selon la sélection
}
// Variables pour les écrans
const startScreen = document.getElementById('start-screen');
const instructionsScreen = document.getElementById('instructions-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreDisplay = document.getElementById('final-score');

// Écoutez les clics sur les boutons pour gérer la transition entre les écrans
document.getElementById('start-button').addEventListener('click', () => {
    startGame();
});

document.getElementById('play-button').addEventListener('click', () => {
    showInstructions(false);
});

document.getElementById('restart-button').addEventListener('click', () => {
    restartGame();
});

// Fonction pour afficher ou masquer les écrans
function showInstructions(show) {
    instructionsScreen.style.display = show ? 'block' : 'none';
}

function showGameOverScreen(show) {
    gameOverScreen.style.display = show ? 'block' : 'none';
}

// Fonction pour démarrer le jeu
function startGame() {
    startScreen.style.display = 'none';
    // Ajoutez ici la logique pour démarrer le jeu
}

// Fonction pour afficher l'écran de fin de jeu
function endGame(score) {
    finalScoreDisplay.textContent = score;
    showGameOverScreen(true);
}

// Fonction pour recommencer le jeu
function restartGame() {
    showGameOverScreen(false);
    // Ajoutez ici la logique pour recommencer le jeu
}
// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/scoreboard', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Schema for Scores
const scoreSchema = new mongoose.Schema({
    playerName: String,
    score: Number
});

const Score = mongoose.model('Score', scoreSchema);

// Routes
app.get('/scores', async (req, res) => {
    try {
        const scores = await Score.find().sort({ score: -1 }).limit(10); // Get top 10 scores
        res.json(scores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/scores', async (req, res) => {
    const score = new Score({
        playerName: req.body.playerName,
        score: req.body.score
    });

    try {
        const newScore = await score.save();
        res.status(201).json(newScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

