/**
 * Easing methods
 */

export const Linear = function (k) {
    return k;
};

export const QuadraticIn = function (k) {
    return k * k;
};

export const QuadraticOut = function (k) {
    return k * (2 - k);
};

export const QuadraticInOut = function (k) {
    if ((k *= 2) < 1) {
        return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
};

export const CubicIn = function (k) {
    return k * k * k;
};

export const CubicOut = function (k) {
    return --k * k * k + 1;
};

export const CubicInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k;
    return 0.5 * ((k -= 2) * k * k + 2);
};

export const QuarticIn = function (k) {
    return k * k * k * k;
};

export const QuarticOut = function (k) {
    return 1 - (--k * k * k * k);
};

export const QuarticInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k * k;
    return -0.5 * ((k -= 2) * k * k * k - 2);
};

export const QuinticIn = function (k) {
    return k * k * k * k * k;
};

export const QuinticOut = function (k) {
    return --k * k * k * k * k + 1;
};

export const QuinticInOut = function (k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
};

export const SineIn = function (k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    return 1 - Math.cos(k * Math.PI / 2);
};

export const SineOut = function (k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    return Math.sin(k * Math.PI / 2);
};

export const SineInOut = function (k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    return 0.5 * (1 - Math.cos(Math.PI * k));
};

export const ExponentialIn = function (k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
};

export const ExponentialOut = function (k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
};

export const ExponentialInOut = function (k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
};

export const CircularIn = function (k) {
    return 1 - Math.sqrt(1 - k * k);
};

export const CircularOut = function (k) {
    return Math.sqrt(1 - (--k * k));
};

export const CircularInOut = function (k) {
    if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
};

export const ElasticIn = function (k) {
    const p = 0.4;
    let s, a = 0.1;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
        a = 1; s = p / 4;
    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
};

export const ElasticOut = function (k) {
    const p = 0.4;
    let s, a = 0.1;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
        a = 1; s = p / 4;
    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
};

export const ElasticInOut = function (k) {
    const p = 0.4;
    let s, a = 0.1;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!a || a < 1) {
        a = 1; s = p / 4;
    } else s = p * Math.asin(1 / a) / (2 * Math.PI);
    if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
};

export const BackIn = function (k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
};

export const BackOut = function (k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
};

export const BackInOut = function (k) {
    const s = 1.70158 * 1.525;
    if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
};

export const BounceOut = function (k) {
    if (k < (1 / 2.75)) {
        return 7.5625 * k * k;
    } else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    } else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
    }
    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;

};

export const BounceIn = function (k) {
    return 1 - BounceOut(1 - k);
};

export const BounceInOut = function (k) {
    if (k < 0.5) return BounceIn(k * 2) * 0.5;
    return BounceOut(k * 2 - 1) * 0.5 + 0.5;
};
