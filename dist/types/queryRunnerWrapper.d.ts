/**
 * Wraps the original TypeORM query runner to intercept some calls
 * and manipulate the transactional context.
 */
import { QueryRunner } from 'typeorm';
interface QueryRunnerWrapper extends QueryRunner {
    releaseQueryRunner(): Promise<void>;
}
declare const wrap: (originalQueryRunner: QueryRunner) => QueryRunnerWrapper;
export { QueryRunnerWrapper, wrap };
