import cheerio from 'cheerio';
import request from 'request';

export default class newBlocks {
  private adminIDSB = {
    'A Singular Grape': '703',
    'A Wild Tryhard': '562',
    Absinthe: '438',
    Addster: '621',
    Adoruby: '455',
    'Agent C': '646',
    Baka: '394',
    Bambi: '586',
    'Basement Kid': '738',
    Beefsta: '724',
    Beshmodir: '705',
    Black: '594',
    BlackApp: '582',
    BobZy: '695',
    Brick: '747',
    Bucket: '617',
    Chaz: '673',
    'China Virus': '755',
    Christina: '735',
    Chromic: '546',
    cling: '717',
    'Compass rose': '696',
    CONSOLE: '0',
    croco: '522',
    Djusan: '653',
    'Doktor Obvious': '720',
    'Dr.Doggo': '744',
    'Ducks Are People Too': '634',
    Duress: '750',
    'Ed Edd &amp; Eddy': '699',
    'El DIABLO': '552',
    Electrod: '97',
    Fathi: '591',
    Fredo: '649',
    Furken: '664',
    Gardevoir: '374',
    Gmellow: '607',
    Gold: '587',
    Gudinde: '736',
    'Hans Das Gas': '624',
    haze: '726',
    Heather: '746',
    Hedgehog: '687',
    'Hera ': '753',
    HomelessKoopa: '739',
    HorizonCookie: '270',
    iceviet: '392',
    Ignoramoose: '692',
    Insomnia: '307',
    ItDoMatter: '725',
    jmp: '745',
    Joojoo: '446',
    'Jose Stalino': '721',
    kaufmarkt: '168',
    kermitkujo: '708',
    Kevin: '1',
    'King Wiggler': '734',
    'Kitty Cat': '77',
    Kmod: '272',
    Komqua: '595',
    lapidusy: '271',
    Larry: '684',
    'Lil Wolf': '432',
    lillunya: '727',
    LinkTalos: '451',
    'Little Pixel': '372',
    'Loli Police': '614',
    Madact: '172',
    Matt1608: '732',
    Matth: '139',
    Matze: '650',
    Maxel: '669',
    Mehgend: '674',
    Mekelo: '733',
    Michael: '361',
    Mikey: '618',
    Monster: '388',
    'Moon Cake': '383',
    'MR.TROLL': '741',
    Mufti: '598',
    Mustache: '571',
    Mysticales: '681',
    NettysFall: '605',
    Nightascythe: '295',
    Nikola: '670',
    ninja_panos: '449',
    'Onee-Chan': '545',
    PinkPanther: '729',
    PNN: '461',
    Pocky: '629',
    Pricholas: '395',
    'Pro Ricky': '754',
    PRO1OOPL: '737',
    RABe514: '671',
    'Racer911-1': '531',
    'Random Coffee Table': '749',
    'Ranger Ciri': '564',
    Red: '709',
    Ron: '24',
    Sascha: '731',
    Scudi37: '707',
    'Semicolon Backslash': '593',
    Sin: '686',
    'Sir Matrix': '518',
    SirPupper: '728',
    Skiffa: '126',
    Skorpieo: '748',
    Solar: '730',
    'SPLOOOGE 13FPS': '633',
    Stabbin: '58',
    Syntex: '751',
    tacobc: '265',
    Teddi: '610',
    'thanos.avi': '555',
    thebishcrazy: '679',
    ThePetri: '663',
    'thomas.konrad.1': '144',
    Tolfx: '603',
    TriiX: '325',
    TRITFIRE: '149',
    Tyler: '551',
    udwxmoose: '743',
    Umbra: '742',
    Wasker: '752',
    Wonkglorg: '576',
    Yimura: '467',
    ZeroPC: '567',
    zimbabwe: '637',
  };

  public run(client, message, args) {
    this.blocksNew(client, message, args);
  }

  private async blocksNew(client, message, args) {
    if (!args[0]) return message.channel.send('Please mention an admin');
    if (args[0] != this.adminIDSB[args[0]]) { return message.channel.send('Invalid admin');}
    const newcomm = await this.CommsAmount(this.adminIDSB[args[0]]);
  }

  /**
   * @description Returns the comms amount from the trial
   */
  private CommsAmount(ID): Promise<String | Number> {
    return new Promise(async (resolve, reject) => {
      const URL = 'https://bans.panda-community.com/index.php?';
      const SEARCH_COMM = 'p=commslist&advSearch=';
      const ENDPOINT = '&advType=admin';

      request(
        {
          url: `${URL}${SEARCH_COMM}${ID}${ENDPOINT}`,
          headers: { 'Content-Type': 'text/xml' },
        },
        (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            let amount: string = $('#content > h3 > i').text().trim().replace('Total Blocks: ', '');
            resolve(parseInt(amount));
          } else {
            reject('Something went wrong on checking Comms');
          }
        }
      );
    });
  }

  /**
   * @description Returns the ban amount from the trial
   */
  private BansAmount(ID): Promise<String | Number> {
    return new Promise((resolve, reject) => {
      const URL = 'https://bans.panda-community.com/index.php?';
      const SEARCH_BAN = 'p=banlist&advSearch=';
      const ENDPOINT = '&advType=admin';

      request(
        {
          url: `${URL}${SEARCH_BAN}${ID}${ENDPOINT}`,
          headers: { 'Content-Type': 'text/xml' },
        },
        (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            let amount: string = $('#content > h3 > i').text().trim().replace('Total Bans: ', '');
            resolve(parseInt(amount));
          } else {
            reject('Something went wrong checking Bans');
          }
        }
      );
    });
  }
}
