import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express  from 'express'

dotenv.config()

let commandes = [];
let urlBase = "http://"+process.env.DB_HOST+":"+process.env.DB_PORT+"/commandes";
let url = urlBase+"?_embed=carts&_expand=tier";


export const getCommandes = async (req, res) => {
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
}

export const getCommande = async (req, res) => {
    const response = await fetch(urlBase+"/"+req.params.id+"?_embed=carts&_expand=tier");
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data)
};