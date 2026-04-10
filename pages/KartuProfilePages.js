// KODE ASLI: import React, { Component } from 'react';
// KODE BARU:
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput,
  TouchableOpacity, Image,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context';
import KartuProfil from "../components/KartuProfile";

// ==========================================
// 2. FUNCTIONAL COMPONENT (Menggantikan Class)
// ==========================================
// KODE ASLI: export default class App extends Component {
// KODE BARU:
export default function App() {

  // A. INISIALISASI STATE
  // KODE ASLI:
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     kodeKelas: '',
  //     isHadir: false,
  //     waktuAbsen: '',
  //     jamRealtime: 'Memuat jam...',
  //   };
  //   this.studentData = { ... };
  // }
  // KODE BARU: (Menggunakan useState)
  const [kodeKelas, setKodeKelas] = useState('');
  const [isHadir, setIsHadir] = useState(false);
  const [waktuAbsen, setWaktuAbsen] = useState('');
  const [jamRealtime, setJamRealtime] = useState('Memuat jam...');

  // Data statis untuk dikirim sebagai Props ke Functional Component (Tidak butuh state)
  const studentData = {
    nama: 'Muhamad Zaldi Aprialdi',
    nim: '0320240040',
    prodi: 'MI - Manajemen Informatika',
  };

  // B & D. FASE MOUNTING & UNMOUNTING (Komponen Lahir & Mati)
  // KODE ASLI:
  // componentDidMount() { ... }
  // componentWillUnmount() { ... }
  // KODE BARU: (Menggunakan useEffect untuk menggabungkan dua fase ini)
  useEffect(() => {
    console.log('[MOUNTING] Aplikasi Dibuka (via useEffect). Jam menyala.');

    // Mulai jam digital tiap 1 detik
    const intervalJam = setInterval(() => {
      const waktu = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      setJamRealtime(waktu); // Menggantikan this.setState
    }, 1000);

    // CLEANUP FUNCTION (Berfungsi layaknya componentWillUnmount)
    return () => {
      console.log('[UNMOUNTING] Aplikasi Ditutup. Membersihkan interval jam!');
      clearInterval(intervalJam); // Mencegah Memory Leak
    };
  }, []); // <-- ARRAY KOSONG: Pastikan fungsi ini hanya dipanggil 1x di awal!

  // C. FASE UPDATING (Komponen Berubah)
  // KODE ASLI:
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.isHadir === true && prevState.isHadir === false) { ... }
  // }
  // KODE BARU: (Mengganti componentDidUpdate)
  useEffect(() => {
    // Hanya bereaksi jika state isHadir berubah menjadi true
    if (isHadir === true) {
      console.log(`[UPDATING] Sukses presensi pada pukul: ${waktuAbsen}`);
    }
  }, [isHadir, waktuAbsen]); // <-- ARRAY DEPENDENCIES: Pantau variabel ini

  // E. LOGIKA EVENT HANDLER
  // KODE ASLI: handleAbsen = () => { ... }
  // KODE BARU: (tambah const di awal fungsinya)
  const handleAbsen = () => {
    if (kodeKelas.trim() === '') {
      alert('Masukkan kode kelas (Simulasi QR) terlebih dahulu!');
      return;
    }

    // KODE ASLI:
    // this.setState({
    //   isHadir: true,
    //   waktuAbsen: this.state.jamRealtime
    // });
    // KODE BARU:
    setIsHadir(true);
    setWaktuAbsen(jamRealtime);
  };

  // KODE ASLI: handleKembali = () => { ... }
  // KODE BARU: (tambah const di awal fungsinya)
  const handleKembali = () => {
    // KODE ASLI:
    // this.setState({
    //   isHadir: false,
    //   kodeKelas: '',
    //   waktuAbsen: ''
    // });
    // KODE BARU:
    setIsHadir(false);
    setKodeKelas('');
    setWaktuAbsen('');
  };

  // F. TAMPILAN UI
  // KODE ASLI: render() { return ( ... ); }
  // KODE BARU: (langsung return komponen, tanpa function render())
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER DENGAN JAM DIGITAL (Terhubung ke State) */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sistem Presensi</Text>
          {/* KODE ASLI: {this.state.jamRealtime} | KODE BARU: {jamRealtime} */}
          <Text style={styles.clockText}>{jamRealtime}</Text>
        </View>

        {/* MEMANGGIL FUNCTIONAL COMPONENT DAN MENGIRIM PROPS */}
        {/* KODE ASLI: {this.studentData} | KODE BARU: {studentData} */}
        <KartuProfil student={studentData} />

        {/* SEKSI PRESENSI (CONDITIONAL RENDERING) */}
        <View style={styles.actionSection}>
          {/* KODE ASLI: {this.state.isHadir ? ( ... ) : ( ... )} */}
          {/* KODE BARU: Hapus this.state */}
          {isHadir ? (
            <View style={styles.successCard}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
                style={styles.successIcon}
              />
              <Text style={styles.successText}>Presensi Berhasil!</Text>
              {/* KODE ASLI: {this.state.waktuAbsen} | KODE BARU: {waktuAbsen} */}
              <Text style={styles.timeText}>Tercatat pada: {waktuAbsen} WIB</Text>
              {/* KODE ASLI: {this.state.kodeKelas} | KODE BARU: {kodeKelas} */}
              <Text style={styles.codeText}>Kode Terverifikasi: {kodeKelas}</Text>

              {/* KODE ASLI: this.handleKembali | KODE BARU: handleKembali */}
              <TouchableOpacity style={styles.buttonBack} onPress={handleKembali}>
                <Text style={styles.buttonBackText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputCard}>
              <Text style={styles.instructionText}>Masukkan Kode Kelas:</Text>
              <Text style={styles.noteText}>(Simulasi dari hasil Scan QR Kamera)</Text>

              <TextInput
                style={styles.input}
                placeholder="Contoh: MI - LAB 110"
                /* KODE ASLI: this.state.kodeKelas | KODE BARU: kodeKelas */
                value={kodeKelas}
                /* KODE ASLI: onChangeText={(text) => this.setState({ kodeKelas: text })} */
                /* KODE BARU: onChangeText={(text) => setKodeKelas(text)} */
                onChangeText={(text) => setKodeKelas(text)}
                autoCapitalize="characters"
              />

              {/* KODE ASLI: this.handleAbsen | KODE BARU: handleAbsen */}
              <TouchableOpacity style={styles.buttonSubmit} onPress={handleAbsen}>
                <Text style={styles.buttonText}>Konfirmasi Kehadiran</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  header: {
    backgroundColor: '#0056A0',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  clockText: {
    color: '#D1E8FF',
    fontSize: 14,
    marginTop: 5,
  },
  actionSection: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  inputCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    color: '#333',
  },
  buttonSubmit: {
    backgroundColor: '#0056A0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successCard: {
    backgroundColor: '#E8F5E9',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#388E3C',
    marginBottom: 5,
  },
  codeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontFamily: 'monospace',
  },
  buttonBack: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#388E3C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonBackText: {
    color: '#388E3C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
