<?php

header("Content-Type: application/json");

// ================================
// Validasi Input
// ================================
if (!isset($_POST['data']) || trim($_POST['data']) == "") {

    echo json_encode([
        "status" => "error",
        "message" => "Data tidak boleh kosong."
    ]);

    exit;
}

// ================================
// Ambil Data
// ================================
$input = trim($_POST['data']);

$data = explode(",", $input);

$angka = [];

foreach ($data as $item) {

    $item = trim($item);

    if (!is_numeric($item)) {

        echo json_encode([
            "status" => "error",
            "message" => "Semua data harus berupa angka."
        ]);

        exit;
    }

    $angka[] = floatval($item);
}

sort($angka);

$n = count($angka);

// ================================
// Mean
// ================================
$mean = array_sum($angka) / $n;

// ================================
// Median
// ================================
if ($n % 2 == 0) {

    $median = ($angka[$n/2-1] + $angka[$n/2]) / 2;

} else {

    $median = $angka[floor($n/2)];
}

// ================================
// Modus
// ================================
$frekuensi = [];

foreach ($angka as $nilai){

    $key = (string)$nilai;

    if(isset($frekuensi[$key])){

        $frekuensi[$key]++;

    }else{

        $frekuensi[$key]=1;

    }

}

$maxFrekuensi=max($frekuensi);

$modus=[];

foreach($frekuensi as $nilai=>$freq){

    if($freq==$maxFrekuensi){

        $modus[]=$nilai;

    }

}

if($maxFrekuensi==1){

    $modus="Tidak Ada";

}else{

    $modus=implode(", ",$modus);

}

// ================================
// Varians
// ================================
$varians=0;

foreach($angka as $nilai){

    $varians+=pow($nilai-$mean,2);

}

if($n>1){

    $varians/=$n-1;

}else{

    $varians=0;

}

// ================================
// Standar Deviasi
// ================================
$stdev=sqrt($varians);

// ================================
// Frekuensi Histogram
// ================================
$histogram=[];

foreach($angka as $nilai){

    $key=(string)$nilai;

    if(isset($histogram[$key])){

        $histogram[$key]++;

    }else{

        $histogram[$key]=1;

    }

}

// ================================
// Output JSON
// ================================
echo json_encode([

    "status"=>"success",

    "jumlah"=>$n,

    "mean"=>round($mean,2),

    "median"=>round($median,2),

    "modus"=>$modus,

    "varians"=>round($varians,2),

    "stdev"=>round($stdev,2),

    "labels"=>array_keys($histogram),

    "frekuensi"=>array_values($histogram)

]);

?>