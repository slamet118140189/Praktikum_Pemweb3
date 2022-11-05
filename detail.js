const storageKey = "Data Buku";  
	const getBookList=()=> {
		return JSON.parse(localStorage.getItem(storageKey)) || [];
	}
	window.addEventListener("load", function () {
    if (localStorage.getItem(storageKey) !== null) {
      renderBookListdetail();
    }
});

const renderBookListdetail=()=>{
	const urlParams = new URLSearchParams(window.location.search);
  const greetingValue = urlParams.get('id');
	const userData = getBookList();
	console.log(userData);
	console.log(greetingValue);
	
	const detail = document.querySelector("#detailBookshelfList");
	detail.innerHTML = "";
	userData.forEach(user => {
    if (user.id == greetingValue) {
      let el = `
			<article class="book_item">
					<h3 style="text-align:justify;">${user.title}</h3>
					<p style="text-align:justify;">Penulis: ${user.author}</p>
					<p style="text-align:justify;">Lokasi Penulis: ${user.lokasiauthor}</p>
					<p>Tahun: ${user.year}</p>
					<p>ISBN: ${user.isbn}</p>
					<p style="text-align:justify;">Penerbit: ${user.pernerbit}</p>
					<p style="text-align:justify;">Lokasi penerbit: ${user.lokasipenerbit}</p>
					<p>Jumlah Buku: ${user.jumlahbuku}</p>
					<p>Berat Buku: ${user.beratbuku}</p>
					<p>Deskripsi: ${user.desc}</p>
					<div class="action" style="margin-top: 30px;">
							<button class="green" onclick="readedBook('${user.id}')">
								<i class="fa fa-check"></i>
									<span>Selesai dibaca</span>
							</button>
							<button class="red" onclick="deleteBook('${user.id}')">
							<i class="fa fa-trash"></i>
									<span>Hapus buku</span>
							</button>
							
					</div>
			</article>
			`

      detail.innerHTML += el;
    }
  });
}
