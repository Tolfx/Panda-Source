import brain from 'brain.js';
import fs from 'fs';
import paths from '../types/paths';

let net = new brain.recurrent.RNN({
  hiddenLayers: [2, 2, 2],
  learningRate: 0.6,
});

let path = paths.toxicBrain;

export function bad(message) {
  const content = fs.readFileSync(path);
  const Checker = JSON.parse(content);
  Checker.push({
    input: message,
    output: 'Toxic',
  });
  fs.writeFileSync(path, JSON.stringify(Checker));
}

export function good(message) {
  const content = fs.readFileSync(path);
  const Checker = JSON.parse(content);
  Checker.push({
    input: message,
    output: 'Not Toxic',
  });
  fs.writeFileSync(path, JSON.stringify(Checker));
}

export function guess(message) {
  const content = fs.readFileSync(path);
  const Checker = JSON.parse(content);
  let configlol = {
    // Defaults values --> expected validation
    iterations: 100, // the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
    log: true, // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 10, // iterations between logging out --> number greater than 0
    learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
    callback: null, // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
  };

  net.train(Checker, configlol);
  console.log(JSON.stringify(net.run('kys')));
  console.log(net.run('kys'));
  return JSON.stringify(net.run(message));
}
//net.train(data)
