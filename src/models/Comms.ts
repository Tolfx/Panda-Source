import mongoose from 'mongoose';

const newComm = new mongoose.Schema({
  SteamID: {},
});

const Comm = mongoose.model('newComm', newComm);

module.exports = Comm;
