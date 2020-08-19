// Enemies
// Have enemyType, strength, health

// Characters
// have a name, weapon, and health

let fireDungeonEnemies = [
	{
		name: "Wizard",
		enemyType: "slime",
		strength: 100, // Strength of attack
		health: 100
	},
	{
		name: "Big Foot",
		enemyType: "bat",
		strength: 200,
		health: 100,
	},
	{
		name: "Michael Myers",
		enemyType: "skeleton",
		strength: 150,
		health: 150,
	}
];

let iceDungeonEnemies = [
	{
		name: "Jerusalem",
		enemyType: "slime",
		strength: 100, // Strength of attack
		health: 100
	},
	{
		name: "McKenzie",
		enemyType: "bat",
		strength: 200,
		health: 100,
	},
	{
		name: "Ninth Factorial",
		enemyType: "skeleton",
		strength: 150,
		health: 150,
	}
];

let steamDungeonEnemies = [
	{
		name: "Berger",
		enemyType: "slime",
		strength: 100, // Strength of attack
		health: 100
	},
	{
		name: "Hotwing",
		enemyType: "bat",
		strength: 200,
		health: 100,
	},
	{
		name: "Crypt Keeper",
		enemyType: "skeleton",
		strength: 150,
		health: 150,
	}
];

let weakCharacters = [
	{
		name: 'SACHEVERELL',
		health: 250,
		weapon: 'sword'
	},
	{
		name: 'CASSIOPEIA',
		health: 100,
		weapon: 'arrow'
	},
	{
		name: 'METHUSELAH',
		health: 150,
		weapon: 'fireball'
	},
	{
		name: 'PROMETHEUS',
		health: 200,
		weapon: 'acidrain'
	}
];

let averageCharacters = [
	{
		name: 'SNEADEL',
		health: 350,
		weapon: 'sword'
	},
	{
		name: 'BASHFERN',
		health: 300,
		weapon: 'arrow'
	},
	{
		name: 'GORGONZOLA',
		health: 350,
		weapon: 'fireball'
	},
	{
		name: 'PATRINI-KKL',
		health: 500,
		weapon: 'acidrain'
	}
];

let buffedCharacters = [
	{
		name: 'BLEZZA',
		health: 450,
		weapon: 'sword'
	},
	{
		name: 'NIOUMPHA',
		health: 300,
		weapon: 'arrow'
	},
	{
		name: 'DRANKLE SCORES',
		health: 450,
		weapon: 'fireball'
	},
	{
		name: 'OPPO EPPOLL',
		health: 500,
		weapon: 'acidrain'
	}
];

// Global Variable
const greaterHit = 50;
const averageHit = 25;
const smallerHit = 10;
const specialHit = 5;

const calculateDamage = (enemyType, weapon) => {
	let damage = 0
	if (enemyType === "slime") {
		if (weapon === "sword") {
			damage = greaterHit;
		} else if (weapon === "arrow") {
			damage = smallerHit;
		} else if (weapon === "fireball") {
			damage = averageHit;
		}
	} else if (enemyType === "bat") {
		if (weapon === "sword") {
			damage = smallerHit;
		} else if (weapon === "arrow") {
			damage = greaterHit;
		} else if (weapon === "fireball") {
			damage = averageHit;
		}
	} else if (enemyType === "skeleton") {
		if (weapon === "sword" || weapon === "fireball" || weapon === "arrow") {
			damage = averageHit;
		}
	}

	if (weapon === 'acidrain') {
		damage = specialHit;
	}

	return damage;
}

const startDungeonWithTeam = (enemyArray, characterArray) => {
	let deadEnemiesCounter = 0;
	let deadAlliesCounter = 0;
	if (characterArray.length > 0) {
		for (let enemyCounter = 0; enemyCounter < enemyArray.length; enemyCounter++) {
			let roundNumber = 0;
			let myCurrentEnemy = enemyArray[enemyCounter]; // Get the current enemy
			while (deadAlliesCounter !== characterArray.length && myCurrentEnemy.health > 0) {
				roundNumber++;
				let enemyHasAttackedThisRound = false;
				console.log(`Team Versus ${myCurrentEnemy.name.toUpperCase()} the ${myCurrentEnemy.enemyType.toUpperCase()} - ROUND ${roundNumber}!`);
				for (let characterCounter = 0; characterCounter < characterArray.length; characterCounter++) {
					let myCurrentCharacter = characterArray[characterCounter]; // Get the current character
					if (myCurrentCharacter.health > 0) {

						// Enemy attacks the first alive character it sees
						if (!enemyHasAttackedThisRound) {
							myCurrentCharacter.health -= myCurrentEnemy.strength;
							console.log(`${myCurrentCharacter.name.toUpperCase()} was hit by ${myCurrentEnemy.name.toUpperCase()} the ${myCurrentEnemy.enemyType.toUpperCase()} for ${myCurrentEnemy.strength}. This character's health is now at ${myCurrentCharacter.health}.`);
							if (myCurrentCharacter.health <= 0) {
								console.log(`${myCurrentCharacter.name.toUpperCase()} DIED!`);
								deadAlliesCounter++;
								if (deadAlliesCounter === characterArray.length) {
									break; // End the for-loop early if all characters are dead
								}
								++characterCounter;
								myCurrentCharacter = characterArray[characterCounter];
							}
							enemyHasAttackedThisRound = true;
						}

						// All characters attack the enemy
						let myCurrentCharacterDamage = calculateDamage(myCurrentEnemy.enemyType, myCurrentCharacter.weapon);
						if (myCurrentCharacter.weapon === "acidrain") {
							enemyArray.map(enemy => {
								if (enemy.health > 0) {
									enemy.health -= myCurrentCharacterDamage;
									console.log(`${myCurrentCharacter.name.toUpperCase()} hit ${enemy.name.toUpperCase()} the ${enemy.enemyType.toUpperCase()} for ${myCurrentCharacterDamage}. This enemy's health is now at ${enemy.health}.`);
								}
							});
						} else {
							myCurrentEnemy.health -= myCurrentCharacterDamage;
							console.log(`${myCurrentCharacter.name.toUpperCase()} hit ${myCurrentEnemy.name.toUpperCase()} the ${myCurrentEnemy.enemyType.toUpperCase()} for ${myCurrentCharacterDamage}. This enemy's health is now at ${myCurrentEnemy.health}.`);
						}
						if (myCurrentEnemy.health <= 0) {
							deadEnemiesCounter++;
							console.log("The enemy died!");
							break; // End the for-loop early if the enemy dies
						}
					}
				}
			}
		}
		if (deadAlliesCounter === characterArray.length) {
			console.log(`All of your characters died! You lost, but you successfully killed ${deadEnemiesCounter} out of ${enemyArray.length} enemies!`);
		} else {
			console.log(`Congratulations! You have survived the dungeon and have successfully killed ${deadEnemiesCounter} out of ${enemyArray.length} enemies!`);
		}
	} else {
		console.log("You should probably have some characters in your team :/");
	}
}

// FIGHT!
startDungeonWithTeam(fireDungeonEnemies, weakCharacters);
startDungeonWithTeam(iceDungeonEnemies, averageCharacters);
startDungeonWithTeam(steamDungeonEnemies, buffedCharacters);
