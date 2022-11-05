const storageKey = "Data Buku";
const submitAction = document.getElementById("inputBook");
const checkForStorage = () => {
  return typeof Storage !== "undefined";
};
const putBookList = (data) => {
  if (checkForStorage()) {
    let bookData = [];
    if (localStorage.getItem(storageKey) !== null) {
      bookData = JSON.parse(localStorage.getItem(storageKey));
    }
    bookData.unshift(data);

    
    localStorage.setItem(storageKey, JSON.stringify(bookData));
		renderBookList();
  }
};
const getBookList=()=> {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}
const renderBookList=()=> {
  const userData = getBookList();
  const inCompleted = document.querySelector("#incompleteBookshelfList");
  const completed = document.querySelector("#completeBookshelfList");
  inCompleted.innerHTML = "";
  completed.innerHTML = "";
  userData.forEach(user => {
    if (user.isComplete === false) {
      let el = `
			<article class="book_item">
					<h3 style="text-align:justify;">${user.title}</h3>
					

					<div class="action" style="margin-top: 30px;">
							<button class="green" onclick="readedBook('${user.id}')">
								<i class="fa fa-check"></i>
									<span>Selesai dibaca</span>
							</button>
							<button class="red" onclick="deleteBook('${user.id}')">
							<i class="fa fa-trash"></i>
									<span>Hapus buku</span>
							</button>
							<button class="blue" onclick="detailBook('${user.id}')">
						<i class="fa fa-book"></i>
								<span>Detail buku</span>
						</button>
					</div>
			</article>
			`

      inCompleted.innerHTML += el;
    } else {
      let el = `
		<article class="book_item">
				<h3 style="text-align:justify;">${user.title}</h3>
				

				<div class="action" style="margin-top: 30px;">
						<button class="green" onclick="unreadedBook('${user.id}')"> 
						<i class="fa fa-times"></i>
								<span>Belum selesai dibaca</span>
						</button>
						<button class="red" onclick="deleteBook('${user.id}')">
						<i class="fa fa-trash"></i>
								<span>Hapus buku</span>
						</button>
						<button class="blue" onclick="detailBook('${user.id}')">
						<i class="fa fa-book"></i>
								<span>Detail buku</span>
						</button>
				</div>
		</article>
		`
      completed.innerHTML += el;
    }
  });
}

const readedBook=(id)=> {
  let cfm = confirm("Pindahkan buku ke rak yang [SELESAI DIBACA] ?");

  if (cfm == true) {
    const bookDataDetail = getBookList().filter((a) => a.id == id);
		const update = true;
    const newBook = {
      id: bookDataDetail[0].id,
      title: bookDataDetail[0].title,
      author: bookDataDetail[0].author,
      year: bookDataDetail[0].year,
      isCompleted: update,
    };

    const bookData = getBookList().filter((a) => a.id != id);
    localStorage.setItem(storageKey, JSON.stringify(bookData));

    putBookList(newBook);
    renderBookList();
  } else {
    return 0;
  }
}

const unreadedBook=(id) =>{
  let cfm = confirm("Pindahkan buku ke rak yang [BELUM SELESAI DIBACA] ?");
	const update = false;
  if (cfm == true) {
    const bookDataDetail = getBookList().filter((a) => a.id == id);
    const newBook = {
      id: bookDataDetail[0].id,
      title: bookDataDetail[0].title,
      author: bookDataDetail[0].author,
      year: bookDataDetail[0].year,
      isCompleted: update,
    };

    const bookData = getBookList().filter((a) => a.id != id);
    localStorage.setItem(storageKey, JSON.stringify(bookData));

    putBookList(newBook);
    renderBookList();
  } else {
    return 0;
  }
}

const deleteBook=(id) =>{
  let cfm = confirm("Anda yakin akan menghapus data buku ini ?");

  if (cfm == true) {
    const bookDataDetail = getBookList().filter((a) => a.id == id);
    const bookData = getBookList().filter((a) => a.id != id);
    localStorage.setItem(storageKey, JSON.stringify(bookData));
    renderBookList();
    alert(`[Buku ${bookDataDetail[0].title}] telah terhapus dari rak`);
  } else {
    return 0;
  }
}
const detailBook=(id) =>{
  let cfm = confirm("Lihat Detail Buku ?");

  if (cfm == true) {
    const bookDataDetail = getBookList().filter((a) => a.id == id);
    const bookData = getBookList().filter((a) => a.id != id);
    // localStorage.setItem(storageKey, JSON.stringify(bookData));
// 		var xhr = new XMLHttpRequest();
// 			xhr.open("POST", "/detail.html", true);
// 			xhr.setRequestHeader('Content-Type', 'application/json');
// 			xhr.send(JSON.stringify({
//     			title: bookDataDetail[0].title
// }));	
		const url = `detail.html?id=${id}`; 	
		window.location.href = url;
    // alert(`[Buku ${bookDataDetail[0].title}] telah terhapus dari rak`);
  } else {
    return 0;
  }
}

submitAction.addEventListener("submit", function (event) {
  const inputtitle = document.getElementById("inputBookTitle").value;
  const inputauthor = document.getElementById("inputBookAuthor").value;
	const inputlokasiauthor = document.getElementById("inputBookLokasiAuthor").value;
  const inputbookyear = document.getElementById("inputBookYear").value;
	const inputbookisbn = document.getElementById("inputBookISBN").value;
	const inputbookpenerbit = document.getElementById("inputBookPenerbit").value;
	const inputbooklokasipenerbit = document.getElementById("inputBookLokasiPenerbit").value;
	const inputbookjumlahbuku = document.getElementById("inputBookJumlahBuku").value;
	const inputbookdimensibuku = document.getElementById("inputBookDimensiBuku").value;
	const inputbookberatbuku = document.getElementById("inputBookBeratBuku").value;
	const inputbookdescbuku = document.getElementById("inputBookDescBuku").value;
  const inputbookstatus = document.getElementById(
    "inputBookIsComplete"
  ).checked;
  const idbook = +new Date();
  const newBookData = {
    id: idbook,
    title: inputtitle,
    author: inputauthor,
		lokasiauthor:inputlokasiauthor,
    year: inputbookyear,
		isbn: inputbookisbn,
		penerbit:inputbookpenerbit,
		lokasipenerbit:inputbooklokasipenerbit,
		jumlahbuku:inputbookjumlahbuku,
		dimensibuku:inputbookdimensibuku,
		beratbuku:inputbookberatbuku,
		desc:inputbookdescbuku,
    isComplete: inputbookstatus,
  };
  putBookList(newBookData);
  renderBookList();
});
window.addEventListener("load", function () {
    if (localStorage.getItem(storageKey) !== null) {
      renderBookList();
    }
});
