// Initialize with sample images
    const sampleImages = [
      { src: 'image/img1.jpg', category: 'vacation' },
      { src: 'image/img2.jpg', category: 'vacation' },
      { src: 'image/img3.jpg', category: 'vacation' },
      { src: 'image/img4.jpg', category: 'vacation' },
      { src: 'image/img5.jpg', category: 'vacation' },
      { src: 'image/img6.jpg', category: 'vacation' },
      { src: 'image/img7.jpg', category: 'vacation' },
      { src: 'image/img8.jpg', category: 'vacation' },
      { src: 'image/img9.jpg', category: 'vacation' },
      { src: 'image/img10.jpg', category: 'vacation' },
      { src: 'image/img11.jpg', category: 'vacation' },
      { src: 'image/img12.jpg', category: 'vacation' },
      { src: 'image/img13.jpg', category: 'vacation' },
      { src: 'image/img(f)1.jpg', category: 'family' }
    ];

      const filterButtons = document.querySelectorAll('.filter-btn');

    // Current filter
    let currentFilter = 'all';
    let isLoading = false;

    // Initialize the gallery
    function initGallery() {
      sampleImages.forEach((img, index) => {
        createImageItem(img.src, img.category, index + 1);
      });
    }

        // Create image item
    function createImageItem(src, category, altIndex) {
      const imageItem = document.createElement('div');
      imageItem.className = `image-item hidden ${category}`;
      imageItem.dataset.category = category;
      
      imageItem.innerHTML = `
        <img src="${src}" alt="Foto ${altIndex}" loading="lazy">
        <button class="delete-btn" onclick="hapusGambar(event, this)">Hapus</button>
      `;
      
      imageItem.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
          zoomImage(this);
        }
      });
      
      imageContainer.appendChild(imageItem);
      
      // Animate in
      setTimeout(() => {
        imageItem.classList.remove('hidden');
      }, 100 * altIndex);
    }


     const themeToggle = document.getElementById('themeToggle');    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // Check saved theme preference
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
    }





function zoomImage(el) {
  const imgSrc = el.querySelector("img").src;
  const zoomView = document.getElementById("zoomView");
  document.getElementById("zoomImg").src = imgSrc;
  zoomView.classList.add("show");
  
  // Tambahkan event listener untuk menutup saat klik di luar gambar
  zoomView.addEventListener('click', function(e) {
    if (e.target === this) { // Jika yang diklik adalah background (bukan gambar)
      tutupZoom();
    }
  });
}

function tutupZoom() {
  const zoomView = document.getElementById("zoomView");
  zoomView.classList.remove("show");
  // Hapus event listener ketika ditutup
  zoomView.removeEventListener('click', arguments.callee);
}

  function hapusGambar(event, button) {
    event.stopPropagation();
    const item = button.closest(".image-item");
    if (confirm("Yakin ingin menghapus gambar ini?")) {
     item.remove();
   }
  }

  function hapusGambar(event, button) {
    event.stopPropagation();
    Swal.fire({
      title: 'Hapus Foto?',
      text: "Kamu yakin mau hapus foto ini?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        const imageItem = button.parentElement;
        imageItem.classList.add('fade-out');
        setTimeout(() => {
          imageItem.remove();
        }, 400);
      }
    });
  }

  function triggerFileInput() {
    document.getElementById('fileInput').click(); // Trigger file input
  }

  function previewImage(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imgSrc = e.target.result;
        addImageToGallery(imgSrc); // Tambahkan gambar ke galeri
      };
      reader.readAsDataURL(file);
    }
  }

  function addImageToGallery(imgSrc) {
    const imageContainer = document.querySelector('.image');
    const imageItem = document.createElement('div');
    imageItem.classList.add('image-item');
    imageItem.onclick = function() {
      zoomImage(imageItem);
    };
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.alt = 'Foto Baru';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.onclick = function(event) {
      hapusGambar(event, deleteBtn);
    };
    imageItem.appendChild(imgElement);
    imageItem.appendChild(deleteBtn);
    imageContainer.appendChild(imageItem);
  }

      // Filter images
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        
        document.querySelectorAll('.image-item').forEach(item => {
          if (currentFilter === 'all' || item.dataset.category === currentFilter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Close zoom when clicking outside image
    zoomView.addEventListener('click', function(e) {
      if (e.target === this || e.target === zoomImg) {
        tutupZoom();
      }
    });

    // Initialize the gallery
    initGallery();