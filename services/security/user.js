import fetch from 'node-fetch';
import dotenv from 'dotenv';
import express  from 'express'
import {v4 as uuidv4} from 'uuid'
import {v1 as uuidv1} from 'uuid'
import CryptoJS from 'crypto-js'
import nodemailer from 'nodemailer';
import  hbs  from 'nodemailer-express-handlebars'
import path from 'path'
import cookieParser from 'cookie-parser';

dotenv.config()

let commandes = [];
let urlBase = "http://"+process.env.DB_HOST+":"+process.env.DB_PORT+"/users";
let url = urlBase+"?_expand=profile";

function encrypt(text) {
	var plaintext = text;
    return CryptoJS.AES.encrypt(plaintext, "secretkey");
}

function decrypt(text) {
    var ciphertext = text;
    var bytes  = CryptoJS.AES.decrypt(ciphertext, "secretkey");
	return bytes.toString(CryptoJS.enc.Utf8);
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return makeid(1)+"-"+Math.floor(Math
    .random() * (maxm - minm + 1));
}

export const getUsers = async (req, res) => {
    console.log('Mon token',generateRandomNumber());
    const response = await fetch(url);
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
}

export const getUserById = async (req, res) => {
    const response = await fetch(urlBase+"/"+req.params.id+"?_expand=profile");
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data)
};

export const getUserByEmail = async (req, res) => {
    //console.log(uuidv4())
    const response = await fetch(urlBase+"?email="+req.params.query+"?_expand=profile");
    const data = await response.json();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data)
};

export const checkUser = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(req.headers.cookie);
};

export const ConnectUser = async (req, res) => {
    //console.log(uuidv4())
    const response = await fetch(urlBase+"?email="+req.params.email+"&code="+req.params.code+"&_expand=profile");
    const data = await response.json();
    //console.log(urlBase+"?email="+req.params.email+"&code="+req.params.code);
    res.set('Access-Control-Allow-Origin', '*');
    if (data.length!=0) {
        console.log(data[0].profile.body);
        var token = data[0].token;
        res.cookie("userToken", data[0].token);
        res.cookie("userEmail", data[0].email);
        res.cookie("userCode", data[0].code);
        res.cookie("userProfileId", data[0].ProfileId);
    }
    res.send(data)
};

export const DisConnectUser = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.clearCookie("userToken");
    res.clearCookie("userEmail");
    res.clearCookie("userCode")
    res.clearCookie("ProfileId")
    res.send('Déconnecter avec succès');

};
export const getCreateUser = async (req, res) => {
    let user = {
      email: req.body.email,
      name: req.body.name,
      token: uuidv4(),
      password: encrypt(req.body.password).toString(),
      code: generateRandomNumber(),
      etat: 1,
      profileId: req.body.profileId
    };
    let response = await fetch(urlBase, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      let result = await response.json();
};