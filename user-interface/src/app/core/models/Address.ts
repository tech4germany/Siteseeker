export class Address {
  Match_addr: string;
  LongLabel: string;
  ShortLabel: string;
  Addr_type: string;
  Type: string;
  PlaceName: string;
  AddNum: string;
  Address: string;
  Block: string;
  Sector: string;
  Neighborhood: string;
  District: string;
  City: string;
  MetroArea: string;
  Subregion: string;
  Region: string;
  RegionAbbr: string;
  Territory: string;
  Postal: string;
  PostalExt: string;
  CntryName: string;
  CountryCode: string;

  constructor(
    Match_addr: string,
    LongLabel: string,
    ShortLabel: string,
    Addr_type: string,
    Type: string,
    PlaceName: string,
    AddNum: string,
    Address: string,
    Block: string,
    Sector: string,
    Neighborhood: string,
    District: string,
    City: string,
    MetroArea: string,
    Subregion: string,
    Region: string,
    RegionAbbr: string,
    Territory: string,
    Postal: string,
    PostalExt: string,
    CntryName: string,
    CountryCode: string
  ) {
    this.Match_addr = Match_addr;
    this.LongLabel = LongLabel;
    this.ShortLabel = ShortLabel;
    this.Addr_type = Addr_type;
    this.Type = Type;
    this.PlaceName = PlaceName;
    this.AddNum = AddNum;
    this.Address = Address;
    this.Block = Block;
    this.Sector = Sector;
    this.Neighborhood = Neighborhood;
    this.District = District;
    this.City = City;
    this.MetroArea = MetroArea;
    this.Subregion = Subregion;
    this.Region = Region;
    this.RegionAbbr = RegionAbbr;
    this.Territory = Territory;
    this.Postal = Postal;
    this.PostalExt = PostalExt;
    this.CntryName = CntryName;
    this.CountryCode = CountryCode;
  }
}
