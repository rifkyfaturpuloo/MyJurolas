// Prevent auto-scroll on refresh or when URL carries #tes/#hasil
try {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  window.addEventListener('DOMContentLoaded', () => {
    if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // theme toggle label sync after DOM is ready
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      themeToggle.textContent = current === 'dark' ? 'Mode Terang' : 'Mode Gelap';
      themeToggle.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeToggle.textContent = next === 'dark' ? 'Mode Terang' : 'Mode Gelap';
      });
    }
  });
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  });
} catch (e) { /* no-op */ }

// Initialize theme ASAP to avoid FOUC
try {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);
} catch (e) { /* no-op */ }

// 50 pertanyaan (urut sesuai UI)
const questions = [
  "Saya merasa tertantang ketika menyelesaikan masalah yang belum ada solusinya.",
  "Saya mudah melihat pola atau hubungan tersembunyi dalam suatu sistem.",
  "Saya suka merancang sesuatu yang membuat pekerjaan orang lain menjadi lebih efisien.",
  "Saya lebih nyaman berpikir langkah demi langkah daripada improvisasi spontan.",
  "Saya senang memanfaatkan teknologi untuk mewujudkan ide-ide saya.",
  "Saya bisa membayangkan bentuk atau tampilan sebelum sesuatu dibuat.",
  "Saya tertarik memadukan warna, bentuk, dan tekstur menjadi satu kesan visual.",
  "Saya lebih menyukai karya yang indah namun tetap berfungsi dengan baik.",
  "Saya mampu menerjemahkan ide yang abstrak menjadi bentuk visual yang jelas.",
  "Saya sering memperhatikan detail estetika dalam hal-hal sederhana di sekitar saya.",
  "Saya menikmati membuat benda nyata dengan tangan saya sendiri.",
  "Saya penasaran dengan proses kerja yang melibatkan alat atau bahan fisik.",
  "Saya telaten mengerjakan pekerjaan yang menuntut ketelitian tinggi.",
  "Saya menyukai aktivitas yang menggabungkan seni dan ketepatan teknis.",
  "Saya merasa puas saat karya saya kokoh, tahan lama, dan bermanfaat.",
  "Saya nyaman mengekspresikan ide lewat gerak tubuh, suara, atau ekspresi wajah.",
  "Saya antusias mengikuti kegiatan yang melibatkan penampilan di depan orang lain.",
  "Saya peka pada emosi orang lain dari cara berbicara atau bertindak mereka.",
  "Saya menikmati kegiatan yang memadukan cerita, emosi, dan visual menjadi satu.",
  "Saya percaya pertunjukan seni adalah media efektif untuk menyampaikan pesan.",
  "Saya suka menyusun alur cerita yang menarik dari sebuah ide kecil.",
  "Saya sering membayangkan karakter atau tokoh dengan watak yang jelas.",
  "Saya menikmati proses menyatukan gambar, suara, dan cerita dalam satu karya.",
  "Saya menilai cerita dari pesan yang ingin disampaikan, bukan hanya tampilannya.",
  "Saya tertarik bagaimana susunan adegan dapat memengaruhi emosi penonton.",
  "Saya menghargai karya yang memuat unsur budaya lokal.",
  "Saya merasa penting melestarikan nilai tradisi dalam bentuk yang relevan.",
  "Saya senang mempelajari simbol, motif, dan filosofi dari kebudayaan.",
  "Saya percaya seni tradisi tetap bermakna di masa kini.",
  "Saya bangga ketika karya saya terinspirasi budaya Indonesia.",
  "Saya memperhatikan keseimbangan antara bentuk, ruang, dan fungsi pada suatu rancangan.",
  "Saya menikmati menata ruang agar terasa rapi, nyaman, dan efektif.",
  "Saya peduli pada proporsi dan ukuran saat membuat atau menilai sebuah objek.",
  "Saya ingin desain memudahkan aktivitas orang di dalam ruangnya.",
  "Saya percaya keindahan dan kenyamanan dapat dicapai lewat perencanaan yang matang.",
  "Saya merasa lebih produktif ketika bekerja dalam tim yang terkoordinasi.",
  "Saya senang mengatur pembagian tugas agar hasil kerja kelompok maksimal.",
  "Saya terbuka terhadap kritik demi peningkatan kualitas karya.",
  "Saya menikmati melihat ide kecil berkembang menjadi proyek yang terwujud.",
  "Saya puas ketika hasil kerja tim diapresiasi secara bersama-sama.",
  "Saya tertarik menggabungkan seni dengan teknologi dalam satu proyek.",
  "Saya semangat mencoba perangkat atau perangkat lunak baru untuk bereksperimen.",
  "Saya percaya masa depan industri kreatif sangat dipengaruhi inovasi digital.",
  "Saya ingin membuat karya yang dapat diakses dan dinikmati secara digital.",
  "Saya merasa kinerja saya meningkat saat menggunakan alat bantu digital.",
  "Saya ingin karya saya tidak hanya indah, tetapi juga bermakna bagi orang lain.",
  "Saya merasa pekerjaan terbaik adalah yang selaras dengan nilai dan minat pribadi saya.",
  "Saya lebih menghargai proses belajar daripada sekadar hasil akhir.",
  "Saya mencari alasan mendasar di balik setiap aktivitas yang saya lakukan.",
  "Saya ingin dikenal karena karya orisinal yang berdampak positif bagi banyak orang."
];

const TOTAL_QUESTIONS = questions.length;
const CHUNK_SIZE = 10;
const TOTAL_CHUNKS = Math.ceil(TOTAL_QUESTIONS / CHUNK_SIZE);

const jurusanLabels = {
  pplg: "Pengembangan Perangkat Lunak dan Gim",
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

const jurusanLogos = {
  pplg: 'PPLG.jpg',
  lukis: 'LUKIS.png',
  dkv: 'DKV.png',
  interior: 'DITF.jpg',
  animasi: 'ANIMASI.png',
  batik: 'BATIK.png',
  kulit: 'KULIT.png',
  logam: 'LOGAM.png',
  kayu: 'KAYU.png',
  musik: 'MUSIK.png',
  tari: 'TARI.jpg',
  karawitan: 'KARAWITAN.png',
  pedalangan: 'PEDALANGAN.png',
  teater: 'TEATER.png',
  film: 'FILM.png'
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

// Urutan ID jurusan (wajib konsisten di seluruh app)
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
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const chunkText = document.getElementById("chunkText");
progressText.textContent = `0/${TOTAL_QUESTIONS} terjawab`;
hasilBtn.disabled = true;

const userAnswers = new Array(TOTAL_QUESTIONS).fill(0);
let currentChunk = 0;

// UI helpers: toast + modal
function ensureToastContainer() {
  let el = document.querySelector('.toast-container');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast-container';
    document.body.appendChild(el);
  }
  return el;
}

function showToast(message, timeout = 2500) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 180ms ease';
    setTimeout(() => toast.remove(), 200);
  }, timeout);
}

function showConfirm(message, onConfirm) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <header>Konfirmasi</header>
    <p>${message}</p>
    <div class="actions">
      <button class="cancel">Batal</button>
      <button class="confirm">Lanjut</button>
    </div>
  `;
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
  function close() { backdrop.remove(); }
  modal.querySelector('.cancel').addEventListener('click', close);
  modal.querySelector('.confirm').addEventListener('click', () => { close(); onConfirm && onConfirm(); });
}

function getChunkRange(chunk) {
  const start = chunk * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, TOTAL_QUESTIONS);
  return { start, end };
}

function showChunk(chunk, doScroll = true) {
  currentChunk = Math.max(0, Math.min(chunk, TOTAL_CHUNKS - 1));
  document.querySelectorAll(".question-card").forEach((card) => {
    const c = parseInt(card.dataset.chunk, 10);
    if (c === currentChunk) card.classList.remove("is-collapsed");
    else card.classList.add("is-collapsed");
  });
  updateNavUI();
  // scroll to first question in this chunk
  if (doScroll) {
    const { start } = getChunkRange(currentChunk);
    const first = document.querySelector(`.question-card[data-chunk="${currentChunk}"]`);
    if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function firstUnansweredIndexInChunk(chunk) {
  const { start, end } = getChunkRange(chunk);
  for (let i = start; i < end; i++) if (!userAnswers[i]) return i;
  return -1;
}

function scrollToFirstUnanswered(chunk) {
  const idx = firstUnansweredIndexInChunk(chunk);
  if (idx === -1) return;
  const card = document.querySelectorAll('.question-card')[idx];
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function validateCurrentChunk() {
  const idx = firstUnansweredIndexInChunk(currentChunk);
  if (idx !== -1) {
    alertBox.textContent = `Bagian ${currentChunk + 1} masih memiliki pertanyaan yang belum dijawab.`;
    alertBox.classList.remove("hidden");
    scrollToFirstUnanswered(currentChunk);
    // mark unanswered in this chunk and toast
    markUnansweredInChunk(currentChunk);
    showToast(`Lengkapi semua pertanyaan pada bagian ${currentChunk + 1} terlebih dahulu.`);
    return false;
  }
  alertBox.classList.add("hidden");
  return true;
}

function markUnansweredInChunk(chunk) {
  const { start, end } = getChunkRange(chunk);
  document.querySelectorAll('.question-card').forEach((card, i) => {
    if (i >= start && i < end) {
      if (!userAnswers[i]) card.classList.add('unanswered');
      else card.classList.remove('unanswered');
    }
  });
}

function updateNavUI() {
  if (chunkText) chunkText.textContent = `${currentChunk + 1}/${TOTAL_CHUNKS}`;
  if (prevBtn) prevBtn.disabled = currentChunk === 0;
  if (nextBtn) nextBtn.classList.toggle('hidden', currentChunk === TOTAL_CHUNKS - 1);
  if (hasilBtn) hasilBtn.classList.toggle('hidden', currentChunk !== TOTAL_CHUNKS - 1);
}

function generateQuestions() {
  questionsContainer.innerHTML = "";

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
    labelsRow.innerHTML = `
      <span>Sangat Tidak Setuju</span>
      <span>Sangat Setuju</span>
    `;

    const pills = document.createElement("div");
    pills.className = "number-indicators";

    for (let i = 1; i <= 7; i++) {
      const pill = document.createElement("span");
      pill.textContent = i;
      pill.dataset.index = index;
      pill.dataset.value = i;
      pill.classList.add("pill");
      const current = userAnswers[index];
      if (current === i) {
        pill.classList.add("active", i <= 3 ? "low" : i === 4 ? "neutral" : "high");
      }
      pill.addEventListener("click", () => {
        // set answer
        userAnswers[index] = i;
        // clear siblings
        pills.querySelectorAll("span").forEach(s => {
          s.classList.remove("active","low","neutral","high");
        });
        // activate this
        pill.classList.add("active", i <= 3 ? "low" : i === 4 ? "neutral" : "high");
        alertBox.classList.add("hidden");
        // remove unanswered mark on this card
        card.classList.remove('unanswered');
        updateProgress();
        updateNavUI();
      });
      pills.appendChild(pill);
    }

    scaleWrapper.appendChild(labelsRow);
    scaleWrapper.appendChild(pills);
    
    card.appendChild(header);
    card.appendChild(scaleWrapper);
    questionsContainer.appendChild(card);
  });

  // Do not auto-scroll on initial render
  showChunk(0, false);
}

function handleAnswer(event) {
  const nilai = parseInt(event.target.value, 10);
  const index = parseInt(event.target.dataset.index, 10);
  userAnswers[index] = nilai;
  alertBox.classList.add("hidden");
  updateProgress();
  updateNavUI();
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
  const answered = userAnswers.filter(Boolean).length;
  const progress = Math.min(100, (answered / TOTAL_QUESTIONS) * 100);
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${answered}/${TOTAL_QUESTIONS} terjawab`;

  // Show/hide hasil button
  if (answered === TOTAL_QUESTIONS) {
    hasilBtn.disabled = false;
    hasilBtn.classList.add('active');
  } else {
    hasilBtn.disabled = true;
    hasilBtn.classList.remove('active');
  }
}

function longestRunSame(arr) {
  let best = 1, cur = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i-1]) { cur++; best = Math.max(best, cur); }
    else { cur = 1; }
  }
  return best;
}

function isSuspiciousAnswers(ans) {
  const values = ans.slice();
  const allAnswered = values.every(Boolean);
  if (!allAnswered) return { suspicious: false, reason: '' };
  const set = new Set(values);
  const unique = set.size;
  const extremes = values.filter(v => v === 1 || v === 7).length / values.length;
  const lrun = longestRunSame(values);
  const mean = values.reduce((a,b)=>a+b,0) / values.length;
  const variance = values.reduce((a,b)=>a + Math.pow(b - mean, 2), 0) / values.length;
  const stdev = Math.sqrt(variance);
  if (unique === 1) return { suspicious: true, reason: 'Semua jawaban sama.' };
  if (lrun >= 20 && unique <= 2) return { suspicious: true, reason: 'Pola jawaban berulang panjang.' };
  if (extremes >= 0.9) return { suspicious: true, reason: 'Hampir semua jawaban pada nilai ekstrem (1/7).' };
  if (stdev < 0.5 && unique <= 2) return { suspicious: true, reason: 'Variasi jawaban sangat rendah.' };
  return { suspicious: false, reason: '' };
}

function jawab(no, nilai) {
  const efek = pengaruh[no - 1];
  if (!efek) return;

  Object.keys(efek).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(jurusanScores, key)) return;
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

  hasilSection.classList.remove('hidden');

  // Susun ranking berdasarkan skor agregat yang valid
  const entries = Object.entries(jurusanScores).filter(([key]) => jurusanLabels[key]);
  const ranking = entries.sort((a, b) => b[1] - a[1]);

  const topThree = ranking.slice(0, 3);

  const medalClass = (i) => (i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze');
  const podium = `
    <div class="podium">
      ${topThree.map(([key], i) => `
        <div class="podium-card ${medalClass(i)}">
          <div class="medal">${i + 1}</div>
          <div class="podium-major">
            <img src="Logo Jurusan SMKN 12 Surabaya/${jurusanLogos[key] || 'PPLG.jpg'}" alt="${jurusanLabels[key]}" class="podium-logo">
            <div class="podium-copy">
              <strong>${jurusanLabels[key]}</strong>
              <small>Peringkat ke-${i + 1}</small>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const rankingList = ranking
    .map(
      ([key], idx) => `
        <li>
          <span class="rank-pill">${idx + 1}</span>
          <div class="major-profile">
            <img src="Logo Jurusan SMKN 12 Surabaya/${jurusanLogos[key] || 'PPLG.jpg'}" alt="${jurusanLabels[key]}" class="major-logo">
            <div class="major-copy">
              <span class="major-name">${jurusanLabels[key]}</span>
              <small>Peringkat ke-${idx + 1}</small>
            </div>
          </div>
        </li>
      `
    )
    .join("");

  hasilContent.innerHTML = `
    <div class="hasil-header">
      <h2>Rekomendasi Jurusan</h2>
      <p>Berdasarkan jawabanmu, berikut adalah rekomendasi jurusan yang paling sesuai dengan minat dan kepribadianmu:</p>
    </div>
    
    <div class="podium-section">
      <h3>3 Jurusan Teratas untuk Kamu</h3>
      ${podium}
    </div>
    
    <div class="ranking-wrap">
      <h3>Daftar Lengkap Rekomendasi</h3>
      <p class="text-muted text-center" style="margin-top: -0.75rem; margin-bottom: 1rem;">
        Urutan berdasarkan kecocokan dengan jawabanmu
      </p>
      <ul class="ranking-list">
        ${rankingList}
      </ul>
    </div>
    
    <div class="text-center" style="margin-top: 2rem;">
      <p style="margin-bottom: 0;">
        <small class="text-muted">Hasil ini berdasarkan analisis jawaban yang kamu berikan.</small>
      </p>
    </div>
  `;

  resetBtn.classList.remove("hidden");
  resetBtn.classList.add('danger-btn');
  hasilSection.scrollIntoView({ behavior: "smooth" });
}

function prosesJawaban() {
  const firstUn = userAnswers.findIndex((v) => !v);
  if (firstUn !== -1) {
    const targetChunk = Math.floor(firstUn / CHUNK_SIZE);
    showChunk(targetChunk);
    alertBox.textContent = `Masih ada soal yang kosong pada bagian ${targetChunk + 1}. Kerjakan dulu sebelum melihat rekomendasi.`;
    alertBox.classList.remove("hidden");
    scrollToFirstUnanswered(targetChunk);
    markUnansweredInChunk(targetChunk);
    showToast(`Bagian ${targetChunk + 1} belum lengkap. Isi semua pertanyaan.`);
    return;
  }

  const check = isSuspiciousAnswers(userAnswers);
  if (check.suspicious) {
    alertBox.textContent = `Peringatan: ${check.reason} Mohon isi secara jujur agar hasil akurat.`;
    alertBox.classList.remove('hidden');
    showToast('Pola jawaban terdeteksi tidak wajar. Periksa kembali sebelum lanjut.');
    return;
  }

  resetScores();

  userAnswers.forEach((nilai, index) => {
    const delta = nilai - 4;
    jawab(index + 1, delta);
  });

  tampilkanHasil();
}

function resetQuiz() {
  // Reset state
  userAnswers.fill(0);
  resetScores();
  hasilSection.classList.add('hidden');
  collapseChunks();
  progressBar.style.width = "0%";
  progressText.textContent = `0/${TOTAL_QUESTIONS} terjawab`;
  alertBox.classList.add("hidden");
  hasilContent.innerHTML = `
    <h2>Hasil Rekomendasi Jurusan</h2>
    <p>Jawab seluruh 50 pertanyaan untuk membuka analisis personal.</p>
  `;
  resetBtn.classList.add("hidden");

  // Reset all pill selections
  document.querySelectorAll('.number-indicators').forEach((wrap) => {
    wrap.querySelectorAll('span').forEach((s) => {
      s.classList.remove('active','low','neutral','high');
    });
  });

  showChunk(0);

  window.scrollTo({
    top: document.querySelector(".quiz").offsetTop - 32,
    behavior: "smooth"
  });
}

generateQuestions();
hasilBtn.addEventListener("click", () => {
  const allAnswered = userAnswers.every(Boolean);
  if (!allAnswered) {
    prosesJawaban();
    return;
  }
  const check = isSuspiciousAnswers(userAnswers);
  const msg = check.suspicious
    ? `Kami mendeteksi pola jawaban yang tidak wajar (${check.reason}) yang dapat membuat hasil tidak akurat. Tetap lanjut melihat rekomendasi?`
    : 'Apakah kamu yakin ingin melihat rekomendasi sekarang?';
  showConfirm(msg, () => {
    if (check.suspicious) {
      alertBox.classList.add('hidden');
    }
    // bypass early-return warning in prosesJawaban setelah konfirmasi pengguna
    const tmp = prosesJawaban;
    // sementara nonaktifkan blokir dengan menyalin jawaban dan memanggil pipeline manual
    // jalankan perhitungan langsung jika terdeteksi pola namun sudah dikonfirmasi
    if (check.suspicious) {
      alertBox.classList.add('hidden');
      resetScores();
      userAnswers.forEach((nilai, index) => {
        const delta = nilai - 4;
        jawab(index + 1, delta);
      });
      tampilkanHasil();
    } else {
      prosesJawaban();
    }
  });
});
resetBtn.addEventListener("click", () => {
  showConfirm('Apakah kamu yakin ingin mengulang tes?', () => {
    resetQuiz();
  });
});

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentChunk > 0) showChunk(currentChunk - 1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (!validateCurrentChunk()) return;
    if (currentChunk < TOTAL_CHUNKS - 1) {
      showChunk(currentChunk + 1);
    } else {
      // if last chunk, prompt submit if all answered
      const firstUn = userAnswers.findIndex((v) => !v);
      if (firstUn === -1) {
        document.getElementById('hasil').scrollIntoView({ behavior: 'smooth' });
      } else {
        const targetChunk = Math.floor(firstUn / CHUNK_SIZE);
        showChunk(targetChunk);
        scrollToFirstUnanswered(targetChunk);
      }
    }
  });
}
