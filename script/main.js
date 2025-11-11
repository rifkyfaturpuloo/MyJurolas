const questions = [
  "Saya terbiasa memecah tantangan besar menjadi langkah logis yang terukur.",
  "Saya senang memvisualisasikan karakter yang bisa hidup dalam cerita interaktif.",
  "Saya terbiasa menilai harmoni warna sebelum memilih kombinasi desain.",
  "Saya teliti mengukur ruang agar fungsi dan estetika tetap seimbang.",
  "Saya tertarik merancang permainan atau aplikasi yang membantu orang lain.",
  "Saya mudah mengeksplorasi sapuan kuas untuk menyampaikan perspektif pribadi.",
  "Saya menikmati menata ulang motif tradisional agar relevan bagi generasi baru.",
  "Saya suka merancang aksesori yang memadukan detail halus dan struktur kuat.",
  "Saya merasakan kepuasan ketika benda kayu berubah menjadi karya fungsional.",
  "Saya cepat menangkap perubahan tempo dan dinamika dalam sebuah komposisi musik.",
  "Saya gemar bereksperimen dengan gerakan tubuh untuk mengekspresikan ide.",
  "Saya penasaran menyusun komposisi suara yang terinspirasi tradisi Nusantara.",
  "Saya percaya cerita dapat disampaikan kuat lewat dialog yang tepat.",
  "Saya telaten menyelesaikan detail tekstil seperti jahitan, emboss, atau sambungan.",
  "Saya menikmati memimpin produksi panggung dari konsep hingga pertunjukan.",
  "Saya senang mengatur tata cahaya dan kamera untuk menekankan cerita.",
  "Saya cepat menemukan pola logis ketika memperbaiki alur kerja digital.",
  "Saya suka membuat storyboard visual sebelum memulai proyek kreatif.",
  "Saya nyaman bekerja dengan alat ukir logam atau bahan keras lainnya.",
  "Saya menikmati menggubah melodi yang menggambarkan suasana tertentu.",
  "Saya terbiasa mengembangkan karakter yang memiliki latar budaya kuat.",
  "Saya tertarik memadukan teknik batik dengan pewarna modern.",
  "Saya percaya struktur ruang dapat mengubah mood penghuninya.",
  "Saya bisa mengarahkan tim produksi agar disiplin terhadap timeline.",
  "Saya senang mengajarkan gerakan baru kepada rekan latihan.",
  "Saya reflektif menggali filosofi di balik cerita klasik Jawa.",
  "Saya nyaman bekerja dengan kulit asli maupun sintetis untuk produk premium.",
  "Saya terpacu membuat aplikasi edukasi yang interaktif dan menyenangkan.",
  "Saya mengutamakan komposisi warna yang bercerita dalam poster atau layout.",
  "Saya menikmati mengorkestrasi suara latar untuk pertunjukan panggung.",
  "Saya suka menggabungkan tarian tradisional dan modern dalam satu koreografi.",
  "Saya telaten memahat kayu hingga menghasilkan detail halus.",
  "Saya mudah membayangkan dunia tiga dimensi sebelum dieksekusi.",
  "Saya ingin mengabadikan cerita lokal lewat produksi film dokumenter.",
  "Saya konsisten mencatat eksperimen agar bisa diulang lebih rapi.",
  "Saya senang menyusun paket brand identity lengkap dari logo hingga panduan.",
  "Saya dapat mendengar ketidakseimbangan nada sekecil apa pun.",
  "Saya suka menambahkan ornamen khas Nusantara pada karya modern.",
  "Saya mudah memimpin improvisasi di atas panggung.",
  "Saya nyaman bekerja larut malam untuk menyelesaikan render atau editing.",
  "Saya peduli ergonomi saat merancang furnitur atau interior.",
  "Saya sering membuat prototipe fisik sebelum produksi massal.",
  "Saya ingin menciptakan game yang mengangkat cerita budaya lokal.",
  "Saya gemar memadukan ritme elektronik dengan instrumen tradisional.",
  "Saya teliti menghitung biaya produksi agar proyek tetap efisien.",
  "Saya menikmati menguji berbagai pola batik untuk koleksi terbatas.",
  "Saya percaya latihan disiplin membuat koreografi lebih kuat.",
  "Saya senang membangun antarmuka aplikasi yang estetik sekaligus fungsional.",
  "Saya terbiasa menavigasi software 3D untuk mempresentasikan ide.",
  "Saya ingin menjadi jembatan antara tim kreatif dan tim teknis."
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

const questionMapping = [
  [
    { key: "pplg", weight: 2 },
    { key: "interior", weight: 1 }
  ],
  [
    { key: "animasi", weight: 2 },
    { key: "film", weight: 1 }
  ],
  [
    { key: "dkv", weight: 1 },
    { key: "lukis", weight: 2 }
  ],
  [
    { key: "interior", weight: 2 },
    { key: "kayu", weight: 1 }
  ],
  [
    { key: "pplg", weight: 1 },
    { key: "animasi", weight: 2 }
  ],
  [
    { key: "lukis", weight: 2 },
    { key: "batik", weight: 1 }
  ],
  [
    { key: "batik", weight: 2 },
    { key: "pedalangan", weight: 1 }
  ],
  [
    { key: "logam", weight: 2 },
    { key: "kulit", weight: 1 }
  ],
  [
    { key: "kayu", weight: 2 },
    { key: "interior", weight: 1 }
  ],
  [
    { key: "musik", weight: 1 },
    { key: "karawitan", weight: 2 }
  ],
  [
    { key: "tari", weight: 2 },
    { key: "teater", weight: 1 }
  ],
  [
    { key: "karawitan", weight: 2 },
    { key: "pedalangan", weight: 1 }
  ],
  [
    { key: "teater", weight: 2 },
    { key: "film", weight: 1 }
  ],
  [
    { key: "kulit", weight: 2 },
    { key: "batik", weight: 1 }
  ],
  [
    { key: "teater", weight: 2 },
    { key: "film", weight: 1 }
  ],
  [
    { key: "film", weight: 1 },
    { key: "animasi", weight: 2 }
  ],
  [
    { key: "pplg", weight: 2 },
    { key: "animasi", weight: 1 }
  ],
  [
    { key: "dkv", weight: 2 },
    { key: "animasi", weight: 1 }
  ],
  [
    { key: "logam", weight: 2 },
    { key: "kulit", weight: 1 }
  ],
  [
    { key: "musik", weight: 1 },
    { key: "karawitan", weight: 1 },
    { key: "tari", weight: 1 }
  ],
  [
    { key: "film", weight: 1 },
    { key: "pedalangan", weight: 2 }
  ],
  [
    { key: "batik", weight: 2 },
    { key: "dkv", weight: 1 }
  ],
  [
    { key: "interior", weight: 2 },
    { key: "kayu", weight: 1 }
  ],
  [
    { key: "film", weight: 1 },
    { key: "teater", weight: 2 }
  ],
  [
    { key: "tari", weight: 2 },
    { key: "teater", weight: 1 }
  ],
  [
    { key: "pedalangan", weight: 2 },
    { key: "karawitan", weight: 1 }
  ],
  [
    { key: "logam", weight: 2 },
    { key: "kulit", weight: 1 }
  ],
  [
    { key: "pplg", weight: 1 },
    { key: "animasi", weight: 1 },
    { key: "dkv", weight: 1 }
  ],
  [
    { key: "dkv", weight: 1 },
    { key: "lukis", weight: 2 }
  ],
  [
    { key: "musik", weight: 2 },
    { key: "teater", weight: 1 }
  ],
  [
    { key: "tari", weight: 1 },
    { key: "karawitan", weight: 2 }
  ],
  [
    { key: "logam", weight: 2 },
    { key: "kayu", weight: 1 }
  ],
  [
    { key: "animasi", weight: 1 },
    { key: "interior", weight: 2 }
  ],
  [
    { key: "film", weight: 1 },
    { key: "pedalangan", weight: 2 }
  ],
  [
    { key: "pplg", weight: 2 },
    { key: "interior", weight: 1 }
  ],
  [
    { key: "dkv", weight: 2 },
    { key: "pplg", weight: 1 }
  ],
  [
    { key: "musik", weight: 1 },
    { key: "karawitan", weight: 2 }
  ],
  [
    { key: "kayu", weight: 2 },
    { key: "batik", weight: 1 }
  ],
  [
    { key: "teater", weight: 2 },
    { key: "tari", weight: 1 }
  ],
  [
    { key: "animasi", weight: 2 },
    { key: "film", weight: 1 }
  ],
  [
    { key: "kayu", weight: 2 },
    { key: "interior", weight: 1 }
  ],
  [
    { key: "logam", weight: 2 },
    { key: "kulit", weight: 1 }
  ],
  [
    { key: "pplg", weight: 1 },
    { key: "pedalangan", weight: 2 }
  ],
  [
    { key: "musik", weight: 1 },
    { key: "karawitan", weight: 2 }
  ],
  [
    { key: "film", weight: 1 },
    { key: "pplg", weight: 1 },
    { key: "interior", weight: 1 }
  ],
  [
    { key: "batik", weight: 2 },
    { key: "kulit", weight: 1 }
  ],
  [
    { key: "tari", weight: 2 },
    { key: "musik", weight: 1 }
  ],
  [
    { key: "dkv", weight: 2 },
    { key: "pplg", weight: 1 }
  ],
  [
    { key: "animasi", weight: 2 },
    { key: "interior", weight: 1 }
  ],
  [
    { key: "film", weight: 2 },
    { key: "pplg", weight: 1 },
    { key: "teater", weight: 1 }
  ]
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

    const disagreeLabel = document.createElement("span");
    disagreeLabel.textContent = "Sangat Tidak Setuju";
    const agreeLabel = document.createElement("span");
    agreeLabel.textContent = "Sangat Setuju";

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

    scaleWrapper.appendChild(disagreeLabel);
    scaleWrapper.appendChild(choices);
    scaleWrapper.appendChild(agreeLabel);

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
  const mapping = questionMapping[no - 1];
  if (!mapping) return;

  mapping.forEach(({ key, weight }) => {
    const bobot = weight || 1;
    jurusanScores[key] += nilai * bobot;
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
    const nilai = 8 - parseInt(selected.value, 10);
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
