    const saldo = document.getElementById("saldo");
    const nilai = saldo.textContent;
    const dialog = document.querySelector("dialog");
    const form = dialog.querySelector("form");
    let tersembunyi = false;
 
    // Buka / sensor saldo aktif
    document.getElementById("toggle-saldo").onclick = () => {
        tersembunyi = !tersembunyi;
        saldo.textContent = tersembunyi ? "Rp ••••••••" : nilai;
    };
 
    // Tombol tambah pemasukan / pengeluaran membuka dialog
    document.querySelectorAll("[data-dialog]").forEach((btn) => btn.onclick = () => {
        form.reset();
        form.querySelector("h3").textContent = btn.textContent.trim();
        form.description.placeholder = btn.dataset.contoh;
        dialog.showModal();
    });
 
    // Tutup dialog: tombol Batal atau klik di luar dialog
    document.getElementById("batal").onclick = () => dialog.close();
    dialog.onclick = (e) => e.target == dialog && dialog.close();
 
    // Kolom nominal otomatis diberi titik ribuan (1.000.000)
    form.amount.oninput = (e) => {
        const angka = e.target.value.replace(/\D/g, "");
        e.target.value = angka && (+angka).toLocaleString("id-ID");
    };