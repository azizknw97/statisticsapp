let chart = null;

document.getElementById("btnHitung").addEventListener("click", hitungStatistik);
document.getElementById("btnReset").addEventListener("click", resetData);

function hitungStatistik() {

    const input = document.getElementById("data").value.trim();

    if (input === "") {
        alert("Data tidak boleh kosong.");
        return;
    }

    let angka = input.split(",").map(x => x.trim());

    for (let i = 0; i < angka.length; i++) {

        if (isNaN(angka[i]) || angka[i] === "") {
            alert("Semua data harus berupa angka.");
            return;
        }

        angka[i] = parseFloat(angka[i]);
    }

    angka.sort((a, b) => a - b);

    const n = angka.length;

    // ==========================
    // Mean
    // ==========================
    const mean = angka.reduce((a, b) => a + b, 0) / n;

    // ==========================
    // Median
    // ==========================
    let median;

    if (n % 2 === 0) {

        median = (angka[n / 2 - 1] + angka[n / 2]) / 2;

    } else {

        median = angka[Math.floor(n / 2)];

    }

    // ==========================
    // Modus
    // ==========================
    let frekuensi = {};

    angka.forEach(nilai => {

        frekuensi[nilai] = (frekuensi[nilai] || 0) + 1;

    });

    let maxFrekuensi = Math.max(...Object.values(frekuensi));

    let modus;

    if (maxFrekuensi === 1) {

        modus = "Tidak Ada";

    } else {

        modus = Object.keys(frekuensi)
            .filter(key => frekuensi[key] === maxFrekuensi)
            .join(", ");

    }

    // ==========================
    // Varians
    // ==========================
    let varians = 0;

    angka.forEach(nilai => {

        varians += Math.pow(nilai - mean, 2);

    });

    varians = n > 1 ? varians / (n - 1) : 0;

    // ==========================
    // Standar Deviasi
    // ==========================
    const stdev = Math.sqrt(varians);

    // ==========================
    // Tampilkan Hasil
    // ==========================
    document.getElementById("jumlah").innerHTML = n;

    document.getElementById("mean").innerHTML = mean.toFixed(2);

    document.getElementById("median").innerHTML = median.toFixed(2);

    document.getElementById("modus").innerHTML = modus;

    document.getElementById("varians").innerHTML = varians.toFixed(2);

    document.getElementById("stdev").innerHTML = stdev.toFixed(2);

    buatHistogram(frekuensi);

}

function buatHistogram(frekuensi) {

    const ctx = document.getElementById("chartHistogram").getContext("2d");

    if (chart != null) {

        chart.destroy();

    }

    chart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: Object.keys(frekuensi),

            datasets: [{

                label: "Frekuensi",

                data: Object.values(frekuensi),

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            }

        }

    });

}

function resetData() {

    document.getElementById("data").value = "";

    document.getElementById("jumlah").innerHTML = 0;
    document.getElementById("mean").innerHTML = 0;
    document.getElementById("median").innerHTML = 0;
    document.getElementById("modus").innerHTML = 0;
    document.getElementById("varians").innerHTML = 0;
    document.getElementById("stdev").innerHTML = 0;

    if (chart != null) {

        chart.destroy();
        chart = null;

    }

}