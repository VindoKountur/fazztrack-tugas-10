import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import axios from 'axios';

function HomePage({data}) {
  const url = 'http://localhost:3000/api/produk/';
  const [daftarProduk, setDaftarProduk] = useState(data);
  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(undefined);
  const resetNewProduk = {
    nama_produk: '',
    keterangan: '',
    harga: undefined,
    jumlah: undefined
  }
  const [newProduk, setNewProduk] = useState(resetNewProduk);
  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      if (edit) {
        const urlUpdate = `${url}${idEdit}`;
        const res = await axios.put(urlUpdate, newProduk);
        reFetchAllProduk();
        setNewProduk(resetNewProduk);
      } else {
        const res = await axios.post(url, newProduk);
        reFetchAllProduk();
        setNewProduk(resetNewProduk);
      }
      // if (res.data.success) {
      //   console.log('berhasil');
      //   setNewProduk(resetNewProduk);
      //   reFetchAllProduk();
      // } else {
      //   console.log('error', res.data.message);
      // }
      setEdit(false);
      setIdEdit(undefined);
    } catch (err) {
      
    }
  }
  async function reFetchAllProduk() {
    const res = await axios.get(url);
    setDaftarProduk(res.data.hasil);
  }
  async function handleHapusProduk(id) {
    const urlDel = `${url}${id}`;
    console.log(urlDel);
    const res = await axios.delete(urlDel);
    reFetchAllProduk();
  }

  async function handleEditProduk(index, id) {
    setEdit(true);
    setIdEdit(id);
    setNewProduk(daftarProduk[index]);
  }
  return (
    <>
      <Head>
        <title>Level 3 - Tugas 10</title>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet" />
      </Head>
      <header>
        <h1 className='text-center py-4 bg-blue-400 text-white text-xl'>Produk</h1>
      </header>
      <div className='w-full'>
        <form 
          onSubmit={handleOnSubmit}
          id='produkForm'
          className='flex flex-col bg-gray-200 items-center py-4'>
          <input onChange={(e) => setNewProduk({...newProduk, nama_produk: e.target.value})} value={newProduk.nama_produk} className='w-8/12 px-2 py-1 rounded-lg mb-4' type='text' placeholder='Nama Produk' />
          <input onChange={(e) => setNewProduk({...newProduk, keterangan: e.target.value})} value={newProduk.keterangan} className='w-8/12 px-2 py-1 rounded-lg mb-4' type='text' placeholder='Keterangan' />
          <input onChange={(e) => setNewProduk({...newProduk, harga: +e.target.value})} value={newProduk.harga || ''} className='w-8/12 px-2 py-1 rounded-lg mb-4' type='number' placeholder='Harga' />
          <input onChange={(e) => setNewProduk({...newProduk, jumlah: +e.target.value})} value={newProduk.jumlah || ''} className='w-8/12 px-2 py-1 rounded-lg mb-4' type='number' placeholder='Jumlah' />
          <button className='w-8/12 px-2 py-1 rounded-lg bg-blue-400 text-white' type='submit'>
            {edit ? 'Ubah Produk' : 'Tambah Produk'}
          </button>
        </form>
        <main>
          <h2 className='text-center py-3 bg-blue-200'>Daftar Produk</h2>
          <div className='bg-gray-200 py-4 w-full text-sm'>
            {
              daftarProduk.map((produk, idx) => (
              <div 
                className='w-8/12 bg-gray-100 mx-auto border-l-4 border-blue-400 shadow-lg mb-3 p-4 grid grid-cols-3 relative' key={produk.id}>
                <div className='absolute top-2 right-2 flex'>
                  <FaEdit size='1.5em' className='mr-2' onClick={() => handleEditProduk(idx, produk.id)} />
                  <FaTrashAlt size='1.5em' className='text-red-600' title='Hapus Produk' onClick={() => handleHapusProduk(produk.id)} />
                </div>
                <label>Nama</label>
                <p className='col-span-2'>: {produk.nama_produk}</p>
                <label>Keterangan</label>
                <p className='col-span-2'>: {produk.keterangan}</p>
                <label>Harga</label>
                <p className='col-span-2'>: {produk.harga}</p>
                <label>Jumlah</label>
                <p className='col-span-2'>: {produk.jumlah}</p>
              </div>
              ))
            }
          </div>
        </main>
      </div>
    </>
  )
}

export default HomePage;

// export async function getServerSideProps(context) {
export async function getStaticProps(context) {
  const url = 'http://localhost:3000/api/produk';
  const res = await axios.get(url);
  return {
    props: {
      data: res.data.hasil
    }
  }
}