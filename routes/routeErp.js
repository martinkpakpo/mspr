import express from 'express';

import { getCommandes, getCommande } from '../services/erp/commande.js';
import { getProduits, getProduit, getProduitEngine } from '../services/erp/produit.js';
import { getStocks, getStock } from '../services/erp/stock.js';



const router = express.Router();

router.get('/liste-commandes', getCommandes);
router.get('/commande/:id', getCommande);

router.get('/liste-produits', getProduits);
router.get('/produit/:id', getProduit);
router.get('/produit-engine/:query', getProduitEngine);

router.get('/liste-stock', getStocks);
router.get('/stock/:id', getStock);


export default router;