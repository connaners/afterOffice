const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function classifyAge(age) {
    if (age < 13) return 'Anak-anak';
    if (age >= 13 && age <= 17) return 'Remaja';
    if (age >= 18 && age <= 59) return 'Dewasa';
    if (age >= 60) return 'Lansia';
    return 'Tidak valid';
}

function resultClassify(age) {
    const result = {};

    age.forEach(({ category }) => {
        if (!result[category]) {
            result[category] = 0;
        }
        result[category]++;
    });

    return result;
}

async function main() {
    const ages = [];
    console.log('input exit done to stop inputting age');
    while (true) {
        const input = await askQuestion(`Masukkan usia: `)
        if (input === 'exit' || input === 'done') {
            console.log('Input dihentikan.');
            break;
        }

        const age = parseInt(input);

        if (isNaN(age)) {
            console.log('Input tidak valid. Silakan masukkan angka.');
            continue;
        }

        const category = classifyAge(age);

        ages.push({ age, category });
        
    }
    rl.close();
    const summary = resultClassify(ages);
    console.log("\nRingkasan Kategori:");
    for (const category in summary) {
        console.log(`${category}: ${summary[category]} orang`);
    }
}


main();


