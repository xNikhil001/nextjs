import isURL from 'validator/lib/isURL'

class Validate {
  constructor(formData){
    this.errors = {};
    this.formData = formData;
    this.checkName(this.formData.coin_name);
    this.checkSymbol(this.formData.symbol);
    this.checkLogo(this.formData.logo);
    this.checkDescription(this.formData.description);
    this.checkAddress(this.formData.address)
    this.checkWebsite(this.formData.website)
    this.checkChain(this.formData.chain)
    this.checkRelease(this.formData.release)
    this.checkMarketCap(this.formData.marketcap)
    this.checkTwitter(this.formData.twitter)
    this.checkTelegram(this.formData.telegram)
  }
  checkName(name){
    const error = []
    if(name == ""){
      error.push("Name cannot be empty!");
      this.errors.nameError = error;
      return;
    }
    if(name.length > 30 || name.length < 2){
      error.push("Name must be between 2 to 30 characters!");
    }
    if(error.length != 0){
      this.errors.nameError = error;
    }
  }
  checkSymbol(symbol){
    const error = []
    if(symbol == ""){
      error.push("Symbol cannot be empty!");
      this.errors.symbolError = error;
      return;
    }
    if(symbol.length > 6 || symbol.length < 2){
      error.push("Symbol must be between 2 to 6 characters!");
    }
    if(error.length != 0){
      this.errors.symbolError = error;
    }
  }
  checkLogo(logo){
    const error = []
    if(logo == ""){
      error.push("Logo cannot be empty!");
      this.errors.logoError = error;
      return;
    }
    if(!isURL(logo)){
      error.push("Logo URL must be valid!");
    }
    if(error.length != 0){
      this.errors.logoError = error;
    }
  }
  
  checkDescription(desc){
    const error = []
    if(desc == ""){
      error.push("Description cannot be empty!");
      this.errors.descError = error;
      return;
    }
    if(desc.length > 800 || desc.length < 50){
      error.push("Description can be 50 to 800 characters long!");
    }
    if(error.length != 0){
      this.errors.descError = error;
    }
  }
  
  checkAddress(address){
    const error = []
    if(address == ""){
      error.push("Address cannot be empty!");
      this.errors.addressError = error;
      return;
    }
  }
  
  checkWebsite(website){
    const error = []
    if(website == ""){
      error.push("Wesbsite URL cannot be empty!");
      this.errors.websiteError = error;
      return;
    }
    if(!isURL(website)){
      error.push("Website URL must be valid!");
    }
    if(error.length != 0){
      this.errors.websiteError = error;
    }
  }
  
  checkChain(chain){
    const error = []
    if(chain == ""){
      error.push("Block Chain cannot be empty!");
      this.errors.chainError = error;
      return;
    }
  }
  
  checkRelease(release){
    const error = []
    if(release == ""){
      error.push("Release date cannot be empty!");
      this.errors.releaseError = error;
      return;
    }
  }
  
  checkMarketCap(marketcap){
    const error = []
    if(marketcap == ""){
      error.push("Market capital cannot be empty!");
      this.errors.marketcapError = error;
      return;
    }
  }
  checkTwitter(twitter){
    const error = []
    if(twitter == ""){
      error.push("Twitter URL cannot be empty!");
      this.errors.twitterError = error;
      return;
    }
    if(!isURL(twitter)){
      error.push("Twitter URL must be valid!");
    }
    if(error.length != 0){
      this.errors.twitterError = error;
    }
  }
  
  checkTelegram(telegram){
    const error = []
    if(telegram == ""){
      error.push("Telegram URL cannot be empty!");
      this.errors.telegramError = error;
      return;
    }
    if(!isURL(telegram)){
      error.push("Telegram URL must be valid!");
    }
    if(error.length != 0){
      this.errors.telegramError = error;
    }
  }
  
}

export default Validate;