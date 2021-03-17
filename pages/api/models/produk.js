import db from "../../../config/db";

const table = {
  produk: 'produk',
}

export async function insertProduk(produk) {
  try {
    return await db(table.produk).insert(produk);
  } catch (error) {
    return error;
  }
}

export async function fetchAllProduk() {
  try {
    return await db.select().from(table.produk).orderBy('id', 'desc');
  } catch (error) {
    return error;
  }
}

export async function deleteProduk(id) {
  try {
    return await db(table.produk).where('id', id).del();
  } catch (error) {
    return error;
  }
}

export async function updateProduk(id, produk) {
  try {
    return await db(table.produk).where('id', id).update(produk);
  } catch (error) {
    return error;
  }
}