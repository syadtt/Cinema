// DATA CONTOH: ganti judul, sinopsis, dan poster dengan film pilihan kalian.
const MOVIES = [
    {
        id: 1, title: 'Malam di Stasiun Tua', genre: 'Thriller', duration: 112, rating: '13+', status: 'now',
        synopsis: 'Seorang penjaga stasiun menemukan jadwal kereta yang tidak pernah tercatat.', poster: 'assets/posters/1.jpg'
    },
    {
        id: 2, title: 'Rumah di Ujung Gang', genre: 'Drama', duration: 98, rating: 'SU', status: 'now',
        synopsis: 'Tiga bersaudara berkumpul kembali untuk memutuskan nasib rumah keluarga.', poster: 'assets/posters/2.jpg'
    },
    {
        id: 3, title: 'Pasar Terapung', genre: 'Komedi', duration: 104, rating: 'SU', status: 'now',
        synopsis: 'Seorang pedagang buah berlomba menyelamatkan pasar dari penggusuran.', poster: 'assets/posters/3.jpg'
    },
    {
        id: 4, title: 'Langit Selatan', genre: 'Petualangan', duration: 126, rating: '13+', status: 'now',
        synopsis: 'Sebuah ekspedisi kecil mencari jalur pelayaran yang hilang dari peta.', poster: 'assets/posters/4.jpg'
    },
    {
        id: 5, title: 'Peta yang Hilang', genre: 'Misteri', duration: 110, rating: '13+', status: 'soon',
        synopsis: 'Seorang arsiparis menemukan peta dengan satu kota yang tidak ada.', poster: 'assets/posters/5.jpg'
    },
    {
        id: 6, title: 'Hujan Terakhir', genre: 'Romantis', duration: 101, rating: '17+', status: 'soon',
        synopsis: 'Dua orang asing berbagi payung selama musim hujan terakhir di kota lama.', poster: 'assets/posters/6.jpg'
    }
];
const CINEMAS = [{ id: 1, name: 'Lumen Pusat' }, { id: 2, name: 'Lumen Timur' }];
const TIMES = ['12:30', '15:00', '19:30'];
const PRICE = 50000, ROWS = 'ABCDEFGH', COLS = 10, MAX_SEATS = 6;

// 7 hari ke depan dari hari ini, format YYYY-MM-DD (waktu lokal)
const getDates = () => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return d.toLocaleDateString('sv-SE');
});