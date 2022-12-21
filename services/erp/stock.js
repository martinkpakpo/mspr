import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express  from 'express'

dotenv.config()

let commandes = [];
let urlBase = "http://"+process.env.DB_HOST+":"+process.env.DB_PORT+"/produits";
let url = urlBase+"?_expand=category";


export const getStocks = async (req, res) => {
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
}

export const getStock = async (req, res) => {
    const response = await fetch(urlBase+"/"+req.params.id+"?_expand=category");
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data)
};