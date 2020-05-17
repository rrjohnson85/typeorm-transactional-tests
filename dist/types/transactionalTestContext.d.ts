import { Connection } from 'typeorm';
export default class TransactionalTestContext {
    private readonly connection;
    private queryRunner;
    private originQueryRunnerFunction;
    constructor(connection: Connection);
    start(): Promise<void>;
    finish(): Promise<void>;
    private buildWrappedQueryRunner;
    private monkeyPatchQueryRunnerCreation;
    private restoreQueryRunnerCreation;
    private cleanUpResources;
}
