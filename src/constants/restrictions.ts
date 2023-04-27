export enum RestrictionState {
  enabled = "enabled",
  disabled = "disabled",
}

export enum RestrictionScope {
  all = "all",
  continent = "continent",
  country = "country",
  ip = "ip",
  ip_subnet = "ip_subnet",
}

export enum RestrictionCategory {
  whitelist = "whitelist",
  maintenance = "maintenance",
  blacklist = "blacklist",
}
