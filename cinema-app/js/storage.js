const K_BOOK = 'cinema_bookings', K_DRAFT = 'cinema_draft';
const $ = s => document.querySelector(s);
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const getBookings = () => read(K_BOOK, []);
const getDraft = () => read(K_DRAFT, null);
const setDraft = d => write(K_DRAFT, d);

const movieById = id => MOVIES.find(m => m.id == id);
const cinemaById = id => CINEMAS.find(c => c.id == id);
const rupiah = n => 'Rp' + n.toLocaleString('id-ID');
const fmtDate = d => new Date(d + 'T00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
const sortSeats = s => [...s].sort((a, b) => a.localeCompare(b, 'id', { numeric: true }));
const seatsUrl = s => `seats.html?movie=${s.movieId}&cinema=${s.cinemaId}&date=${s.date}&time=${s.time}`;

const same = (a, b) => a.movieId == b.movieId && a.cinemaId == b.cinemaId && a.date == b.date && a.time == b.time;
const takenSeats = s => getBookings().filter(b => same(b, s)).flatMap(b => b.seats);

function saveBooking(d, payment, buyer) {
    const taken = takenSeats(d), clash = d.seats.filter(x => taken.includes(x));
    if (clash.length) return { ok: false, clash };   // cek ulang: cegah double booking
    const b = {
        ...d, ...buyer, payment, status: 'LUNAS',
        total: d.seats.length * PRICE,
        code: 'CNM-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
        createdAt: new Date().toISOString()
    };
    write(K_BOOK, [...getBookings(), b]);
    localStorage.removeItem(K_DRAFT);
    return { ok: true, booking: b };
}