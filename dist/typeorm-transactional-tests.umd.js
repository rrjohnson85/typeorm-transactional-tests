(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('typeorm')) :
    typeof define === 'function' && define.amd ? define(['exports', 'typeorm'], factory) :
    (factory((global.typeormTransactionalTests = {}),global.typeorm));
}(this, (function (exports,typeorm) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var release;
    var wrap = function (originalQueryRunner) {
        release = originalQueryRunner.release;
        originalQueryRunner.release = function () {
            return Promise.resolve();
        };
        originalQueryRunner.releaseQueryRunner = function () {
            originalQueryRunner.release = release;
            return originalQueryRunner.release();
        };
        return originalQueryRunner;
    };

    var TransactionalTestContext = /** @class */ (function () {
        function TransactionalTestContext(connection) {
            this.connection = connection;
            this.queryRunner = null;
        }
        TransactionalTestContext.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.queryRunner) {
                                throw new Error('Context already started');
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 6]);
                            this.queryRunner = this.buildWrappedQueryRunner();
                            this.monkeyPatchQueryRunnerCreation(this.queryRunner);
                            return [4 /*yield*/, this.queryRunner.connect()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.queryRunner.startTransaction()];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            error_1 = _a.sent();
                            return [4 /*yield*/, this.cleanUpResources()];
                        case 5:
                            _a.sent();
                            throw error_1;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        TransactionalTestContext.prototype.finish = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.queryRunner) {
                                throw new Error('Context not started. You must call "start" before finishing it.');
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, this.queryRunner.rollbackTransaction()];
                        case 2:
                            _a.sent();
                            this.restoreQueryRunnerCreation();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.cleanUpResources()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        TransactionalTestContext.prototype.buildWrappedQueryRunner = function () {
            var queryRunner = this.connection.createQueryRunner();
            return wrap(queryRunner);
        };
        TransactionalTestContext.prototype.monkeyPatchQueryRunnerCreation = function (queryRunner) {
            var patch = function () { return Promise.resolve(); };
            this.originQueryRunnerFunction = typeorm.Connection.prototype.createQueryRunner;
            typeorm.Connection.prototype.createQueryRunner = function () { return (__assign(__assign({}, queryRunner), { startTransaction: patch, commitTransaction: patch, rollbackTransaction: patch, release: patch })); };
        };
        TransactionalTestContext.prototype.restoreQueryRunnerCreation = function () {
            typeorm.Connection.prototype.createQueryRunner = this.originQueryRunnerFunction;
        };
        TransactionalTestContext.prototype.cleanUpResources = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.queryRunner) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.queryRunner.releaseQueryRunner()];
                        case 1:
                            _a.sent();
                            this.queryRunner = null;
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        return TransactionalTestContext;
    }());

    exports.TransactionalTestContext = TransactionalTestContext;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=typeorm-transactional-tests.umd.js.map
