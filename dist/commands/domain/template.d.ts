import { TTLType } from './types';
declare const isProxiedInquirer: {
    readonly type: "confirm";
    readonly name: "isProxied";
    readonly message: "Proxied 여부를 선택해주세요";
    readonly default: false;
};
declare const ttlInquirer: {
    readonly type: "list";
    readonly name: "ttl";
    readonly message: "TTL을 선택해주세요";
    readonly choices: TTLType[];
    readonly default: TTLType.AUTO;
};
declare const priorityInquirer: {
    readonly type: "number";
    readonly name: "priority";
    readonly message: "Priority를 입력해주세요 (0 - 65535)";
    readonly required: true;
    readonly min: 0;
    readonly max: 65535;
};
declare const weightInquirer: {
    readonly type: "number";
    readonly name: "weight";
    readonly message: "Weight를 입력해주세요 (0 - 65535)";
    readonly required: true;
    readonly min: 0;
    readonly max: 65535;
};
export { isProxiedInquirer, ttlInquirer, priorityInquirer, weightInquirer };
