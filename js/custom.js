
// File: js/custom.js

$(document).ready(function() {
    // LANGKAH 1: Validasi Sesi Login
    const userDataString = localStorage.getItem('loggedInUser');
    if (!userDataString) {
        alert('Anda harus login terlebih dahulu.');
        window.location.href = 'index.html';
        return;
    }
    const userData = JSON.parse(userDataString);

    // LANGKAH 2: Bangun UI Dinamis
    const appSidebar = $('#app-sidebar');
    const appHeader = $('#app-header');

    // --- Buat Navbar Atas ---
    const topNavbarHtml = `
      <div class="flex h-16 items-center justify-end px-8">
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-600">Login sebagai <strong class="font-medium">${userData.username}</strong></span>
          <a href="#" id="logout-btn" class="text-sm font-medium text-red-600 hover:text-red-700">Logout</a>
        </div>
      </div>`;
    appHeader.html(topNavbarHtml);

    // --- Buat Menu Dinamis untuk Sidebar ---
    let menuLinksHtml = '';
    if (userData.role === 'admin') {
        // Menu untuk Admin
        menuLinksHtml = `
            <a href="#admindashboard" role="button" class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100">
                <div class="grid mr-4 place-items-center"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clip-rule="evenodd"></path></svg></div>
                Dashboard
            </a>`;
    } else { // Menu untuk User
        menuLinksHtml = `
            <!-- Accordion untuk IELTS Writing -->
            <div class="accordion-item">
              <div role="button" class="accordion-header flex items-center justify-between w-full p-3 font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900 text-left transition-colors select-none hover:bg-gray-100">
                <div class="flex items-center"><div class="grid mr-4 place-items-center"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.721 12.752a9.711 9.711 0 00-1.071-1.343 9.733 9.733 0 00-1.833-1.644 9.733 9.733 0 00-2.474-1.154 9.716 9.716 0 00-2.988-.411H13.5V3.75a.75.75 0 00-1.5 0v4.5a.75.75 0 00.75.75h4.5a.75.75 0 000-1.5h-3.361c.49.07.974.188 1.449.353a8.23 8.23 0 014.42 7.82c0 4.557-3.693 8.25-8.25 8.25S3.75 19.057 3.75 14.5c0-4.139 3.054-7.58 7.004-8.166a.75.75 0 00.67-1.334 9.752 9.752 0 00-8.424 9.5A9.75 9.75 0 0012 24.25a9.75 9.75 0 009.721-11.498z" /></svg></div>IELTS Writing</div>
                <span class="ml-4 accordion-arrow"><svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg></span>
              </div>
              <div class="accordion-content overflow-hidden pl-4" style="display: none;">
                <a href="#writing-task-1" role="button" class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100"><div class="grid mr-4 place-items-center">-</div>Task 1 (Graph)</a>
                <a href="#writing-task-2" role="button" class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100"><div class="grid mr-4 place-items-center">-</div>Task 2 (Opinion)</a>
              </div>
            </div>
            <!-- Accordion untuk History -->
            <div class="accordion-item">
              <div role="button" class="accordion-header flex items-center justify-between w-full p-3 font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900 text-left transition-colors select-none hover:bg-gray-100">
                <div class="flex items-center"><div class="grid mr-4 place-items-center"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5a.75.75 0 000 1.5h15a.75.75 0 000-1.5V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9zm-1.5 2.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" clip-rule="evenodd"></path></svg></div>History</div>
                <span class="ml-4 accordion-arrow"><svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg></span>
              </div>
              <div class="accordion-content overflow-hidden pl-4" style="display: none;">
                <a href="#history" role="button" class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-gray-100"><div class="grid mr-4 place-items-center">-</div>Lihat Semua Riwayat</a>
              </div>
            </div>

        `;
    }

    // --- Gabungkan Template Sidebar dengan Link Menu ---
    const sidebarTemplate = `
    <div class="relative flex h-screen w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div class="p-4 mb-2">
        <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          JaWi AI
        </h5>
      </div>
      <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        ${menuLinksHtml}
      </nav>
    </div>`;
    appSidebar.html(sidebarTemplate);

    // ==========================================================
    // LANGKAH 3: Inisialisasi & Jalankan SPA
    // ==========================================================
    var app = $.spapp({
      templateDir: '/frontend/views/', // Path ke folder template dari app.html
        pageNotFound: 'error_404'
    });

    // Daftarkan semua rute
    app.route({ view: 'home', load: 'user/home.html' });
    app.route({ view: 'writing-task-1', load: 'user/writing_task_1.html' });
    app.route({ view: 'writing-task-2', load: 'user/writing_task_2.html' });
    app.route({ view: 'history', load: 'user/history.html' });
    app.route({ view: 'result', load: 'user/ResultTemplate.html' });
    app.route({ view: 'admindashboard', load: 'admin/admindashboard.html' });

    // Jalankan SPA
    if (userData.role === 'admin') {
        app.run('#admindashboard');
    } else {
        app.run('#home');
    }
    
    // ==========================================================
    // LANGKAH 4: Fungsikan Accordion dan Logout
    // ==========================================================
    function logout() {
        localStorage.removeItem('loggedInUser');
        // alert('Anda telah logout.');
        window.location.href = 'index.html';
    }
    
    $('body').on('click', '#logout-btn, #logout-btn-sidebar', function(e) {
        e.preventDefault();
        logout();
    });

    // Logika untuk Accordion Menu
    $('body').on('click', '.accordion-header', function() {
        $(this).next('.accordion-content').slideToggle('fast');
        $(this).find('.accordion-arrow').toggleClass('rotate-180');
        
        $('.accordion-content').not($(this).next()).slideUp('fast');
        $('.accordion-header').not($(this)).find('.accordion-arrow').removeClass('rotate-180');
    });
});
