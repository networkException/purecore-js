class Store extends Network {

    network: Network;

    constructor(network: Network) {

        super(network.core, network.asInstance());
        this.network = network;

    }

    getPayments(page?) {

        var core = this.network.core;
        var instance = this.network.asInstance();

        var queryPage = 0;

        if (page != undefined || page != null) {
            queryPage = page;
        }

        var url;

        if (core.getTool() instanceof Session) {
            url = "https://api.purecore.io/rest/2/payment/list/?hash=" + core.getCoreSession().getHash() + "&network=" + instance.getId() + "&page=" + page;
        } else {
            url = "https://api.purecore.io/rest/2/payment/list/?key=" + core.getKey() + "&network=" + instance.getId() + "&page=" + page;
        }

        return new Promise(function (resolve, reject) {

            try {
                return fetch(url, { method: "GET" }).then(function (response) {
                    return response.json();
                }).then(function (jsonresponse) {
                    if ("error" in jsonresponse) {
                        reject(new Error(jsonresponse.error + ". " + jsonresponse.msg));
                    } else {

                        var payments = new Array<Payment>();

                        jsonresponse.forEach(paymentJson => {

                            payments.push(new Payment(core).fromArray(paymentJson));

                        });

                        resolve(payments);

                    }
                });
            } catch (e) {
                reject(e);
            }

        });
    }

    getPackages() {

        var core = this.network.core;
        var instance = this.network.asInstance();

        var url;

        if (core.getTool() instanceof Session) {
            url = "https://api.purecore.io/rest/2/store/item/list/?hash=" + core.getCoreSession().getHash() + "&network=" + instance.getId();
        } else {
            url = "https://api.purecore.io/rest/2/store/item/list/?key=" + core.getKey() + "&network=" + instance.getId();
        }

        return new Promise(function (resolve, reject) {

            try {
                return fetch(url, { method: "GET" }).then(function (response) {
                    return response.json();
                }).then(function (jsonresponse) {
                    if ("error" in jsonresponse) {
                        reject(new Error(jsonresponse.error + ". " + jsonresponse.msg));
                    } else {

                        var response = new Array<NestedItem>();

                        jsonresponse.forEach(nestedData => {

                            response.push(new NestedItem(core).fromArray(nestedData));

                        });

                        resolve(response);

                    }
                });
            } catch (e) {
                reject(e);
            }

        });
    }

}