const axios = require("axios");
const { getNetworth } = require("skyhelper-networth");
const networthParser = require("./networthParser.js");
const config = require('../config.json');
const apiKey = config.networth.apiKey;

async function networthCalc(uuid) {
    const apiUrl = "https://api.hypixel.net/skyblock/profiles";
    var response = await axios.get(apiUrl, {
      params: { key: apiKey, uuid },
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    try {
    
    var data = response.data;
    if (!data.success) {
      return ["0", "No profile data found. 🙁"];
    }
    if (data.profiles == null) {
      return ["0", "No profile data found. 🙁"];
    }
    for (let i = 0; i < data.profiles.length; i++) {
    
      var profile = data.profiles[i];
      var bank = profile.banking?.balance;
      var profileNetworth = await getNetworth(profile["members"][uuid], bank);
      if (richestProfile == null) {
        var richestProfile = profileNetworth;
      } else if (richestProfile.unsoulboundNetworth < profileNetworth.unsoulboundNetworth) {
        var richestProfile = profileNetworth;
        }
      }
        
    }catch(error){
      console.log(error);
      return ["0", "No profile data found. 🙁"];
    }
    var description = await networthParser(richestProfile);
    return [richestProfile["unsoulboundNetworth"], richestProfile["networth"], description];
}

module.exports = networthCalc;
