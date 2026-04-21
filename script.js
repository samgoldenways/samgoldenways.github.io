// 1. Data Awal (Default) jika LocalStorage masih kosong
const defaultImages = [
  { src: 'image/img1.jpg', category: 'vacation' },
  { src: 'image/img(f)1.jpg', category: 'family' }
];

// Mengambil data dari LocalStorage atau pakai default
let myImages = JSON.parse(localStorage.getItem('myGalleryData')) || defaultImages;

const imageContainer = document.querySelector('.image'); 
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');

// 2. Fungsi Inisialisasi Galeri
function initGallery() {
  imageContainer.innerHTML = ''; // Bersihkan container
  myImages.forEach((img, index) => {
    createImageItem(img.src, img.category, index + 1);
  });
  localStorage.setItem('myGalleryData', JSON.stringify(myImages)); // Simpan state terbaru
}

// 3. Fungsi Membuat Elemen Gambar
function createImageItem(src, category, altIndex) {
  const imageItem = document.createElement('div');
  imageItem.className = `image-item ${category}`;
  imageItem.dataset.category = category;
  
  imageItem.innerHTML = `
    <img src="${src}" alt="Foto ${altIndex}" loading="lazy">
    <button class="delete-btn" onclick="hapusGambar(event, this, ${altIndex - 1})">Hapus</button>
  `;
  
  imageItem.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') zoomImage(this);
  });
  
  imageContainer.appendChild(imageItem);
}

// 4. Fitur Tambah Gambar dengan Pilih Kategori
function previewImage(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgSrc = e.target.result;
      
      // Munculkan pilihan kategori
      Swal.fire({
        title: 'Pilih Kategori Foto',
        input: 'select',
        inputOptions: {
          'vacation': 'Liburan',
          'family': 'Keluarga',
          'event': 'Acara'
        },
        inputPlaceholder: 'Pilih kategori...',
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          // Tambah ke array data dan simpan
          myImages.push({ src: imgSrc, category: result.value });
          initGallery(); // Refresh tampilan
          Swal.fire('Berhasil!', 'Foto ditambahkan ke kategori ' + result.value, 'success');
        }
      });
    };
    reader.readAsDataURL(file);
  }
}

// 5. Fitur Hapus Gambar (Update LocalStorage)
function hapusGambar(event, button, index) {
  event.stopPropagation();
  Swal.fire({
    title: 'Hapus Foto?',
    text: "Tindakan ini tidak bisa dibatalkan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      myImages.splice(index, 1); // Hapus dari array
      initGallery(); // Re-render dan update LocalStorage
    }
  });
}

// 6. Fitur Filter (Perbaikan Logika)
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    
    document.querySelectorAll('.image-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// 7. Fitur Zoom & Theme (Tetap Sama)
function zoomImage(el) {
  const imgSrc = el.querySelector("img").src;
  document.getElementById("zoomImg").src = imgSrc;
  document.getElementById("zoomView").classList.add("show");
}

function tutupZoom() {
  document.getElementById("zoomView").classList.remove("show");
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-mode');

// Jalankan galeri saat pertama buka
initGallery();
