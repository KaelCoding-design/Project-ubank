
document.addEventListener("DOMContentLoaded", () => {
    const saldo = document.querySelector("#saldo");
    const dialog = document.querySelector("dialog");
    const form = dialog?.querySelector("form");
    const judul = document.querySelector("#dialog-title");
    const batal = document.querySelector("#batal");
    const simpan = document.querySelector("#simpan");
    const riwayat = document.querySelector("#riwayat h3");

    if (!saldo || !dialog || !form || !judul || !batal || !simpan || !riwayat) {
        console.error("Dashboard: an expected HTML element is missing.");
        return;
    }

    let total = 12850000;
    let tersembunyi = false;
    let jenis = "in";

    const rp = (angka) => "Rp " + angka.toLocaleString("id-ID");
    const tampil = () => {
        saldo.textContent = tersembunyi ? "Rp ••••••••" : rp(total);
    };

    document.querySelector("section button")?.addEventListener("click", () => {
        tersembunyi = !tersembunyi;
        tampil();
    });

    document.querySelectorAll("[data-kind]").forEach((btn) => {
        btn.addEventListener("click", () => {
            jenis = btn.dataset.kind;
            form.reset();
            judul.textContent = jenis === "in"
                ? "Tambah Pemasukan"
                : "Tambah Pengeluaran";
            dialog.showModal();
            form.elements.description.focus();
        });
    });

    const inputJumlah = form.elements.amount;
    const inputKeterangan = form.elements.description;

    inputJumlah.addEventListener("input", () => {
        const angka = inputJumlah.value.replace(/\D/g, "");
        inputJumlah.value = angka
            ? Number(angka).toLocaleString("id-ID")
            : "";
    });

    batal.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });

    simpan.addEventListener("click", () => {
        if (!form.reportValidity()) return;

        const keterangan = inputKeterangan.value.trim();
        const jumlah = Number(inputJumlah.value.replace(/\D/g, ""));

        if (!keterangan || !Number.isSafeInteger(jumlah) || jumlah <= 0) {
            alert("Masukkan keterangan dan jumlah yang valid.");
            return;
        }

        if (jenis === "out" && jumlah > total) {
            alert("Saldo tidak mencukupi untuk pengeluaran ini.");
            return;
        }

        total += jenis === "in" ? jumlah : -jumlah;

        const baris = document.createElement("p");
        const nominal = document.createElement("span");

        baris.className = "d-flex justify-content-between mb-2";
        nominal.className = jenis === "out" ? "text-danger" : "text-success";
        nominal.textContent = `${jenis === "in" ? "+" : "-"} ${rp(jumlah)}`;

        baris.append(document.createTextNode(keterangan), nominal);
        riwayat.nextElementSibling.after(baris);

        tampil();
        dialog.close();
        form.reset();
    });
});


// Fitur tampilkan/sembunyikan password Login dan Register
document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.querySelector("#showPassword");

    if (!checkbox) return;

    checkbox.addEventListener("change", () => {
        const passwordInputs = document.querySelectorAll(
            'input[type="password"], input[data-password-visible="true"], input[name="password"], input[name="password1"], input[name="password2"]'
        );

        passwordInputs.forEach((input) => {
            input.type = checkbox.checked ? "text" : "password";
        });
    });
});
