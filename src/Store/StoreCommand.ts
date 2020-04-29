class StoreCommand extends Core {

    public core: Core;
    public network: Network;
    public cmd: Command;
    public needsOnline: boolean;
    public executeOn: Array<Instance>;
    public listId: string;

    public constructor(core: Core, network?: Network, cmd?, needsOnline?: boolean, executeOn?: Array<Instance>, listId?: string) {
        super(core.getTool());
        this.core = core;
        this.network = network;
        this.cmd = cmd;
        this.needsOnline = needsOnline;
        this.executeOn = executeOn;
        this.listId = listId
    }

    public fromArray(array): StoreCommand {
        this.network = new Instance(this.core, array.network.uuid, array.network.name, "NTW").asNetwork();
        if (typeof array.cmd == "string") {
            this.cmd = new Command(array.cmd, null, this.network);
        } else {
            this.cmd = new Command(array.cmd.cmdId, array.cmd.cmdString, this.network);
        }
        this.needsOnline = array.needs_online;

        var instances = new Array<Instance>();

        array.execute_on.forEach(instance => {

            if (typeof instance == "string") {
                instances.push(new Instance(this.core, instance, null, "UNK"));
            } else {
                instances.push(new Instance(this.core, instance.uuid, instance.name, "UNK"));
            }

        });
        this.executeOn = instances;
        this.listId = array.lisdid;
        return this;
    }

    public getCommand(): Command {
        return this.cmd;
    }

}