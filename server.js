const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mahasiswaDB', { useNewUrlParser: true, useUnifiedTopology: true });

const mahasiswaSchema = new mongoose.Schema({
    nama: String,
    nim: String,
    jurusan: String,
    semester: Number,
    ipk: Number
});

const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema);

// Data Dummy JSON
const dummyData = [
    {
        nama: 'John Doe',
        nim: '123456',
        jurusan: 'Teknik Informatika',
        semester: 3,
        ipk: 3.5
    },
    {
        nama: 'Jane Doe',
        nim: '789012',
        jurusan: 'Sistem Informasi',
        semester: 2,
        ipk: 3.2
    },
    {
        nama: 'Bob Smith',
        nim: '345678',
        jurusan: 'Teknik Elektro',
        semester: 4,
        ipk: 3.8
    }
];

// Tambahkan Data Dummy ke MongoDB
Mahasiswa.insertMany(dummyData, function (err) {
    if (err) {
        console.error('Error initializing dummy data:', err);
    } else {
        console.log('Dummy data initialized successfully!');
    }
});

// CRUD Routes
app.get('/mahasiswa', async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.find();
        res.json(mahasiswa);
    } catch (err) {
        res.json({ message: err.message });
    }
});

app.post('/mahasiswa', async (req, res) => {
    const mahasiswa = new Mahasiswa(req.body);
    try {
        await mahasiswa.save();
        res.json('Mahasiswa added!');
    } catch (err) {
        res.json({ message: err.message });
    }
});

app.put('/mahasiswa/:id', async (req, res) => {
    try {
        await Mahasiswa.findByIdAndUpdate(req.params.id, req.body);
        res.json('Mahasiswa updated!');
    } catch (err) {
        res.json({ message: err.message });
    }
});

app.delete('/mahasiswa/:id', async (req, res) => {
    try {
        await Mahasiswa.findByIdAndDelete(req.params.id);
        res.json('Mahasiswa deleted!');
    } catch (err) {
        res.json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
