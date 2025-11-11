const questions = [
  "Saya merasa tertantang ketika menghadapi masalah tanpa solusi yang jelas.",
  "Saya mudah memahami konsep sistematis dan berpola.",
  "Saya senang merancang sesuatu yang bisa membantu pekerjaan orang lain menjadi lebih mudah.",
  "Saya lebih menikmati berpikir dalam logika sebab-akibat dibandingkan dengan berimajinasi bebas.",
  "Saya suka memanfaatkan teknologi untuk mewujudkan ide saya.",
  "Saya bisa membayangkan bagaimana sesuatu akan terlihat bahkan sebelum dibuat.",
  "Saya merasa tertarik melihat perpaduan warna, bentuk, dan tekstur yang unik.",
  "Saya lebih tertarik menciptakan sesuatu yang indah daripada sesuatu yang hanya fungsional.",
  "Saya mampu mengubah ide abstrak menjadi bentuk visual yang nyata.",
  "Saya sering memperhatikan keindahan dalam hal-hal sederhana di sekitar saya.",
  "Saya menikmati membuat benda nyata menggunakan tangan saya sendiri.",
  "Saya tertarik pada proses kerja yang melibatkan alat atau bahan fisik.",
  "Saya menghargai hasil karya yang memerlukan ketelitian tinggi dalam prosesnya.",
  "Saya menyukai pekerjaan yang menggabungkan seni dan ketepatan teknis.",
  "Saya merasa puas ketika hasil kerja saya memiliki fungsi nyata dan tahan lama.",
  "Saya merasa nyaman mengekspresikan ide melalui gerakan, suara, atau ekspresi wajah.",
  "Saya tertarik dengan kegiatan yang melibatkan penampilan di depan orang lain.",
  "Saya bisa memahami perasaan orang lain melalui cara mereka berbicara atau bertindak.",
  "Saya menikmati kegiatan yang menggabungkan unsur cerita, emosi, dan visual.",
  "Saya percaya seni adalah cara terbaik untuk menyampaikan pesan atau gagasan.",
  "Saya sering membayangkan karakter atau tokoh yang bisa saya jadikan inspirasi karya.",
  "Saya senang menulis atau memikirkan jalan cerita yang menarik.",
  "Saya menikmati kegiatan yang menggabungkan ide, visual, dan suara menjadi satu kesatuan.",
  "Saya bisa menilai cerita dari sudut pandang pesan yang ingin disampaikan.",
  "Saya tertarik dengan bagaimana alur cerita bisa memengaruhi emosi penonton.",
  "Saya menghargai karya seni yang mengandung unsur budaya daerah.",
  "Saya merasa penting melestarikan nilai-nilai tradisional dalam bentuk modern.",
  "Saya senang mempelajari simbol dan filosofi yang ada dalam kebudayaan lokal.",
  "Saya percaya seni tradisional tetap relevan di zaman sekarang.",
  "Saya merasa bangga ketika budaya Indonesia diangkat dalam karya kreatif.",
  "Saya memperhatikan keselarasan antara bentuk, ruang, dan fungsi suatu benda.",
  "Saya menikmati kegiatan menata ruangan agar terlihat rapi dan nyaman.",
  "Saya merasa setiap benda memiliki proporsi dan keseimbangan yang harus dijaga.",
  "Saya suka menciptakan tata letak yang memudahkan aktivitas orang di dalamnya.",
  "Saya percaya keindahan dan kenyamanan bisa dicapai melalui desain yang tepat.",
  "Saya lebih produktif ketika bekerja dalam tim dibanding sendirian.",
  "Saya suka mengatur pembagian tugas agar hasil kerja tim lebih maksimal.",
  "Saya terbuka menerima kritik atau masukan demi hasil yang lebih baik.",
  "Saya menikmati melihat proses ide kecil berkembang menjadi proyek besar.",
  "Saya merasa puas saat hasil kerja kelompok saya diapresiasi banyak orang.",
  "Saya tertarik menggabungkan seni dan teknologi dalam satu karya.",
  "Saya senang mempelajari software atau alat digital baru untuk bereksperimen.",
  "Saya percaya masa depan industri kreatif bergantung pada inovasi teknologi.",
  "Saya tertarik membuat karya yang bisa diakses secara digital oleh banyak orang.",
  "Saya merasa lebih efisien ketika bekerja menggunakan perangkat digital.",
  "Saya merasa pekerjaan terbaik adalah yang sesuai dengan minat dan karakter saya.",
  "Saya ingin menghasilkan karya yang memberi manfaat bagi orang lain.",
  "Saya lebih menghargai proses pembelajaran dibanding hasil akhir.",
  "Saya selalu mencari makna di balik setiap kegiatan yang saya lakukan.",
  "Saya ingin dikenal sebagai seseorang yang menciptakan karya yang orisinal dan berdampak positif."
];

const TOTAL_QUESTIONS = questions.length;
const CHUNK_SIZE = 10;
const TOTAL_CHUNKS = Math.ceil(TOTAL_QUESTIONS / CHUNK_SIZE);

const jurusanLabels = {
  pplg: "Pengembangan Perangkat Lunak & Gim",
  lukis: "Seni Lukis",
  dkv: "Desain Komunikasi Visual",
  interior: "Desain Interior dan Teknik Furnitur",
  animasi: "Animasi",
  batik: "Kriya Kreatif Batik dan Tekstil",
  kulit: "Kriya Kreatif Kulit dan Imitasi",
  logam: "Kriya Kreatif Logam dan Perhiasan",
  kayu: "Kriya Kreatif Kayu dan Rotan",
  musik: "Seni Musik",
  tari: "Seni Tari",
  karawitan: "Seni Karawitan",
  pedalangan: "Seni Pedalangan",
  teater: "Seni Teater",
  film: "Produksi Film"
};

const jurusanDescriptions = {
  pplg:
    "Kamu menyukai logika, sistem, dan analisis yang rapi. Jurusan ini menekankan perancangan solusi digital dan pemikiran terstruktur.",
  lukis:
    "Kecenderunganmu pada ekspresi personal dan eksplorasi warna menunjukkan bakat kuat untuk berkarya secara intuitif dan emosional.",
  dkv:
    "Perpaduan analitis dan estetis membuatmu mampu mengolah pesan menjadi visual komunikatif yang kuat dan relevan.",
  interior:
    "Detail ruang, fungsi, dan pengalaman pengguna menjadi fokusmu. Kamu senang menata agar tiap elemen terasa efektif sekaligus indah.",
  animasi:
    "Eksperimen ide abstrak dan kemampuan menerjemahkannya ke bentuk dinamis menonjol, cocok untuk produksi visual bergerak.",
  batik:
    "Kesabaran, apresiasi tradisi, dan ketekunan dalam pola membuatmu serasi dengan kriya tekstil bernilai budaya.",
  kulit:
    "Kepekaan terhadap tekstur dan sentuhan fisik tinggi, menjadikan kriya kulit lahan ideal untuk mengembangkan presisi tangan.",
  logam:
    "Ketertarikan pada struktur kuat dan akurat menunjukkan potensi besar dalam mengolah logam menjadi karya presisi.",
  kayu:
    "Kamu menikmati proses membentuk objek nyata yang fungsional dengan sentuhan hangat bahan alami.",
  musik:
    "Sensitivitas terhadap suasana akustik menjadikanmu piawai mengolah nada, dinamika, dan harmoni.",
  tari:
    "Keselarasan gerak dan emosi adalah kekuatanmu, cocok untuk mengeksplorasi ekspresi tubuh secara profesional.",
  karawitan:
    "Kedisiplinan ritmis dan kecintaan pada tradisi Nusantara tercermin dari jawabanmu.",
  pedalangan:
    "Kamu tertarik menggali filosofi dan simbolisme, selaras dengan dunia cerita wayang yang dalam makna.",
  teater:
    "Kemampuan membaca emosi, memimpin interaksi, dan bercerita menjadikan panggung sebagai ruang eksplorasimu.",
  film:
    "Kamu gemar merangkai narasi menyeluruh, dari ide hingga produksi, dengan koordinasi lintas tim yang solid."
};

const jurusanKeys = Object.keys(jurusanLabels);

const pengaruh = [
  {"pplg": 2, "lukis": -1, "dkv": 1, "interior": 1, "animasi": 1, "batik": -1, "kulit": -1, "logam": 1, "kayu": 1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 2, "lukis": -1, "dkv": 1, "interior": 1, "animasi": 1, "batik": -1, "kulit": -1, "logam": 1, "kayu": 1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 2, "lukis": -1, "dkv": 1, "interior": 1, "animasi": 1, "batik": -1, "kulit": -1, "logam": 1, "kayu": 1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 2, "lukis": -1, "dkv": 1, "interior": 1, "animasi": 1, "batik": -1, "kulit": -1, "logam": 1, "kayu": 1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 2, "lukis": -1, "dkv": 1, "interior": 1, "animasi": 1, "batik": -1, "kulit": -1, "logam": 1, "kayu": 1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": -2, "lukis": 2, "dkv": 2, "interior": 1, "animasi": 1, "batik": 1, "kulit": 0, "logam": -1, "kayu": -1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 2, "dkv": 2, "interior": 1, "animasi": 1, "batik": 1, "kulit": 0, "logam": -1, "kayu": -1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 2, "dkv": 2, "interior": 1, "animasi": 1, "batik": 1, "kulit": 0, "logam": -1, "kayu": -1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 2, "dkv": 2, "interior": 1, "animasi": 1, "batik": 1, "kulit": 0, "logam": -1, "kayu": -1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 2, "dkv": 2, "interior": 1, "animasi": 1, "batik": 1, "kulit": 0, "logam": -1, "kayu": -1, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 1, "dkv": 1, "interior": 1, "animasi": -1, "batik": 2, "kulit": 2, "logam": 1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": -1},
  {"pplg": -2, "lukis": 1, "dkv": 1, "interior": 1, "animasi": -1, "batik": 2, "kulit": 2, "logam": 1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": -1},
  {"pplg": -2, "lukis": 1, "dkv": 1, "interior": 1, "animasi": -1, "batik": 2, "kulit": 2, "logam": 1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": -1},
  {"pplg": -2, "lukis": 1, "dkv": 1, "interior": 1, "animasi": -1, "batik": 2, "kulit": 2, "logam": 1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": -1},
  {"pplg": -2, "lukis": 1, "dkv": 1, "interior": 1, "animasi": -1, "batik": 2, "kulit": 2, "logam": 1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": -1},
  {"pplg": -2, "lukis": 0, "dkv": -1, "interior": 0, "animasi": 1, "batik": 0, "kulit": -1, "logam": -1, "kayu": -1, "musik": 2, "tari": 2, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 0, "dkv": -1, "interior": 0, "animasi": 1, "batik": 0, "kulit": -1, "logam": -1, "kayu": -1, "musik": 2, "tari": 2, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 0, "dkv": -1, "interior": 0, "animasi": 1, "batik": 0, "kulit": -1, "logam": -1, "kayu": -1, "musik": 2, "tari": 2, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 0, "dkv": -1, "interior": 0, "animasi": 1, "batik": 0, "kulit": -1, "logam": -1, "kayu": -1, "musik": 2, "tari": 2, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": -2, "lukis": 0, "dkv": -1, "interior": 0, "animasi": 1, "batik": 0, "kulit": -1, "logam": -1, "kayu": -1, "musik": 2, "tari": 2, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 0, "tari": 0, "karawitan": 0, "pedalangan": 2, "teater": 1, "film": 2},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 0, "tari": 0, "karawitan": 0, "pedalangan": 2, "teater": 1, "film": 2},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 0, "tari": 0, "karawitan": 0, "pedalangan": 2, "teater": 1, "film": 2},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 0, "tari": 0, "karawitan": 0, "pedalangan": 2, "teater": 1, "film": 2},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 0, "tari": 0, "karawitan": 0, "pedalangan": 2, "teater": 1, "film": 2},
  {"pplg": -2, "lukis": 1, "dkv": -1, "interior": 0, "animasi": -1, "batik": 2, "kulit": 1, "logam": -1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": 2, "pedalangan": 2, "teater": 1, "film": -1},
  {"pplg": -2, "lukis": 1, "dkv": -1, "interior": 0, "animasi": -1, "batik": 2, "kulit": 1, "logam": -1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": 2, "pedalangan": 2, "teater": 1, "film": -1},
  {"pplg": -2, "lukis": 1, "dkv": -1, "interior": 0, "animasi": -1, "batik": 2, "kulit": 1, "logam": -1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": 2, "pedalangan": 2, "teater": 1, "film": -1},
  {"pplg": -2, "lukis": 1, "dkv": -1, "interior": 0, "animasi": -1, "batik": 2, "kulit": 1, "logam": -1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": 2, "pedalangan": 2, "teater": 1, "film": -1},
  {"pplg": -2, "lukis": 1, "dkv": -1, "interior": 0, "animasi": -1, "batik": 2, "kulit": 1, "logam": -1, "kayu": 1, "musik": 0, "tari": 0, "karawitan": 2, "pedalangan": 2, "teater": 1, "film": -1},
  {"pplg": 1, "lukis": 0, "dkv": 1, "interior": 2, "animasi": 0, "batik": 1, "kulit": 0, "logam": 2, "kayu": 2, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 1, "lukis": 0, "dkv": 1, "interior": 2, "animasi": 0, "batik": 1, "kulit": 0, "logam": 2, "kayu": 2, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 1, "lukis": 0, "dkv": 1, "interior": 2, "animasi": 0, "batik": 1, "kulit": 0, "logam": 2, "kayu": 2, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 1, "lukis": 0, "dkv": 1, "interior": 2, "animasi": 0, "batik": 1, "kulit": 0, "logam": 2, "kayu": 2, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 1, "lukis": 0, "dkv": 1, "interior": 2, "animasi": 0, "batik": 1, "kulit": 0, "logam": 2, "kayu": 2, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 0, "film": 1},
  {"pplg": 1, "lukis": -1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 1, "tari": 0, "karawitan": 1, "pedalangan": 0, "teater": 2, "film": 2},
  {"pplg": 1, "lukis": -1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 1, "tari": 0, "karawitan": 1, "pedalangan": 0, "teater": 2, "film": 2},
  {"pplg": 1, "lukis": -1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 1, "tari": 0, "karawitan": 1, "pedalangan": 0, "teater": 2, "film": 2},
  {"pplg": 1, "lukis": -1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 1, "tari": 0, "karawitan": 1, "pedalangan": 0, "teater": 2, "film": 2},
  {"pplg": 1, "lukis": -1, "dkv": 1, "interior": 0, "animasi": 1, "batik": -1, "kulit": -1, "logam": -1, "kayu": -1, "musik": 1, "tari": 0, "karawitan": 1, "pedalangan": 0, "teater": 2, "film": 2},
  {"pplg": 2, "lukis": 0, "dkv": 1, "interior": 1, "animasi": 2, "batik": -1, "kulit": -1, "logam": 0, "kayu": 0, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": 2, "lukis": 0, "dkv": 1, "interior": 1, "animasi": 2, "batik": -1, "kulit": -1, "logam": 0, "kayu": 0, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": 2, "lukis": 0, "dkv": 1, "interior": 1, "animasi": 2, "batik": -1, "kulit": -1, "logam": 0, "kayu": 0, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": 2, "lukis": 0, "dkv": 1, "interior": 1, "animasi": 2, "batik": -1, "kulit": -1, "logam": 0, "kayu": 0, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": 2, "lukis": 0, "dkv": 1, "interior": 1, "animasi": 2, "batik": -1, "kulit": -1, "logam": 0, "kayu": 0, "musik": -1, "tari": -1, "karawitan": -1, "pedalangan": -1, "teater": 1, "film": 1},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 1, "animasi": 1, "batik": 1, "kulit": 1, "logam": 1, "kayu": 1, "musik": 1, "tari": 1, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 1, "animasi": 1, "batik": 1, "kulit": 1, "logam": 1, "kayu": 1, "musik": 1, "tari": 1, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 1, "animasi": 1, "batik": 1, "kulit": 1, "logam": 1, "kayu": 1, "musik": 1, "tari": 1, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 1, "animasi": 1, "batik": 1, "kulit": 1, "logam": 1, "kayu": 1, "musik": 1, "tari": 1, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1},
  {"pplg": 1, "lukis": 1, "dkv": 1, "interior": 1, "animasi": 1, "batik": 1, "kulit": 1, "logam": 1, "kayu": 1, "musik": 1, "tari": 1, "karawitan": 1, "pedalangan": 1, "teater": 1, "film": 1}
];

const jurusanScores = {
  pplg: 0,
  lukis: 0,
  dkv: 0,
  interior: 0,
  animasi: 0,
  batik: 0,
  kulit: 0,
  logam: 0,
  kayu: 0,
  musik: 0,
  tari: 0,
  karawitan: 0,
  pedalangan: 0,
  teater: 0,
  film: 0
};

const questionsContainer = document.getElementById("questionsContainer");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const alertBox = document.getElementById("alertBox");
const hasilSection = document.getElementById("hasil");
const hasilContent = document.getElementById("hasilContent");
const hasilBtn = document.getElementById("hasilBtn");
const resetBtn = document.getElementById("resetBtn");
progressText.textContent = `0/${TOTAL_QUESTIONS} terjawab`;

function generateQuestions() {
  questions.forEach((question, index) => {
    const card = document.createElement("article");
    card.className = "question-card";
    card.style.animationDelay = `${index * 0.015}s`;
    const chunkIndex = Math.floor(index / CHUNK_SIZE);
    card.dataset.chunk = chunkIndex;
    if (chunkIndex > 0) {
      card.classList.add("is-collapsed");
    }

    const header = document.createElement("header");
    const title = document.createElement("h4");
    title.textContent = `${index + 1}. ${question}`;
    header.appendChild(title);

    const scaleWrapper = document.createElement("div");
    scaleWrapper.className = "scale";

    const labelsRow = document.createElement("div");
    labelsRow.className = "scale-labels";

    const disagreeLabel = document.createElement("span");
    disagreeLabel.textContent = "Sangat Tidak Setuju";
    const agreeLabel = document.createElement("span");
    agreeLabel.textContent = "Sangat Setuju";
    labelsRow.appendChild(disagreeLabel);
    labelsRow.appendChild(agreeLabel);

    const choices = document.createElement("div");
    choices.className = "choices";

    for (let value = 1; value <= 7; value += 1) {
      const choice = document.createElement("label");
      choice.className = "choice";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${index + 1}`;
      input.value = value;
      input.addEventListener("change", updateProgress);

      choice.appendChild(input);
      choices.appendChild(choice);
    }

    scaleWrapper.appendChild(labelsRow);
    scaleWrapper.appendChild(choices);

    card.appendChild(header);
    card.appendChild(scaleWrapper);
    questionsContainer.appendChild(card);
  });
}

function resetScores() {
  Object.keys(jurusanScores).forEach((key) => {
    jurusanScores[key] = 0;
  });
}

function revealChunks(answeredCount) {
  const unlockedChunk = Math.min(
    Math.floor(answeredCount / CHUNK_SIZE),
    TOTAL_CHUNKS - 1
  );

  document.querySelectorAll(".question-card").forEach((card) => {
    const chunk = parseInt(card.dataset.chunk, 10);
    if (chunk <= unlockedChunk) {
      card.classList.remove("is-collapsed");
    }
  });
}

function collapseChunks() {
  document.querySelectorAll(".question-card").forEach((card) => {
    const chunk = parseInt(card.dataset.chunk, 10);
    if (chunk > 0) {
      card.classList.add("is-collapsed");
    }
  });
}

function updateProgress() {
  const answered = document.querySelectorAll('input[type="radio"]:checked').length;
  const completion = answered / TOTAL_QUESTIONS;
  progressBar.style.width = `${completion * 100}%`;
  progressText.textContent = `${answered}/${TOTAL_QUESTIONS} terjawab`;
  alertBox.classList.add("hidden");
  revealChunks(answered);
}

function jawab(no, nilai) {
  const efek = pengaruh[no - 1];
  if (!efek) return;

  Object.keys(efek).forEach((key) => {
    jurusanScores[key] += efek[key] * nilai;
  });
}

function tampilkanHasil() {
  let maxScore = -Infinity;
  let jurusanTerpilih = "";

  Object.keys(jurusanScores).forEach((key) => {
    if (jurusanScores[key] > maxScore) {
      maxScore = jurusanScores[key];
      jurusanTerpilih = key;
    }
  });

  if (maxScore == 0) {
    hasilContent.innerHTML =
      "<h2>Hasil Rekomendasi Jurusan</h2><p>Jawaban belum diproses.</p>";
    return;
  }

  const ranking = Object.entries(jurusanScores).sort((a, b) => b[1] - a[1]);
  const topThree = ranking.slice(0, 3);

  const highlightCards = topThree
    .map(
      ([key, value], idx) => `
        <div class="result-card">
          <div>
            <small>Peringkat ${idx + 1}</small>
            <strong>${jurusanLabels[key]}</strong>
          </div>
          <span>${value} poin</span>
        </div>
      `
    )
    .join("");

  const rankingList = ranking
    .map(
      ([key, value], idx) => `
        <li>
          <span>${idx + 1}.</span>
          <strong>${jurusanLabels[key]}</strong>
          <em>${value} poin</em>
        </li>
      `
    )
    .join("");

  hasilContent.innerHTML = `
    <h2>Rekomendasi Jurusan</h2>
    <p>Kamu paling selaras dengan <strong>${jurusanLabels[jurusanTerpilih]}</strong>.</p>
    <div class="result-highlight">
      ${highlightCards}
    </div>
    <div class="tips">
      <p>${jurusanDescriptions[jurusanTerpilih]}</p>
    </div>
    <ul class="ranking-list">
      ${rankingList}
    </ul>
  `;

  resetBtn.classList.remove("hidden");
  hasilSection.scrollIntoView({ behavior: "smooth" });
}

function prosesJawaban() {
  const selectedInputs = document.querySelectorAll('input[type="radio"]:checked');
  const answeredAll = selectedInputs.length == TOTAL_QUESTIONS;

  if (!answeredAll || selectedInputs.length < TOTAL_QUESTIONS) {
    alertBox.textContent = "Jawab semua pertanyaan sebelum melihat rekomendasi.";
    alertBox.classList.remove("hidden");
    return;
  }

  resetScores();

  selectedInputs.forEach((selected) => {
    const [, number] = selected.name.split("-");
    const questionNumber = parseInt(number, 10);
    const nilai = parseInt(selected.value, 10) - 4;
    jawab(questionNumber, nilai);
  });

  tampilkanHasil();
}

function resetQuiz() {
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.checked = false;
  });
  resetScores();
  collapseChunks();
  progressBar.style.width = "0%";
  progressText.textContent = `0/${TOTAL_QUESTIONS} terjawab`;
  alertBox.classList.add("hidden");
  hasilContent.innerHTML = `
    <h2>Hasil Rekomendasi Jurusan</h2>
    <p>Jawab seluruh 50 pertanyaan untuk membuka analisis personal.</p>
  `;
  resetBtn.classList.add("hidden");
  window.scrollTo({
    top: document.querySelector(".quiz").offsetTop - 32,
    behavior: "smooth"
  });
}

generateQuestions();
hasilBtn.addEventListener("click", prosesJawaban);
resetBtn.addEventListener("click", resetQuiz);
