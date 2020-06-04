class Instance extends Core {
  core: Core;
  uuid: string;
  name: string;
  type: string;

  constructor(core: Core, uuid: string, name: string, type: string) {
    super(core.getTool());
    this.core = core;
    this.uuid = uuid;
    this.name = name;
    this.type = type;
  }

  async closeOpenConnections() {
    var core = this.core;
    let main = this;
    var url;

    if (core.getTool() instanceof Session) {
      url =
        "https://api.purecore.io/rest/2/instance/connections/close/all/?hash=" +
        core.getCoreSession().getHash() +
        "&instance=" +
        main.uuid;
    } else {
      url =
        "https://api.purecore.io/rest/2/instance/connections/open/all/?key=" +
        core.getKey();
    }

    try {
      return await fetch(url, { method: "GET" })
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonresponse) {
          if ("error" in jsonresponse) {
            throw new Error(jsonresponse.error + ". " + jsonresponse.msg);
          } else {
            var connectionList = new Array<Connection>();
            jsonresponse.forEach((connectionJson) => {
              var connection = new Connection(core).fromArray(connectionJson);
              connectionList.push(connection);
            });
            return connectionList;
          }
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getOpenConnections() {
    var core = this.core;
    let main = this;
    var url;

    if (core.getTool() instanceof Session) {
      url =
        "https://api.purecore.io/rest/2/instance/connections/open/list/?hash=" +
        core.getCoreSession().getHash() +
        "&instance=" +
        main.uuid;
    } else {
      url =
        "https://api.purecore.io/rest/2/instance/connections/open/list/?key=" +
        core.getKey();
    }

    try {
      return await fetch(url, { method: "GET" })
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonresponse) {
          if ("error" in jsonresponse) {
            throw new Error(jsonresponse.error + ". " + jsonresponse.msg);
          } else {
            var connectionList = new Array<Connection>();
            jsonresponse.forEach((connectionJson) => {
              var connection = new Connection(core).fromArray(connectionJson);
              connectionList.push(connection);
            });
            return connectionList;
          }
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getGrowthAnalytics(span = 3600 * 24) {
    var core = this.core;
    let main = this;
    var url;

    if (core.getTool() instanceof Session) {
      url =
        "https://api.purecore.io/rest/2/instance/growth/analytics/?hash=" +
        core.getCoreSession().getHash() +
        "&instance=" +
        main.uuid +
        "&span=" +
        span;
    } else {
      url =
        "https://api.purecore.io/rest/2/instance/growth/analytics/?key=" +
        core.getKey() +
        "&span=" +
        span;
    }

    try {
      return await fetch(url, { method: "GET" })
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonresponse) {
          if ("error" in jsonresponse) {
            throw new Error(jsonresponse.error + ". " + jsonresponse.msg);
          } else {
            var growthAnalytics = new Array<GrowthAnalytic>();
            jsonresponse.forEach((growthAnalyticJSON) => {
              var growthAnalytic = new GrowthAnalytic().fromArray(
                growthAnalyticJSON
              );
              growthAnalytics.push(growthAnalytic);
            });
            return growthAnalytics;
          }
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  public delete() {
    var core = this.core;
    var instance = this;
    var url;

    if (core.getTool() instanceof Session) {
      url =
        "https://api.purecore.io/rest/2/instance/delete/?hash=" +
        core.getCoreSession().getHash() +
        "&instance=" +
        instance.getId();
    } else {
      url =
        "https://api.purecore.io/rest/2/instance/delete/?key=" +
        core.getKey() +
        "&instance=" +
        instance.getId();
    }

    return new Promise(function (resolve, reject) {
      try {
        return fetch(url, { method: "GET" })
          .then(function (response) {
            return response.json();
          })
          .then(function (jsonresponse) {
            if ("error" in jsonresponse) {
              reject(new Error(jsonresponse.error));
            } else {
              resolve(true);
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  public getKeys() {
    var core = this.core;
    var instance = this;
    var url;

    if (core.getTool() instanceof Session) {
      url =
        "https://api.purecore.io/rest/2/instance/key/list/?hash=" +
        core.getCoreSession().getHash() +
        "&instance=" +
        instance.getId();
    } else {
      url =
        "https://api.purecore.io/rest/2/instance/key/list/?key=" +
        core.getKey() +
        "&instance=" +
        instance.getId();
    }

    return new Promise(function (resolve, reject) {
      try {
        return fetch(url, { method: "GET" })
          .then(function (response) {
            return response.json();
          })
          .then(function (jsonresponse) {
            if ("error" in jsonresponse) {
              reject(new Error(jsonresponse.error));
            } else {
              var keyList = new Array<Key>();
              jsonresponse.forEach((jsonKey) => {
                keyList.push(new Key(core).fromArray(jsonKey));
              });

              resolve(keyList);
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.uuid;
  }

  asNetwork(): Network {
    return new Network(this.core, this);
  }

  update() {
    var core = this.core;
    var instance = this;
    var url;

    if (core.getTool() instanceof Session) {
      url =
        "https://api.purecore.io/rest/2/instance/info/?hash=" +
        core.getCoreSession().getHash() +
        "&instance=" +
        instance.getId();
    } else {
      url =
        "https://api.purecore.io/rest/2/instance/info/?key=" +
        core.getKey() +
        "&instance=" +
        instance.getId();
    }

    return new Promise(function (resolve, reject) {
      try {
        return fetch(url, { method: "GET" })
          .then(function (response) {
            return response.json();
          })
          .then(function (jsonresponse) {
            if ("error" in jsonresponse) {
              reject(new Error(jsonresponse.error + ". " + jsonresponse.msg));
            } else {
              if (jsonresponse.server == null) {
                instance.type = "NTW";
                instance.uuid = jsonresponse.network.uuid;
                instance.name = jsonresponse.network.name;
              } else {
                instance.type = "SVR";
                instance.uuid = jsonresponse.server.uuid;
                instance.name = jsonresponse.server.name;
              }

              resolve(instance);
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  }
}
