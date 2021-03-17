import { deleteProduk, updateProduk } from '../models/produk';

export default async (req, res) => {
	const {
		query: { id },
		method,
	} = req;

	switch (method) {
		case "PUT":
			try {
        const produk = req.body;
        const res = await updateProduk(id, produk);
				return res.json({
					success: true
				});
			} catch (error) {
				return res.json({
					success: false,
				});
			}
		case "DELETE":
			try {
        const res = await deleteProduk(id);
        if (res) {
          return res.json({
            success: true
          });
        }
			} catch (error) {
				return res.json({
					success: false
				});
			}
		default:
			res.setHeaders("Allow", ["POST", "PUT", "DELETE"]);
			// return res
			// 	.status(405)
			// 	.json({ success: false })
			// 	.end(`Method ${method} Not Allowed`);
      res.status(405).end(`Method ${method} Not Allowed`)
	}
};
