import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express  from 'express'

dotenv.config()

let commandes = [];
let urlBase = "http://"+process.env.DB_HOST+":"+process.env.DB_PORT+"/tiers";
let url = urlBase+"?_embed=commandes";


export const gettiers = async (req, res) => {
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
}

export const gettier = async (req, res) => {
    const response = await fetch(urlBase+"/"+req.params.id+"?_embed=commandes");
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data)
};