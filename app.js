$(document).ready(function() {
    displayMahasiswa();

    function displayMahasiswa() {
        $.ajax({
            url: '/mahasiswa',
            type: 'GET',
            success: function(data) {
                $('#mahasiswaList').empty();
                data.forEach(function(mahasiswa) {
                    $('#mahasiswaList').append(`
                        <li class="list-group-item" onclick="editMahasiswa('${mahasiswa._id}', '${mahasiswa.nama}', '${mahasiswa.nim}', '${mahasiswa.jurusan}', ${mahasiswa.semester}, ${mahasiswa.ipk})">
                            <strong>${mahasiswa.nama}</strong> (${mahasiswa.nim}) - ${mahasiswa.jurusan}, Semester ${mahasiswa.semester}, IPK ${mahasiswa.ipk}
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteMahasiswa('${mahasiswa._id}')">Hapus</button>
                        </li>
                    `);
                });
            }
        });
    }

    function showNotification(message, type) {
        $('#notification').remove(); // Hapus pemberitahuan sebelumnya jika ada

        $('body').append(`
            <div id="notification" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
                <div class="toast-header">
                    <strong class="mr-auto">${type === 'success' ? 'Sukses' : 'Error'}</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">${message}</div>
            </div>
        `);

        $('.toast').toast('show');
    }

    window.addMahasiswa = function() {
        var nama = $('#nama').val();
        var nim = $('#nim').val();
        var jurusan = $('#jurusan').val();
        var semester = $('#semester').val();
        var ipk = $('#ipk').val();

        $.ajax({
            url: '/mahasiswa',
            type: 'POST',
            data: {
                nama: nama,
                nim: nim,
                jurusan: jurusan,
                semester: semester,
                ipk: ipk
            },
            success: function() {
                displayMahasiswa();
                showNotification('Mahasiswa ditambahkan!', 'success');
                $('#nama').val('');
                $('#nim').val('');
                $('#jurusan').val('');
                $('#semester').val('');
                $('#ipk').val('');
            },
            error: function(err) {
                showNotification('Gagal menambahkan mahasiswa. Periksa kembali inputan Anda.', 'error');
            }
        });
    }

    window.editMahasiswa = function(id, nama, nim, jurusan, semester, ipk) {
        $('#nama').val(nama);
        $('#nim').val(nim);
        $('#jurusan').val(jurusan);
        $('#semester').val(semester);
        $('#ipk').val(ipk);

        $('#mahasiswaForm').append('<button type="button" onclick="updateMahasiswa(\'' + id + '\')">Update</button>');
    }

    window.updateMahasiswa = function(id) {
        var nama = $('#nama').val();
        var nim = $('#nim').val();
        var jurusan = $('#jurusan').val();
        var semester = $('#semester').val();
        var ipk = $('#ipk').val();

        $.ajax({
            url: '/mahasiswa/' + id,
            type: 'PUT',
            data: {
                nama: nama,
                nim: nim,
                jurusan: jurusan,
                semester: semester,
                ipk: ipk
            },
            success: function() {
                displayMahasiswa();
                $('#nama').val('');
                $('#nim').val('');
                $('#jurusan').val('');
                $('#semester').val('');
                $('#ipk').val('');
                $('button:contains("Update")').remove();
            }
        });
    }

    window.deleteMahasiswa = function(id) {
        $.ajax({
            url: '/mahasiswa/' + id,
            type: 'DELETE',
            success: function() {
                displayMahasiswa();
            }
        });
    }
});
