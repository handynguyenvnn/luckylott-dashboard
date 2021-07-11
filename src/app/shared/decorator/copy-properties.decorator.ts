export function CopyProperties(mappings?: object) {
    return function _CopyProperties<T extends new(...args: any[]) => {}>(constr: T) {
        return class extends constr {
            constructor(...args: any[]) {
                const params = Object.assign({}, ...args);
                super(params);
                if (!params) { return; }
                copy(this, params);
            }
        };
    };
}

export const copy = (instance: object, valueObj: Dictionary): any => {
    if (valueObj instanceof Array) {
        if (!instance) {
            instance = [];
        }
        instance = valueObj.map((item, index) => {
            if (typeof item !== 'object') {
                return item;
            } else {
                return copy(instance[index], item);
            }
        });
    } else if (valueObj) {
        if (!instance) {
            instance = {};
            const keys = Object.keys(valueObj);
            keys.forEach(key => instance[key] = null);
        }
        Object.getOwnPropertyNames(valueObj)
        .forEach(field => {
            if (!instance.hasOwnProperty(field)) { return; }
            if (typeof valueObj[field] !== 'object') {
                instance[field] = valueObj[field];
            } else {
                instance[field] = copy(instance[field], valueObj[field]);
            }
        });
    }
    return instance;
};

export declare type Dictionary<Type = any> = {
    [key: string]: Type;
};
