// ==========================================
// APLIKASI ANALISIS STATISTIKA
// ==========================================

const txtData = document.getElementById("data");
const btnHitung = document.getElementById("btnHitung");
const btnReset = document.getElementById("btnReset");

const lblJumlah = document.getElementById("jumlah");
const lblMean = document.getElementById("mean");
const lblMedian = document.getElementById("median");
const lblModus = document.getElementById("modus");
const lblVarians = document.getElementById("varians");
const lblStdev = document.getElementById("stdev");

let chart = null;

// ==========================================
// HITUNG
// ==========================================

btnHitung.addEventListener("click", function () {

    let data = txtData.value.trim();

    if (data === "") {
        alert("Masukkan data terlebih dahulu.");
        txtData.focus();
        return;
    }

    btnHitung.disabled = true;
    btnHitung.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Menghitung...
    `;

    fetch("proses.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        body: "data=" + encodeURIComponent(data)

    })

    .then(response => response.json())

    .then(res => {

        btnHitung.disabled = false;
        btnHitung.innerHTML = `
            <i class="bi bi-calculator"></i>
            Hitung
        `;

        if (res.status !== "success") {

            alert(res.message);

            return;

        }

        tampilkanHasil(res);

        buatHistogram(res.labels, res.frekuensi);

    })

    .catch(error => {

        btnHitung.disabled = false;

        btnHitung.innerHTML = `
            <i class="bi bi-calculator"></i>
            Hitung
        `;

        alert("Terjadi kesalahan.");

        console.log(error);

    });

});


// ==========================================
// TAMPILKAN HASIL
// ==========================================

function tampilkanHasil(res){

    lblJumlah.innerHTML = res.jumlah;

    lblMean.innerHTML = res.mean;

    lblMedian.innerHTML = res.median;

    lblModus.innerHTML = res.modus;

    lblVarians.innerHTML = res.varians;

    lblStdev.innerHTML = res.stdev;

    document.querySelectorAll(".card-stat").forEach(card=>{

        card.classList.remove("fade-in");

        void card.offsetWidth;

        card.classList.add("fade-in");

    });

}


// ==========================================
// HISTOGRAM
// ==========================================

function buatHistogram(labels,data){

    let ctx = document.getElementById("chartHistogram");

    if(chart){

        chart.destroy();

    }

    chart = new Chart(ctx,{

        type:'bar',

        data:{

            labels:labels,

            datasets:[{

                label:'Frekuensi',

                data:data,

                backgroundColor:'rgba(13,110,253,0.65)',

                borderColor:'rgba(13,110,253,1)',

                borderWidth:2,

                borderRadius:8

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    display:false

                },

                title:{

                    display:true,

                    text:'Histogram Distribusi Data',

                    font:{

                        size:18

                    }

                }

            },

            scales:{

                x:{

                    title:{

                        display:true,

                        text:'Nilai'

                    }

                },

                y:{

                    beginAtZero:true,

                    ticks:{

                        precision:0

                    },

                    title:{

                        display:true,

                        text:'Frekuensi'

                    }

                }

            }

        }

    });

}


// ==========================================
// RESET
// ==========================================

btnReset.addEventListener("click",function(){

    txtData.value="";

    lblJumlah.innerHTML="0";
    lblMean.innerHTML="0";
    lblMedian.innerHTML="0";
    lblModus.innerHTML="0";
    lblVarians.innerHTML="0";
    lblStdev.innerHTML="0";

    if(chart){

        chart.destroy();

        chart=null;

    }

    txtData.focus();

});


// ==========================================
// ENTER = HITUNG
// ==========================================

txtData.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        btnHitung.click();

    }

});