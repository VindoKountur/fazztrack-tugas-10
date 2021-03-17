import { fetchAllProduk, insertProduk } from '../models/produk';

export default async (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      const hasil = await fetchAllProduk();
      if (hasil) {
        res.json({
          hasil
        });
        return;
      } else {
        res.json({
          message : 'Gagal Fetch Produk',
          hasil
        });
      }
      break;
    case 'POST':
      try {
        const newProduk = req.body;
        const hasil = await insertProduk(newProduk);
        if (Array.isArray(hasil)) {
          res.json({
            success: true
          });
        } else {
          res.json({
            success: false,
            hasil
          });
        }
      } catch (error) {
        res.json({
          success: false,
          message: 'unknown error'
        })
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
