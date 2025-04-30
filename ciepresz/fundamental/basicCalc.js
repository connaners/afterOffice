const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

// Fungsi operasi matematika
function tambah(a, b) {
    return a + b;
}

function kurang(a, b) {
    return a - b;
}

function kali(a, b) {
    return a * b;
}

function bagi(a, b) {
    if (b === 0) return 'Tak terdefinisi (pembagian dengan 0)';
    return a / b;
}

// Fungsi utama
async function kalkulator() {
    console.log("Pilih operasi:");
    console.log("1. Penjumlahan");
    console.log("2. Pengurangan");
    console.log("3. Perkalian");
    console.log("4. Pembagian");

    const pilihan = await ask("Masukkan pilihan operasi (1–4): ");

    if (!['1', '2', '3', '4'].includes(pilihan)) {
        console.log("❌ Pilihan tidak valid!");
        rl.close();
        return;
    }

    const angka1 = parseFloat(await ask("Masukkan angka pertama: "));
    const angka2 = parseFloat(await ask("Masukkan angka kedua: "));

    let hasil;
    let operasi;

    switch (pilihan) {
        case '1':
            hasil = tambah(angka1, angka2);
            operasi = 'Penjumlahan';
            break;
        case '2':
            hasil = kurang(angka1, angka2);
            operasi = 'Pengurangan';
            break;
        case '3':
            hasil = kali(angka1, angka2);
            operasi = 'Perkalian';
            break;
        case '4':
            hasil = bagi(angka1, angka2);
            operasi = 'Pembagian';
            break;
    }

    console.log(`\nOperasi: ${operasi}`);
    console.log(`Angka 1: ${angka1}`);
    console.log(`Angka 2: ${angka2}`);
    console.log(`Hasil: ${hasil}`);

    rl.close();
}

kalkulator();

// wkwk/