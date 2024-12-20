// three.min.js - http://github.com/mrdoob/three.js
var THREE = THREE || { REVISION: "51" };
void 0 === self.console &&
    (self.console = {
        info: function () {},
        log: function () {},
        debug: function () {},
        warn: function () {},
        error: function () {}
    });
void 0 === self.Int32Array &&
    ((self.Int32Array = Array), (self.Float32Array = Array));
void 0 === String.prototype.startsWith &&
    (String.prototype.startsWith = function (a) {
        return this.slice(0, a.length) === a;
    });
void 0 === String.prototype.endsWith &&
    (String.prototype.endsWith = function (a) {
        var a = String(a),
            b = this.lastIndexOf(a);
        return b >= 0 && b === this.length - a.length;
    });
void 0 === !String.prototype.trim &&
    (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    });
(function () {
    for (
        var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0;
        c < b.length && !window.requestAnimationFrame;
        ++c
    ) {
        window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"];
        window.cancelAnimationFrame =
            window[b[c] + "CancelAnimationFrame"] ||
            window[b[c] + "CancelRequestAnimationFrame"];
    }
    if (window.requestAnimationFrame === void 0)
        window.requestAnimationFrame = function (b) {
            var c = Date.now(),
                e = Math.max(0, 16 - (c - a)),
                g = window.setTimeout(function () {
                    b(c + e);
                }, e);
            a = c + e;
            return g;
        };
    if (window.cancelAnimationFrame === void 0)
        window.cancelAnimationFrame = function (a) {
            clearTimeout(a);
        };
})();
THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;
THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.UVMapping = function () {};
THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};
THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};
THREE.RepeatWrapping = 1e3;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;
THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;
THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;
THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;
THREE.Clock = function (a) {
    this.autoStart = a !== void 0 ? a : true;
    this.elapsedTime = this.oldTime = this.startTime = 0;
    this.running = false;
};
THREE.Clock.prototype.start = function () {
    this.oldTime = this.startTime = Date.now();
    this.running = true;
};
THREE.Clock.prototype.stop = function () {
    this.getElapsedTime();
    this.running = false;
};
THREE.Clock.prototype.getElapsedTime = function () {
    return (this.elapsedTime = this.elapsedTime + this.getDelta());
};
THREE.Clock.prototype.getDelta = function () {
    var a = 0;
    this.autoStart && !this.running && this.start();
    if (this.running) {
        var b = Date.now(),
            a = 0.001 * (b - this.oldTime);
        this.oldTime = b;
        this.elapsedTime = this.elapsedTime + a;
    }
    return a;
};
THREE.Color = function (a) {
    a !== void 0 && this.setHex(a);
    return this;
};
THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    copy: function (a) {
        this.r = a.r;
        this.g = a.g;
        this.b = a.b;
        return this;
    },
    copyGammaToLinear: function (a) {
        this.r = a.r * a.r;
        this.g = a.g * a.g;
        this.b = a.b * a.b;
        return this;
    },
    copyLinearToGamma: function (a) {
        this.r = Math.sqrt(a.r);
        this.g = Math.sqrt(a.g);
        this.b = Math.sqrt(a.b);
        return this;
    },
    convertGammaToLinear: function () {
        var a = this.r,
            b = this.g,
            c = this.b;
        this.r = a * a;
        this.g = b * b;
        this.b = c * c;
        return this;
    },
    convertLinearToGamma: function () {
        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);
        return this;
    },
    setRGB: function (a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c;
        return this;
    },
    setHSV: function (a, b, c) {
        var d, f, e;
        if (c === 0) this.r = this.g = this.b = 0;
        else {
            d = Math.floor(a * 6);
            f = a * 6 - d;
            a = c * (1 - b);
            e = c * (1 - b * f);
            b = c * (1 - b * (1 - f));
            if (d === 0) {
                this.r = c;
                this.g = b;
                this.b = a;
            } else if (d === 1) {
                this.r = e;
                this.g = c;
                this.b = a;
            } else if (d === 2) {
                this.r = a;
                this.g = c;
                this.b = b;
            } else if (d === 3) {
                this.r = a;
                this.g = e;
                this.b = c;
            } else if (d === 4) {
                this.r = b;
                this.g = a;
                this.b = c;
            } else if (d === 5) {
                this.r = c;
                this.g = a;
                this.b = e;
            }
        }
        return this;
    },
    setHex: function (a) {
        a = Math.floor(a);
        this.r = ((a >> 16) & 255) / 255;
        this.g = ((a >> 8) & 255) / 255;
        this.b = (a & 255) / 255;
        return this;
    },
    lerpSelf: function (a, b) {
        this.r = this.r + (a.r - this.r) * b;
        this.g = this.g + (a.g - this.g) * b;
        this.b = this.b + (a.b - this.b) * b;
        return this;
    },
    getHex: function () {
        return (
            ((this.r * 255) << 16) ^
            ((this.g * 255) << 8) ^
            ((this.b * 255) << 0)
        );
    },
    getContextStyle: function () {
        return (
            "rgb(" +
            ((this.r * 255) | 0) +
            "," +
            ((this.g * 255) | 0) +
            "," +
            ((this.b * 255) | 0) +
            ")"
        );
    },
    clone: function () {
        return new THREE.Color().setRGB(this.r, this.g, this.b);
    }
};
THREE.Vector2 = function (a, b) {
    this.x = a || 0;
    this.y = b || 0;
};
THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function (a, b) {
        this.x = a;
        this.y = b;
        return this;
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        return this;
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    },
    addSelf: function (a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
        return this;
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    },
    subSelf: function (a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
        return this;
    },
    multiplyScalar: function (a) {
        this.x = this.x * a;
        this.y = this.y * a;
        return this;
    },
    divideScalar: function (a) {
        if (a) {
            this.x = this.x / a;
            this.y = this.y / a;
        } else this.set(0, 0);
        return this;
    },
    negate: function () {
        return this.multiplyScalar(-1);
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y;
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y;
    },
    length: function () {
        return Math.sqrt(this.lengthSq());
    },
    normalize: function () {
        return this.divideScalar(this.length());
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a));
    },
    distanceToSquared: function (a) {
        var b = this.x - a.x,
            a = this.y - a.y;
        return b * b + a * a;
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a);
    },
    lerpSelf: function (a, b) {
        this.x = this.x + (a.x - this.x) * b;
        this.y = this.y + (a.y - this.y) * b;
        return this;
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y;
    },
    isZero: function () {
        return this.lengthSq() < 1e-4;
    },
    clone: function () {
        return new THREE.Vector2(this.x, this.y);
    }
};
THREE.Vector3 = function (a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
};
THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function (a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        return this;
    },
    setX: function (a) {
        this.x = a;
        return this;
    },
    setY: function (a) {
        this.y = a;
        return this;
    },
    setZ: function (a) {
        this.z = a;
        return this;
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this;
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    },
    addSelf: function (a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
        this.z = this.z + a.z;
        return this;
    },
    addScalar: function (a) {
        this.x = this.x + a;
        this.y = this.y + a;
        this.z = this.z + a;
        return this;
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    },
    subSelf: function (a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
        this.z = this.z - a.z;
        return this;
    },
    multiply: function (a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    },
    multiplySelf: function (a) {
        this.x = this.x * a.x;
        this.y = this.y * a.y;
        this.z = this.z * a.z;
        return this;
    },
    multiplyScalar: function (a) {
        this.x = this.x * a;
        this.y = this.y * a;
        this.z = this.z * a;
        return this;
    },
    divideSelf: function (a) {
        this.x = this.x / a.x;
        this.y = this.y / a.y;
        this.z = this.z / a.z;
        return this;
    },
    divideScalar: function (a) {
        if (a) {
            this.x = this.x / a;
            this.y = this.y / a;
            this.z = this.z / a;
        } else this.z = this.y = this.x = 0;
        return this;
    },
    negate: function () {
        return this.multiplyScalar(-1);
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    length: function () {
        return Math.sqrt(this.lengthSq());
    },
    lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    },
    normalize: function () {
        return this.divideScalar(this.length());
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a);
    },
    lerpSelf: function (a, b) {
        this.x = this.x + (a.x - this.x) * b;
        this.y = this.y + (a.y - this.y) * b;
        this.z = this.z + (a.z - this.z) * b;
        return this;
    },
    cross: function (a, b) {
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        return this;
    },
    crossSelf: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z;
        this.x = c * a.z - d * a.y;
        this.y = d * a.x - b * a.z;
        this.z = b * a.y - c * a.x;
        return this;
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a));
    },
    distanceToSquared: function (a) {
        return new THREE.Vector3().sub(this, a).lengthSq();
    },
    getPositionFromMatrix: function (a) {
        this.x = a.elements[12];
        this.y = a.elements[13];
        this.z = a.elements[14];
        return this;
    },
    setEulerFromRotationMatrix: function (a, b) {
        function c(a) {
            return Math.min(Math.max(a, -1), 1);
        }
        var d = a.elements,
            f = d[0],
            e = d[4],
            g = d[8],
            h = d[1],
            i = d[5],
            j = d[9],
            l = d[2],
            n = d[6],
            d = d[10];
        if (b === void 0 || b === "XYZ") {
            this.y = Math.asin(c(g));
            if (Math.abs(g) < 0.99999) {
                this.x = Math.atan2(-j, d);
                this.z = Math.atan2(-e, f);
            } else {
                this.x = Math.atan2(n, i);
                this.z = 0;
            }
        } else if (b === "YXZ") {
            this.x = Math.asin(-c(j));
            if (Math.abs(j) < 0.99999) {
                this.y = Math.atan2(g, d);
                this.z = Math.atan2(h, i);
            } else {
                this.y = Math.atan2(-l, f);
                this.z = 0;
            }
        } else if (b === "ZXY") {
            this.x = Math.asin(c(n));
            if (Math.abs(n) < 0.99999) {
                this.y = Math.atan2(-l, d);
                this.z = Math.atan2(-e, i);
            } else {
                this.y = 0;
                this.z = Math.atan2(h, f);
            }
        } else if (b === "ZYX") {
            this.y = Math.asin(-c(l));
            if (Math.abs(l) < 0.99999) {
                this.x = Math.atan2(n, d);
                this.z = Math.atan2(h, f);
            } else {
                this.x = 0;
                this.z = Math.atan2(-e, i);
            }
        } else if (b === "YZX") {
            this.z = Math.asin(c(h));
            if (Math.abs(h) < 0.99999) {
                this.x = Math.atan2(-j, i);
                this.y = Math.atan2(-l, f);
            } else {
                this.x = 0;
                this.y = Math.atan2(g, d);
            }
        } else if (b === "XZY") {
            this.z = Math.asin(-c(e));
            if (Math.abs(e) < 0.99999) {
                this.x = Math.atan2(n, i);
                this.y = Math.atan2(g, f);
            } else {
                this.x = Math.atan2(-j, d);
                this.y = 0;
            }
        }
        return this;
    },
    setEulerFromQuaternion: function (a, b) {
        function c(a) {
            return Math.min(Math.max(a, -1), 1);
        }
        var d = a.x * a.x,
            f = a.y * a.y,
            e = a.z * a.z,
            g = a.w * a.w;
        if (b === void 0 || b === "XYZ") {
            this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - f + e);
            this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w)));
            this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - f - e);
        } else if (b === "YXZ") {
            this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z)));
            this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - f + e);
            this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + f - e);
        } else if (b === "ZXY") {
            this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z)));
            this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - f + e);
            this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + f - e);
        } else if (b === "ZYX") {
            this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - f + e);
            this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z)));
            this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - f - e);
        } else if (b === "YZX") {
            this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + f - e);
            this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - f - e);
            this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)));
        } else if (b === "XZY") {
            this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + f - e);
            this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - f - e);
            this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y)));
        }
        return this;
    },
    getScaleFromMatrix: function (a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
            c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
            a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        this.x = b;
        this.y = c;
        this.z = a;
        return this;
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z;
    },
    isZero: function () {
        return this.lengthSq() < 1e-4;
    },
    clone: function () {
        return new THREE.Vector3(this.x, this.y, this.z);
    }
};
THREE.Vector4 = function (a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = d !== void 0 ? d : 1;
};
THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function (a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this;
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w !== void 0 ? a.w : 1;
        return this;
    },
    add: function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this;
    },
    addSelf: function (a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
        this.z = this.z + a.z;
        this.w = this.w + a.w;
        return this;
    },
    sub: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this;
    },
    subSelf: function (a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
        this.z = this.z - a.z;
        this.w = this.w - a.w;
        return this;
    },
    multiplyScalar: function (a) {
        this.x = this.x * a;
        this.y = this.y * a;
        this.z = this.z * a;
        this.w = this.w * a;
        return this;
    },
    divideScalar: function (a) {
        if (a) {
            this.x = this.x / a;
            this.y = this.y / a;
            this.z = this.z / a;
            this.w = this.w / a;
        } else {
            this.z = this.y = this.x = 0;
            this.w = 1;
        }
        return this;
    },
    negate: function () {
        return this.multiplyScalar(-1);
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
    },
    lengthSq: function () {
        return this.dot(this);
    },
    length: function () {
        return Math.sqrt(this.lengthSq());
    },
    lengthManhattan: function () {
        return (
            Math.abs(this.x) +
            Math.abs(this.y) +
            Math.abs(this.z) +
            Math.abs(this.w)
        );
    },
    normalize: function () {
        return this.divideScalar(this.length());
    },
    setLength: function (a) {
        return this.normalize().multiplyScalar(a);
    },
    lerpSelf: function (a, b) {
        this.x = this.x + (a.x - this.x) * b;
        this.y = this.y + (a.y - this.y) * b;
        this.z = this.z + (a.z - this.z) * b;
        this.w = this.w + (a.w - this.w) * b;
        return this;
    },
    clone: function () {
        return new THREE.Vector4(this.x, this.y, this.z, this.w);
    },
    setAxisAngleFromQuaternion: function (a) {
        this.w = 2 * Math.acos(a.w);
        var b = Math.sqrt(1 - a.w * a.w);
        if (b < 1e-4) {
            this.x = 1;
            this.z = this.y = 0;
        } else {
            this.x = a.x / b;
            this.y = a.y / b;
            this.z = a.z / b;
        }
        return this;
    },
    setAxisAngleFromRotationMatrix: function (a) {
        var b,
            c,
            d,
            a = a.elements,
            f = a[0];
        d = a[4];
        var e = a[8],
            g = a[1],
            h = a[5],
            i = a[9];
        c = a[2];
        b = a[6];
        var j = a[10];
        if (
            Math.abs(d - g) < 0.01 &&
            Math.abs(e - c) < 0.01 &&
            Math.abs(i - b) < 0.01
        ) {
            if (
                Math.abs(d + g) < 0.1 &&
                Math.abs(e + c) < 0.1 &&
                Math.abs(i + b) < 0.1 &&
                Math.abs(f + h + j - 3) < 0.1
            ) {
                this.set(1, 0, 0, 0);
                return this;
            }
            a = Math.PI;
            f = (f + 1) / 2;
            h = (h + 1) / 2;
            j = (j + 1) / 2;
            d = (d + g) / 4;
            e = (e + c) / 4;
            i = (i + b) / 4;
            if (f > h && f > j)
                if (f < 0.01) {
                    b = 0;
                    d = c = 0.707106781;
                } else {
                    b = Math.sqrt(f);
                    c = d / b;
                    d = e / b;
                }
            else if (h > j)
                if (h < 0.01) {
                    b = 0.707106781;
                    c = 0;
                    d = 0.707106781;
                } else {
                    c = Math.sqrt(h);
                    b = d / c;
                    d = i / c;
                }
            else if (j < 0.01) {
                c = b = 0.707106781;
                d = 0;
            } else {
                d = Math.sqrt(j);
                b = e / d;
                c = i / d;
            }
            this.set(b, c, d, a);
            return this;
        }
        a = Math.sqrt(
            (b - i) * (b - i) + (e - c) * (e - c) + (g - d) * (g - d)
        );
        Math.abs(a) < 0.001 && (a = 1);
        this.x = (b - i) / a;
        this.y = (e - c) / a;
        this.z = (g - d) / a;
        this.w = Math.acos((f + h + j - 1) / 2);
        return this;
    }
};
THREE.Matrix3 = function () {
    this.elements = new Float32Array(9);
};
THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    getInverse: function (a) {
        var b = a.elements,
            a = b[10] * b[5] - b[6] * b[9],
            c = -b[10] * b[1] + b[2] * b[9],
            d = b[6] * b[1] - b[2] * b[5],
            f = -b[10] * b[4] + b[6] * b[8],
            e = b[10] * b[0] - b[2] * b[8],
            g = -b[6] * b[0] + b[2] * b[4],
            h = b[9] * b[4] - b[5] * b[8],
            i = -b[9] * b[0] + b[1] * b[8],
            j = b[5] * b[0] - b[1] * b[4],
            b = b[0] * a + b[1] * f + b[2] * h;
        b === 0 && console.warn("Matrix3.getInverse(): determinant == 0");
        var b = 1 / b,
            l = this.elements;
        l[0] = b * a;
        l[1] = b * c;
        l[2] = b * d;
        l[3] = b * f;
        l[4] = b * e;
        l[5] = b * g;
        l[6] = b * h;
        l[7] = b * i;
        l[8] = b * j;
        return this;
    },
    transpose: function () {
        var a,
            b = this.elements;
        a = b[1];
        b[1] = b[3];
        b[3] = a;
        a = b[2];
        b[2] = b[6];
        b[6] = a;
        a = b[5];
        b[5] = b[7];
        b[7] = a;
        return this;
    },
    transposeIntoArray: function (a) {
        var b = this.m;
        a[0] = b[0];
        a[1] = b[3];
        a[2] = b[6];
        a[3] = b[1];
        a[4] = b[4];
        a[5] = b[7];
        a[6] = b[2];
        a[7] = b[5];
        a[8] = b[8];
        return this;
    }
};
THREE.Matrix4 = function (a, b, c, d, f, e, g, h, i, j, l, n, m, q, p, o) {
    this.elements = new Float32Array(16);
    this.set(
        a !== void 0 ? a : 1,
        b || 0,
        c || 0,
        d || 0,
        f || 0,
        e !== void 0 ? e : 1,
        g || 0,
        h || 0,
        i || 0,
        j || 0,
        l !== void 0 ? l : 1,
        n || 0,
        m || 0,
        q || 0,
        p || 0,
        o !== void 0 ? o : 1
    );
};
THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function (a, b, c, d, f, e, g, h, i, j, l, n, m, q, p, o) {
        var r = this.elements;
        r[0] = a;
        r[4] = b;
        r[8] = c;
        r[12] = d;
        r[1] = f;
        r[5] = e;
        r[9] = g;
        r[13] = h;
        r[2] = i;
        r[6] = j;
        r[10] = l;
        r[14] = n;
        r[3] = m;
        r[7] = q;
        r[11] = p;
        r[15] = o;
        return this;
    },
    identity: function () {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    },
    copy: function (a) {
        a = a.elements;
        this.set(
            a[0],
            a[4],
            a[8],
            a[12],
            a[1],
            a[5],
            a[9],
            a[13],
            a[2],
            a[6],
            a[10],
            a[14],
            a[3],
            a[7],
            a[11],
            a[15]
        );
        return this;
    },
    lookAt: function (a, b, c) {
        var d = this.elements,
            f = THREE.Matrix4.__v1,
            e = THREE.Matrix4.__v2,
            g = THREE.Matrix4.__v3;
        g.sub(a, b).normalize();
        if (g.length() === 0) g.z = 1;
        f.cross(c, g).normalize();
        if (f.length() === 0) {
            g.x = g.x + 1e-4;
            f.cross(c, g).normalize();
        }
        e.cross(g, f);
        d[0] = f.x;
        d[4] = e.x;
        d[8] = g.x;
        d[1] = f.y;
        d[5] = e.y;
        d[9] = g.y;
        d[2] = f.z;
        d[6] = e.z;
        d[10] = g.z;
        return this;
    },
    multiply: function (a, b) {
        var c = a.elements,
            d = b.elements,
            f = this.elements,
            e = c[0],
            g = c[4],
            h = c[8],
            i = c[12],
            j = c[1],
            l = c[5],
            n = c[9],
            m = c[13],
            q = c[2],
            p = c[6],
            o = c[10],
            r = c[14],
            t = c[3],
            u = c[7],
            w = c[11],
            c = c[15],
            s = d[0],
            B = d[4],
            v = d[8],
            A = d[12],
            E = d[1],
            z = d[5],
            M = d[9],
            D = d[13],
            G = d[2],
            H = d[6],
            O = d[10],
            F = d[14],
            J = d[3],
            I = d[7],
            K = d[11],
            d = d[15];
        f[0] = e * s + g * E + h * G + i * J;
        f[4] = e * B + g * z + h * H + i * I;
        f[8] = e * v + g * M + h * O + i * K;
        f[12] = e * A + g * D + h * F + i * d;
        f[1] = j * s + l * E + n * G + m * J;
        f[5] = j * B + l * z + n * H + m * I;
        f[9] = j * v + l * M + n * O + m * K;
        f[13] = j * A + l * D + n * F + m * d;
        f[2] = q * s + p * E + o * G + r * J;
        f[6] = q * B + p * z + o * H + r * I;
        f[10] = q * v + p * M + o * O + r * K;
        f[14] = q * A + p * D + o * F + r * d;
        f[3] = t * s + u * E + w * G + c * J;
        f[7] = t * B + u * z + w * H + c * I;
        f[11] = t * v + u * M + w * O + c * K;
        f[15] = t * A + u * D + w * F + c * d;
        return this;
    },
    multiplySelf: function (a) {
        return this.multiply(this, a);
    },
    multiplyToArray: function (a, b, c) {
        var d = this.elements;
        this.multiply(a, b);
        c[0] = d[0];
        c[1] = d[1];
        c[2] = d[2];
        c[3] = d[3];
        c[4] = d[4];
        c[5] = d[5];
        c[6] = d[6];
        c[7] = d[7];
        c[8] = d[8];
        c[9] = d[9];
        c[10] = d[10];
        c[11] = d[11];
        c[12] = d[12];
        c[13] = d[13];
        c[14] = d[14];
        c[15] = d[15];
        return this;
    },
    multiplyScalar: function (a) {
        var b = this.elements;
        b[0] = b[0] * a;
        b[4] = b[4] * a;
        b[8] = b[8] * a;
        b[12] = b[12] * a;
        b[1] = b[1] * a;
        b[5] = b[5] * a;
        b[9] = b[9] * a;
        b[13] = b[13] * a;
        b[2] = b[2] * a;
        b[6] = b[6] * a;
        b[10] = b[10] * a;
        b[14] = b[14] * a;
        b[3] = b[3] * a;
        b[7] = b[7] * a;
        b[11] = b[11] * a;
        b[15] = b[15] * a;
        return this;
    },
    multiplyVector3: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            f = a.z,
            e = 1 / (b[3] * c + b[7] * d + b[11] * f + b[15]);
        a.x = (b[0] * c + b[4] * d + b[8] * f + b[12]) * e;
        a.y = (b[1] * c + b[5] * d + b[9] * f + b[13]) * e;
        a.z = (b[2] * c + b[6] * d + b[10] * f + b[14]) * e;
        return a;
    },
    multiplyVector4: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            f = a.z,
            e = a.w;
        a.x = b[0] * c + b[4] * d + b[8] * f + b[12] * e;
        a.y = b[1] * c + b[5] * d + b[9] * f + b[13] * e;
        a.z = b[2] * c + b[6] * d + b[10] * f + b[14] * e;
        a.w = b[3] * c + b[7] * d + b[11] * f + b[15] * e;
        return a;
    },
    multiplyVector3Array: function (a) {
        for (
            var b = THREE.Matrix4.__v1, c = 0, d = a.length;
            c < d;
            c = c + 3
        ) {
            b.x = a[c];
            b.y = a[c + 1];
            b.z = a[c + 2];
            this.multiplyVector3(b);
            a[c] = b.x;
            a[c + 1] = b.y;
            a[c + 2] = b.z;
        }
        return a;
    },
    rotateAxis: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            f = a.z;
        a.x = c * b[0] + d * b[4] + f * b[8];
        a.y = c * b[1] + d * b[5] + f * b[9];
        a.z = c * b[2] + d * b[6] + f * b[10];
        a.normalize();
        return a;
    },
    crossVector: function (a) {
        var b = this.elements,
            c = new THREE.Vector4();
        c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
        c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
        c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
        c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w : 1;
        return c;
    },
    determinant: function () {
        var a = this.elements,
            b = a[0],
            c = a[4],
            d = a[8],
            f = a[12],
            e = a[1],
            g = a[5],
            h = a[9],
            i = a[13],
            j = a[2],
            l = a[6],
            n = a[10],
            m = a[14],
            q = a[3],
            p = a[7],
            o = a[11],
            a = a[15];
        return (
            f * h * l * q -
            d * i * l * q -
            f * g * n * q +
            c * i * n * q +
            d * g * m * q -
            c * h * m * q -
            f * h * j * p +
            d * i * j * p +
            f * e * n * p -
            b * i * n * p -
            d * e * m * p +
            b * h * m * p +
            f * g * j * o -
            c * i * j * o -
            f * e * l * o +
            b * i * l * o +
            c * e * m * o -
            b * g * m * o -
            d * g * j * a +
            c * h * j * a +
            d * e * l * a -
            b * h * l * a -
            c * e * n * a +
            b * g * n * a
        );
    },
    transpose: function () {
        var a = this.elements,
            b;
        b = a[1];
        a[1] = a[4];
        a[4] = b;
        b = a[2];
        a[2] = a[8];
        a[8] = b;
        b = a[6];
        a[6] = a[9];
        a[9] = b;
        b = a[3];
        a[3] = a[12];
        a[12] = b;
        b = a[7];
        a[7] = a[13];
        a[13] = b;
        b = a[11];
        a[11] = a[14];
        a[14] = b;
        return this;
    },
    flattenToArray: function (a) {
        var b = this.elements;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        a[9] = b[9];
        a[10] = b[10];
        a[11] = b[11];
        a[12] = b[12];
        a[13] = b[13];
        a[14] = b[14];
        a[15] = b[15];
        return a;
    },
    flattenToArrayOffset: function (a, b) {
        var c = this.elements;
        a[b] = c[0];
        a[b + 1] = c[1];
        a[b + 2] = c[2];
        a[b + 3] = c[3];
        a[b + 4] = c[4];
        a[b + 5] = c[5];
        a[b + 6] = c[6];
        a[b + 7] = c[7];
        a[b + 8] = c[8];
        a[b + 9] = c[9];
        a[b + 10] = c[10];
        a[b + 11] = c[11];
        a[b + 12] = c[12];
        a[b + 13] = c[13];
        a[b + 14] = c[14];
        a[b + 15] = c[15];
        return a;
    },
    getPosition: function () {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[12], a[13], a[14]);
    },
    setPosition: function (a) {
        var b = this.elements;
        b[12] = a.x;
        b[13] = a.y;
        b[14] = a.z;
        return this;
    },
    getColumnX: function () {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[0], a[1], a[2]);
    },
    getColumnY: function () {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[4], a[5], a[6]);
    },
    getColumnZ: function () {
        var a = this.elements;
        return THREE.Matrix4.__v1.set(a[8], a[9], a[10]);
    },
    getInverse: function (a) {
        var b = this.elements,
            c = a.elements,
            d = c[0],
            f = c[4],
            e = c[8],
            g = c[12],
            h = c[1],
            i = c[5],
            j = c[9],
            l = c[13],
            n = c[2],
            m = c[6],
            q = c[10],
            p = c[14],
            o = c[3],
            r = c[7],
            t = c[11],
            c = c[15];
        b[0] =
            j * p * r -
            l * q * r +
            l * m * t -
            i * p * t -
            j * m * c +
            i * q * c;
        b[4] =
            g * q * r -
            e * p * r -
            g * m * t +
            f * p * t +
            e * m * c -
            f * q * c;
        b[8] =
            e * l * r -
            g * j * r +
            g * i * t -
            f * l * t -
            e * i * c +
            f * j * c;
        b[12] =
            g * j * m -
            e * l * m -
            g * i * q +
            f * l * q +
            e * i * p -
            f * j * p;
        b[1] =
            l * q * o -
            j * p * o -
            l * n * t +
            h * p * t +
            j * n * c -
            h * q * c;
        b[5] =
            e * p * o -
            g * q * o +
            g * n * t -
            d * p * t -
            e * n * c +
            d * q * c;
        b[9] =
            g * j * o -
            e * l * o -
            g * h * t +
            d * l * t +
            e * h * c -
            d * j * c;
        b[13] =
            e * l * n -
            g * j * n +
            g * h * q -
            d * l * q -
            e * h * p +
            d * j * p;
        b[2] =
            i * p * o -
            l * m * o +
            l * n * r -
            h * p * r -
            i * n * c +
            h * m * c;
        b[6] =
            g * m * o -
            f * p * o -
            g * n * r +
            d * p * r +
            f * n * c -
            d * m * c;
        b[10] =
            f * l * o -
            g * i * o +
            g * h * r -
            d * l * r -
            f * h * c +
            d * i * c;
        b[14] =
            g * i * n -
            f * l * n -
            g * h * m +
            d * l * m +
            f * h * p -
            d * i * p;
        b[3] =
            j * m * o -
            i * q * o -
            j * n * r +
            h * q * r +
            i * n * t -
            h * m * t;
        b[7] =
            f * q * o -
            e * m * o +
            e * n * r -
            d * q * r -
            f * n * t +
            d * m * t;
        b[11] =
            e * i * o -
            f * j * o -
            e * h * r +
            d * j * r +
            f * h * t -
            d * i * t;
        b[15] =
            f * j * n -
            e * i * n +
            e * h * m -
            d * j * m -
            f * h * q +
            d * i * q;
        this.multiplyScalar(1 / a.determinant());
        return this;
    },
    setRotationFromEuler: function (a, b) {
        var c = this.elements,
            d = a.x,
            f = a.y,
            e = a.z,
            g = Math.cos(d),
            d = Math.sin(d),
            h = Math.cos(f),
            f = Math.sin(f),
            i = Math.cos(e),
            e = Math.sin(e);
        if (b === void 0 || b === "XYZ") {
            var j = g * i,
                l = g * e,
                n = d * i,
                m = d * e;
            c[0] = h * i;
            c[4] = -h * e;
            c[8] = f;
            c[1] = l + n * f;
            c[5] = j - m * f;
            c[9] = -d * h;
            c[2] = m - j * f;
            c[6] = n + l * f;
            c[10] = g * h;
        } else if (b === "YXZ") {
            j = h * i;
            l = h * e;
            n = f * i;
            m = f * e;
            c[0] = j + m * d;
            c[4] = n * d - l;
            c[8] = g * f;
            c[1] = g * e;
            c[5] = g * i;
            c[9] = -d;
            c[2] = l * d - n;
            c[6] = m + j * d;
            c[10] = g * h;
        } else if (b === "ZXY") {
            j = h * i;
            l = h * e;
            n = f * i;
            m = f * e;
            c[0] = j - m * d;
            c[4] = -g * e;
            c[8] = n + l * d;
            c[1] = l + n * d;
            c[5] = g * i;
            c[9] = m - j * d;
            c[2] = -g * f;
            c[6] = d;
            c[10] = g * h;
        } else if (b === "ZYX") {
            j = g * i;
            l = g * e;
            n = d * i;
            m = d * e;
            c[0] = h * i;
            c[4] = n * f - l;
            c[8] = j * f + m;
            c[1] = h * e;
            c[5] = m * f + j;
            c[9] = l * f - n;
            c[2] = -f;
            c[6] = d * h;
            c[10] = g * h;
        } else if (b === "YZX") {
            j = g * h;
            l = g * f;
            n = d * h;
            m = d * f;
            c[0] = h * i;
            c[4] = m - j * e;
            c[8] = n * e + l;
            c[1] = e;
            c[5] = g * i;
            c[9] = -d * i;
            c[2] = -f * i;
            c[6] = l * e + n;
            c[10] = j - m * e;
        } else if (b === "XZY") {
            j = g * h;
            l = g * f;
            n = d * h;
            m = d * f;
            c[0] = h * i;
            c[4] = -e;
            c[8] = f * i;
            c[1] = j * e + m;
            c[5] = g * i;
            c[9] = l * e - n;
            c[2] = n * e - l;
            c[6] = d * i;
            c[10] = m * e + j;
        }
        return this;
    },
    setRotationFromQuaternion: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            f = a.z,
            e = a.w,
            g = c + c,
            h = d + d,
            i = f + f,
            a = c * g,
            j = c * h,
            c = c * i,
            l = d * h,
            d = d * i,
            f = f * i,
            g = e * g,
            h = e * h,
            e = e * i;
        b[0] = 1 - (l + f);
        b[4] = j - e;
        b[8] = c + h;
        b[1] = j + e;
        b[5] = 1 - (a + f);
        b[9] = d - g;
        b[2] = c - h;
        b[6] = d + g;
        b[10] = 1 - (a + l);
        return this;
    },
    compose: function (a, b, c) {
        var d = this.elements,
            f = THREE.Matrix4.__m1,
            e = THREE.Matrix4.__m2;
        f.identity();
        f.setRotationFromQuaternion(b);
        e.makeScale(c.x, c.y, c.z);
        this.multiply(f, e);
        d[12] = a.x;
        d[13] = a.y;
        d[14] = a.z;
        return this;
    },
    decompose: function (a, b, c) {
        var d = this.elements,
            f = THREE.Matrix4.__v1,
            e = THREE.Matrix4.__v2,
            g = THREE.Matrix4.__v3;
        f.set(d[0], d[1], d[2]);
        e.set(d[4], d[5], d[6]);
        g.set(d[8], d[9], d[10]);
        a = a instanceof THREE.Vector3 ? a : new THREE.Vector3();
        b = b instanceof THREE.Quaternion ? b : new THREE.Quaternion();
        c = c instanceof THREE.Vector3 ? c : new THREE.Vector3();
        c.x = f.length();
        c.y = e.length();
        c.z = g.length();
        a.x = d[12];
        a.y = d[13];
        a.z = d[14];
        d = THREE.Matrix4.__m1;
        d.copy(this);
        d.elements[0] = d.elements[0] / c.x;
        d.elements[1] = d.elements[1] / c.x;
        d.elements[2] = d.elements[2] / c.x;
        d.elements[4] = d.elements[4] / c.y;
        d.elements[5] = d.elements[5] / c.y;
        d.elements[6] = d.elements[6] / c.y;
        d.elements[8] = d.elements[8] / c.z;
        d.elements[9] = d.elements[9] / c.z;
        d.elements[10] = d.elements[10] / c.z;
        b.setFromRotationMatrix(d);
        return [a, b, c];
    },
    extractPosition: function (a) {
        var b = this.elements,
            a = a.elements;
        b[12] = a[12];
        b[13] = a[13];
        b[14] = a[14];
        return this;
    },
    extractRotation: function (a) {
        var b = this.elements,
            a = a.elements,
            c = THREE.Matrix4.__v1,
            d = 1 / c.set(a[0], a[1], a[2]).length(),
            f = 1 / c.set(a[4], a[5], a[6]).length(),
            c = 1 / c.set(a[8], a[9], a[10]).length();
        b[0] = a[0] * d;
        b[1] = a[1] * d;
        b[2] = a[2] * d;
        b[4] = a[4] * f;
        b[5] = a[5] * f;
        b[6] = a[6] * f;
        b[8] = a[8] * c;
        b[9] = a[9] * c;
        b[10] = a[10] * c;
        return this;
    },
    translate: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            a = a.z;
        b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
        b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
        b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
        b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
        return this;
    },
    rotateX: function (a) {
        var b = this.elements,
            c = b[4],
            d = b[5],
            f = b[6],
            e = b[7],
            g = b[8],
            h = b[9],
            i = b[10],
            j = b[11],
            l = Math.cos(a),
            a = Math.sin(a);
        b[4] = l * c + a * g;
        b[5] = l * d + a * h;
        b[6] = l * f + a * i;
        b[7] = l * e + a * j;
        b[8] = l * g - a * c;
        b[9] = l * h - a * d;
        b[10] = l * i - a * f;
        b[11] = l * j - a * e;
        return this;
    },
    rotateY: function (a) {
        var b = this.elements,
            c = b[0],
            d = b[1],
            f = b[2],
            e = b[3],
            g = b[8],
            h = b[9],
            i = b[10],
            j = b[11],
            l = Math.cos(a),
            a = Math.sin(a);
        b[0] = l * c - a * g;
        b[1] = l * d - a * h;
        b[2] = l * f - a * i;
        b[3] = l * e - a * j;
        b[8] = l * g + a * c;
        b[9] = l * h + a * d;
        b[10] = l * i + a * f;
        b[11] = l * j + a * e;
        return this;
    },
    rotateZ: function (a) {
        var b = this.elements,
            c = b[0],
            d = b[1],
            f = b[2],
            e = b[3],
            g = b[4],
            h = b[5],
            i = b[6],
            j = b[7],
            l = Math.cos(a),
            a = Math.sin(a);
        b[0] = l * c + a * g;
        b[1] = l * d + a * h;
        b[2] = l * f + a * i;
        b[3] = l * e + a * j;
        b[4] = l * g - a * c;
        b[5] = l * h - a * d;
        b[6] = l * i - a * f;
        b[7] = l * j - a * e;
        return this;
    },
    rotateByAxis: function (a, b) {
        var c = this.elements;
        if (a.x === 1 && a.y === 0 && a.z === 0) return this.rotateX(b);
        if (a.x === 0 && a.y === 1 && a.z === 0) return this.rotateY(b);
        if (a.x === 0 && a.y === 0 && a.z === 1) return this.rotateZ(b);
        var d = a.x,
            f = a.y,
            e = a.z,
            g = Math.sqrt(d * d + f * f + e * e),
            d = d / g,
            f = f / g,
            e = e / g,
            g = d * d,
            h = f * f,
            i = e * e,
            j = Math.cos(b),
            l = Math.sin(b),
            n = 1 - j,
            m = d * f * n,
            q = d * e * n,
            n = f * e * n,
            d = d * l,
            p = f * l,
            l = e * l,
            e = g + (1 - g) * j,
            g = m + l,
            f = q - p,
            m = m - l,
            h = h + (1 - h) * j,
            l = n + d,
            q = q + p,
            n = n - d,
            i = i + (1 - i) * j,
            j = c[0],
            d = c[1],
            p = c[2],
            o = c[3],
            r = c[4],
            t = c[5],
            u = c[6],
            w = c[7],
            s = c[8],
            B = c[9],
            v = c[10],
            A = c[11];
        c[0] = e * j + g * r + f * s;
        c[1] = e * d + g * t + f * B;
        c[2] = e * p + g * u + f * v;
        c[3] = e * o + g * w + f * A;
        c[4] = m * j + h * r + l * s;
        c[5] = m * d + h * t + l * B;
        c[6] = m * p + h * u + l * v;
        c[7] = m * o + h * w + l * A;
        c[8] = q * j + n * r + i * s;
        c[9] = q * d + n * t + i * B;
        c[10] = q * p + n * u + i * v;
        c[11] = q * o + n * w + i * A;
        return this;
    },
    scale: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            a = a.z;
        b[0] = b[0] * c;
        b[4] = b[4] * d;
        b[8] = b[8] * a;
        b[1] = b[1] * c;
        b[5] = b[5] * d;
        b[9] = b[9] * a;
        b[2] = b[2] * c;
        b[6] = b[6] * d;
        b[10] = b[10] * a;
        b[3] = b[3] * c;
        b[7] = b[7] * d;
        b[11] = b[11] * a;
        return this;
    },
    getMaxScaleOnAxis: function () {
        var a = this.elements;
        return Math.sqrt(
            Math.max(
                a[0] * a[0] + a[1] * a[1] + a[2] * a[2],
                Math.max(
                    a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
                    a[8] * a[8] + a[9] * a[9] + a[10] * a[10]
                )
            )
        );
    },
    makeTranslation: function (a, b, c) {
        this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
        return this;
    },
    makeRotationX: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
        return this;
    },
    makeRotationY: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
        return this;
    },
    makeRotationZ: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    },
    makeRotationAxis: function (a, b) {
        var c = Math.cos(b),
            d = Math.sin(b),
            f = 1 - c,
            e = a.x,
            g = a.y,
            h = a.z,
            i = f * e,
            j = f * g;
        this.set(
            i * e + c,
            i * g - d * h,
            i * h + d * g,
            0,
            i * g + d * h,
            j * g + c,
            j * h - d * e,
            0,
            i * h - d * g,
            j * h + d * e,
            f * h * h + c,
            0,
            0,
            0,
            0,
            1
        );
        return this;
    },
    makeScale: function (a, b, c) {
        this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
        return this;
    },
    makeFrustum: function (a, b, c, d, f, e) {
        var g = this.elements;
        g[0] = (2 * f) / (b - a);
        g[4] = 0;
        g[8] = (b + a) / (b - a);
        g[12] = 0;
        g[1] = 0;
        g[5] = (2 * f) / (d - c);
        g[9] = (d + c) / (d - c);
        g[13] = 0;
        g[2] = 0;
        g[6] = 0;
        g[10] = -(e + f) / (e - f);
        g[14] = (-2 * e * f) / (e - f);
        g[3] = 0;
        g[7] = 0;
        g[11] = -1;
        g[15] = 0;
        return this;
    },
    makePerspective: function (a, b, c, d) {
        var a = c * Math.tan((a * Math.PI) / 360),
            f = -a;
        return this.makeFrustum(f * b, a * b, f, a, c, d);
    },
    makeOrthographic: function (a, b, c, d, f, e) {
        var g = this.elements,
            h = b - a,
            i = c - d,
            j = e - f;
        g[0] = 2 / h;
        g[4] = 0;
        g[8] = 0;
        g[12] = -((b + a) / h);
        g[1] = 0;
        g[5] = 2 / i;
        g[9] = 0;
        g[13] = -((c + d) / i);
        g[2] = 0;
        g[6] = 0;
        g[10] = -2 / j;
        g[14] = -((e + f) / j);
        g[3] = 0;
        g[7] = 0;
        g[11] = 0;
        g[15] = 1;
        return this;
    },
    clone: function () {
        var a = this.elements;
        return new THREE.Matrix4(
            a[0],
            a[4],
            a[8],
            a[12],
            a[1],
            a[5],
            a[9],
            a[13],
            a[2],
            a[6],
            a[10],
            a[14],
            a[3],
            a[7],
            a[11],
            a[15]
        );
    }
};
THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();
THREE.Matrix4.__m1 = new THREE.Matrix4();
THREE.Matrix4.__m2 = new THREE.Matrix4();
THREE.EventTarget = function () {
    var a = {};
    this.addEventListener = function (b, c) {
        a[b] === void 0 && (a[b] = []);
        a[b].indexOf(c) === -1 && a[b].push(c);
    };
    this.dispatchEvent = function (b) {
        for (var c in a[b.type]) a[b.type][c](b);
    };
    this.removeEventListener = function (b, c) {
        var d = a[b].indexOf(c);
        d !== -1 && a[b].splice(d, 1);
    };
};
THREE.Frustum = function () {
    this.planes = [
        new THREE.Vector4(),
        new THREE.Vector4(),
        new THREE.Vector4(),
        new THREE.Vector4(),
        new THREE.Vector4(),
        new THREE.Vector4()
    ];
};
THREE.Frustum.prototype.setFromMatrix = function (a) {
    var b = this.planes,
        c = a.elements,
        a = c[0],
        d = c[1],
        f = c[2],
        e = c[3],
        g = c[4],
        h = c[5],
        i = c[6],
        j = c[7],
        l = c[8],
        n = c[9],
        m = c[10],
        q = c[11],
        p = c[12],
        o = c[13],
        r = c[14],
        c = c[15];
    b[0].set(e - a, j - g, q - l, c - p);
    b[1].set(e + a, j + g, q + l, c + p);
    b[2].set(e + d, j + h, q + n, c + o);
    b[3].set(e - d, j - h, q - n, c - o);
    b[4].set(e - f, j - i, q - m, c - r);
    b[5].set(e + f, j + i, q + m, c + r);
    for (d = 0; d < 6; d++) {
        a = b[d];
        a.divideScalar(Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z));
    }
};
THREE.Frustum.prototype.contains = function (a) {
    for (
        var b = 0,
            c = this.planes,
            b = a.matrixWorld,
            d = b.elements,
            a = -a.geometry.boundingSphere.radius * b.getMaxScaleOnAxis(),
            f = 0;
        f < 6;
        f++
    ) {
        b = c[f].x * d[12] + c[f].y * d[13] + c[f].z * d[14] + c[f].w;
        if (b <= a) return false;
    }
    return true;
};
THREE.Frustum.__v1 = new THREE.Vector3();
(function (a) {
    a.Ray = function (b, c, d, f) {
        this.origin = b || new a.Vector3();
        this.direction = c || new a.Vector3();
        this.near = d || 0;
        this.far = f || Infinity;
    };
    var b = new a.Vector3(),
        c = new a.Vector3(),
        d = new a.Vector3(),
        f = new a.Vector3(),
        e = new a.Vector3(),
        g = new a.Vector3(),
        h = new a.Matrix4(),
        i = function (a, b) {
            return a.distance - b.distance;
        },
        j = new a.Vector3(),
        l = new a.Vector3(),
        n = new a.Vector3(),
        m = function (a, b, c) {
            j.sub(c, a);
            var d = j.dot(b),
                a = l.add(a, n.copy(b).multiplyScalar(d));
            return c.distanceTo(a);
        },
        q = function (a, b, c, d) {
            j.sub(d, b);
            l.sub(c, b);
            n.sub(a, b);
            var a = j.dot(j),
                b = j.dot(l),
                c = j.dot(n),
                f = l.dot(l),
                d = l.dot(n),
                e = 1 / (a * f - b * b),
                f = (f * c - b * d) * e,
                a = (a * d - b * c) * e;
            return f >= 0 && a >= 0 && f + a < 1;
        },
        p = function (i, j, l) {
            var n, o;
            if (i instanceof a.Particle) {
                n = m(j.origin, j.direction, i.matrixWorld.getPosition());
                if (n > i.scale.x) return l;
                o = { distance: n, point: i.position, face: null, object: i };
                l.push(o);
            } else if (i instanceof a.Mesh) {
                var p =
                    i.geometry.boundingSphere.radius *
                    i.matrixWorld.getMaxScaleOnAxis();
                n = m(j.origin, j.direction, i.matrixWorld.getPosition());
                if (n > p) return l;
                var v,
                    A,
                    E = i.geometry,
                    z = E.vertices,
                    M,
                    D,
                    G;
                M = i.geometry.materials;
                D = i.material instanceof a.MeshFaceMaterial;
                var H,
                    O = j.precision;
                i.matrixRotationWorld.extractRotation(i.matrixWorld);
                b.copy(j.origin);
                h.getInverse(i.matrixWorld);
                c.copy(b);
                h.multiplyVector3(c);
                d.copy(j.direction);
                h.rotateAxis(d).normalize();
                p = 0;
                for (v = E.faces.length; p < v; p++) {
                    o = E.faces[p];
                    n = D === true ? M[o.materialIndex] : i.material;
                    if (n !== void 0) {
                        G = n.side;
                        f.sub(o.centroid, c);
                        e = o.normal;
                        n = d.dot(e);
                        if (!(Math.abs(n) < O)) {
                            A = e.dot(f) / n;
                            if (
                                !(A < 0) &&
                                (G === a.DoubleSide ||
                                    (G === a.FrontSide ? n < 0 : n > 0))
                            ) {
                                g.add(c, d.multiplyScalar(A));
                                if (o instanceof a.Face3) {
                                    n = z[o.a];
                                    A = z[o.b];
                                    G = z[o.c];
                                    if (q(g, n, A, G)) {
                                        A = i.matrixWorld.multiplyVector3(
                                            g.clone()
                                        );
                                        n = b.distanceTo(A);
                                        if (!(n < j.near || n > j.far)) {
                                            o = {
                                                distance: n,
                                                point: A,
                                                face: o,
                                                faceIndex: p,
                                                object: i
                                            };
                                            l.push(o);
                                        }
                                    }
                                } else if (o instanceof a.Face4) {
                                    n = z[o.a];
                                    A = z[o.b];
                                    G = z[o.c];
                                    H = z[o.d];
                                    if (q(g, n, A, H) || q(g, A, G, H)) {
                                        A = i.matrixWorld.multiplyVector3(
                                            g.clone()
                                        );
                                        n = b.distanceTo(A);
                                        if (!(n < j.near || n > j.far)) {
                                            o = {
                                                distance: n,
                                                point: A,
                                                face: o,
                                                faceIndex: p,
                                                object: i
                                            };
                                            l.push(o);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        o = function (a, b, c) {
            for (var a = a.getDescendants(), d = 0, f = a.length; d < f; d++)
                p(a[d], b, c);
        };
    a.Ray.prototype.precision = 1e-4;
    a.Ray.prototype.set = function (a, b) {
        this.origin = a;
        this.direction = b;
    };
    a.Ray.prototype.intersectObject = function (a, b) {
        var c = [];
        b === true && o(a, this, c);
        p(a, this, c);
        c.sort(i);
        return c;
    };
    a.Ray.prototype.intersectObjects = function (a, b) {
        for (var c = [], d = 0, f = a.length; d < f; d++) {
            p(a[d], this, c);
            b === true && o(a[d], this, c);
        }
        c.sort(i);
        return c;
    };
})(THREE);
THREE.Rectangle = function () {
    function a() {
        e = d - b;
        g = f - c;
    }
    var b = 0,
        c = 0,
        d = 0,
        f = 0,
        e = 0,
        g = 0,
        h = true;
    this.getX = function () {
        return b;
    };
    this.getY = function () {
        return c;
    };
    this.getWidth = function () {
        return e;
    };
    this.getHeight = function () {
        return g;
    };
    this.getLeft = function () {
        return b;
    };
    this.getTop = function () {
        return c;
    };
    this.getRight = function () {
        return d;
    };
    this.getBottom = function () {
        return f;
    };
    this.set = function (e, g, l, n) {
        h = false;
        b = e;
        c = g;
        d = l;
        f = n;
        a();
    };
    this.addPoint = function (e, g) {
        if (h === true) {
            h = false;
            b = e;
            c = g;
            d = e;
            f = g;
        } else {
            b = b < e ? b : e;
            c = c < g ? c : g;
            d = d > e ? d : e;
            f = f > g ? f : g;
        }
        a();
    };
    this.add3Points = function (e, g, l, n, m, q) {
        if (h === true) {
            h = false;
            b = e < l ? (e < m ? e : m) : l < m ? l : m;
            c = g < n ? (g < q ? g : q) : n < q ? n : q;
            d = e > l ? (e > m ? e : m) : l > m ? l : m;
            f = g > n ? (g > q ? g : q) : n > q ? n : q;
        } else {
            b =
                e < l
                    ? e < m
                        ? e < b
                            ? e
                            : b
                        : m < b
                            ? m
                            : b
                    : l < m
                        ? l < b
                            ? l
                            : b
                        : m < b
                            ? m
                            : b;
            c =
                g < n
                    ? g < q
                        ? g < c
                            ? g
                            : c
                        : q < c
                            ? q
                            : c
                    : n < q
                        ? n < c
                            ? n
                            : c
                        : q < c
                            ? q
                            : c;
            d =
                e > l
                    ? e > m
                        ? e > d
                            ? e
                            : d
                        : m > d
                            ? m
                            : d
                    : l > m
                        ? l > d
                            ? l
                            : d
                        : m > d
                            ? m
                            : d;
            f =
                g > n
                    ? g > q
                        ? g > f
                            ? g
                            : f
                        : q > f
                            ? q
                            : f
                    : n > q
                        ? n > f
                            ? n
                            : f
                        : q > f
                            ? q
                            : f;
        }
        a();
    };
    this.addRectangle = function (e) {
        if (h === true) {
            h = false;
            b = e.getLeft();
            c = e.getTop();
            d = e.getRight();
            f = e.getBottom();
        } else {
            b = b < e.getLeft() ? b : e.getLeft();
            c = c < e.getTop() ? c : e.getTop();
            d = d > e.getRight() ? d : e.getRight();
            f = f > e.getBottom() ? f : e.getBottom();
        }
        a();
    };
    this.inflate = function (e) {
        b = b - e;
        c = c - e;
        d = d + e;
        f = f + e;
        a();
    };
    this.minSelf = function (e) {
        b = b > e.getLeft() ? b : e.getLeft();
        c = c > e.getTop() ? c : e.getTop();
        d = d < e.getRight() ? d : e.getRight();
        f = f < e.getBottom() ? f : e.getBottom();
        a();
    };
    this.intersects = function (a) {
        return d < a.getLeft() ||
            b > a.getRight() ||
            f < a.getTop() ||
            c > a.getBottom()
            ? false
            : true;
    };
    this.empty = function () {
        h = true;
        f = d = c = b = 0;
        a();
    };
    this.isEmpty = function () {
        return h;
    };
};
THREE.Math = {
    clamp: function (a, b, c) {
        return a < b ? b : a > c ? c : a;
    },
    clampBottom: function (a, b) {
        return a < b ? b : a;
    },
    mapLinear: function (a, b, c, d, f) {
        return d + ((a - b) * (f - d)) / (c - b);
    },
    random16: function () {
        return (65280 * Math.random() + 255 * Math.random()) / 65535;
    },
    randInt: function (a, b) {
        return a + Math.floor(Math.random() * (b - a + 1));
    },
    randFloat: function (a, b) {
        return a + Math.random() * (b - a);
    },
    randFloatSpread: function (a) {
        return a * (0.5 - Math.random());
    },
    sign: function (a) {
        return a < 0 ? -1 : a > 0 ? 1 : 0;
    }
};
THREE.Object3D = function () {
    this.id = THREE.Object3DCount++;
    this.name = "";
    this.properties = {};
    this.parent = void 0;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3();
    this.rotation = new THREE.Vector3();
    this.eulerOrder = "XYZ";
    this.scale = new THREE.Vector3(1, 1, 1);
    this.renderDepth = null;
    this.rotationAutoUpdate = true;
    this.matrix = new THREE.Matrix4();
    this.matrixWorld = new THREE.Matrix4();
    this.matrixRotationWorld = new THREE.Matrix4();
    this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = true;
    this.quaternion = new THREE.Quaternion();
    this.useQuaternion = false;
    this.boundRadius = 0;
    this.boundRadiusScale = 1;
    this.visible = true;
    this.receiveShadow = this.castShadow = false;
    this.frustumCulled = true;
    this._vector = new THREE.Vector3();
};
THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function (a) {
        this.matrix.multiply(a, this.matrix);
        this.scale.getScaleFromMatrix(this.matrix);
        a = new THREE.Matrix4().extractRotation(this.matrix);
        this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
        this.position.getPositionFromMatrix(this.matrix);
    },
    translate: function (a, b) {
        this.matrix.rotateAxis(b);
        this.position.addSelf(b.multiplyScalar(a));
    },
    translateX: function (a) {
        this.translate(a, this._vector.set(1, 0, 0));
    },
    translateY: function (a) {
        this.translate(a, this._vector.set(0, 1, 0));
    },
    translateZ: function (a) {
        this.translate(a, this._vector.set(0, 0, 1));
    },
    localToWorld: function (a) {
        return this.matrixWorld.multiplyVector3(a);
    },
    worldToLocal: function (a) {
        return THREE.Object3D.__m1
            .getInverse(this.matrixWorld)
            .multiplyVector3(a);
    },
    lookAt: function (a) {
        this.matrix.lookAt(a, this.position, this.up);
        this.rotationAutoUpdate &&
            this.rotation.setEulerFromRotationMatrix(
                this.matrix,
                this.eulerOrder
            );
    },
    add: function (a) {
        if (a === this)
            console.warn(
                "THREE.Object3D.add: An object can't be added as a child of itself."
            );
        else if (a instanceof THREE.Object3D) {
            a.parent !== void 0 && a.parent.remove(a);
            a.parent = this;
            this.children.push(a);
            for (var b = this; b.parent !== void 0; ) b = b.parent;
            b !== void 0 && b instanceof THREE.Scene && b.__addObject(a);
        }
    },
    remove: function (a) {
        var b = this.children.indexOf(a);
        if (b !== -1) {
            a.parent = void 0;
            this.children.splice(b, 1);
            for (b = this; b.parent !== void 0; ) b = b.parent;
            b !== void 0 && b instanceof THREE.Scene && b.__removeObject(a);
        }
    },
    getChildByName: function (a, b) {
        var c, d, f;
        c = 0;
        for (d = this.children.length; c < d; c++) {
            f = this.children[c];
            if (f.name === a) return f;
            if (b) {
                f = f.getChildByName(a, b);
                if (f !== void 0) return f;
            }
        }
    },
    getDescendants: function (a) {
        a === void 0 && (a = []);
        Array.prototype.push.apply(a, this.children);
        for (var b = 0, c = this.children.length; b < c; b++)
            this.children[b].getDescendants(a);
        return a;
    },
    updateMatrix: function () {
        this.matrix.setPosition(this.position);
        this.useQuaternion === false
            ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder)
            : this.matrix.setRotationFromQuaternion(this.quaternion);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
            this.matrix.scale(this.scale);
            this.boundRadiusScale = Math.max(
                this.scale.x,
                Math.max(this.scale.y, this.scale.z)
            );
        }
        this.matrixWorldNeedsUpdate = true;
    },
    updateMatrixWorld: function (a) {
        this.matrixAutoUpdate === true && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate === true || a === true) {
            this.parent === void 0
                ? this.matrixWorld.copy(this.matrix)
                : this.matrixWorld.multiply(
                        this.parent.matrixWorld,
                        this.matrix
                    );
            this.matrixWorldNeedsUpdate = false;
            a = true;
        }
        for (var b = 0, c = this.children.length; b < c; b++)
            this.children[b].updateMatrixWorld(a);
    },
    clone: function () {}
};
THREE.Object3D.__m1 = new THREE.Matrix4();
THREE.Object3DCount = 0;
THREE.Projector = function () {
    function a() {
        if (e === h) {
            var a = new THREE.RenderableObject();
            g.push(a);
            h++;
            e++;
            return a;
        }
        return g[e++];
    }
    function b() {
        if (j === n) {
            var a = new THREE.RenderableVertex();
            l.push(a);
            n++;
            j++;
            return a;
        }
        return l[j++];
    }
    function c(a, b) {
        return b.z - a.z;
    }
    function d(a, b) {
        var c = 0,
            d = 1,
            f = a.z + a.w,
            e = b.z + b.w,
            g = -a.z + a.w,
            h = -b.z + b.w;
        if (f >= 0 && e >= 0 && g >= 0 && h >= 0) return true;
        if ((f < 0 && e < 0) || (g < 0 && h < 0)) return false;
        f < 0
            ? (c = Math.max(c, f / (f - e)))
            : e < 0 && (d = Math.min(d, f / (f - e)));
        g < 0
            ? (c = Math.max(c, g / (g - h)))
            : h < 0 && (d = Math.min(d, g / (g - h)));
        if (d < c) return false;
        a.lerpSelf(b, c);
        b.lerpSelf(a, 1 - d);
        return true;
    }
    var f,
        e,
        g = [],
        h = 0,
        i,
        j,
        l = [],
        n = 0,
        m,
        q,
        p = [],
        o = 0,
        r,
        t = [],
        u = 0,
        w,
        s,
        B = [],
        v = 0,
        A,
        E,
        z = [],
        M = 0,
        D = { objects: [], sprites: [], lights: [], elements: [] },
        G = new THREE.Vector3(),
        H = new THREE.Vector4(),
        O = new THREE.Matrix4(),
        F = new THREE.Matrix4(),
        J = new THREE.Frustum(),
        I = new THREE.Vector4(),
        K = new THREE.Vector4();
    this.projectVector = function (a, b) {
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        O.multiply(b.projectionMatrix, b.matrixWorldInverse);
        O.multiplyVector3(a);
        return a;
    };
    this.unprojectVector = function (a, b) {
        b.projectionMatrixInverse.getInverse(b.projectionMatrix);
        O.multiply(b.matrixWorld, b.projectionMatrixInverse);
        O.multiplyVector3(a);
        return a;
    };
    this.pickingRay = function (a, b) {
        var c;
        a.z = -1;
        c = new THREE.Vector3(a.x, a.y, 1);
        this.unprojectVector(a, b);
        this.unprojectVector(c, b);
        c.subSelf(a).normalize();
        return new THREE.Ray(a, c);
    };
    this.projectScene = function (g, h, n, L) {
        var ba = h.near,
            Q = h.far,
            fa = false,
            ta,
            da,
            ga,
            N,
            U,
            ia,
            Ia,
            pa,
            ua,
            Ca,
            Ja,
            Xa,
            ja,
            pb,
            Oa,
            Ya;
        E = s = r = q = 0;
        D.elements.length = 0;
        g.updateMatrixWorld();
        h.parent === void 0 && h.updateMatrixWorld();
        h.matrixWorldInverse.getInverse(h.matrixWorld);
        O.multiply(h.projectionMatrix, h.matrixWorldInverse);
        J.setFromMatrix(O);
        e = 0;
        D.objects.length = 0;
        D.sprites.length = 0;
        D.lights.length = 0;
        var wb = function (b) {
            for (var c = 0, d = b.children.length; c < d; c++) {
                var e = b.children[c];
                if (e.visible !== false) {
                    if (e instanceof THREE.Light) D.lights.push(e);
                    else if (
                        e instanceof THREE.Mesh ||
                        e instanceof THREE.Line
                    ) {
                        if (
                            e.frustumCulled === false ||
                            J.contains(e) === true
                        ) {
                            f = a();
                            f.object = e;
                            if (e.renderDepth !== null) f.z = e.renderDepth;
                            else {
                                G.copy(e.matrixWorld.getPosition());
                                O.multiplyVector3(G);
                                f.z = G.z;
                            }
                            D.objects.push(f);
                        }
                    } else if (
                        e instanceof THREE.Sprite ||
                        e instanceof THREE.Particle
                    ) {
                        f = a();
                        f.object = e;
                        if (e.renderDepth !== null) f.z = e.renderDepth;
                        else {
                            G.copy(e.matrixWorld.getPosition());
                            O.multiplyVector3(G);
                            f.z = G.z;
                        }
                        D.sprites.push(f);
                    } else {
                        f = a();
                        f.object = e;
                        if (e.renderDepth !== null) f.z = e.renderDepth;
                        else {
                            G.copy(e.matrixWorld.getPosition());
                            O.multiplyVector3(G);
                            f.z = G.z;
                        }
                        D.objects.push(f);
                    }
                    wb(e);
                }
            }
        };
        wb(g);
        n === true && D.objects.sort(c);
        g = 0;
        for (n = D.objects.length; g < n; g++) {
            pa = D.objects[g].object;
            ua = pa.matrixWorld;
            j = 0;
            if (pa instanceof THREE.Mesh) {
                Ca = pa.geometry;
                Ja = pa.geometry.materials;
                ga = Ca.vertices;
                Xa = Ca.faces;
                pb = Ca.faceVertexUvs;
                Ca = pa.matrixRotationWorld.extractRotation(ua);
                Ya = pa.material instanceof THREE.MeshFaceMaterial;
                ta = 0;
                for (da = ga.length; ta < da; ta++) {
                    i = b();
                    i.positionWorld.copy(ga[ta]);
                    ua.multiplyVector3(i.positionWorld);
                    i.positionScreen.copy(i.positionWorld);
                    O.multiplyVector4(i.positionScreen);
                    i.positionScreen.x =
                        i.positionScreen.x / i.positionScreen.w;
                    i.positionScreen.y =
                        i.positionScreen.y / i.positionScreen.w;
                    i.visible =
                        i.positionScreen.z > ba && i.positionScreen.z < Q;
                }
                ga = 0;
                for (ta = Xa.length; ga < ta; ga++) {
                    Ia = Xa[ga];
                    da = Ya === true ? Ja[Ia.materialIndex] : pa.material;
                    if (da !== void 0) {
                        ia = da.side;
                        if (Ia instanceof THREE.Face3) {
                            N = l[Ia.a];
                            U = l[Ia.b];
                            ja = l[Ia.c];
                            if (
                                N.visible === true &&
                                U.visible === true &&
                                ja.visible === true
                            ) {
                                fa =
                                    (ja.positionScreen.x - N.positionScreen.x) *
                                        (U.positionScreen.y -
                                            N.positionScreen.y) -
                                        (ja.positionScreen.y -
                                            N.positionScreen.y) *
                                            (U.positionScreen.x -
                                                N.positionScreen.x) <
                                    0;
                                if (
                                    ia === THREE.DoubleSide ||
                                    fa === (ia === THREE.FrontSide)
                                ) {
                                    if (q === o) {
                                        Oa = new THREE.RenderableFace3();
                                        p.push(Oa);
                                        o++;
                                        q++;
                                        m = Oa;
                                    } else m = p[q++];
                                    m.v1.copy(N);
                                    m.v2.copy(U);
                                    m.v3.copy(ja);
                                } else continue;
                            } else continue;
                        } else if (Ia instanceof THREE.Face4) {
                            N = l[Ia.a];
                            U = l[Ia.b];
                            ja = l[Ia.c];
                            Oa = l[Ia.d];
                            if (
                                N.visible === true &&
                                U.visible === true &&
                                ja.visible === true &&
                                Oa.visible === true
                            ) {
                                fa =
                                    (Oa.positionScreen.x - N.positionScreen.x) *
                                        (U.positionScreen.y -
                                            N.positionScreen.y) -
                                        (Oa.positionScreen.y -
                                            N.positionScreen.y) *
                                            (U.positionScreen.x -
                                                N.positionScreen.x) <
                                        0 ||
                                    (U.positionScreen.x - ja.positionScreen.x) *
                                        (Oa.positionScreen.y -
                                            ja.positionScreen.y) -
                                        (U.positionScreen.y -
                                            ja.positionScreen.y) *
                                            (Oa.positionScreen.x -
                                                ja.positionScreen.x) <
                                        0;
                                if (
                                    ia === THREE.DoubleSide ||
                                    fa === (ia === THREE.FrontSide)
                                ) {
                                    if (r === u) {
                                        var xb = new THREE.RenderableFace4();
                                        t.push(xb);
                                        u++;
                                        r++;
                                        m = xb;
                                    } else m = t[r++];
                                    m.v1.copy(N);
                                    m.v2.copy(U);
                                    m.v3.copy(ja);
                                    m.v4.copy(Oa);
                                } else continue;
                            } else continue;
                        }
                        m.normalWorld.copy(Ia.normal);
                        fa === false &&
                            (ia === THREE.BackSide ||
                                ia === THREE.DoubleSide) &&
                            m.normalWorld.negate();
                        Ca.multiplyVector3(m.normalWorld);
                        m.centroidWorld.copy(Ia.centroid);
                        ua.multiplyVector3(m.centroidWorld);
                        m.centroidScreen.copy(m.centroidWorld);
                        O.multiplyVector3(m.centroidScreen);
                        Ia = Ia.vertexNormals;
                        N = 0;
                        for (U = Ia.length; N < U; N++) {
                            ja = m.vertexNormalsWorld[N];
                            ja.copy(Ia[N]);
                            fa === false &&
                                (ia === THREE.BackSide ||
                                    ia === THREE.DoubleSide) &&
                                ja.negate();
                            Ca.multiplyVector3(ja);
                        }
                        m.vertexNormalsLength = Ia.length;
                        N = 0;
                        for (U = pb.length; N < U; N++) {
                            ja = pb[N][ga];
                            if (ja !== void 0) {
                                ia = 0;
                                for (Ia = ja.length; ia < Ia; ia++)
                                    m.uvs[N][ia] = ja[ia];
                            }
                        }
                        m.material = da;
                        m.z = m.centroidScreen.z;
                        D.elements.push(m);
                    }
                }
            } else if (pa instanceof THREE.Line) {
                F.multiply(O, ua);
                ga = pa.geometry.vertices;
                N = b();
                N.positionScreen.copy(ga[0]);
                F.multiplyVector4(N.positionScreen);
                ua = pa.type === THREE.LinePieces ? 2 : 1;
                ta = 1;
                for (da = ga.length; ta < da; ta++) {
                    N = b();
                    N.positionScreen.copy(ga[ta]);
                    F.multiplyVector4(N.positionScreen);
                    if (!((ta + 1) % ua > 0)) {
                        U = l[j - 2];
                        I.copy(N.positionScreen);
                        K.copy(U.positionScreen);
                        if (d(I, K) === true) {
                            I.multiplyScalar(1 / I.w);
                            K.multiplyScalar(1 / K.w);
                            if (s === v) {
                                Ja = new THREE.RenderableLine();
                                B.push(Ja);
                                v++;
                                s++;
                                w = Ja;
                            } else w = B[s++];
                            w.v1.positionScreen.copy(I);
                            w.v2.positionScreen.copy(K);
                            w.z = Math.max(I.z, K.z);
                            w.material = pa.material;
                            D.elements.push(w);
                        }
                    }
                }
            }
        }
        g = 0;
        for (n = D.sprites.length; g < n; g++) {
            pa = D.sprites[g].object;
            ua = pa.matrixWorld;
            if (pa instanceof THREE.Particle) {
                H.set(ua.elements[12], ua.elements[13], ua.elements[14], 1);
                O.multiplyVector4(H);
                H.z = H.z / H.w;
                if (H.z > 0 && H.z < 1) {
                    if (E === M) {
                        ba = new THREE.RenderableParticle();
                        z.push(ba);
                        M++;
                        E++;
                        A = ba;
                    } else A = z[E++];
                    A.object = pa;
                    A.x = H.x / H.w;
                    A.y = H.y / H.w;
                    A.z = H.z;
                    A.rotation = pa.rotation.z;
                    A.scale.x =
                        pa.scale.x *
                        Math.abs(
                            A.x -
                                (H.x + h.projectionMatrix.elements[0]) /
                                    (H.w + h.projectionMatrix.elements[12])
                        );
                    A.scale.y =
                        pa.scale.y *
                        Math.abs(
                            A.y -
                                (H.y + h.projectionMatrix.elements[5]) /
                                    (H.w + h.projectionMatrix.elements[13])
                        );
                    A.material = pa.material;
                    D.elements.push(A);
                }
            }
        }
        L === true && D.elements.sort(c);
        return D;
    };
};
THREE.Quaternion = function (a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = d !== void 0 ? d : 1;
};
THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    set: function (a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this;
    },
    copy: function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
        return this;
    },
    setFromEuler: function (a, b) {
        var c = Math.cos(a.x / 2),
            d = Math.cos(a.y / 2),
            f = Math.cos(a.z / 2),
            e = Math.sin(a.x / 2),
            g = Math.sin(a.y / 2),
            h = Math.sin(a.z / 2);
        if (b === void 0 || b === "XYZ") {
            this.x = e * d * f + c * g * h;
            this.y = c * g * f - e * d * h;
            this.z = c * d * h + e * g * f;
            this.w = c * d * f - e * g * h;
        } else if (b === "YXZ") {
            this.x = e * d * f + c * g * h;
            this.y = c * g * f - e * d * h;
            this.z = c * d * h - e * g * f;
            this.w = c * d * f + e * g * h;
        } else if (b === "ZXY") {
            this.x = e * d * f - c * g * h;
            this.y = c * g * f + e * d * h;
            this.z = c * d * h + e * g * f;
            this.w = c * d * f - e * g * h;
        } else if (b === "ZYX") {
            this.x = e * d * f - c * g * h;
            this.y = c * g * f + e * d * h;
            this.z = c * d * h - e * g * f;
            this.w = c * d * f + e * g * h;
        } else if (b === "YZX") {
            this.x = e * d * f + c * g * h;
            this.y = c * g * f + e * d * h;
            this.z = c * d * h - e * g * f;
            this.w = c * d * f - e * g * h;
        } else if (b === "XZY") {
            this.x = e * d * f - c * g * h;
            this.y = c * g * f - e * d * h;
            this.z = c * d * h + e * g * f;
            this.w = c * d * f + e * g * h;
        }
        return this;
    },
    setFromAxisAngle: function (a, b) {
        var c = b / 2,
            d = Math.sin(c);
        this.x = a.x * d;
        this.y = a.y * d;
        this.z = a.z * d;
        this.w = Math.cos(c);
        return this;
    },
    setFromRotationMatrix: function (a) {
        var b = a.elements,
            c = b[0],
            a = b[4],
            d = b[8],
            f = b[1],
            e = b[5],
            g = b[9],
            h = b[2],
            i = b[6],
            b = b[10],
            j = c + e + b;
        if (j > 0) {
            c = 0.5 / Math.sqrt(j + 1);
            this.w = 0.25 / c;
            this.x = (i - g) * c;
            this.y = (d - h) * c;
            this.z = (f - a) * c;
        } else if (c > e && c > b) {
            c = 2 * Math.sqrt(1 + c - e - b);
            this.w = (i - g) / c;
            this.x = 0.25 * c;
            this.y = (a + f) / c;
            this.z = (d + h) / c;
        } else if (e > b) {
            c = 2 * Math.sqrt(1 + e - c - b);
            this.w = (d - h) / c;
            this.x = (a + f) / c;
            this.y = 0.25 * c;
            this.z = (g + i) / c;
        } else {
            c = 2 * Math.sqrt(1 + b - c - e);
            this.w = (f - a) / c;
            this.x = (d + h) / c;
            this.y = (g + i) / c;
            this.z = 0.25 * c;
        }
        return this;
    },
    calculateW: function () {
        this.w = -Math.sqrt(
            Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)
        );
        return this;
    },
    inverse: function () {
        this.x = this.x * -1;
        this.y = this.y * -1;
        this.z = this.z * -1;
        return this;
    },
    length: function () {
        return Math.sqrt(
            this.x * this.x +
                this.y * this.y +
                this.z * this.z +
                this.w * this.w
        );
    },
    normalize: function () {
        var a = Math.sqrt(
            this.x * this.x +
                this.y * this.y +
                this.z * this.z +
                this.w * this.w
        );
        if (a === 0) this.w = this.z = this.y = this.x = 0;
        else {
            a = 1 / a;
            this.x = this.x * a;
            this.y = this.y * a;
            this.z = this.z * a;
            this.w = this.w * a;
        }
        return this;
    },
    multiply: function (a, b) {
        var c = a.x,
            d = a.y,
            f = a.z,
            e = a.w,
            g = b.x,
            h = b.y,
            i = b.z,
            j = b.w;
        this.x = c * j + d * i - f * h + e * g;
        this.y = -c * i + d * j + f * g + e * h;
        this.z = c * h - d * g + f * j + e * i;
        this.w = -c * g - d * h - f * i + e * j;
        return this;
    },
    multiplySelf: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            f = this.w,
            e = a.x,
            g = a.y,
            h = a.z,
            a = a.w;
        this.x = b * a + f * e + c * h - d * g;
        this.y = c * a + f * g + d * e - b * h;
        this.z = d * a + f * h + b * g - c * e;
        this.w = f * a - b * e - c * g - d * h;
        return this;
    },
    multiplyVector3: function (a, b) {
        b || (b = a);
        var c = a.x,
            d = a.y,
            f = a.z,
            e = this.x,
            g = this.y,
            h = this.z,
            i = this.w,
            j = i * c + g * f - h * d,
            l = i * d + h * c - e * f,
            n = i * f + e * d - g * c,
            c = -e * c - g * d - h * f;
        b.x = j * i + c * -e + l * -h - n * -g;
        b.y = l * i + c * -g + n * -e - j * -h;
        b.z = n * i + c * -h + j * -g - l * -e;
        return b;
    },
    slerpSelf: function (a, b) {
        var c = this.x,
            d = this.y,
            f = this.z,
            e = this.w,
            g = e * a.w + c * a.x + d * a.y + f * a.z;
        if (g < 0) {
            this.w = -a.w;
            this.x = -a.x;
            this.y = -a.y;
            this.z = -a.z;
            g = -g;
        } else this.copy(a);
        if (g >= 1) {
            this.w = e;
            this.x = c;
            this.y = d;
            this.z = f;
            return this;
        }
        var h = Math.acos(g),
            i = Math.sqrt(1 - g * g);
        if (Math.abs(i) < 0.001) {
            this.w = 0.5 * (e + this.w);
            this.x = 0.5 * (c + this.x);
            this.y = 0.5 * (d + this.y);
            this.z = 0.5 * (f + this.z);
            return this;
        }
        g = Math.sin((1 - b) * h) / i;
        h = Math.sin(b * h) / i;
        this.w = e * g + this.w * h;
        this.x = c * g + this.x * h;
        this.y = d * g + this.y * h;
        this.z = f * g + this.z * h;
        return this;
    },
    clone: function () {
        return new THREE.Quaternion(this.x, this.y, this.z, this.w);
    }
};
THREE.Quaternion.slerp = function (a, b, c, d) {
    var f = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
    if (f < 0) {
        c.w = -b.w;
        c.x = -b.x;
        c.y = -b.y;
        c.z = -b.z;
        f = -f;
    } else c.copy(b);
    if (Math.abs(f) >= 1) {
        c.w = a.w;
        c.x = a.x;
        c.y = a.y;
        c.z = a.z;
        return c;
    }
    var b = Math.acos(f),
        e = Math.sqrt(1 - f * f);
    if (Math.abs(e) < 0.001) {
        c.w = 0.5 * (a.w + c.w);
        c.x = 0.5 * (a.x + c.x);
        c.y = 0.5 * (a.y + c.y);
        c.z = 0.5 * (a.z + c.z);
        return c;
    }
    f = Math.sin((1 - d) * b) / e;
    d = Math.sin(d * b) / e;
    c.w = a.w * f + c.w * d;
    c.x = a.x * f + c.x * d;
    c.y = a.y * f + c.y * d;
    c.z = a.z * f + c.z * d;
    return c;
};
THREE.Vertex = function (a) {
    console.warn(
        "THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead."
    );
    return a;
};
THREE.Face3 = function (a, b, c, d, f, e) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3();
    this.vertexNormals = d instanceof Array ? d : [];
    this.color = f instanceof THREE.Color ? f : new THREE.Color();
    this.vertexColors = f instanceof Array ? f : [];
    this.vertexTangents = [];
    this.materialIndex = e;
    this.centroid = new THREE.Vector3();
};
THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function () {
        var a = new THREE.Face3(this.a, this.b, this.c);
        a.normal.copy(this.normal);
        a.color.copy(this.color);
        a.centroid.copy(this.centroid);
        a.materialIndex = this.materialIndex;
        var b, c;
        b = 0;
        for (c = this.vertexNormals.length; b < c; b++)
            a.vertexNormals[b] = this.vertexNormals[b].clone();
        b = 0;
        for (c = this.vertexColors.length; b < c; b++)
            a.vertexColors[b] = this.vertexColors[b].clone();
        b = 0;
        for (c = this.vertexTangents.length; b < c; b++)
            a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a;
    }
};
THREE.Face4 = function (a, b, c, d, f, e, g) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.normal = f instanceof THREE.Vector3 ? f : new THREE.Vector3();
    this.vertexNormals = f instanceof Array ? f : [];
    this.color = e instanceof THREE.Color ? e : new THREE.Color();
    this.vertexColors = e instanceof Array ? e : [];
    this.vertexTangents = [];
    this.materialIndex = g;
    this.centroid = new THREE.Vector3();
};
THREE.Face4.prototype = {
    constructor: THREE.Face4,
    clone: function () {
        var a = new THREE.Face4(this.a, this.b, this.c, this.d);
        a.normal.copy(this.normal);
        a.color.copy(this.color);
        a.centroid.copy(this.centroid);
        a.materialIndex = this.materialIndex;
        var b, c;
        b = 0;
        for (c = this.vertexNormals.length; b < c; b++)
            a.vertexNormals[b] = this.vertexNormals[b].clone();
        b = 0;
        for (c = this.vertexColors.length; b < c; b++)
            a.vertexColors[b] = this.vertexColors[b].clone();
        b = 0;
        for (c = this.vertexTangents.length; b < c; b++)
            a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a;
    }
};
THREE.UV = function (a, b) {
    this.u = a || 0;
    this.v = b || 0;
};
THREE.UV.prototype = {
    constructor: THREE.UV,
    set: function (a, b) {
        this.u = a;
        this.v = b;
        return this;
    },
    copy: function (a) {
        this.u = a.u;
        this.v = a.v;
        return this;
    },
    lerpSelf: function (a, b) {
        this.u = this.u + (a.u - this.u) * b;
        this.v = this.v + (a.v - this.v) * b;
        return this;
    },
    clone: function () {
        return new THREE.UV(this.u, this.v);
    }
};
THREE.Geometry = function () {
    this.id = THREE.GeometryCount++;
    this.name = "";
    this.vertices = [];
    this.colors = [];
    this.materials = [];
    this.faces = [];
    this.faceUvs = [[]];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphColors = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = false;
    this.dynamic = true;
};
THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function (a) {
        var b = new THREE.Matrix4();
        b.extractRotation(a);
        for (var c = 0, d = this.vertices.length; c < d; c++)
            a.multiplyVector3(this.vertices[c]);
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            var f = this.faces[c];
            b.multiplyVector3(f.normal);
            for (var e = 0, g = f.vertexNormals.length; e < g; e++)
                b.multiplyVector3(f.vertexNormals[e]);
            a.multiplyVector3(f.centroid);
        }
    },
    computeCentroids: function () {
        var a, b, c;
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            c.centroid.set(0, 0, 0);
            if (c instanceof THREE.Face3) {
                c.centroid.addSelf(this.vertices[c.a]);
                c.centroid.addSelf(this.vertices[c.b]);
                c.centroid.addSelf(this.vertices[c.c]);
                c.centroid.divideScalar(3);
            } else if (c instanceof THREE.Face4) {
                c.centroid.addSelf(this.vertices[c.a]);
                c.centroid.addSelf(this.vertices[c.b]);
                c.centroid.addSelf(this.vertices[c.c]);
                c.centroid.addSelf(this.vertices[c.d]);
                c.centroid.divideScalar(4);
            }
        }
    },
    computeFaceNormals: function () {
        var a,
            b,
            c,
            d,
            f,
            e,
            g = new THREE.Vector3(),
            h = new THREE.Vector3();
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            d = this.vertices[c.a];
            f = this.vertices[c.b];
            e = this.vertices[c.c];
            g.sub(e, f);
            h.sub(d, f);
            g.crossSelf(h);
            g.isZero() || g.normalize();
            c.normal.copy(g);
        }
    },
    computeVertexNormals: function () {
        var a, b, c, d;
        if (this.__tmpVertices === void 0) {
            d = this.__tmpVertices = Array(this.vertices.length);
            a = 0;
            for (b = this.vertices.length; a < b; a++)
                d[a] = new THREE.Vector3();
            a = 0;
            for (b = this.faces.length; a < b; a++) {
                c = this.faces[a];
                if (c instanceof THREE.Face3)
                    c.vertexNormals = [
                        new THREE.Vector3(),
                        new THREE.Vector3(),
                        new THREE.Vector3()
                    ];
                else if (c instanceof THREE.Face4)
                    c.vertexNormals = [
                        new THREE.Vector3(),
                        new THREE.Vector3(),
                        new THREE.Vector3(),
                        new THREE.Vector3()
                    ];
            }
        } else {
            d = this.__tmpVertices;
            a = 0;
            for (b = this.vertices.length; a < b; a++) d[a].set(0, 0, 0);
        }
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            if (c instanceof THREE.Face3) {
                d[c.a].addSelf(c.normal);
                d[c.b].addSelf(c.normal);
                d[c.c].addSelf(c.normal);
            } else if (c instanceof THREE.Face4) {
                d[c.a].addSelf(c.normal);
                d[c.b].addSelf(c.normal);
                d[c.c].addSelf(c.normal);
                d[c.d].addSelf(c.normal);
            }
        }
        a = 0;
        for (b = this.vertices.length; a < b; a++) d[a].normalize();
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            if (c instanceof THREE.Face3) {
                c.vertexNormals[0].copy(d[c.a]);
                c.vertexNormals[1].copy(d[c.b]);
                c.vertexNormals[2].copy(d[c.c]);
            } else if (c instanceof THREE.Face4) {
                c.vertexNormals[0].copy(d[c.a]);
                c.vertexNormals[1].copy(d[c.b]);
                c.vertexNormals[2].copy(d[c.c]);
                c.vertexNormals[3].copy(d[c.d]);
            }
        }
    },
    computeMorphNormals: function () {
        var a, b, c, d, f;
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            f = this.faces[c];
            f.__originalFaceNormal
                ? f.__originalFaceNormal.copy(f.normal)
                : (f.__originalFaceNormal = f.normal.clone());
            if (!f.__originalVertexNormals) f.__originalVertexNormals = [];
            a = 0;
            for (b = f.vertexNormals.length; a < b; a++)
                f.__originalVertexNormals[a]
                    ? f.__originalVertexNormals[a].copy(f.vertexNormals[a])
                    : (f.__originalVertexNormals[a] =
                            f.vertexNormals[a].clone());
        }
        var e = new THREE.Geometry();
        e.faces = this.faces;
        a = 0;
        for (b = this.morphTargets.length; a < b; a++) {
            if (!this.morphNormals[a]) {
                this.morphNormals[a] = {};
                this.morphNormals[a].faceNormals = [];
                this.morphNormals[a].vertexNormals = [];
                var g = this.morphNormals[a].faceNormals,
                    h = this.morphNormals[a].vertexNormals,
                    i,
                    j;
                c = 0;
                for (d = this.faces.length; c < d; c++) {
                    f = this.faces[c];
                    i = new THREE.Vector3();
                    j =
                        f instanceof THREE.Face3
                            ? {
                                    a: new THREE.Vector3(),
                                    b: new THREE.Vector3(),
                                    c: new THREE.Vector3()
                                }
                            : {
                                    a: new THREE.Vector3(),
                                    b: new THREE.Vector3(),
                                    c: new THREE.Vector3(),
                                    d: new THREE.Vector3()
                                };
                    g.push(i);
                    h.push(j);
                }
            }
            g = this.morphNormals[a];
            e.vertices = this.morphTargets[a].vertices;
            e.computeFaceNormals();
            e.computeVertexNormals();
            c = 0;
            for (d = this.faces.length; c < d; c++) {
                f = this.faces[c];
                i = g.faceNormals[c];
                j = g.vertexNormals[c];
                i.copy(f.normal);
                if (f instanceof THREE.Face3) {
                    j.a.copy(f.vertexNormals[0]);
                    j.b.copy(f.vertexNormals[1]);
                    j.c.copy(f.vertexNormals[2]);
                } else {
                    j.a.copy(f.vertexNormals[0]);
                    j.b.copy(f.vertexNormals[1]);
                    j.c.copy(f.vertexNormals[2]);
                    j.d.copy(f.vertexNormals[3]);
                }
            }
        }
        c = 0;
        for (d = this.faces.length; c < d; c++) {
            f = this.faces[c];
            f.normal = f.__originalFaceNormal;
            f.vertexNormals = f.__originalVertexNormals;
        }
    },
    computeTangents: function () {
        function a(a, b, c, d, f, e, E) {
            h = a.vertices[b];
            i = a.vertices[c];
            j = a.vertices[d];
            l = g[f];
            n = g[e];
            m = g[E];
            q = i.x - h.x;
            p = j.x - h.x;
            o = i.y - h.y;
            r = j.y - h.y;
            t = i.z - h.z;
            u = j.z - h.z;
            w = n.u - l.u;
            s = m.u - l.u;
            B = n.v - l.v;
            v = m.v - l.v;
            A = 1 / (w * v - s * B);
            D.set(
                (v * q - B * p) * A,
                (v * o - B * r) * A,
                (v * t - B * u) * A
            );
            G.set(
                (w * p - s * q) * A,
                (w * r - s * o) * A,
                (w * u - s * t) * A
            );
            z[b].addSelf(D);
            z[c].addSelf(D);
            z[d].addSelf(D);
            M[b].addSelf(G);
            M[c].addSelf(G);
            M[d].addSelf(G);
        }
        var b,
            c,
            d,
            f,
            e,
            g,
            h,
            i,
            j,
            l,
            n,
            m,
            q,
            p,
            o,
            r,
            t,
            u,
            w,
            s,
            B,
            v,
            A,
            E,
            z = [],
            M = [],
            D = new THREE.Vector3(),
            G = new THREE.Vector3(),
            H = new THREE.Vector3(),
            O = new THREE.Vector3(),
            F = new THREE.Vector3();
        b = 0;
        for (c = this.vertices.length; b < c; b++) {
            z[b] = new THREE.Vector3();
            M[b] = new THREE.Vector3();
        }
        b = 0;
        for (c = this.faces.length; b < c; b++) {
            e = this.faces[b];
            g = this.faceVertexUvs[0][b];
            if (e instanceof THREE.Face3) a(this, e.a, e.b, e.c, 0, 1, 2);
            else if (e instanceof THREE.Face4) {
                a(this, e.a, e.b, e.d, 0, 1, 3);
                a(this, e.b, e.c, e.d, 1, 2, 3);
            }
        }
        var J = ["a", "b", "c", "d"];
        b = 0;
        for (c = this.faces.length; b < c; b++) {
            e = this.faces[b];
            for (d = 0; d < e.vertexNormals.length; d++) {
                F.copy(e.vertexNormals[d]);
                f = e[J[d]];
                E = z[f];
                H.copy(E);
                H.subSelf(F.multiplyScalar(F.dot(E))).normalize();
                O.cross(e.vertexNormals[d], E);
                f = O.dot(M[f]);
                f = f < 0 ? -1 : 1;
                e.vertexTangents[d] = new THREE.Vector4(H.x, H.y, H.z, f);
            }
        }
        this.hasTangents = true;
    },
    computeBoundingBox: function () {
        if (!this.boundingBox)
            this.boundingBox = {
                min: new THREE.Vector3(),
                max: new THREE.Vector3()
            };
        if (this.vertices.length > 0) {
            var a;
            a = this.vertices[0];
            this.boundingBox.min.copy(a);
            this.boundingBox.max.copy(a);
            for (
                var b = this.boundingBox.min,
                    c = this.boundingBox.max,
                    d = 1,
                    f = this.vertices.length;
                d < f;
                d++
            ) {
                a = this.vertices[d];
                if (a.x < b.x) b.x = a.x;
                else if (a.x > c.x) c.x = a.x;
                if (a.y < b.y) b.y = a.y;
                else if (a.y > c.y) c.y = a.y;
                if (a.z < b.z) b.z = a.z;
                else if (a.z > c.z) c.z = a.z;
            }
        } else {
            this.boundingBox.min.set(0, 0, 0);
            this.boundingBox.max.set(0, 0, 0);
        }
    },
    computeBoundingSphere: function () {
        var a = 0;
        if (this.boundingSphere === null) this.boundingSphere = { radius: 0 };
        for (var b = 0, c = this.vertices.length; b < c; b++) {
            var d = this.vertices[b].lengthSq();
            d > a && (a = d);
        }
        this.boundingSphere.radius = Math.sqrt(a);
    },
    mergeVertices: function () {
        var a = {},
            b = [],
            c = [],
            d,
            f = Math.pow(10, 4),
            e,
            g,
            h,
            i;
        e = 0;
        for (g = this.vertices.length; e < g; e++) {
            d = this.vertices[e];
            d = [
                Math.round(d.x * f),
                Math.round(d.y * f),
                Math.round(d.z * f)
            ].join("_");
            if (a[d] === void 0) {
                a[d] = e;
                b.push(this.vertices[e]);
                c[e] = b.length - 1;
            } else c[e] = c[a[d]];
        }
        e = 0;
        for (g = this.faces.length; e < g; e++) {
            a = this.faces[e];
            if (a instanceof THREE.Face3) {
                a.a = c[a.a];
                a.b = c[a.b];
                a.c = c[a.c];
            } else if (a instanceof THREE.Face4) {
                a.a = c[a.a];
                a.b = c[a.b];
                a.c = c[a.c];
                a.d = c[a.d];
                d = [a.a, a.b, a.c, a.d];
                for (f = 3; f > 0; f--)
                    if (d.indexOf(a["abcd"[f]]) !== f) {
                        d.splice(f, 1);
                        this.faces[e] = new THREE.Face3(
                            d[0],
                            d[1],
                            d[2],
                            a.normal,
                            a.color,
                            a.materialIndex
                        );
                        d = 0;
                        for (h = this.faceVertexUvs.length; d < h; d++)
                            (i = this.faceVertexUvs[d][e]) && i.splice(f, 1);
                        this.faces[e].vertexColors = a.vertexColors;
                        break;
                    }
            }
        }
        c = this.vertices.length - b.length;
        this.vertices = b;
        return c;
    },
    clone: function () {}
};
THREE.GeometryCount = 0;
THREE.BufferGeometry = function () {
    this.id = THREE.GeometryCount++;
    this.attributes = {};
    this.dynamic = false;
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = false;
    this.morphTargets = [];
};
THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    applyMatrix: function (a) {
        var b, c;
        if (this.attributes.position) b = this.attributes.position.array;
        if (this.attributes.normal) c = this.attributes.normal.array;
        if (b !== void 0) {
            a.multiplyVector3Array(b);
            this.verticesNeedUpdate = true;
        }
        if (c !== void 0) {
            b = new THREE.Matrix4();
            b.extractRotation(a);
            b.multiplyVector3Array(c);
            this.normalsNeedUpdate = true;
        }
    },
    computeBoundingBox: function () {
        if (!this.boundingBox)
            this.boundingBox = {
                min: new THREE.Vector3(Infinity, Infinity, Infinity),
                max: new THREE.Vector3(-Infinity, -Infinity, -Infinity)
            };
        var a = this.attributes.position.array;
        if (a)
            for (
                var b = this.boundingBox, c, d, f, e = 0, g = a.length;
                e < g;
                e = e + 3
            ) {
                c = a[e];
                d = a[e + 1];
                f = a[e + 2];
                if (c < b.min.x) b.min.x = c;
                else if (c > b.max.x) b.max.x = c;
                if (d < b.min.y) b.min.y = d;
                else if (d > b.max.y) b.max.y = d;
                if (f < b.min.z) b.min.z = f;
                else if (f > b.max.z) b.max.z = f;
            }
        if (a === void 0 || a.length === 0) {
            this.boundingBox.min.set(0, 0, 0);
            this.boundingBox.max.set(0, 0, 0);
        }
    },
    computeBoundingSphere: function () {
        if (!this.boundingSphere) this.boundingSphere = { radius: 0 };
        var a = this.attributes.position.array;
        if (a) {
            for (var b, c = 0, d, f, e = 0, g = a.length; e < g; e = e + 3) {
                b = a[e];
                d = a[e + 1];
                f = a[e + 2];
                b = b * b + d * d + f * f;
                b > c && (c = b);
            }
            this.boundingSphere.radius = Math.sqrt(c);
        }
    },
    computeVertexNormals: function () {
        if (this.attributes.position && this.attributes.index) {
            var a, b, c, d;
            a = this.attributes.position.array.length;
            if (this.attributes.normal === void 0)
                this.attributes.normal = {
                    itemSize: 3,
                    array: new Float32Array(a),
                    numItems: a
                };
            else {
                a = 0;
                for (b = this.attributes.normal.array.length; a < b; a++)
                    this.attributes.normal.array[a] = 0;
            }
            var f = this.offsets,
                e = this.attributes.index.array,
                g = this.attributes.position.array,
                h = this.attributes.normal.array,
                i,
                j,
                l,
                n,
                m,
                q,
                p = new THREE.Vector3(),
                o = new THREE.Vector3(),
                r = new THREE.Vector3(),
                t = new THREE.Vector3(),
                u = new THREE.Vector3();
            c = 0;
            for (d = f.length; c < d; ++c) {
                b = f[c].start;
                i = f[c].count;
                var w = f[c].index;
                a = b;
                for (b = b + i; a < b; a = a + 3) {
                    i = w + e[a];
                    j = w + e[a + 1];
                    l = w + e[a + 2];
                    n = g[i * 3];
                    m = g[i * 3 + 1];
                    q = g[i * 3 + 2];
                    p.set(n, m, q);
                    n = g[j * 3];
                    m = g[j * 3 + 1];
                    q = g[j * 3 + 2];
                    o.set(n, m, q);
                    n = g[l * 3];
                    m = g[l * 3 + 1];
                    q = g[l * 3 + 2];
                    r.set(n, m, q);
                    t.sub(r, o);
                    u.sub(p, o);
                    t.crossSelf(u);
                    h[i * 3] = h[i * 3] + t.x;
                    h[i * 3 + 1] = h[i * 3 + 1] + t.y;
                    h[i * 3 + 2] = h[i * 3 + 2] + t.z;
                    h[j * 3] = h[j * 3] + t.x;
                    h[j * 3 + 1] = h[j * 3 + 1] + t.y;
                    h[j * 3 + 2] = h[j * 3 + 2] + t.z;
                    h[l * 3] = h[l * 3] + t.x;
                    h[l * 3 + 1] = h[l * 3 + 1] + t.y;
                    h[l * 3 + 2] = h[l * 3 + 2] + t.z;
                }
            }
            a = 0;
            for (b = h.length; a < b; a = a + 3) {
                n = h[a];
                m = h[a + 1];
                q = h[a + 2];
                c = 1 / Math.sqrt(n * n + m * m + q * q);
                h[a] = h[a] * c;
                h[a + 1] = h[a + 1] * c;
                h[a + 2] = h[a + 2] * c;
            }
            this.normalsNeedUpdate = true;
        }
    },
    computeTangents: function () {
        function a(a) {
            Y.x = d[a * 3];
            Y.y = d[a * 3 + 1];
            Y.z = d[a * 3 + 2];
            $.copy(Y);
            ba = i[a];
            K.copy(ba);
            K.subSelf(Y.multiplyScalar(Y.dot(ba))).normalize();
            V.cross($, ba);
            Q = V.dot(j[a]);
            L = Q < 0 ? -1 : 1;
            h[a * 4] = K.x;
            h[a * 4 + 1] = K.y;
            h[a * 4 + 2] = K.z;
            h[a * 4 + 3] = L;
        }
        if (
            this.attributes.index === void 0 ||
            this.attributes.position === void 0 ||
            this.attributes.normal === void 0 ||
            this.attributes.uv === void 0
        )
            console.warn(
                "Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"
            );
        else {
            var b = this.attributes.index.array,
                c = this.attributes.position.array,
                d = this.attributes.normal.array,
                f = this.attributes.uv.array,
                e = c.length / 3;
            if (this.attributes.tangent === void 0) {
                var g = 4 * e;
                this.attributes.tangent = {
                    itemSize: 4,
                    array: new Float32Array(g),
                    numItems: g
                };
            }
            for (
                var h = this.attributes.tangent.array, i = [], j = [], g = 0;
                g < e;
                g++
            ) {
                i[g] = new THREE.Vector3();
                j[g] = new THREE.Vector3();
            }
            var l,
                n,
                m,
                q,
                p,
                o,
                r,
                t,
                u,
                w,
                s,
                B,
                v,
                A,
                E,
                e = new THREE.Vector3(),
                g = new THREE.Vector3(),
                z,
                M,
                D,
                G,
                H,
                O,
                F,
                J = this.offsets;
            D = 0;
            for (G = J.length; D < G; ++D) {
                M = J[D].start;
                H = J[D].count;
                var I = J[D].index;
                z = M;
                for (M = M + H; z < M; z = z + 3) {
                    H = I + b[z];
                    O = I + b[z + 1];
                    F = I + b[z + 2];
                    l = c[H * 3];
                    n = c[H * 3 + 1];
                    m = c[H * 3 + 2];
                    q = c[O * 3];
                    p = c[O * 3 + 1];
                    o = c[O * 3 + 2];
                    r = c[F * 3];
                    t = c[F * 3 + 1];
                    u = c[F * 3 + 2];
                    w = f[H * 2];
                    s = f[H * 2 + 1];
                    B = f[O * 2];
                    v = f[O * 2 + 1];
                    A = f[F * 2];
                    E = f[F * 2 + 1];
                    q = q - l;
                    l = r - l;
                    p = p - n;
                    n = t - n;
                    o = o - m;
                    m = u - m;
                    B = B - w;
                    w = A - w;
                    v = v - s;
                    s = E - s;
                    E = 1 / (B * s - w * v);
                    e.set(
                        (s * q - v * l) * E,
                        (s * p - v * n) * E,
                        (s * o - v * m) * E
                    );
                    g.set(
                        (B * l - w * q) * E,
                        (B * n - w * p) * E,
                        (B * m - w * o) * E
                    );
                    i[H].addSelf(e);
                    i[O].addSelf(e);
                    i[F].addSelf(e);
                    j[H].addSelf(g);
                    j[O].addSelf(g);
                    j[F].addSelf(g);
                }
            }
            var K = new THREE.Vector3(),
                V = new THREE.Vector3(),
                Y = new THREE.Vector3(),
                $ = new THREE.Vector3(),
                L,
                ba,
                Q;
            D = 0;
            for (G = J.length; D < G; ++D) {
                M = J[D].start;
                H = J[D].count;
                I = J[D].index;
                z = M;
                for (M = M + H; z < M; z = z + 3) {
                    H = I + b[z];
                    O = I + b[z + 1];
                    F = I + b[z + 2];
                    a(H);
                    a(O);
                    a(F);
                }
            }
            this.tangentsNeedUpdate = this.hasTangents = true;
        }
    }
};
THREE.Spline = function (a) {
    function b(a, b, c, d, f, e, g) {
        a = (c - a) * 0.5;
        d = (d - b) * 0.5;
        return (
            (2 * (b - c) + a + d) * g +
            (-3 * (b - c) - 2 * a - d) * e +
            a * f +
            b
        );
    }
    this.points = a;
    var c = [],
        d = { x: 0, y: 0, z: 0 },
        f,
        e,
        g,
        h,
        i,
        j,
        l,
        n,
        m;
    this.initFromArray = function (a) {
        this.points = [];
        for (var b = 0; b < a.length; b++)
            this.points[b] = { x: a[b][0], y: a[b][1], z: a[b][2] };
    };
    this.getPoint = function (a) {
        f = (this.points.length - 1) * a;
        e = Math.floor(f);
        g = f - e;
        c[0] = e === 0 ? e : e - 1;
        c[1] = e;
        c[2] = e > this.points.length - 2 ? this.points.length - 1 : e + 1;
        c[3] = e > this.points.length - 3 ? this.points.length - 1 : e + 2;
        j = this.points[c[0]];
        l = this.points[c[1]];
        n = this.points[c[2]];
        m = this.points[c[3]];
        h = g * g;
        i = g * h;
        d.x = b(j.x, l.x, n.x, m.x, g, h, i);
        d.y = b(j.y, l.y, n.y, m.y, g, h, i);
        d.z = b(j.z, l.z, n.z, m.z, g, h, i);
        return d;
    };
    this.getControlPointsArray = function () {
        var a,
            b,
            c = this.points.length,
            d = [];
        for (a = 0; a < c; a++) {
            b = this.points[a];
            d[a] = [b.x, b.y, b.z];
        }
        return d;
    };
    this.getLength = function (a) {
        var b,
            c,
            d,
            f = (b = b = 0),
            e = new THREE.Vector3(),
            g = new THREE.Vector3(),
            h = [],
            i = 0;
        h[0] = 0;
        a || (a = 100);
        c = this.points.length * a;
        e.copy(this.points[0]);
        for (a = 1; a < c; a++) {
            b = a / c;
            d = this.getPoint(b);
            g.copy(d);
            i = i + g.distanceTo(e);
            e.copy(d);
            b = (this.points.length - 1) * b;
            b = Math.floor(b);
            if (b != f) {
                h[b] = i;
                f = b;
            }
        }
        h[h.length] = i;
        return { chunks: h, total: i };
    };
    this.reparametrizeByArcLength = function (a) {
        var b,
            c,
            d,
            f,
            e,
            g,
            h = [],
            i = new THREE.Vector3(),
            l = this.getLength();
        h.push(i.copy(this.points[0]).clone());
        for (b = 1; b < this.points.length; b++) {
            c = l.chunks[b] - l.chunks[b - 1];
            g = Math.ceil((a * c) / l.total);
            f = (b - 1) / (this.points.length - 1);
            e = b / (this.points.length - 1);
            for (c = 1; c < g - 1; c++) {
                d = f + c * (1 / g) * (e - f);
                d = this.getPoint(d);
                h.push(i.copy(d).clone());
            }
            h.push(i.copy(this.points[b]).clone());
        }
        this.points = h;
    };
};
THREE.Camera = function () {
    THREE.Object3D.call(this);
    this.matrixWorldInverse = new THREE.Matrix4();
    this.projectionMatrix = new THREE.Matrix4();
    this.projectionMatrixInverse = new THREE.Matrix4();
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function (a) {
    this.matrix.lookAt(this.position, a, this.up);
    this.rotationAutoUpdate === true &&
        this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder);
};
THREE.OrthographicCamera = function (a, b, c, d, f, e) {
    THREE.Camera.call(this);
    this.left = a;
    this.right = b;
    this.top = c;
    this.bottom = d;
    this.near = f !== void 0 ? f : 0.1;
    this.far = e !== void 0 ? e : 2e3;
    this.updateProjectionMatrix();
};
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix.makeOrthographic(
        this.left,
        this.right,
        this.top,
        this.bottom,
        this.near,
        this.far
    );
};
THREE.PerspectiveCamera = function (a, b, c, d) {
    THREE.Camera.call(this);
    this.fov = a !== void 0 ? a : 50;
    this.aspect = b !== void 0 ? b : 1;
    this.near = c !== void 0 ? c : 0.1;
    this.far = d !== void 0 ? d : 2e3;
    this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
    b === void 0 && (b = 24);
    this.fov = 2 * Math.atan(b / (a * 2)) * (180 / Math.PI);
    this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype.setViewOffset = function (a, b, c, d, f, e) {
    this.fullWidth = a;
    this.fullHeight = b;
    this.x = c;
    this.y = d;
    this.width = f;
    this.height = e;
    this.updateProjectionMatrix();
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
    if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
            b = Math.tan((this.fov * Math.PI) / 360) * this.near,
            c = -b,
            d = a * c,
            a = Math.abs(a * b - d),
            c = Math.abs(b - c);
        this.projectionMatrix.makeFrustum(
            d + (this.x * a) / this.fullWidth,
            d + ((this.x + this.width) * a) / this.fullWidth,
            b - ((this.y + this.height) * c) / this.fullHeight,
            b - (this.y * c) / this.fullHeight,
            this.near,
            this.far
        );
    } else
        this.projectionMatrix.makePerspective(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
};
THREE.Light = function (a) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(a);
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);
THREE.AmbientLight = function (a) {
    THREE.Light.call(this, a);
};
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype);
THREE.DirectionalLight = function (a, b, c) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D();
    this.intensity = b !== void 0 ? b : 1;
    this.distance = c !== void 0 ? c : 0;
    this.onlyShadow = this.castShadow = false;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5e3;
    this.shadowCameraLeft = -500;
    this.shadowCameraTop = this.shadowCameraRight = 500;
    this.shadowCameraBottom = -500;
    this.shadowCameraVisible = false;
    this.shadowBias = 0;
    this.shadowDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowCascade = false;
    this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3);
    this.shadowCascadeCount = 2;
    this.shadowCascadeBias = [0, 0, 0];
    this.shadowCascadeWidth = [512, 512, 512];
    this.shadowCascadeHeight = [512, 512, 512];
    this.shadowCascadeNearZ = [-1, 0.99, 0.998];
    this.shadowCascadeFarZ = [0.99, 0.998, 1];
    this.shadowCascadeArray = [];
    this.shadowMatrix =
        this.shadowCamera =
        this.shadowMapSize =
        this.shadowMap =
            null;
};
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype);
THREE.HemisphereLight = function (a, b, c) {
    THREE.Light.call(this, a);
    this.groundColor = new THREE.Color(b);
    this.position = new THREE.Vector3(0, 100, 0);
    this.intensity = c !== void 0 ? c : 1;
};
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype);
THREE.PointLight = function (a, b, c) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 0, 0);
    this.intensity = b !== void 0 ? b : 1;
    this.distance = c !== void 0 ? c : 0;
};
THREE.PointLight.prototype = Object.create(THREE.Light.prototype);
THREE.SpotLight = function (a, b, c, d, f) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0, 1, 0);
    this.target = new THREE.Object3D();
    this.intensity = b !== void 0 ? b : 1;
    this.distance = c !== void 0 ? c : 0;
    this.angle = d !== void 0 ? d : Math.PI / 2;
    this.exponent = f !== void 0 ? f : 10;
    this.onlyShadow = this.castShadow = false;
    this.shadowCameraNear = 50;
    this.shadowCameraFar = 5e3;
    this.shadowCameraFov = 50;
    this.shadowCameraVisible = false;
    this.shadowBias = 0;
    this.shadowDarkness = 0.5;
    this.shadowMapHeight = this.shadowMapWidth = 512;
    this.shadowMatrix =
        this.shadowCamera =
        this.shadowMapSize =
        this.shadowMap =
            null;
};
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype);
THREE.Loader = function (a) {
    this.statusDomElement = (this.showStatus = a)
        ? THREE.Loader.prototype.addStatusElement()
        : null;
    this.onLoadStart = function () {};
    this.onLoadProgress = function () {};
    this.onLoadComplete = function () {};
};
THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: "anonymous",
    addStatusElement: function () {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.right = "0px";
        a.style.top = "0px";
        a.style.fontSize = "0.8em";
        a.style.textAlign = "left";
        a.style.background = "rgba(0,0,0,0.25)";
        a.style.color = "#fff";
        a.style.width = "120px";
        a.style.padding = "0.5em 0.5em 0.5em 0.5em";
        a.style.zIndex = 1e3;
        a.innerHTML = "Loading ...";
        return a;
    },
    updateProgress: function (a) {
        var b = "Loaded ",
            b = a.total
                ? b + (((100 * a.loaded) / a.total).toFixed(0) + "%")
                : b + ((a.loaded / 1e3).toFixed(2) + " KB");
        this.statusDomElement.innerHTML = b;
    },
    extractUrlBase: function (a) {
        a = a.split("/");
        a.pop();
        return (a.length < 1 ? "." : a.join("/")) + "/";
    },
    initMaterials: function (a, b, c) {
        a.materials = [];
        for (var d = 0; d < b.length; ++d)
            a.materials[d] = THREE.Loader.prototype.createMaterial(b[d], c);
    },
    hasNormals: function (a) {
        var b,
            c,
            d = a.materials.length;
        for (c = 0; c < d; c++) {
            b = a.materials[c];
            if (b instanceof THREE.ShaderMaterial) return true;
        }
        return false;
    },
    createMaterial: function (a, b) {
        function c(a) {
            a = Math.log(a) / Math.LN2;
            return Math.floor(a) == a;
        }
        function d(a) {
            a = Math.log(a) / Math.LN2;
            return Math.pow(2, Math.round(a));
        }
        function f(a, f, e, h, i, j, r) {
            var t = e.toLowerCase().endsWith(".dds"),
                u = b + "/" + e;
            if (t) {
                var w = THREE.ImageUtils.loadCompressedTexture(u);
                a[f] = w;
            } else {
                w = document.createElement("canvas");
                a[f] = new THREE.Texture(w);
            }
            a[f].sourceFile = e;
            if (h) {
                a[f].repeat.set(h[0], h[1]);
                if (h[0] !== 1) a[f].wrapS = THREE.RepeatWrapping;
                if (h[1] !== 1) a[f].wrapT = THREE.RepeatWrapping;
            }
            i && a[f].offset.set(i[0], i[1]);
            if (j) {
                e = {
                    repeat: THREE.RepeatWrapping,
                    mirror: THREE.MirroredRepeatWrapping
                };
                if (e[j[0]] !== void 0) a[f].wrapS = e[j[0]];
                if (e[j[1]] !== void 0) a[f].wrapT = e[j[1]];
            }
            if (r) a[f].anisotropy = r;
            if (!t) {
                var s = a[f],
                    a = new Image();
                a.onload = function () {
                    if (!c(this.width) || !c(this.height)) {
                        var a = d(this.width),
                            b = d(this.height);
                        s.image.width = a;
                        s.image.height = b;
                        s.image.getContext("2d").drawImage(this, 0, 0, a, b);
                    } else s.image = this;
                    s.needsUpdate = true;
                };
                a.crossOrigin = g.crossOrigin;
                a.src = u;
            }
        }
        function e(a) {
            return ((a[0] * 255) << 16) + ((a[1] * 255) << 8) + a[2] * 255;
        }
        var g = this,
            h = "MeshLambertMaterial",
            i = {
                color: 15658734,
                opacity: 1,
                map: null,
                lightMap: null,
                normalMap: null,
                bumpMap: null,
                wireframe: false
            };
        if (a.shading) {
            var j = a.shading.toLowerCase();
            j === "phong"
                ? (h = "MeshPhongMaterial")
                : j === "basic" && (h = "MeshBasicMaterial");
        }
        if (a.blending !== void 0 && THREE[a.blending] !== void 0)
            i.blending = THREE[a.blending];
        if (a.transparent !== void 0 || a.opacity < 1)
            i.transparent = a.transparent;
        if (a.depthTest !== void 0) i.depthTest = a.depthTest;
        if (a.depthWrite !== void 0) i.depthWrite = a.depthWrite;
        if (a.visible !== void 0) i.visible = a.visible;
        if (a.flipSided !== void 0) i.side = THREE.BackSide;
        if (a.doubleSided !== void 0) i.side = THREE.DoubleSide;
        if (a.wireframe !== void 0) i.wireframe = a.wireframe;
        if (a.vertexColors !== void 0)
            if (a.vertexColors === "face") i.vertexColors = THREE.FaceColors;
            else if (a.vertexColors) i.vertexColors = THREE.VertexColors;
        if (a.colorDiffuse) i.color = e(a.colorDiffuse);
        else if (a.DbgColor) i.color = a.DbgColor;
        if (a.colorSpecular) i.specular = e(a.colorSpecular);
        if (a.colorAmbient) i.ambient = e(a.colorAmbient);
        if (a.transparency) i.opacity = a.transparency;
        if (a.specularCoef) i.shininess = a.specularCoef;
        a.mapDiffuse &&
            b &&
            f(
                i,
                "map",
                a.mapDiffuse,
                a.mapDiffuseRepeat,
                a.mapDiffuseOffset,
                a.mapDiffuseWrap,
                a.mapDiffuseAnisotropy
            );
        a.mapLight &&
            b &&
            f(
                i,
                "lightMap",
                a.mapLight,
                a.mapLightRepeat,
                a.mapLightOffset,
                a.mapLightWrap,
                a.mapLightAnisotropy
            );
        a.mapBump &&
            b &&
            f(
                i,
                "bumpMap",
                a.mapBump,
                a.mapBumpRepeat,
                a.mapBumpOffset,
                a.mapBumpWrap,
                a.mapBumpAnisotropy
            );
        a.mapNormal &&
            b &&
            f(
                i,
                "normalMap",
                a.mapNormal,
                a.mapNormalRepeat,
                a.mapNormalOffset,
                a.mapNormalWrap,
                a.mapNormalAnisotropy
            );
        a.mapSpecular &&
            b &&
            f(
                i,
                "specularMap",
                a.mapSpecular,
                a.mapSpecularRepeat,
                a.mapSpecularOffset,
                a.mapSpecularWrap,
                a.mapSpecularAnisotropy
            );
        if (a.mapBumpScale) i.bumpScale = a.mapBumpScale;
        if (a.mapNormal) {
            h = THREE.ShaderUtils.lib.normal;
            j = THREE.UniformsUtils.clone(h.uniforms);
            j.tNormal.value = i.normalMap;
            a.mapNormalFactor &&
                j.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor);
            if (i.map) {
                j.tDiffuse.value = i.map;
                j.enableDiffuse.value = true;
            }
            if (i.specularMap) {
                j.tSpecular.value = i.specularMap;
                j.enableSpecular.value = true;
            }
            if (i.lightMap) {
                j.tAO.value = i.lightMap;
                j.enableAO.value = true;
            }
            j.uDiffuseColor.value.setHex(i.color);
            j.uSpecularColor.value.setHex(i.specular);
            j.uAmbientColor.value.setHex(i.ambient);
            j.uShininess.value = i.shininess;
            if (i.opacity !== void 0) j.uOpacity.value = i.opacity;
            i = new THREE.ShaderMaterial({
                fragmentShader: h.fragmentShader,
                vertexShader: h.vertexShader,
                uniforms: j,
                lights: true,
                fog: true
            });
        } else i = new THREE[h](i);
        if (a.DbgName !== void 0) i.name = a.DbgName;
        return i;
    }
};
THREE.BinaryLoader = function (a) {
    THREE.Loader.call(this, a);
};
THREE.BinaryLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.BinaryLoader.prototype.load = function (a, b, c, d) {
    var c = c ? c : this.extractUrlBase(a),
        d = d ? d : this.extractUrlBase(a),
        f = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
    this.onLoadStart();
    this.loadAjaxJSON(this, a, b, c, d, f);
};
THREE.BinaryLoader.prototype.loadAjaxJSON = function (a, b, c, d, f, e) {
    var g = new XMLHttpRequest();
    g.onreadystatechange = function () {
        if (g.readyState == 4)
            if (g.status == 200 || g.status == 0) {
                var h = JSON.parse(g.responseText);
                a.loadAjaxBuffers(h, c, f, d, e);
            } else
                console.error(
                    "THREE.BinaryLoader: Couldn't load [" +
                        b +
                        "] [" +
                        g.status +
                        "]"
                );
    };
    g.open("GET", b, true);
    g.send(null);
};
THREE.BinaryLoader.prototype.loadAjaxBuffers = function (a, b, c, d, f) {
    var e = new XMLHttpRequest(),
        g = c + "/" + a.buffers,
        h = 0;
    e.onreadystatechange = function () {
        if (e.readyState == 4)
            if (e.status == 200 || e.status == 0) {
                var c = e.response;
                if (c === void 0) c = new Uint8Array(e.responseBody).buffer;
                THREE.BinaryLoader.prototype.createBinModel(
                    c,
                    b,
                    d,
                    a.materials
                );
            } else
                console.error(
                    "THREE.BinaryLoader: Couldn't load [" +
                        g +
                        "] [" +
                        e.status +
                        "]"
                );
        else if (e.readyState == 3) {
            if (f) {
                h == 0 && (h = e.getResponseHeader("Content-Length"));
                f({ total: h, loaded: e.responseText.length });
            }
        } else e.readyState == 2 && (h = e.getResponseHeader("Content-Length"));
    };
    e.open("GET", g, true);
    e.responseType = "arraybuffer";
    e.send(null);
};
THREE.BinaryLoader.prototype.createBinModel = function (a, b, c, d) {
    var f = function (b) {
        var c, f, i, j, l, n, m, q, p, o, r, t, u, w, s;
        function B(a) {
            return a % 4 ? 4 - (a % 4) : 0;
        }
        function v(a, b) {
            return new Uint8Array(a, b, 1)[0];
        }
        function A(a, b) {
            return new Uint32Array(a, b, 1)[0];
        }
        function E(b, c) {
            var d,
                f,
                e,
                g,
                h,
                i,
                j,
                l,
                n = new Uint32Array(a, c, 3 * b);
            for (d = 0; d < b; d++) {
                f = n[d * 3];
                e = n[d * 3 + 1];
                g = n[d * 3 + 2];
                h = I[f * 2];
                f = I[f * 2 + 1];
                i = I[e * 2];
                j = I[e * 2 + 1];
                e = I[g * 2];
                l = I[g * 2 + 1];
                g = O.faceVertexUvs[0];
                var m = [];
                m.push(new THREE.UV(h, f));
                m.push(new THREE.UV(i, j));
                m.push(new THREE.UV(e, l));
                g.push(m);
            }
        }
        function z(b, c) {
            var d,
                f,
                e,
                g,
                h,
                i,
                j,
                l,
                n,
                m,
                o = new Uint32Array(a, c, 4 * b);
            for (d = 0; d < b; d++) {
                f = o[d * 4];
                e = o[d * 4 + 1];
                g = o[d * 4 + 2];
                h = o[d * 4 + 3];
                i = I[f * 2];
                f = I[f * 2 + 1];
                j = I[e * 2];
                n = I[e * 2 + 1];
                l = I[g * 2];
                m = I[g * 2 + 1];
                g = I[h * 2];
                e = I[h * 2 + 1];
                h = O.faceVertexUvs[0];
                var p = [];
                p.push(new THREE.UV(i, f));
                p.push(new THREE.UV(j, n));
                p.push(new THREE.UV(l, m));
                p.push(new THREE.UV(g, e));
                h.push(p);
            }
        }
        function M(b, c, d) {
            for (
                var f,
                    e,
                    g,
                    h,
                    c = new Uint32Array(a, c, 3 * b),
                    i = new Uint16Array(a, d, b),
                    d = 0;
                d < b;
                d++
            ) {
                f = c[d * 3];
                e = c[d * 3 + 1];
                g = c[d * 3 + 2];
                h = i[d];
                O.faces.push(new THREE.Face3(f, e, g, null, null, h));
            }
        }
        function D(b, c, d) {
            for (
                var f,
                    e,
                    g,
                    h,
                    i,
                    c = new Uint32Array(a, c, 4 * b),
                    j = new Uint16Array(a, d, b),
                    d = 0;
                d < b;
                d++
            ) {
                f = c[d * 4];
                e = c[d * 4 + 1];
                g = c[d * 4 + 2];
                h = c[d * 4 + 3];
                i = j[d];
                O.faces.push(new THREE.Face4(f, e, g, h, null, null, i));
            }
        }
        function G(b, c, d, f) {
            for (
                var e,
                    g,
                    h,
                    i,
                    j,
                    l,
                    n,
                    c = new Uint32Array(a, c, 3 * b),
                    d = new Uint32Array(a, d, 3 * b),
                    m = new Uint16Array(a, f, b),
                    f = 0;
                f < b;
                f++
            ) {
                e = c[f * 3];
                g = c[f * 3 + 1];
                h = c[f * 3 + 2];
                j = d[f * 3];
                l = d[f * 3 + 1];
                n = d[f * 3 + 2];
                i = m[f];
                var o = J[l * 3],
                    p = J[l * 3 + 1];
                l = J[l * 3 + 2];
                var q = J[n * 3],
                    r = J[n * 3 + 1];
                n = J[n * 3 + 2];
                O.faces.push(
                    new THREE.Face3(
                        e,
                        g,
                        h,
                        [
                            new THREE.Vector3(
                                J[j * 3],
                                J[j * 3 + 1],
                                J[j * 3 + 2]
                            ),
                            new THREE.Vector3(o, p, l),
                            new THREE.Vector3(q, r, n)
                        ],
                        null,
                        i
                    )
                );
            }
        }
        function H(b, c, d, f) {
            for (
                var e,
                    g,
                    h,
                    i,
                    j,
                    l,
                    n,
                    m,
                    o,
                    c = new Uint32Array(a, c, 4 * b),
                    d = new Uint32Array(a, d, 4 * b),
                    p = new Uint16Array(a, f, b),
                    f = 0;
                f < b;
                f++
            ) {
                e = c[f * 4];
                g = c[f * 4 + 1];
                h = c[f * 4 + 2];
                i = c[f * 4 + 3];
                l = d[f * 4];
                n = d[f * 4 + 1];
                m = d[f * 4 + 2];
                o = d[f * 4 + 3];
                j = p[f];
                var q = J[n * 3],
                    r = J[n * 3 + 1];
                n = J[n * 3 + 2];
                var s = J[m * 3],
                    t = J[m * 3 + 1];
                m = J[m * 3 + 2];
                var v = J[o * 3],
                    u = J[o * 3 + 1];
                o = J[o * 3 + 2];
                O.faces.push(
                    new THREE.Face4(
                        e,
                        g,
                        h,
                        i,
                        [
                            new THREE.Vector3(
                                J[l * 3],
                                J[l * 3 + 1],
                                J[l * 3 + 2]
                            ),
                            new THREE.Vector3(q, r, n),
                            new THREE.Vector3(s, t, m),
                            new THREE.Vector3(v, u, o)
                        ],
                        null,
                        j
                    )
                );
            }
        }
        var O = this,
            F = 0,
            J = [],
            I = [],
            K,
            V,
            Y;
        THREE.Geometry.call(this);
        THREE.Loader.prototype.initMaterials(O, d, b);
        s = a;
        V = F;
        b = new Uint8Array(s, V, 12);
        o = "";
        for (u = 0; u < 12; u++) o = o + String.fromCharCode(b[V + u]);
        c = v(s, V + 12);
        v(s, V + 13);
        v(s, V + 14);
        v(s, V + 15);
        f = v(s, V + 16);
        i = v(s, V + 17);
        j = v(s, V + 18);
        l = v(s, V + 19);
        n = A(s, V + 20);
        m = A(s, V + 20 + 4);
        q = A(s, V + 20 + 8);
        p = A(s, V + 20 + 12);
        o = A(s, V + 20 + 16);
        r = A(s, V + 20 + 20);
        t = A(s, V + 20 + 24);
        u = A(s, V + 20 + 28);
        b = A(s, V + 20 + 32);
        w = A(s, V + 20 + 36);
        s = A(s, V + 20 + 40);
        F = F + c;
        V = f * 3 + l;
        Y = f * 4 + l;
        K = p * V;
        c = o * (V + i * 3);
        f = r * (V + j * 3);
        l = t * (V + i * 3 + j * 3);
        V = u * Y;
        i = b * (Y + i * 4);
        j = w * (Y + j * 4);
        Y = F;
        var F = new Float32Array(a, F, n * 3),
            $,
            L,
            ba,
            Q;
        for ($ = 0; $ < n; $++) {
            L = F[$ * 3];
            ba = F[$ * 3 + 1];
            Q = F[$ * 3 + 2];
            O.vertices.push(new THREE.Vector3(L, ba, Q));
        }
        n = F = Y + n * 3 * Float32Array.BYTES_PER_ELEMENT;
        if (m) {
            F = new Int8Array(a, F, m * 3);
            for (Y = 0; Y < m; Y++) {
                $ = F[Y * 3];
                L = F[Y * 3 + 1];
                ba = F[Y * 3 + 2];
                J.push($ / 127, L / 127, ba / 127);
            }
        }
        F = n + m * 3 * Int8Array.BYTES_PER_ELEMENT;
        m = F = F + B(m * 3);
        if (q) {
            F = new Float32Array(a, F, q * 2);
            for (n = 0; n < q; n++) {
                Y = F[n * 2];
                $ = F[n * 2 + 1];
                I.push(Y, $);
            }
        }
        q = F = m + q * 2 * Float32Array.BYTES_PER_ELEMENT;
        K = q + K + B(p * 2);
        m = K + c + B(o * 2);
        c = m + f + B(r * 2);
        f = c + l + B(t * 2);
        V = f + V + B(u * 2);
        l = V + i + B(b * 2);
        i = l + j + B(w * 2);
        if (r) {
            j = m + r * Uint32Array.BYTES_PER_ELEMENT * 3;
            M(r, m, j + r * Uint32Array.BYTES_PER_ELEMENT * 3);
            E(r, j);
        }
        if (t) {
            r = c + t * Uint32Array.BYTES_PER_ELEMENT * 3;
            j = r + t * Uint32Array.BYTES_PER_ELEMENT * 3;
            G(t, c, r, j + t * Uint32Array.BYTES_PER_ELEMENT * 3);
            E(t, j);
        }
        if (w) {
            t = l + w * Uint32Array.BYTES_PER_ELEMENT * 4;
            D(w, l, t + w * Uint32Array.BYTES_PER_ELEMENT * 4);
            z(w, t);
        }
        if (s) {
            w = i + s * Uint32Array.BYTES_PER_ELEMENT * 4;
            t = w + s * Uint32Array.BYTES_PER_ELEMENT * 4;
            H(s, i, w, t + s * Uint32Array.BYTES_PER_ELEMENT * 4);
            z(s, t);
        }
        p && M(p, q, q + p * Uint32Array.BYTES_PER_ELEMENT * 3);
        if (o) {
            p = K + o * Uint32Array.BYTES_PER_ELEMENT * 3;
            G(o, K, p, p + o * Uint32Array.BYTES_PER_ELEMENT * 3);
        }
        u && D(u, f, f + u * Uint32Array.BYTES_PER_ELEMENT * 4);
        if (b) {
            o = V + b * Uint32Array.BYTES_PER_ELEMENT * 4;
            H(b, V, o, o + b * Uint32Array.BYTES_PER_ELEMENT * 4);
        }
        this.computeCentroids();
        this.computeFaceNormals();
        THREE.Loader.prototype.hasNormals(this) && this.computeTangents();
    };
    f.prototype = Object.create(THREE.Geometry.prototype);
    b(new f(c));
};
THREE.ImageLoader = function () {
    THREE.EventTarget.call(this);
    this.crossOrigin = null;
};
THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader,
    load: function (a, b) {
        var c = this;
        b === void 0 && (b = new Image());
        b.addEventListener(
            "load",
            function () {
                c.dispatchEvent({ type: "load", content: b });
            },
            false
        );
        b.addEventListener(
            "error",
            function () {
                c.dispatchEvent({
                    type: "error",
                    message: "Couldn't load URL [" + a + "]"
                });
            },
            false
        );
        if (c.crossOrigin) b.crossOrigin = c.crossOrigin;
        b.src = a;
    }
};
THREE.JSONLoader = function (a) {
    THREE.Loader.call(this, a);
};
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.JSONLoader.prototype.load = function (a, b, c) {
    c = c ? c : this.extractUrlBase(a);
    this.onLoadStart();
    this.loadAjaxJSON(this, a, b, c);
};
THREE.JSONLoader.prototype.loadAjaxJSON = function (a, b, c, d, f) {
    var e = new XMLHttpRequest(),
        g = 0;
    e.onreadystatechange = function () {
        if (e.readyState === e.DONE)
            if (e.status === 200 || e.status === 0) {
                if (e.responseText) {
                    var h = JSON.parse(e.responseText);
                    a.createModel(h, c, d);
                } else
                    console.warn(
                        "THREE.JSONLoader: [" +
                            b +
                            "] seems to be unreachable or file there is empty"
                    );
                a.onLoadComplete();
            } else
                console.error(
                    "THREE.JSONLoader: Couldn't load [" +
                        b +
                        "] [" +
                        e.status +
                        "]"
                );
        else if (e.readyState === e.LOADING) {
            if (f) {
                g === 0 && (g = e.getResponseHeader("Content-Length"));
                f({ total: g, loaded: e.responseText.length });
            }
        } else
            e.readyState === e.HEADERS_RECEIVED &&
                (g = e.getResponseHeader("Content-Length"));
    };
    e.open("GET", b, true);
    e.send(null);
};
THREE.JSONLoader.prototype.createModel = function (a, b, c) {
    var d = new THREE.Geometry(),
        f = a.scale !== void 0 ? 1 / a.scale : 1;
    this.initMaterials(d, a.materials, c);
    var e,
        g,
        h,
        i,
        j,
        l,
        n,
        m,
        q,
        p,
        o,
        r,
        t,
        u,
        w = a.faces;
    q = a.vertices;
    var s = a.normals,
        B = a.colors,
        v = 0;
    for (e = 0; e < a.uvs.length; e++) a.uvs[e].length && v++;
    for (e = 0; e < v; e++) {
        d.faceUvs[e] = [];
        d.faceVertexUvs[e] = [];
    }
    c = 0;
    for (i = q.length; c < i; ) {
        j = new THREE.Vector3();
        j.x = q[c++] * f;
        j.y = q[c++] * f;
        j.z = q[c++] * f;
        d.vertices.push(j);
    }
    c = 0;
    for (i = w.length; c < i; ) {
        q = w[c++];
        j = q & 1;
        h = q & 2;
        e = q & 4;
        g = q & 8;
        n = q & 16;
        l = q & 32;
        p = q & 64;
        q = q & 128;
        if (j) {
            o = new THREE.Face4();
            o.a = w[c++];
            o.b = w[c++];
            o.c = w[c++];
            o.d = w[c++];
            j = 4;
        } else {
            o = new THREE.Face3();
            o.a = w[c++];
            o.b = w[c++];
            o.c = w[c++];
            j = 3;
        }
        if (h) {
            h = w[c++];
            o.materialIndex = h;
        }
        h = d.faces.length;
        if (e)
            for (e = 0; e < v; e++) {
                r = a.uvs[e];
                m = w[c++];
                u = r[m * 2];
                m = r[m * 2 + 1];
                d.faceUvs[e][h] = new THREE.UV(u, m);
            }
        if (g)
            for (e = 0; e < v; e++) {
                r = a.uvs[e];
                t = [];
                for (g = 0; g < j; g++) {
                    m = w[c++];
                    u = r[m * 2];
                    m = r[m * 2 + 1];
                    t[g] = new THREE.UV(u, m);
                }
                d.faceVertexUvs[e][h] = t;
            }
        if (n) {
            n = w[c++] * 3;
            g = new THREE.Vector3();
            g.x = s[n++];
            g.y = s[n++];
            g.z = s[n];
            o.normal = g;
        }
        if (l)
            for (e = 0; e < j; e++) {
                n = w[c++] * 3;
                g = new THREE.Vector3();
                g.x = s[n++];
                g.y = s[n++];
                g.z = s[n];
                o.vertexNormals.push(g);
            }
        if (p) {
            l = w[c++];
            l = new THREE.Color(B[l]);
            o.color = l;
        }
        if (q)
            for (e = 0; e < j; e++) {
                l = w[c++];
                l = new THREE.Color(B[l]);
                o.vertexColors.push(l);
            }
        d.faces.push(o);
    }
    if (a.skinWeights) {
        c = 0;
        for (i = a.skinWeights.length; c < i; c = c + 2) {
            w = a.skinWeights[c];
            s = a.skinWeights[c + 1];
            d.skinWeights.push(new THREE.Vector4(w, s, 0, 0));
        }
    }
    if (a.skinIndices) {
        c = 0;
        for (i = a.skinIndices.length; c < i; c = c + 2) {
            w = a.skinIndices[c];
            s = a.skinIndices[c + 1];
            d.skinIndices.push(new THREE.Vector4(w, s, 0, 0));
        }
    }
    d.bones = a.bones;
    d.animation = a.animation;
    if (a.morphTargets !== void 0) {
        c = 0;
        for (i = a.morphTargets.length; c < i; c++) {
            d.morphTargets[c] = {};
            d.morphTargets[c].name = a.morphTargets[c].name;
            d.morphTargets[c].vertices = [];
            B = d.morphTargets[c].vertices;
            v = a.morphTargets[c].vertices;
            w = 0;
            for (s = v.length; w < s; w = w + 3) {
                q = new THREE.Vector3();
                q.x = v[w] * f;
                q.y = v[w + 1] * f;
                q.z = v[w + 2] * f;
                B.push(q);
            }
        }
    }
    if (a.morphColors !== void 0) {
        c = 0;
        for (i = a.morphColors.length; c < i; c++) {
            d.morphColors[c] = {};
            d.morphColors[c].name = a.morphColors[c].name;
            d.morphColors[c].colors = [];
            s = d.morphColors[c].colors;
            B = a.morphColors[c].colors;
            f = 0;
            for (w = B.length; f < w; f = f + 3) {
                v = new THREE.Color(16755200);
                v.setRGB(B[f], B[f + 1], B[f + 2]);
                s.push(v);
            }
        }
    }
    d.computeCentroids();
    d.computeFaceNormals();
    this.hasNormals(d) && d.computeTangents();
    b(d);
};
THREE.LoadingMonitor = function () {
    THREE.EventTarget.call(this);
    var a = this,
        b = 0,
        c = 0,
        d = function () {
            b++;
            a.dispatchEvent({ type: "progress", loaded: b, total: c });
            b === c && a.dispatchEvent({ type: "load" });
        };
    this.add = function (a) {
        c++;
        a.addEventListener("load", d, false);
    };
};
THREE.GeometryLoader = function () {
    THREE.EventTarget.call(this);
    this.path = this.crossOrigin = null;
};
THREE.GeometryLoader.prototype = {
    constructor: THREE.GeometryLoader,
    load: function (a) {
        var b = this,
            c = null;
        if (b.path === null) {
            var d = a.split("/");
            d.pop();
            b.path = d.length < 1 ? "." : d.join("/");
        }
        d = new XMLHttpRequest();
        d.addEventListener(
            "load",
            function (d) {
                d.target.responseText
                    ? (c = b.parse(JSON.parse(d.target.responseText), f))
                    : b.dispatchEvent({
                            type: "error",
                            message: "Invalid file [" + a + "]"
                        });
            },
            false
        );
        d.addEventListener(
            "error",
            function () {
                b.dispatchEvent({
                    type: "error",
                    message: "Couldn't load URL [" + a + "]"
                });
            },
            false
        );
        d.open("GET", a, true);
        d.send(null);
        var f = new THREE.LoadingMonitor();
        f.addEventListener("load", function () {
            b.dispatchEvent({ type: "load", content: c });
        });
        f.add(d);
    },
    parse: function (a, b) {
        var c = this,
            d = new THREE.Geometry(),
            f = a.scale !== void 0 ? 1 / a.scale : 1;
        if (a.materials) {
            d.materials = [];
            for (var e = 0; e < a.materials.length; ++e) {
                var g = a.materials[e],
                    h = function (a) {
                        a = Math.log(a) / Math.LN2;
                        return Math.floor(a) == a;
                    },
                    i = function (a) {
                        a = Math.log(a) / Math.LN2;
                        return Math.pow(2, Math.round(a));
                    },
                    j = function (a, d, f, e, g, j) {
                        a[d] = new THREE.Texture();
                        a[d].sourceFile = f;
                        if (e) {
                            a[d].repeat.set(e[0], e[1]);
                            if (e[0] !== 1) a[d].wrapS = THREE.RepeatWrapping;
                            if (e[1] !== 1) a[d].wrapT = THREE.RepeatWrapping;
                        }
                        g && a[d].offset.set(g[0], g[1]);
                        if (j) {
                            e = {
                                repeat: THREE.RepeatWrapping,
                                mirror: THREE.MirroredRepeatWrapping
                            };
                            if (e[j[0]] !== void 0) a[d].wrapS = e[j[0]];
                            if (e[j[1]] !== void 0) a[d].wrapT = e[j[1]];
                        }
                        var l = a[d],
                            a = new THREE.ImageLoader();
                        a.addEventListener("load", function (a) {
                            a = a.content;
                            if (!h(a.width) || !h(a.height)) {
                                var b = i(a.width),
                                    c = i(a.height);
                                l.image = document.createElement("canvas");
                                l.image.width = b;
                                l.image.height = c;
                                l.image
                                    .getContext("2d")
                                    .drawImage(a, 0, 0, b, c);
                            } else l.image = a;
                            l.needsUpdate = true;
                        });
                        a.crossOrigin = c.crossOrigin;
                        a.load(c.path + "/" + f);
                        b && b.add(a);
                    },
                    l = function (a) {
                        return (
                            ((a[0] * 255) << 16) +
                            ((a[1] * 255) << 8) +
                            a[2] * 255
                        );
                    },
                    n = "MeshLambertMaterial",
                    m = {
                        color: 15658734,
                        opacity: 1,
                        map: null,
                        lightMap: null,
                        normalMap: null,
                        bumpMap: null,
                        wireframe: false
                    };
                if (g.shading) {
                    var q = g.shading.toLowerCase();
                    q === "phong"
                        ? (n = "MeshPhongMaterial")
                        : q === "basic" && (n = "MeshBasicMaterial");
                }
                if (g.blending !== void 0 && THREE[g.blending] !== void 0)
                    m.blending = THREE[g.blending];
                if (g.transparent !== void 0 || g.opacity < 1)
                    m.transparent = g.transparent;
                if (g.depthTest !== void 0) m.depthTest = g.depthTest;
                if (g.depthWrite !== void 0) m.depthWrite = g.depthWrite;
                if (g.vertexColors !== void 0)
                    if (g.vertexColors == "face")
                        m.vertexColors = THREE.FaceColors;
                    else if (g.vertexColors)
                        m.vertexColors = THREE.VertexColors;
                if (g.colorDiffuse) m.color = l(g.colorDiffuse);
                else if (g.DbgColor) m.color = g.DbgColor;
                if (g.colorSpecular) m.specular = l(g.colorSpecular);
                if (g.colorAmbient) m.ambient = l(g.colorAmbient);
                if (g.transparency) m.opacity = g.transparency;
                if (g.specularCoef) m.shininess = g.specularCoef;
                if (g.visible !== void 0) m.visible = g.visible;
                if (g.flipSided !== void 0) m.side = THREE.BackSide;
                if (g.doubleSided !== void 0) m.side = THREE.DoubleSide;
                if (g.wireframe !== void 0) m.wireframe = g.wireframe;
                g.mapDiffuse &&
                    j(
                        m,
                        "map",
                        g.mapDiffuse,
                        g.mapDiffuseRepeat,
                        g.mapDiffuseOffset,
                        g.mapDiffuseWrap
                    );
                g.mapLight &&
                    j(
                        m,
                        "lightMap",
                        g.mapLight,
                        g.mapLightRepeat,
                        g.mapLightOffset,
                        g.mapLightWrap
                    );
                g.mapBump &&
                    j(
                        m,
                        "bumpMap",
                        g.mapBump,
                        g.mapBumpRepeat,
                        g.mapBumpOffset,
                        g.mapBumpWrap
                    );
                g.mapNormal &&
                    j(
                        m,
                        "normalMap",
                        g.mapNormal,
                        g.mapNormalRepeat,
                        g.mapNormalOffset,
                        g.mapNormalWrap
                    );
                g.mapSpecular &&
                    j(
                        m,
                        "specularMap",
                        g.mapSpecular,
                        g.mapSpecularRepeat,
                        g.mapSpecularOffset,
                        g.mapSpecularWrap
                    );
                if (g.mapNormal) {
                    j = THREE.ShaderUtils.lib.normal;
                    l = THREE.UniformsUtils.clone(j.uniforms);
                    l.tNormal.value = m.normalMap;
                    g.mapNormalFactor &&
                        l.uNormalScale.value.set(
                            g.mapNormalFactor,
                            g.mapNormalFactor
                        );
                    if (m.map) {
                        l.tDiffuse.value = m.map;
                        l.enableDiffuse.value = true;
                    }
                    if (m.specularMap) {
                        l.tSpecular.value = m.specularMap;
                        l.enableSpecular.value = true;
                    }
                    if (m.lightMap) {
                        l.tAO.value = m.lightMap;
                        l.enableAO.value = true;
                    }
                    l.uDiffuseColor.value.setHex(m.color);
                    l.uSpecularColor.value.setHex(m.specular);
                    l.uAmbientColor.value.setHex(m.ambient);
                    l.uShininess.value = m.shininess;
                    if (m.opacity !== void 0) l.uOpacity.value = m.opacity;
                    m = new THREE.ShaderMaterial({
                        fragmentShader: j.fragmentShader,
                        vertexShader: j.vertexShader,
                        uniforms: l,
                        lights: true,
                        fog: true
                    });
                } else m = new THREE[n](m);
                if (g.DbgName !== void 0) m.name = g.DbgName;
                d.materials[e] = m;
            }
        }
        var g = a.faces,
            p = a.vertices,
            m = a.normals,
            j = a.colors,
            l = 0;
        if (a.uvs) for (e = 0; e < a.uvs.length; e++) a.uvs[e].length && l++;
        for (e = 0; e < l; e++) {
            d.faceUvs[e] = [];
            d.faceVertexUvs[e] = [];
        }
        n = 0;
        for (q = p.length; n < q; ) {
            var o = new THREE.Vector3();
            o.x = p[n++] * f;
            o.y = p[n++] * f;
            o.z = p[n++] * f;
            d.vertices.push(o);
        }
        n = 0;
        for (q = g.length; n < q; ) {
            var r = g[n++],
                t = r & 2,
                e = r & 4,
                u = r & 8,
                w = r & 16,
                p = r & 32,
                s = r & 64,
                o = r & 128;
            if (r & 1) {
                r = new THREE.Face4();
                r.a = g[n++];
                r.b = g[n++];
                r.c = g[n++];
                r.d = g[n++];
                var B = 4;
            } else {
                r = new THREE.Face3();
                r.a = g[n++];
                r.b = g[n++];
                r.c = g[n++];
                B = 3;
            }
            if (t) {
                t = g[n++];
                r.materialIndex = t;
            }
            var v = d.faces.length;
            if (e)
                for (e = 0; e < l; e++) {
                    var A = a.uvs[e],
                        t = g[n++],
                        E = A[t * 2],
                        t = A[t * 2 + 1];
                    d.faceUvs[e][v] = new THREE.UV(E, t);
                }
            if (u)
                for (e = 0; e < l; e++) {
                    for (var A = a.uvs[e], u = [], z = 0; z < B; z++) {
                        t = g[n++];
                        E = A[t * 2];
                        t = A[t * 2 + 1];
                        u[z] = new THREE.UV(E, t);
                    }
                    d.faceVertexUvs[e][v] = u;
                }
            if (w) {
                w = g[n++] * 3;
                t = new THREE.Vector3();
                t.x = m[w++];
                t.y = m[w++];
                t.z = m[w];
                r.normal = t;
            }
            if (p)
                for (e = 0; e < B; e++) {
                    w = g[n++] * 3;
                    t = new THREE.Vector3();
                    t.x = m[w++];
                    t.y = m[w++];
                    t.z = m[w];
                    r.vertexNormals.push(t);
                }
            if (s) {
                p = g[n++];
                r.color = new THREE.Color(j[p]);
            }
            if (o)
                for (e = 0; e < B; e++) {
                    p = g[n++];
                    r.vertexColors.push(new THREE.Color(j[p]));
                }
            d.faces.push(r);
        }
        if (a.skinWeights) {
            e = 0;
            for (g = a.skinWeights.length; e < g; e = e + 2)
                d.skinWeights.push(
                    new THREE.Vector4(
                        a.skinWeights[e],
                        a.skinWeights[e + 1],
                        0,
                        0
                    )
                );
        }
        if (a.skinIndices) {
            e = 0;
            for (g = a.skinIndices.length; e < g; e = e + 2) {
                m = 0;
                d.skinIndices.push(
                    new THREE.Vector4(
                        a.skinIndices[e],
                        a.skinIndices[e + 1],
                        m,
                        0
                    )
                );
            }
        }
        d.bones = a.bones;
        d.animation = a.animation;
        if (a.morphTargets) {
            e = 0;
            for (g = a.morphTargets.length; e < g; e++) {
                d.morphTargets[e] = {};
                d.morphTargets[e].name = a.morphTargets[e].name;
                d.morphTargets[e].vertices = [];
                m = d.morphTargets[e].vertices;
                j = a.morphTargets[e].vertices;
                t = 0;
                for (l = j.length; t < l; t = t + 3) {
                    o = new THREE.Vector3();
                    o.x = j[t] * f;
                    o.y = j[t + 1] * f;
                    o.z = j[t + 2] * f;
                    m.push(o);
                }
            }
        }
        if (a.morphColors) {
            e = 0;
            for (g = a.morphColors.length; e < g; e++) {
                d.morphColors[e] = {};
                d.morphColors[e].name = a.morphColors[e].name;
                d.morphColors[e].colors = [];
                f = d.morphColors[e].colors;
                j = a.morphColors[e].colors;
                m = 0;
                for (l = j.length; m < l; m = m + 3) {
                    n = new THREE.Color(16755200);
                    n.setRGB(j[m], j[m + 1], j[m + 2]);
                    f.push(n);
                }
            }
        }
        d.computeCentroids();
        d.computeFaceNormals();
        return d;
    }
};
THREE.SceneLoader = function () {
    this.onLoadStart = function () {};
    this.onLoadProgress = function () {};
    this.onLoadComplete = function () {};
    this.callbackSync = function () {};
    this.callbackProgress = function () {};
    this.geometryHandlerMap = {};
    this.addGeometryHandler("ascii", THREE.JSONLoader);
    this.addGeometryHandler("binary", THREE.BinaryLoader);
};
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;
THREE.SceneLoader.prototype.load = function (a, b) {
    var c = this,
        d = new XMLHttpRequest();
    d.onreadystatechange = function () {
        if (d.readyState === 4)
            if (d.status === 200 || d.status === 0) {
                var f = JSON.parse(d.responseText);
                c.parse(f, b, a);
            } else
                console.error(
                    "THREE.SceneLoader: Couldn't load [" +
                        a +
                        "] [" +
                        d.status +
                        "]"
                );
    };
    d.open("GET", a, true);
    d.send(null);
};
THREE.SceneLoader.prototype.addGeometryHandler = function (a, b) {
    this.geometryHandlerMap[a] = { loaderClass: b };
};
THREE.SceneLoader.prototype.parse = function (a, b, c) {
    function d(a, b) {
        return b == "relativeToHTML" ? a : j + "/" + a;
    }
    function f(a, b) {
        for (var c in b)
            if (I.objects[c] === void 0) {
                var d = b[c],
                    e = null;
                if (d.geometry !== void 0) {
                    if ((E = I.geometries[d.geometry])) {
                        e = false;
                        z = I.materials[d.materials[0]];
                        (e = z instanceof THREE.ShaderMaterial) &&
                            E.computeTangents();
                        u = d.position;
                        w = d.rotation;
                        s = d.quaternion;
                        B = d.scale;
                        r = d.matrix;
                        s = 0;
                        d.materials.length === 0 &&
                            (z = new THREE.MeshFaceMaterial());
                        d.materials.length > 1 &&
                            (z = new THREE.MeshFaceMaterial());
                        if (d.morph) {
                            e = new THREE.MorphAnimMesh(E, z);
                            if (d.duration !== void 0) e.duration = d.duration;
                            if (d.time !== void 0) e.time = d.time;
                            if (d.mirroredLoop !== void 0)
                                e.mirroredLoop = d.mirroredLoop;
                            z.morphNormals && E.computeMorphNormals();
                        } else e = new THREE.Mesh(E, z);
                        e.name = c;
                        if (r) {
                            e.matrixAutoUpdate = false;
                            e.matrix.set(
                                r[0],
                                r[1],
                                r[2],
                                r[3],
                                r[4],
                                r[5],
                                r[6],
                                r[7],
                                r[8],
                                r[9],
                                r[10],
                                r[11],
                                r[12],
                                r[13],
                                r[14],
                                r[15]
                            );
                        } else {
                            e.position.set(u[0], u[1], u[2]);
                            if (s) {
                                e.quaternion.set(s[0], s[1], s[2], s[3]);
                                e.useQuaternion = true;
                            } else e.rotation.set(w[0], w[1], w[2]);
                            e.scale.set(B[0], B[1], B[2]);
                        }
                        e.visible = d.visible;
                        e.castShadow = d.castShadow;
                        e.receiveShadow = d.receiveShadow;
                        a.add(e);
                        I.objects[c] = e;
                    }
                } else {
                    u = d.position;
                    w = d.rotation;
                    s = d.quaternion;
                    B = d.scale;
                    s = 0;
                    e = new THREE.Object3D();
                    e.name = c;
                    e.position.set(u[0], u[1], u[2]);
                    if (s) {
                        e.quaternion.set(s[0], s[1], s[2], s[3]);
                        e.useQuaternion = true;
                    } else e.rotation.set(w[0], w[1], w[2]);
                    e.scale.set(B[0], B[1], B[2]);
                    e.visible = d.visible !== void 0 ? d.visible : false;
                    a.add(e);
                    I.objects[c] = e;
                    I.empties[c] = e;
                }
                if (e) {
                    if (d.properties !== void 0)
                        for (var g in d.properties)
                            e.properties[g] = d.properties[g];
                    d.children !== void 0 && f(e, d.children);
                }
            }
    }
    function e(a) {
        return function (b) {
            I.geometries[a] = b;
            f(I.scene, K.objects);
            H = H - 1;
            i.onLoadComplete();
            h();
        };
    }
    function g(a) {
        return function (b) {
            I.geometries[a] = b;
        };
    }
    function h() {
        i.callbackProgress(
            {
                totalModels: F,
                totalTextures: J,
                loadedModels: F - H,
                loadedTextures: J - O
            },
            I
        );
        i.onLoadProgress();
        H === 0 && O === 0 && b(I);
    }
    var i = this,
        j = THREE.Loader.prototype.extractUrlBase(c),
        l,
        n,
        m,
        q,
        p,
        o,
        r,
        t,
        u,
        w,
        s,
        B,
        v,
        A,
        E,
        z,
        M,
        D,
        G,
        H,
        O,
        F,
        J,
        I,
        K = a;
    for (v in this.geometryHandlerMap)
        this.geometryHandlerMap[v].loaderObject = new this.geometryHandlerMap[
            v
        ].loaderClass();
    O = H = 0;
    I = {
        scene: new THREE.Scene(),
        geometries: {},
        materials: {},
        textures: {},
        objects: {},
        cameras: {},
        lights: {},
        fogs: {},
        empties: {}
    };
    if (K.transform) {
        a = K.transform.position;
        c = K.transform.rotation;
        v = K.transform.scale;
        a && I.scene.position.set(a[0], a[1], a[2]);
        c && I.scene.rotation.set(c[0], c[1], c[2]);
        v && I.scene.scale.set(v[0], v[1], v[2]);
        if (a || c || v) {
            I.scene.updateMatrix();
            I.scene.updateMatrixWorld();
        }
    }
    a = function (a) {
        return function () {
            O = O - a;
            h();
            i.onLoadComplete();
        };
    };
    for (q in K.cameras) {
        v = K.cameras[q];
        v.type === "perspective"
            ? (M = new THREE.PerspectiveCamera(v.fov, v.aspect, v.near, v.far))
            : v.type === "ortho" &&
                (M = new THREE.OrthographicCamera(
                    v.left,
                    v.right,
                    v.top,
                    v.bottom,
                    v.near,
                    v.far
                ));
        u = v.position;
        c = v.target;
        v = v.up;
        M.position.set(u[0], u[1], u[2]);
        M.target = new THREE.Vector3(c[0], c[1], c[2]);
        v && M.up.set(v[0], v[1], v[2]);
        I.cameras[q] = M;
    }
    for (m in K.lights) {
        c = K.lights[m];
        q = c.color !== void 0 ? c.color : 16777215;
        M = c.intensity !== void 0 ? c.intensity : 1;
        if (c.type === "directional") {
            u = c.direction;
            t = new THREE.DirectionalLight(q, M);
            t.position.set(u[0], u[1], u[2]);
            t.position.normalize();
        } else if (c.type === "point") {
            u = c.position;
            t = c.distance;
            t = new THREE.PointLight(q, M, t);
            t.position.set(u[0], u[1], u[2]);
        } else c.type === "ambient" && (t = new THREE.AmbientLight(q));
        I.scene.add(t);
        I.lights[m] = t;
    }
    for (p in K.fogs) {
        m = K.fogs[p];
        m.type === "linear"
            ? (D = new THREE.Fog(0, m.near, m.far))
            : m.type === "exp2" && (D = new THREE.FogExp2(0, m.density));
        v = m.color;
        D.color.setRGB(v[0], v[1], v[2]);
        I.fogs[p] = D;
    }
    if (I.cameras && K.defaults.camera)
        I.currentCamera = I.cameras[K.defaults.camera];
    if (I.fogs && K.defaults.fog) I.scene.fog = I.fogs[K.defaults.fog];
    v = K.defaults.bgcolor;
    I.bgColor = new THREE.Color();
    I.bgColor.setRGB(v[0], v[1], v[2]);
    I.bgColorAlpha = K.defaults.bgalpha;
    for (l in K.geometries) {
        p = K.geometries[l];
        if (p.type in this.geometryHandlerMap) {
            H = H + 1;
            i.onLoadStart();
        }
    }
    F = H;
    for (l in K.geometries) {
        p = K.geometries[l];
        if (p.type === "cube") {
            E = new THREE.CubeGeometry(
                p.width,
                p.height,
                p.depth,
                p.segmentsWidth,
                p.segmentsHeight,
                p.segmentsDepth,
                null,
                p.flipped,
                p.sides
            );
            I.geometries[l] = E;
        } else if (p.type === "plane") {
            E = new THREE.PlaneGeometry(
                p.width,
                p.height,
                p.segmentsWidth,
                p.segmentsHeight
            );
            I.geometries[l] = E;
        } else if (p.type === "sphere") {
            E = new THREE.SphereGeometry(
                p.radius,
                p.segmentsWidth,
                p.segmentsHeight
            );
            I.geometries[l] = E;
        } else if (p.type === "cylinder") {
            E = new THREE.CylinderGeometry(
                p.topRad,
                p.botRad,
                p.height,
                p.radSegs,
                p.heightSegs
            );
            I.geometries[l] = E;
        } else if (p.type === "torus") {
            E = new THREE.TorusGeometry(
                p.radius,
                p.tube,
                p.segmentsR,
                p.segmentsT
            );
            I.geometries[l] = E;
        } else if (p.type === "icosahedron") {
            E = new THREE.IcosahedronGeometry(p.radius, p.subdivisions);
            I.geometries[l] = E;
        } else if (p.type in this.geometryHandlerMap) {
            D = {};
            for (G in p) G !== "type" && G !== "url" && (D[G] = p[G]);
            this.geometryHandlerMap[p.type].loaderObject.load(
                d(p.url, K.urlBaseType),
                e(l),
                D
            );
        } else if (p.type === "embedded") {
            p = K.embeds[p.id];
            p.metadata = K.metadata;
            p &&
                this.geometryHandlerMap.ascii.loaderObject.createModel(
                    p,
                    g(l),
                    ""
                );
        }
    }
    for (o in K.textures) {
        l = K.textures[o];
        if (l.url instanceof Array) {
            O = O + l.url.length;
            for (G = 0; G < l.url.length; G++) i.onLoadStart();
        } else {
            O = O + 1;
            i.onLoadStart();
        }
    }
    J = O;
    for (o in K.textures) {
        l = K.textures[o];
        if (l.mapping !== void 0 && THREE[l.mapping] !== void 0)
            l.mapping = new THREE[l.mapping]();
        if (l.url instanceof Array) {
            p = l.url.length;
            D = [];
            for (G = 0; G < p; G++) D[G] = d(l.url[G], K.urlBaseType);
            G = (G = D[0].endsWith(".dds"))
                ? THREE.ImageUtils.loadCompressedTextureCube(D, l.mapping, a(p))
                : THREE.ImageUtils.loadTextureCube(D, l.mapping, a(p));
        } else {
            G = l.url.toLowerCase().endsWith(".dds");
            p = d(l.url, K.urlBaseType);
            D = a(1);
            G = G
                ? THREE.ImageUtils.loadCompressedTexture(p, l.mapping, D)
                : THREE.ImageUtils.loadTexture(p, l.mapping, D);
            if (THREE[l.minFilter] !== void 0) G.minFilter = THREE[l.minFilter];
            if (THREE[l.magFilter] !== void 0) G.magFilter = THREE[l.magFilter];
            if (l.anisotropy) G.anisotropy = l.anisotropy;
            if (l.repeat) {
                G.repeat.set(l.repeat[0], l.repeat[1]);
                if (l.repeat[0] !== 1) G.wrapS = THREE.RepeatWrapping;
                if (l.repeat[1] !== 1) G.wrapT = THREE.RepeatWrapping;
            }
            l.offset && G.offset.set(l.offset[0], l.offset[1]);
            if (l.wrap) {
                p = {
                    repeat: THREE.RepeatWrapping,
                    mirror: THREE.MirroredRepeatWrapping
                };
                if (p[l.wrap[0]] !== void 0) G.wrapS = p[l.wrap[0]];
                if (p[l.wrap[1]] !== void 0) G.wrapT = p[l.wrap[1]];
            }
        }
        I.textures[o] = G;
    }
    for (n in K.materials) {
        r = K.materials[n];
        for (A in r.parameters)
            if (
                A === "envMap" ||
                A === "map" ||
                A === "lightMap" ||
                A === "bumpMap"
            )
                r.parameters[A] = I.textures[r.parameters[A]];
            else if (A === "shading")
                r.parameters[A] =
                    r.parameters[A] === "flat"
                        ? THREE.FlatShading
                        : THREE.SmoothShading;
            else if (A === "side")
                r.parameters[A] =
                    r.parameters[A] == "double"
                        ? THREE.DoubleSide
                        : r.parameters[A] == "back"
                            ? THREE.BackSide
                            : THREE.FrontSide;
            else if (A === "blending")
                r.parameters[A] =
                    r.parameters[A] in THREE
                        ? THREE[r.parameters[A]]
                        : THREE.NormalBlending;
            else if (A === "combine")
                r.parameters[A] =
                    r.parameters[A] == "MixOperation"
                        ? THREE.MixOperation
                        : THREE.MultiplyOperation;
            else if (A === "vertexColors")
                if (r.parameters[A] == "face")
                    r.parameters[A] = THREE.FaceColors;
                else {
                    if (r.parameters[A]) r.parameters[A] = THREE.VertexColors;
                }
            else if (A === "wrapRGB") {
                o = r.parameters[A];
                r.parameters[A] = new THREE.Vector3(o[0], o[1], o[2]);
            }
        if (r.parameters.opacity !== void 0 && r.parameters.opacity < 1)
            r.parameters.transparent = true;
        if (r.parameters.normalMap) {
            o = THREE.ShaderUtils.lib.normal;
            a = THREE.UniformsUtils.clone(o.uniforms);
            l = r.parameters.color;
            G = r.parameters.specular;
            p = r.parameters.ambient;
            D = r.parameters.shininess;
            a.tNormal.value = I.textures[r.parameters.normalMap];
            r.parameters.normalScale &&
                a.uNormalScale.value.set(
                    r.parameters.normalScale[0],
                    r.parameters.normalScale[1]
                );
            if (r.parameters.map) {
                a.tDiffuse.value = r.parameters.map;
                a.enableDiffuse.value = true;
            }
            if (r.parameters.envMap) {
                a.tCube.value = r.parameters.envMap;
                a.enableReflection.value = true;
                a.uReflectivity.value = r.parameters.reflectivity;
            }
            if (r.parameters.lightMap) {
                a.tAO.value = r.parameters.lightMap;
                a.enableAO.value = true;
            }
            if (r.parameters.specularMap) {
                a.tSpecular.value = I.textures[r.parameters.specularMap];
                a.enableSpecular.value = true;
            }
            if (r.parameters.displacementMap) {
                a.tDisplacement.value =
                    I.textures[r.parameters.displacementMap];
                a.enableDisplacement.value = true;
                a.uDisplacementBias.value = r.parameters.displacementBias;
                a.uDisplacementScale.value = r.parameters.displacementScale;
            }
            a.uDiffuseColor.value.setHex(l);
            a.uSpecularColor.value.setHex(G);
            a.uAmbientColor.value.setHex(p);
            a.uShininess.value = D;
            if (r.parameters.opacity) a.uOpacity.value = r.parameters.opacity;
            z = new THREE.ShaderMaterial({
                fragmentShader: o.fragmentShader,
                vertexShader: o.vertexShader,
                uniforms: a,
                lights: true,
                fog: true
            });
        } else z = new THREE[r.type](r.parameters);
        I.materials[n] = z;
    }
    f(I.scene, K.objects);
    i.callbackSync(I);
    h();
};
THREE.TextureLoader = function () {
    THREE.EventTarget.call(this);
    this.crossOrigin = null;
};
THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader,
    load: function (a) {
        var b = this,
            c = new Image();
        c.addEventListener(
            "load",
            function () {
                var a = new THREE.Texture(c);
                a.needsUpdate = true;
                b.dispatchEvent({ type: "load", content: a });
            },
            false
        );
        c.addEventListener(
            "error",
            function () {
                b.dispatchEvent({
                    type: "error",
                    message: "Couldn't load URL [" + a + "]"
                });
            },
            false
        );
        if (b.crossOrigin) c.crossOrigin = b.crossOrigin;
        c.src = a;
    }
};
THREE.Material = function () {
    this.id = THREE.MaterialCount++;
    this.name = "";
    this.side = THREE.FrontSide;
    this.opacity = 1;
    this.transparent = false;
    this.blending = THREE.NormalBlending;
    this.blendSrc = THREE.SrcAlphaFactor;
    this.blendDst = THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = THREE.AddEquation;
    this.depthWrite = this.depthTest = true;
    this.polygonOffset = false;
    this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
    this.overdraw = false;
    this.needsUpdate = this.visible = true;
};
THREE.Material.prototype.setValues = function (a) {
    if (a !== void 0)
        for (var b in a) {
            var c = a[b];
            if (c === void 0)
                console.warn(
                    "THREE.Material: '" + b + "' parameter is undefined."
                );
            else if (b in this) {
                var d = this[b];
                d instanceof THREE.Color && c instanceof THREE.Color
                    ? d.copy(c)
                    : d instanceof THREE.Color && typeof c === "number"
                        ? d.setHex(c)
                        : d instanceof THREE.Vector3 &&
                              c instanceof THREE.Vector3
                            ? d.copy(c)
                            : (this[b] = c);
            }
        }
};
THREE.Material.prototype.clone = function (a) {
    a === void 0 && (a = new THREE.Material());
    a.name = this.name;
    a.side = this.side;
    a.opacity = this.opacity;
    a.transparent = this.transparent;
    a.blending = this.blending;
    a.blendSrc = this.blendSrc;
    a.blendDst = this.blendDst;
    a.blendEquation = this.blendEquation;
    a.depthTest = this.depthTest;
    a.depthWrite = this.depthWrite;
    a.polygonOffset = this.polygonOffset;
    a.polygonOffsetFactor = this.polygonOffsetFactor;
    a.polygonOffsetUnits = this.polygonOffsetUnits;
    a.alphaTest = this.alphaTest;
    a.overdraw = this.overdraw;
    a.visible = this.visible;
    return a;
};
THREE.MaterialCount = 0;
THREE.LineBasicMaterial = function (a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.linewidth = 1;
    this.linejoin = this.linecap = "round";
    this.vertexColors = false;
    this.fog = true;
    this.setValues(a);
};
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.LineBasicMaterial.prototype.clone = function () {
    var a = new THREE.LineBasicMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.linewidth = this.linewidth;
    a.linecap = this.linecap;
    a.linejoin = this.linejoin;
    a.vertexColors = this.vertexColors;
    a.fog = this.fog;
    return a;
};
THREE.MeshBasicMaterial = function (a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.envMap = this.specularMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = true;
    this.shading = THREE.SmoothShading;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphTargets = this.skinning = false;
    this.setValues(a);
};
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshBasicMaterial.prototype.clone = function () {
    var a = new THREE.MeshBasicMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.map = this.map;
    a.lightMap = this.lightMap;
    a.specularMap = this.specularMap;
    a.envMap = this.envMap;
    a.combine = this.combine;
    a.reflectivity = this.reflectivity;
    a.refractionRatio = this.refractionRatio;
    a.fog = this.fog;
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    a.wireframeLinecap = this.wireframeLinecap;
    a.wireframeLinejoin = this.wireframeLinejoin;
    a.vertexColors = this.vertexColors;
    a.skinning = this.skinning;
    a.morphTargets = this.morphTargets;
    return a;
};
THREE.MeshLambertMaterial = function (a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.ambient = new THREE.Color(16777215);
    this.emissive = new THREE.Color(0);
    this.wrapAround = false;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.envMap = this.specularMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = true;
    this.shading = THREE.SmoothShading;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = false;
    this.setValues(a);
};
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshLambertMaterial.prototype.clone = function () {
    var a = new THREE.MeshLambertMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.ambient.copy(this.ambient);
    a.emissive.copy(this.emissive);
    a.wrapAround = this.wrapAround;
    a.wrapRGB.copy(this.wrapRGB);
    a.map = this.map;
    a.lightMap = this.lightMap;
    a.specularMap = this.specularMap;
    a.envMap = this.envMap;
    a.combine = this.combine;
    a.reflectivity = this.reflectivity;
    a.refractionRatio = this.refractionRatio;
    a.fog = this.fog;
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    a.wireframeLinecap = this.wireframeLinecap;
    a.wireframeLinejoin = this.wireframeLinejoin;
    a.vertexColors = this.vertexColors;
    a.skinning = this.skinning;
    a.morphTargets = this.morphTargets;
    a.morphNormals = this.morphNormals;
    return a;
};
THREE.MeshPhongMaterial = function (a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.ambient = new THREE.Color(16777215);
    this.emissive = new THREE.Color(0);
    this.specular = new THREE.Color(1118481);
    this.shininess = 30;
    this.wrapAround = this.perPixel = this.metal = false;
    this.wrapRGB = new THREE.Vector3(1, 1, 1);
    this.bumpMap = this.lightMap = this.map = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalScale = new THREE.Vector2(1, 1);
    this.envMap = this.specularMap = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = true;
    this.shading = THREE.SmoothShading;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = false;
    this.setValues(a);
};
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshPhongMaterial.prototype.clone = function () {
    var a = new THREE.MeshPhongMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.ambient.copy(this.ambient);
    a.emissive.copy(this.emissive);
    a.specular.copy(this.specular);
    a.shininess = this.shininess;
    a.metal = this.metal;
    a.perPixel = this.perPixel;
    a.wrapAround = this.wrapAround;
    a.wrapRGB.copy(this.wrapRGB);
    a.map = this.map;
    a.lightMap = this.lightMap;
    a.bumpMap = this.bumpMap;
    a.bumpScale = this.bumpScale;
    a.normalMap = this.normalMap;
    a.normalScale.copy(this.normalScale);
    a.specularMap = this.specularMap;
    a.envMap = this.envMap;
    a.combine = this.combine;
    a.reflectivity = this.reflectivity;
    a.refractionRatio = this.refractionRatio;
    a.fog = this.fog;
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    a.wireframeLinecap = this.wireframeLinecap;
    a.wireframeLinejoin = this.wireframeLinejoin;
    a.vertexColors = this.vertexColors;
    a.skinning = this.skinning;
    a.morphTargets = this.morphTargets;
    a.morphNormals = this.morphNormals;
    return a;
};
THREE.MeshDepthMaterial = function (a) {
    THREE.Material.call(this);
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.setValues(a);
};
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshDepthMaterial.prototype.clone = function () {
    var a = new THREE.LineBasicMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    return a;
};
THREE.MeshNormalMaterial = function (a) {
    THREE.Material.call(this, a);
    this.shading = THREE.FlatShading;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.setValues(a);
};
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.MeshNormalMaterial.prototype.clone = function () {
    var a = new THREE.MeshNormalMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    return a;
};
THREE.MeshFaceMaterial = function () {};
THREE.MeshFaceMaterial.prototype.clone = function () {
    return new THREE.MeshFaceMaterial();
};
THREE.ParticleBasicMaterial = function (a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.map = null;
    this.size = 1;
    this.sizeAttenuation = true;
    this.vertexColors = false;
    this.fog = true;
    this.setValues(a);
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone = function () {
    var a = new THREE.ParticleBasicMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.map = this.map;
    a.size = this.size;
    a.sizeAttenuation = this.sizeAttenuation;
    a.vertexColors = this.vertexColors;
    a.fog = this.fog;
    return a;
};
THREE.ParticleCanvasMaterial = function (a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.program = function () {};
    this.setValues(a);
};
THREE.ParticleCanvasMaterial.prototype = Object.create(
    THREE.Material.prototype
);
THREE.ParticleCanvasMaterial.prototype.clone = function () {
    var a = new THREE.ParticleCanvasMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.program = this.program;
    return a;
};
THREE.ParticleDOMMaterial = function (a) {
    this.element = a;
};
THREE.ParticleDOMMaterial.prototype.clone = function () {
    return new THREE.ParticleDOMMaterial(this.element);
};
THREE.ShaderMaterial = function (a) {
    THREE.Material.call(this);
    this.vertexShader = this.fragmentShader = "void main() {}";
    this.uniforms = {};
    this.attributes = null;
    this.shading = THREE.SmoothShading;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.lights = this.fog = false;
    this.vertexColors = THREE.NoColors;
    this.morphNormals = this.morphTargets = this.skinning = false;
    this.setValues(a);
};
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ShaderMaterial.prototype.clone = function () {
    var a = new THREE.ShaderMaterial();
    THREE.Material.prototype.clone.call(this, a);
    a.fragmentShader = this.fragmentShader;
    a.vertexShader = this.vertexShader;
    a.uniforms = this.uniforms;
    a.attributes = this.attributes;
    a.shading = this.shading;
    a.wireframe = this.wireframe;
    a.wireframeLinewidth = this.wireframeLinewidth;
    a.fog = this.fog;
    a.lights = this.lights;
    a.vertexColors = this.vertexColors;
    a.skinning = this.skinning;
    a.morphTargets = this.morphTargets;
    a.morphNormals = this.morphNormals;
    return a;
};
THREE.Texture = function (a, b, c, d, f, e, g, h, i) {
    this.id = THREE.TextureCount++;
    this.image = a;
    this.mapping = b !== void 0 ? b : new THREE.UVMapping();
    this.wrapS = c !== void 0 ? c : THREE.ClampToEdgeWrapping;
    this.wrapT = d !== void 0 ? d : THREE.ClampToEdgeWrapping;
    this.magFilter = f !== void 0 ? f : THREE.LinearFilter;
    this.minFilter = e !== void 0 ? e : THREE.LinearMipMapLinearFilter;
    this.anisotropy = i !== void 0 ? i : 1;
    this.format = g !== void 0 ? g : THREE.RGBAFormat;
    this.type = h !== void 0 ? h : THREE.UnsignedByteType;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.generateMipmaps = true;
    this.premultiplyAlpha = false;
    this.flipY = true;
    this.needsUpdate = false;
    this.onUpdate = null;
};
THREE.Texture.prototype = {
    constructor: THREE.Texture,
    clone: function () {
        var a = new THREE.Texture();
        a.image = this.image;
        a.mapping = this.mapping;
        a.wrapS = this.wrapS;
        a.wrapT = this.wrapT;
        a.magFilter = this.magFilter;
        a.minFilter = this.minFilter;
        a.anisotropy = this.anisotropy;
        a.format = this.format;
        a.type = this.type;
        a.offset.copy(this.offset);
        a.repeat.copy(this.repeat);
        a.generateMipmaps = this.generateMipmaps;
        a.premultiplyAlpha = this.premultiplyAlpha;
        a.flipY = this.flipY;
        return a;
    }
};
THREE.TextureCount = 0;
THREE.CompressedTexture = function (a, b, c, d, f, e, g, h, i, j) {
    THREE.Texture.call(this, null, e, g, h, i, j, d, f);
    this.image = { width: b, height: c };
    this.mipmaps = a;
};
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.CompressedTexture.prototype.clone = function () {
    var a = new THREE.CompressedTexture();
    a.image = this.image;
    a.mipmaps = this.mipmaps;
    a.format = this.format;
    a.type = this.type;
    a.mapping = this.mapping;
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.anisotropy = this.anisotropy;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    return a;
};
THREE.DataTexture = function (a, b, c, d, f, e, g, h, i, j) {
    THREE.Texture.call(this, null, e, g, h, i, j, d, f);
    this.image = { data: a, width: b, height: c };
};
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype);
THREE.DataTexture.prototype.clone = function () {
    var a = new THREE.DataTexture(
        this.image.data,
        this.image.width,
        this.image.height,
        this.format,
        this.type,
        this.mapping,
        this.wrapS,
        this.wrapT,
        this.magFilter,
        this.minFilter
    );
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    return a;
};
THREE.Particle = function (a) {
    THREE.Object3D.call(this);
    this.material = a;
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.ParticleSystem = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material =
        b !== void 0
            ? b
            : new THREE.ParticleBasicMaterial({
                    color: Math.random() * 16777215
                });
    this.sortParticles = false;
    if (this.geometry) {
        this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
        this.boundRadius = a.boundingSphere.radius;
    }
    this.frustumCulled = false;
};
THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line = function (a, b, c) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material =
        b !== void 0
            ? b
            : new THREE.LineBasicMaterial({ color: Math.random() * 16777215 });
    this.type = c !== void 0 ? c : THREE.LineStrip;
    this.geometry &&
        (this.geometry.boundingSphere || this.geometry.computeBoundingSphere());
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material =
        b !== void 0
            ? b
            : new THREE.MeshBasicMaterial({
                    color: Math.random() * 16777215,
                    wireframe: true
                });
    if (this.geometry) {
        this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
        this.boundRadius = a.boundingSphere.radius;
        if (this.geometry.morphTargets.length) {
            this.morphTargetBase = -1;
            this.morphTargetForcedOrder = [];
            this.morphTargetInfluences = [];
            this.morphTargetDictionary = {};
            for (var c = 0; c < this.geometry.morphTargets.length; c++) {
                this.morphTargetInfluences.push(0);
                this.morphTargetDictionary[this.geometry.morphTargets[c].name] =
                    c;
            }
        }
    }
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
    if (this.morphTargetDictionary[a] !== void 0)
        return this.morphTargetDictionary[a];
    console.log(
        "THREE.Mesh.getMorphTargetIndexByName: morph target " +
            a +
            " does not exist. Returning 0."
    );
    return 0;
};
THREE.Bone = function (a) {
    THREE.Object3D.call(this);
    this.skin = a;
    this.skinMatrix = new THREE.Matrix4();
};
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype);
THREE.Bone.prototype.update = function (a, b) {
    this.matrixAutoUpdate && (b = b | this.updateMatrix());
    if (b || this.matrixWorldNeedsUpdate) {
        a
            ? this.skinMatrix.multiply(a, this.matrix)
            : this.skinMatrix.copy(this.matrix);
        this.matrixWorldNeedsUpdate = false;
        b = true;
    }
    var c,
        d = this.children.length;
    for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b);
};
THREE.SkinnedMesh = function (a, b, c) {
    THREE.Mesh.call(this, a, b);
    this.useVertexTexture = c !== void 0 ? c : true;
    this.identityMatrix = new THREE.Matrix4();
    this.bones = [];
    this.boneMatrices = [];
    var d, f, e;
    if (this.geometry.bones !== void 0) {
        for (a = 0; a < this.geometry.bones.length; a++) {
            c = this.geometry.bones[a];
            d = c.pos;
            f = c.rotq;
            e = c.scl;
            b = this.addBone();
            b.name = c.name;
            b.position.set(d[0], d[1], d[2]);
            b.quaternion.set(f[0], f[1], f[2], f[3]);
            b.useQuaternion = true;
            e !== void 0 ? b.scale.set(e[0], e[1], e[2]) : b.scale.set(1, 1, 1);
        }
        for (a = 0; a < this.bones.length; a++) {
            c = this.geometry.bones[a];
            b = this.bones[a];
            c.parent === -1 ? this.add(b) : this.bones[c.parent].add(b);
        }
        a = this.bones.length;
        if (this.useVertexTexture) {
            this.boneTextureHeight =
                this.boneTextureWidth =
                a =
                    a > 256 ? 64 : a > 64 ? 32 : a > 16 ? 16 : 8;
            this.boneMatrices = new Float32Array(
                this.boneTextureWidth * this.boneTextureHeight * 4
            );
            this.boneTexture = new THREE.DataTexture(
                this.boneMatrices,
                this.boneTextureWidth,
                this.boneTextureHeight,
                THREE.RGBAFormat,
                THREE.FloatType
            );
            this.boneTexture.minFilter = THREE.NearestFilter;
            this.boneTexture.magFilter = THREE.NearestFilter;
            this.boneTexture.generateMipmaps = false;
            this.boneTexture.flipY = false;
        } else this.boneMatrices = new Float32Array(16 * a);
        this.pose();
    }
};
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.SkinnedMesh.prototype.addBone = function (a) {
    a === void 0 && (a = new THREE.Bone(this));
    this.bones.push(a);
    return a;
};
THREE.SkinnedMesh.prototype.updateMatrixWorld = function (a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) {
        this.parent
            ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix)
            : this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = false;
    }
    for (var a = 0, b = this.children.length; a < b; a++) {
        var c = this.children[a];
        c instanceof THREE.Bone
            ? c.update(this.identityMatrix, false)
            : c.updateMatrixWorld(true);
    }
    if (this.boneInverses == void 0) {
        this.boneInverses = [];
        a = 0;
        for (b = this.bones.length; a < b; a++) {
            c = new THREE.Matrix4();
            c.getInverse(this.bones[a].skinMatrix);
            this.boneInverses.push(c);
        }
    }
    a = 0;
    for (b = this.bones.length; a < b; a++) {
        THREE.SkinnedMesh.offsetMatrix.multiply(
            this.bones[a].skinMatrix,
            this.boneInverses[a]
        );
        THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset(
            this.boneMatrices,
            a * 16
        );
    }
    if (this.useVertexTexture) this.boneTexture.needsUpdate = true;
};
THREE.SkinnedMesh.prototype.pose = function () {
    this.updateMatrixWorld(true);
    for (var a = 0; a < this.geometry.skinIndices.length; a++) {
        var b = this.geometry.skinWeights[a],
            c = 1 / b.lengthManhattan();
        c !== Infinity ? b.multiplyScalar(c) : b.set(1);
    }
};
THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4();
THREE.MorphAnimMesh = function (a, b) {
    THREE.Mesh.call(this, a, b);
    this.duration = 1e3;
    this.mirroredLoop = false;
    this.currentKeyframe = this.lastKeyframe = this.time = 0;
    this.direction = 1;
    this.directionBackwards = false;
    this.setFrameRange(0, this.geometry.morphTargets.length - 1);
};
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphAnimMesh.prototype.setFrameRange = function (a, b) {
    this.startKeyframe = a;
    this.endKeyframe = b;
    this.length = this.endKeyframe - this.startKeyframe + 1;
};
THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
    this.direction = 1;
    this.directionBackwards = false;
};
THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
    this.direction = -1;
    this.directionBackwards = true;
};
THREE.MorphAnimMesh.prototype.parseAnimations = function () {
    var a = this.geometry;
    if (!a.animations) a.animations = {};
    for (
        var b,
            c = a.animations,
            d = /([a-z]+)(\d+)/,
            f = 0,
            e = a.morphTargets.length;
        f < e;
        f++
    ) {
        var g = a.morphTargets[f].name.match(d);
        if (g && g.length > 1) {
            g = g[1];
            c[g] || (c[g] = { start: Infinity, end: -Infinity });
            var h = c[g];
            if (f < h.start) h.start = f;
            if (f > h.end) h.end = f;
            b || (b = g);
        }
    }
    a.firstAnimation = b;
};
THREE.MorphAnimMesh.prototype.setAnimationLabel = function (a, b, c) {
    if (!this.geometry.animations) this.geometry.animations = {};
    this.geometry.animations[a] = { start: b, end: c };
};
THREE.MorphAnimMesh.prototype.playAnimation = function (a, b) {
    var c = this.geometry.animations[a];
    if (c) {
        this.setFrameRange(c.start, c.end);
        this.duration = 1e3 * ((c.end - c.start) / b);
        this.time = 0;
    } else console.warn("animation[" + a + "] undefined");
};
THREE.MorphAnimMesh.prototype.updateAnimation = function (a) {
    var b = this.duration / this.length;
    this.time = this.time + this.direction * a;
    if (this.mirroredLoop) {
        if (this.time > this.duration || this.time < 0) {
            this.direction = this.direction * -1;
            if (this.time > this.duration) {
                this.time = this.duration;
                this.directionBackwards = true;
            }
            if (this.time < 0) {
                this.time = 0;
                this.directionBackwards = false;
            }
        }
    } else {
        this.time = this.time % this.duration;
        if (this.time < 0) this.time = this.time + this.duration;
    }
    a =
        this.startKeyframe +
        THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
    if (a !== this.currentKeyframe) {
        this.morphTargetInfluences[this.lastKeyframe] = 0;
        this.morphTargetInfluences[this.currentKeyframe] = 1;
        this.morphTargetInfluences[a] = 0;
        this.lastKeyframe = this.currentKeyframe;
        this.currentKeyframe = a;
    }
    b = (this.time % b) / b;
    this.directionBackwards && (b = 1 - b);
    this.morphTargetInfluences[this.currentKeyframe] = b;
    this.morphTargetInfluences[this.lastKeyframe] = 1 - b;
};
THREE.Ribbon = function (a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = b;
};
THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD = function () {
    THREE.Object3D.call(this);
    this.LODs = [];
};
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype);
THREE.LOD.prototype.addLevel = function (a, b) {
    b === void 0 && (b = 0);
    for (var b = Math.abs(b), c = 0; c < this.LODs.length; c++)
        if (b < this.LODs[c].visibleAtDistance) break;
    this.LODs.splice(c, 0, { visibleAtDistance: b, object3D: a });
    this.add(a);
};
THREE.LOD.prototype.update = function (a) {
    if (this.LODs.length > 1) {
        a.matrixWorldInverse.getInverse(a.matrixWorld);
        a = a.matrixWorldInverse;
        a = -(
            a.elements[2] * this.matrixWorld.elements[12] +
            a.elements[6] * this.matrixWorld.elements[13] +
            a.elements[10] * this.matrixWorld.elements[14] +
            a.elements[14]
        );
        this.LODs[0].object3D.visible = true;
        for (var b = 1; b < this.LODs.length; b++)
            if (a >= this.LODs[b].visibleAtDistance) {
                this.LODs[b - 1].object3D.visible = false;
                this.LODs[b].object3D.visible = true;
            } else break;
        for (; b < this.LODs.length; b++) this.LODs[b].object3D.visible = false;
    }
};
THREE.Sprite = function (a) {
    THREE.Object3D.call(this);
    this.color =
        a.color !== void 0
            ? new THREE.Color(a.color)
            : new THREE.Color(16777215);
    this.map = a.map !== void 0 ? a.map : new THREE.Texture();
    this.blending = a.blending !== void 0 ? a.blending : THREE.NormalBlending;
    this.blendSrc = a.blendSrc !== void 0 ? a.blendSrc : THREE.SrcAlphaFactor;
    this.blendDst =
        a.blendDst !== void 0 ? a.blendDst : THREE.OneMinusSrcAlphaFactor;
    this.blendEquation =
        a.blendEquation !== void 0 ? a.blendEquation : THREE.AddEquation;
    this.useScreenCoordinates =
        a.useScreenCoordinates !== void 0 ? a.useScreenCoordinates : true;
    this.mergeWith3D =
        a.mergeWith3D !== void 0 ? a.mergeWith3D : !this.useScreenCoordinates;
    this.affectedByDistance =
        a.affectedByDistance !== void 0
            ? a.affectedByDistance
            : !this.useScreenCoordinates;
    this.scaleByViewport =
        a.scaleByViewport !== void 0
            ? a.scaleByViewport
            : !this.affectedByDistance;
    this.alignment =
        a.alignment instanceof THREE.Vector2
            ? a.alignment
            : THREE.SpriteAlignment.center;
    this.rotation3d = this.rotation;
    this.rotation = 0;
    this.opacity = 1;
    this.uvOffset = new THREE.Vector2(0, 0);
    this.uvScale = new THREE.Vector2(1, 1);
};
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype);
THREE.Sprite.prototype.updateMatrix = function () {
    this.matrix.setPosition(this.position);
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d);
    if (this.scale.x !== 1 || this.scale.y !== 1) {
        this.matrix.scale(this.scale);
        this.boundRadiusScale = Math.max(this.scale.x, this.scale.y);
    }
    this.matrixWorldNeedsUpdate = true;
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function () {
    THREE.Object3D.call(this);
    this.overrideMaterial = this.fog = null;
    this.matrixAutoUpdate = false;
    this.__objects = [];
    this.__lights = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = [];
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function (a) {
    if (a instanceof THREE.Light) {
        this.__lights.indexOf(a) === -1 && this.__lights.push(a);
        a.target && a.target.parent === void 0 && this.add(a.target);
    } else if (
        !(a instanceof THREE.Camera || a instanceof THREE.Bone) &&
        this.__objects.indexOf(a) === -1
    ) {
        this.__objects.push(a);
        this.__objectsAdded.push(a);
        var b = this.__objectsRemoved.indexOf(a);
        b !== -1 && this.__objectsRemoved.splice(b, 1);
    }
    for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b]);
};
THREE.Scene.prototype.__removeObject = function (a) {
    if (a instanceof THREE.Light) {
        var b = this.__lights.indexOf(a);
        b !== -1 && this.__lights.splice(b, 1);
    } else if (!(a instanceof THREE.Camera)) {
        b = this.__objects.indexOf(a);
        if (b !== -1) {
            this.__objects.splice(b, 1);
            this.__objectsRemoved.push(a);
            b = this.__objectsAdded.indexOf(a);
            b !== -1 && this.__objectsAdded.splice(b, 1);
        }
    }
    for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b]);
};
THREE.Fog = function (a, b, c) {
    this.color = new THREE.Color(a);
    this.near = b !== void 0 ? b : 1;
    this.far = c !== void 0 ? c : 1e3;
};
THREE.FogExp2 = function (a, b) {
    this.color = new THREE.Color(a);
    this.density = b !== void 0 ? b : 2.5e-4;
};
THREE.CanvasRenderer = function (a) {
    function b(a) {
        if (u !== a) u = o.globalAlpha = a;
    }
    function c(a) {
        if (w !== a) {
            if (a === THREE.NormalBlending)
                o.globalCompositeOperation = "source-over";
            else if (a === THREE.AdditiveBlending)
                o.globalCompositeOperation = "lighter";
            else if (a === THREE.SubtractiveBlending)
                o.globalCompositeOperation = "darker";
            w = a;
        }
    }
    function d(a) {
        if (s !== a) s = o.strokeStyle = a;
    }
    function f(a) {
        if (B !== a) B = o.fillStyle = a;
    }
    var a = a || {},
        e = this,
        g,
        h,
        i,
        j = new THREE.Projector(),
        l = a.canvas !== void 0 ? a.canvas : document.createElement("canvas"),
        n,
        m,
        q,
        p,
        o = l.getContext("2d"),
        r = new THREE.Color(0),
        t = 0,
        u = 1,
        w = 0,
        s = null,
        B = null,
        v = null,
        A = null,
        E = null,
        z,
        M,
        D,
        G,
        H = new THREE.RenderableVertex(),
        O = new THREE.RenderableVertex(),
        F,
        J,
        I,
        K,
        V,
        Y,
        $,
        L,
        ba,
        Q,
        fa,
        ta,
        da = new THREE.Color(),
        ga = new THREE.Color(),
        N = new THREE.Color(),
        U = new THREE.Color(),
        ia = new THREE.Color(),
        Ia = {},
        pa = {},
        ua,
        Ca,
        Ja,
        Xa,
        ja,
        pb,
        Oa,
        Ya,
        wb,
        xb,
        fb = new THREE.Rectangle(),
        Fa = new THREE.Rectangle(),
        xa = new THREE.Rectangle(),
        qb = false,
        Ga = new THREE.Color(),
        $a = new THREE.Color(),
        rb = new THREE.Color(),
        Da = new THREE.Vector3(),
        ab,
        bb,
        gb,
        Pa,
        Qa,
        hb,
        a = 16;
    ab = document.createElement("canvas");
    ab.width = ab.height = 2;
    bb = ab.getContext("2d");
    bb.fillStyle = "rgba(0,0,0,1)";
    bb.fillRect(0, 0, 2, 2);
    gb = bb.getImageData(0, 0, 2, 2);
    Pa = gb.data;
    Qa = document.createElement("canvas");
    Qa.width = Qa.height = a;
    hb = Qa.getContext("2d");
    hb.translate(-a / 2, -a / 2);
    hb.scale(a, a);
    a--;
    this.domElement = l;
    this.sortElements = this.sortObjects = this.autoClear = true;
    this.info = { render: { vertices: 0, faces: 0 } };
    this.setSize = function (a, b) {
        n = a;
        m = b;
        q = Math.floor(n / 2);
        p = Math.floor(m / 2);
        l.width = n;
        l.height = m;
        fb.set(-q, -p, q, p);
        Fa.set(-q, -p, q, p);
        u = 1;
        w = 0;
        E = A = v = B = s = null;
    };
    this.setClearColor = function (a, b) {
        r.copy(a);
        t = b !== void 0 ? b : 1;
        Fa.set(-q, -p, q, p);
    };
    this.setClearColorHex = function (a, b) {
        r.setHex(a);
        t = b !== void 0 ? b : 1;
        Fa.set(-q, -p, q, p);
    };
    this.getMaxAnisotropy = function () {
        return 0;
    };
    this.clear = function () {
        o.setTransform(1, 0, 0, -1, q, p);
        if (Fa.isEmpty() === false) {
            Fa.minSelf(fb);
            Fa.inflate(2);
            t < 1 &&
                o.clearRect(
                    Math.floor(Fa.getX()),
                    Math.floor(Fa.getY()),
                    Math.floor(Fa.getWidth()),
                    Math.floor(Fa.getHeight())
                );
            if (t > 0) {
                c(THREE.NormalBlending);
                b(1);
                f(
                    "rgba(" +
                        Math.floor(r.r * 255) +
                        "," +
                        Math.floor(r.g * 255) +
                        "," +
                        Math.floor(r.b * 255) +
                        "," +
                        t +
                        ")"
                );
                o.fillRect(
                    Math.floor(Fa.getX()),
                    Math.floor(Fa.getY()),
                    Math.floor(Fa.getWidth()),
                    Math.floor(Fa.getHeight())
                );
            }
            Fa.empty();
        }
    };
    this.render = function (a, k) {
        function l(a, b, c) {
            for (var d = 0, f = i.length; d < f; d++) {
                var e = i[d],
                    g = e.color;
                if (e instanceof THREE.DirectionalLight) {
                    var h = e.matrixWorld.getPosition().normalize(),
                        k = b.dot(h);
                    if (!(k <= 0)) {
                        k = k * e.intensity;
                        c.r = c.r + g.r * k;
                        c.g = c.g + g.g * k;
                        c.b = c.b + g.b * k;
                    }
                } else if (e instanceof THREE.PointLight) {
                    h = e.matrixWorld.getPosition();
                    k = b.dot(Da.sub(h, a).normalize());
                    if (!(k <= 0)) {
                        k =
                            k *
                            (e.distance == 0
                                ? 1
                                : 1 -
                                    Math.min(a.distanceTo(h) / e.distance, 1));
                        if (k != 0) {
                            k = k * e.intensity;
                            c.r = c.r + g.r * k;
                            c.g = c.g + g.g * k;
                            c.b = c.b + g.b * k;
                        }
                    }
                }
            }
        }
        function n(a, d, f, g, h, i, j, o) {
            e.info.render.vertices = e.info.render.vertices + 3;
            e.info.render.faces++;
            b(o.opacity);
            c(o.blending);
            F = a.positionScreen.x;
            J = a.positionScreen.y;
            I = d.positionScreen.x;
            K = d.positionScreen.y;
            V = f.positionScreen.x;
            Y = f.positionScreen.y;
            m(F, J, I, K, V, Y);
            if (
                (o instanceof THREE.MeshLambertMaterial ||
                    o instanceof THREE.MeshPhongMaterial) &&
                o.map === null &&
                o.map === null
            )
                if (qb === true) {
                    g = o.color;
                    h = o.emissive;
                    if (
                        o.wireframe === false &&
                        o.shading == THREE.SmoothShading &&
                        j.vertexNormalsLength == 3
                    ) {
                        ga.r = N.r = U.r = Ga.r;
                        ga.g = N.g = U.g = Ga.g;
                        ga.b = N.b = U.b = Ga.b;
                        l(j.v1.positionWorld, j.vertexNormalsWorld[0], ga);
                        l(j.v2.positionWorld, j.vertexNormalsWorld[1], N);
                        l(j.v3.positionWorld, j.vertexNormalsWorld[2], U);
                        ga.r = g.r * ga.r + h.r;
                        ga.g = g.g * ga.g + h.g;
                        ga.b = g.b * ga.b + h.b;
                        N.r = g.r * N.r + h.r;
                        N.g = g.g * N.g + h.g;
                        N.b = g.b * N.b + h.b;
                        U.r = g.r * U.r + h.r;
                        U.g = g.g * U.g + h.g;
                        U.b = g.b * U.b + h.b;
                        ia.r = (N.r + U.r) * 0.5;
                        ia.g = (N.g + U.g) * 0.5;
                        ia.b = (N.b + U.b) * 0.5;
                        Ja = va(ga, N, U, ia);
                        w(F, J, I, K, V, Y, 0, 0, 1, 0, 0, 1, Ja);
                    } else {
                        da.r = Ga.r;
                        da.g = Ga.g;
                        da.b = Ga.b;
                        l(j.centroidWorld, j.normalWorld, da);
                        da.r = g.r * da.r + h.r;
                        da.g = g.g * da.g + h.g;
                        da.b = g.b * da.b + h.b;
                        o.wireframe === true
                            ? s(
                                    da,
                                    o.wireframeLinewidth,
                                    o.wireframeLinecap,
                                    o.wireframeLinejoin
                                )
                            : t(da);
                    }
                } else
                    o.wireframe === true
                        ? s(
                                o.color,
                                o.wireframeLinewidth,
                                o.wireframeLinecap,
                                o.wireframeLinejoin
                            )
                        : t(o.color);
            else if (
                o instanceof THREE.MeshBasicMaterial ||
                o instanceof THREE.MeshLambertMaterial ||
                o instanceof THREE.MeshPhongMaterial
            )
                if (o.map !== null) {
                    if (o.map.mapping instanceof THREE.UVMapping) {
                        Xa = j.uvs[0];
                        u(
                            F,
                            J,
                            I,
                            K,
                            V,
                            Y,
                            Xa[g].u,
                            Xa[g].v,
                            Xa[h].u,
                            Xa[h].v,
                            Xa[i].u,
                            Xa[i].v,
                            o.map
                        );
                    }
                } else if (o.envMap !== null) {
                    if (
                        o.envMap.mapping instanceof
                        THREE.SphericalReflectionMapping
                    ) {
                        a = k.matrixWorldInverse;
                        Da.copy(j.vertexNormalsWorld[g]);
                        ja =
                            (Da.x * a.elements[0] +
                                Da.y * a.elements[4] +
                                Da.z * a.elements[8]) *
                                0.5 +
                            0.5;
                        pb =
                            (Da.x * a.elements[1] +
                                Da.y * a.elements[5] +
                                Da.z * a.elements[9]) *
                                0.5 +
                            0.5;
                        Da.copy(j.vertexNormalsWorld[h]);
                        Oa =
                            (Da.x * a.elements[0] +
                                Da.y * a.elements[4] +
                                Da.z * a.elements[8]) *
                                0.5 +
                            0.5;
                        Ya =
                            (Da.x * a.elements[1] +
                                Da.y * a.elements[5] +
                                Da.z * a.elements[9]) *
                                0.5 +
                            0.5;
                        Da.copy(j.vertexNormalsWorld[i]);
                        wb =
                            (Da.x * a.elements[0] +
                                Da.y * a.elements[4] +
                                Da.z * a.elements[8]) *
                                0.5 +
                            0.5;
                        xb =
                            (Da.x * a.elements[1] +
                                Da.y * a.elements[5] +
                                Da.z * a.elements[9]) *
                                0.5 +
                            0.5;
                        u(F, J, I, K, V, Y, ja, pb, Oa, Ya, wb, xb, o.envMap);
                    }
                } else
                    o.wireframe === true
                        ? s(
                                o.color,
                                o.wireframeLinewidth,
                                o.wireframeLinecap,
                                o.wireframeLinejoin
                            )
                        : t(o.color);
            else if (o instanceof THREE.MeshDepthMaterial) {
                ua = k.near;
                Ca = k.far;
                ga.r = ga.g = ga.b = 1 - fc(a.positionScreen.z, ua, Ca);
                N.r = N.g = N.b = 1 - fc(d.positionScreen.z, ua, Ca);
                U.r = U.g = U.b = 1 - fc(f.positionScreen.z, ua, Ca);
                ia.r = (N.r + U.r) * 0.5;
                ia.g = (N.g + U.g) * 0.5;
                ia.b = (N.b + U.b) * 0.5;
                Ja = va(ga, N, U, ia);
                w(F, J, I, K, V, Y, 0, 0, 1, 0, 0, 1, Ja);
            } else if (o instanceof THREE.MeshNormalMaterial) {
                da.r = jc(j.normalWorld.x);
                da.g = jc(j.normalWorld.y);
                da.b = jc(j.normalWorld.z);
                o.wireframe === true
                    ? s(
                            da,
                            o.wireframeLinewidth,
                            o.wireframeLinecap,
                            o.wireframeLinejoin
                        )
                    : t(da);
            }
        }
        function m(a, b, c, d, f, e) {
            o.beginPath();
            o.moveTo(a, b);
            o.lineTo(c, d);
            o.lineTo(f, e);
            o.closePath();
        }
        function r(a, b, c, d, f, e, g, h) {
            o.beginPath();
            o.moveTo(a, b);
            o.lineTo(c, d);
            o.lineTo(f, e);
            o.lineTo(g, h);
            o.closePath();
        }
        function s(a, b, c, f) {
            if (v !== b) v = o.lineWidth = b;
            if (A !== c) A = o.lineCap = c;
            if (E !== f) E = o.lineJoin = f;
            d(a.getContextStyle());
            o.stroke();
            xa.inflate(b * 2);
        }
        function t(a) {
            f(a.getContextStyle());
            o.fill();
        }
        function u(a, b, c, d, e, g, h, i, k, j, l, n, m) {
            if (
                !(
                    m instanceof THREE.DataTexture ||
                    m.image === void 0 ||
                    m.image.width == 0
                )
            ) {
                if (m.needsUpdate === true) {
                    var va = m.wrapS == THREE.RepeatWrapping,
                        p = m.wrapT == THREE.RepeatWrapping;
                    Ia[m.id] = o.createPattern(
                        m.image,
                        va === true && p === true
                            ? "repeat"
                            : va === true && p === false
                                ? "repeat-x"
                                : va === false && p === true
                                    ? "repeat-y"
                                    : "no-repeat"
                    );
                    m.needsUpdate = false;
                }
                Ia[m.id] === void 0 ? f("rgba(0,0,0,1)") : f(Ia[m.id]);
                var va = m.offset.x / m.repeat.x,
                    p = m.offset.y / m.repeat.y,
                    q = m.image.width * m.repeat.x,
                    sb = m.image.height * m.repeat.y,
                    h = (h + va) * q,
                    i = (1 - i + p) * sb,
                    c = c - a,
                    d = d - b,
                    e = e - a,
                    g = g - b,
                    k = (k + va) * q - h,
                    j = (1 - j + p) * sb - i,
                    l = (l + va) * q - h,
                    n = (1 - n + p) * sb - i,
                    va = k * n - l * j;
                if (va === 0) {
                    if (pa[m.id] === void 0) {
                        b = document.createElement("canvas");
                        b.width = m.image.width;
                        b.height = m.image.height;
                        b = b.getContext("2d");
                        b.drawImage(m.image, 0, 0);
                        pa[m.id] = b.getImageData(
                            0,
                            0,
                            m.image.width,
                            m.image.height
                        ).data;
                    }
                    b = pa[m.id];
                    h = (Math.floor(h) + Math.floor(i) * m.image.width) * 4;
                    da.setRGB(b[h] / 255, b[h + 1] / 255, b[h + 2] / 255);
                    t(da);
                } else {
                    va = 1 / va;
                    m = (n * c - j * e) * va;
                    j = (n * d - j * g) * va;
                    c = (k * e - l * c) * va;
                    d = (k * g - l * d) * va;
                    a = a - m * h - c * i;
                    h = b - j * h - d * i;
                    o.save();
                    o.transform(m, j, c, d, a, h);
                    o.fill();
                    o.restore();
                }
            }
        }
        function w(a, b, c, d, f, e, g, h, i, k, j, l, m) {
            var n, va;
            n = m.width - 1;
            va = m.height - 1;
            g = g * n;
            h = h * va;
            c = c - a;
            d = d - b;
            f = f - a;
            e = e - b;
            i = i * n - g;
            k = k * va - h;
            j = j * n - g;
            l = l * va - h;
            va = 1 / (i * l - j * k);
            n = (l * c - k * f) * va;
            k = (l * d - k * e) * va;
            c = (i * f - j * c) * va;
            d = (i * e - j * d) * va;
            a = a - n * g - c * h;
            b = b - k * g - d * h;
            o.save();
            o.transform(n, k, c, d, a, b);
            o.clip();
            o.drawImage(m, 0, 0);
            o.restore();
        }
        function va(a, b, c, d) {
            Pa[0] = (a.r * 255) | 0;
            Pa[1] = (a.g * 255) | 0;
            Pa[2] = (a.b * 255) | 0;
            Pa[4] = (b.r * 255) | 0;
            Pa[5] = (b.g * 255) | 0;
            Pa[6] = (b.b * 255) | 0;
            Pa[8] = (c.r * 255) | 0;
            Pa[9] = (c.g * 255) | 0;
            Pa[10] = (c.b * 255) | 0;
            Pa[12] = (d.r * 255) | 0;
            Pa[13] = (d.g * 255) | 0;
            Pa[14] = (d.b * 255) | 0;
            bb.putImageData(gb, 0, 0);
            hb.drawImage(ab, 0, 0);
            return Qa;
        }
        function fc(a, b, c) {
            a = (a - b) / (c - b);
            return a * a * (3 - 2 * a);
        }
        function jc(a) {
            a = (a + 1) * 0.5;
            return a < 0 ? 0 : a > 1 ? 1 : a;
        }
        function sb(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y,
                f = c * c + d * d;
            if (f !== 0) {
                f = 1 / Math.sqrt(f);
                c = c * f;
                d = d * f;
                b.x = b.x + c;
                b.y = b.y + d;
                a.x = a.x - c;
                a.y = a.y - d;
            }
        }
        if (k instanceof THREE.Camera === false)
            console.error(
                "THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera."
            );
        else {
            var Vb, Ec, B, X;
            this.autoClear === true
                ? this.clear()
                : o.setTransform(1, 0, 0, -1, q, p);
            e.info.render.vertices = 0;
            e.info.render.faces = 0;
            g = j.projectScene(a, k, this.sortObjects, this.sortElements);
            h = g.elements;
            i = g.lights;
            qb = i.length > 0;
            if (qb === true) {
                Ga.setRGB(0, 0, 0);
                $a.setRGB(0, 0, 0);
                rb.setRGB(0, 0, 0);
                Vb = 0;
                for (Ec = i.length; Vb < Ec; Vb++) {
                    X = i[Vb];
                    var ca = X.color;
                    if (X instanceof THREE.AmbientLight) {
                        Ga.r = Ga.r + ca.r;
                        Ga.g = Ga.g + ca.g;
                        Ga.b = Ga.b + ca.b;
                    } else if (X instanceof THREE.DirectionalLight) {
                        $a.r = $a.r + ca.r;
                        $a.g = $a.g + ca.g;
                        $a.b = $a.b + ca.b;
                    } else if (X instanceof THREE.PointLight) {
                        rb.r = rb.r + ca.r;
                        rb.g = rb.g + ca.g;
                        rb.b = rb.b + ca.b;
                    }
                }
            }
            Vb = 0;
            for (Ec = h.length; Vb < Ec; Vb++) {
                B = h[Vb];
                X = B.material;
                if (!(X === void 0 || X.visible === false)) {
                    xa.empty();
                    if (B instanceof THREE.RenderableParticle) {
                        z = B;
                        z.x = z.x * q;
                        z.y = z.y * p;
                        var ca = z,
                            oa = B;
                        b(X.opacity);
                        c(X.blending);
                        var Ea = void 0,
                            tb = void 0,
                            jb = void 0,
                            kb = void 0,
                            Wb = void 0,
                            Tc = (B = void 0);
                        if (X instanceof THREE.ParticleBasicMaterial)
                            if (X.map === null) {
                                jb = oa.object.scale.x;
                                kb = oa.object.scale.y;
                                jb = jb * oa.scale.x * q;
                                kb = kb * oa.scale.y * p;
                                xa.set(
                                    ca.x - jb,
                                    ca.y - kb,
                                    ca.x + jb,
                                    ca.y + kb
                                );
                                if (fb.intersects(xa) !== false) {
                                    f(X.color.getContextStyle());
                                    o.save();
                                    o.translate(ca.x, ca.y);
                                    o.rotate(-oa.rotation);
                                    o.scale(jb, kb);
                                    o.fillRect(-1, -1, 2, 2);
                                    o.restore();
                                }
                            } else {
                                Wb = X.map.image;
                                B = Wb.width >> 1;
                                Tc = Wb.height >> 1;
                                jb = oa.scale.x * q;
                                kb = oa.scale.y * p;
                                Ea = jb * B;
                                tb = kb * Tc;
                                xa.set(
                                    ca.x - Ea,
                                    ca.y - tb,
                                    ca.x + Ea,
                                    ca.y + tb
                                );
                                if (fb.intersects(xa) !== false) {
                                    o.save();
                                    o.translate(ca.x, ca.y);
                                    o.rotate(-oa.rotation);
                                    o.scale(jb, -kb);
                                    o.translate(-B, -Tc);
                                    o.drawImage(Wb, 0, 0);
                                    o.restore();
                                }
                            }
                        else if (X instanceof THREE.ParticleCanvasMaterial) {
                            Ea = oa.scale.x * q;
                            tb = oa.scale.y * p;
                            xa.set(ca.x - Ea, ca.y - tb, ca.x + Ea, ca.y + tb);
                            if (fb.intersects(xa) !== false) {
                                d(X.color.getContextStyle());
                                f(X.color.getContextStyle());
                                o.save();
                                o.translate(ca.x, ca.y);
                                o.rotate(-oa.rotation);
                                o.scale(Ea, tb);
                                X.program(o);
                                o.restore();
                            }
                        }
                    } else if (B instanceof THREE.RenderableLine) {
                        z = B.v1;
                        M = B.v2;
                        z.positionScreen.x = z.positionScreen.x * q;
                        z.positionScreen.y = z.positionScreen.y * p;
                        M.positionScreen.x = M.positionScreen.x * q;
                        M.positionScreen.y = M.positionScreen.y * p;
                        xa.addPoint(z.positionScreen.x, z.positionScreen.y);
                        xa.addPoint(M.positionScreen.x, M.positionScreen.y);
                        if (fb.intersects(xa) === true) {
                            ca = z;
                            oa = M;
                            b(X.opacity);
                            c(X.blending);
                            o.beginPath();
                            o.moveTo(ca.positionScreen.x, ca.positionScreen.y);
                            o.lineTo(oa.positionScreen.x, oa.positionScreen.y);
                            if (X instanceof THREE.LineBasicMaterial) {
                                ca = X.linewidth;
                                if (v !== ca) v = o.lineWidth = ca;
                                ca = X.linecap;
                                if (A !== ca) A = o.lineCap = ca;
                                ca = X.linejoin;
                                if (E !== ca) E = o.lineJoin = ca;
                                d(X.color.getContextStyle());
                                o.stroke();
                                xa.inflate(X.linewidth * 2);
                            }
                        }
                    } else if (B instanceof THREE.RenderableFace3) {
                        z = B.v1;
                        M = B.v2;
                        D = B.v3;
                        z.positionScreen.x = z.positionScreen.x * q;
                        z.positionScreen.y = z.positionScreen.y * p;
                        M.positionScreen.x = M.positionScreen.x * q;
                        M.positionScreen.y = M.positionScreen.y * p;
                        D.positionScreen.x = D.positionScreen.x * q;
                        D.positionScreen.y = D.positionScreen.y * p;
                        if (X.overdraw === true) {
                            sb(z.positionScreen, M.positionScreen);
                            sb(M.positionScreen, D.positionScreen);
                            sb(D.positionScreen, z.positionScreen);
                        }
                        xa.add3Points(
                            z.positionScreen.x,
                            z.positionScreen.y,
                            M.positionScreen.x,
                            M.positionScreen.y,
                            D.positionScreen.x,
                            D.positionScreen.y
                        );
                        fb.intersects(xa) === true &&
                            n(z, M, D, 0, 1, 2, B, X, a);
                    } else if (B instanceof THREE.RenderableFace4) {
                        z = B.v1;
                        M = B.v2;
                        D = B.v3;
                        G = B.v4;
                        z.positionScreen.x = z.positionScreen.x * q;
                        z.positionScreen.y = z.positionScreen.y * p;
                        M.positionScreen.x = M.positionScreen.x * q;
                        M.positionScreen.y = M.positionScreen.y * p;
                        D.positionScreen.x = D.positionScreen.x * q;
                        D.positionScreen.y = D.positionScreen.y * p;
                        G.positionScreen.x = G.positionScreen.x * q;
                        G.positionScreen.y = G.positionScreen.y * p;
                        H.positionScreen.copy(M.positionScreen);
                        O.positionScreen.copy(G.positionScreen);
                        if (X.overdraw === true) {
                            sb(z.positionScreen, M.positionScreen);
                            sb(M.positionScreen, G.positionScreen);
                            sb(G.positionScreen, z.positionScreen);
                            sb(D.positionScreen, H.positionScreen);
                            sb(D.positionScreen, O.positionScreen);
                        }
                        xa.addPoint(z.positionScreen.x, z.positionScreen.y);
                        xa.addPoint(M.positionScreen.x, M.positionScreen.y);
                        xa.addPoint(D.positionScreen.x, D.positionScreen.y);
                        xa.addPoint(G.positionScreen.x, G.positionScreen.y);
                        if (fb.intersects(xa) === true) {
                            oa = z;
                            Ea = M;
                            tb = D;
                            jb = G;
                            kb = H;
                            Wb = O;
                            ca = B;
                            B = a;
                            e.info.render.vertices = e.info.render.vertices + 4;
                            e.info.render.faces++;
                            b(X.opacity);
                            c(X.blending);
                            if (
                                (X.map !== void 0 && X.map !== null) ||
                                (X.envMap !== void 0 && X.envMap !== null)
                            ) {
                                n(oa, Ea, jb, 0, 1, 3, ca, X, B);
                                n(kb, tb, Wb, 1, 2, 3, ca, X, B);
                            } else {
                                F = oa.positionScreen.x;
                                J = oa.positionScreen.y;
                                I = Ea.positionScreen.x;
                                K = Ea.positionScreen.y;
                                V = tb.positionScreen.x;
                                Y = tb.positionScreen.y;
                                $ = jb.positionScreen.x;
                                L = jb.positionScreen.y;
                                ba = kb.positionScreen.x;
                                Q = kb.positionScreen.y;
                                fa = Wb.positionScreen.x;
                                ta = Wb.positionScreen.y;
                                if (
                                    X instanceof THREE.MeshLambertMaterial ||
                                    X instanceof THREE.MeshPhongMaterial
                                )
                                    if (qb === true) {
                                        oa = X.color;
                                        Ea = X.emissive;
                                        if (
                                            X.wireframe === false &&
                                            X.shading == THREE.SmoothShading &&
                                            ca.vertexNormalsLength == 4
                                        ) {
                                            ga.r = N.r = U.r = ia.r = Ga.r;
                                            ga.g = N.g = U.g = ia.g = Ga.g;
                                            ga.b = N.b = U.b = ia.b = Ga.b;
                                            l(
                                                ca.v1.positionWorld,
                                                ca.vertexNormalsWorld[0],
                                                ga
                                            );
                                            l(
                                                ca.v2.positionWorld,
                                                ca.vertexNormalsWorld[1],
                                                N
                                            );
                                            l(
                                                ca.v4.positionWorld,
                                                ca.vertexNormalsWorld[3],
                                                U
                                            );
                                            l(
                                                ca.v3.positionWorld,
                                                ca.vertexNormalsWorld[2],
                                                ia
                                            );
                                            ga.r = oa.r * ga.r + Ea.r;
                                            ga.g = oa.g * ga.g + Ea.g;
                                            ga.b = oa.b * ga.b + Ea.b;
                                            N.r = oa.r * N.r + Ea.r;
                                            N.g = oa.g * N.g + Ea.g;
                                            N.b = oa.b * N.b + Ea.b;
                                            U.r = oa.r * U.r + Ea.r;
                                            U.g = oa.g * U.g + Ea.g;
                                            U.b = oa.b * U.b + Ea.b;
                                            ia.r = oa.r * ia.r + Ea.r;
                                            ia.g = oa.g * ia.g + Ea.g;
                                            ia.b = oa.b * ia.b + Ea.b;
                                            Ja = va(ga, N, U, ia);
                                            m(F, J, I, K, $, L);
                                            w(
                                                F,
                                                J,
                                                I,
                                                K,
                                                $,
                                                L,
                                                0,
                                                0,
                                                1,
                                                0,
                                                0,
                                                1,
                                                Ja
                                            );
                                            m(ba, Q, V, Y, fa, ta);
                                            w(
                                                ba,
                                                Q,
                                                V,
                                                Y,
                                                fa,
                                                ta,
                                                1,
                                                0,
                                                1,
                                                1,
                                                0,
                                                1,
                                                Ja
                                            );
                                        } else {
                                            da.r = Ga.r;
                                            da.g = Ga.g;
                                            da.b = Ga.b;
                                            l(
                                                ca.centroidWorld,
                                                ca.normalWorld,
                                                da
                                            );
                                            da.r = oa.r * da.r + Ea.r;
                                            da.g = oa.g * da.g + Ea.g;
                                            da.b = oa.b * da.b + Ea.b;
                                            r(F, J, I, K, V, Y, $, L);
                                            X.wireframe === true
                                                ? s(
                                                        da,
                                                        X.wireframeLinewidth,
                                                        X.wireframeLinecap,
                                                        X.wireframeLinejoin
                                                    )
                                                : t(da);
                                        }
                                    } else {
                                        r(F, J, I, K, V, Y, $, L);
                                        X.wireframe === true
                                            ? s(
                                                    X.color,
                                                    X.wireframeLinewidth,
                                                    X.wireframeLinecap,
                                                    X.wireframeLinejoin
                                                )
                                            : t(X.color);
                                    }
                                else if (X instanceof THREE.MeshBasicMaterial) {
                                    r(F, J, I, K, V, Y, $, L);
                                    X.wireframe === true
                                        ? s(
                                                X.color,
                                                X.wireframeLinewidth,
                                                X.wireframeLinecap,
                                                X.wireframeLinejoin
                                            )
                                        : t(X.color);
                                } else if (
                                    X instanceof THREE.MeshNormalMaterial
                                ) {
                                    da.r = jc(ca.normalWorld.x);
                                    da.g = jc(ca.normalWorld.y);
                                    da.b = jc(ca.normalWorld.z);
                                    r(F, J, I, K, V, Y, $, L);
                                    X.wireframe === true
                                        ? s(
                                                da,
                                                X.wireframeLinewidth,
                                                X.wireframeLinecap,
                                                X.wireframeLinejoin
                                            )
                                        : t(da);
                                } else if (
                                    X instanceof THREE.MeshDepthMaterial
                                ) {
                                    ua = k.near;
                                    Ca = k.far;
                                    ga.r =
                                        ga.g =
                                        ga.b =
                                            1 - fc(oa.positionScreen.z, ua, Ca);
                                    N.r =
                                        N.g =
                                        N.b =
                                            1 - fc(Ea.positionScreen.z, ua, Ca);
                                    U.r =
                                        U.g =
                                        U.b =
                                            1 - fc(jb.positionScreen.z, ua, Ca);
                                    ia.r =
                                        ia.g =
                                        ia.b =
                                            1 - fc(tb.positionScreen.z, ua, Ca);
                                    Ja = va(ga, N, U, ia);
                                    m(F, J, I, K, $, L);
                                    w(F, J, I, K, $, L, 0, 0, 1, 0, 0, 1, Ja);
                                    m(ba, Q, V, Y, fa, ta);
                                    w(
                                        ba,
                                        Q,
                                        V,
                                        Y,
                                        fa,
                                        ta,
                                        1,
                                        0,
                                        1,
                                        1,
                                        0,
                                        1,
                                        Ja
                                    );
                                }
                            }
                        }
                    }
                    Fa.addRectangle(xa);
                }
            }
            o.setTransform(1, 0, 0, 1, 0, 0);
        }
    };
};
THREE.ShaderChunk = {
    fog_pars_fragment:
        "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment:
        "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment:
        "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
    envmap_fragment:
        "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
    envmap_pars_vertex:
        "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    worldpos_vertex:
        "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 mPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 mPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 mPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
    envmap_vertex:
        "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 nWorld = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment:
        "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment:
        "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
    map_pars_vertex:
        "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment:
        "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_vertex:
        "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment:
        "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
    lightmap_pars_fragment:
        "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment:
        "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    bumpmap_pars_fragment:
        "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
    normalmap_pars_fragment:
        "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
    specularmap_pars_fragment:
        "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
    specularmap_fragment:
        "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
    lights_lambert_pars_vertex:
        "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightPosition[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
    lights_lambert_vertex:
        "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nlVector = normalize( lVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - mPosition.xyz ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( hemisphereLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
    lights_phong_pars_vertex:
        "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
    lights_phong_vertex:
        "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = mPosition.xyz;\n#endif",
    lights_phong_pars_fragment:
        "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightPosition[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment:
        "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -viewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( hemisphereLightPosition[ i ], 1.0 );\nvec3 lVector = normalize( lPosition.xyz + vViewPosition.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = normalize( -lPosition.xyz + vViewPosition.xyz );\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment:
        "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex:
        "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex:
        "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
    skinbase_vertex:
        "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
    skinning_vertex:
        "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\n#endif",
    morphtarget_pars_vertex:
        "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
    morphtarget_vertex:
        "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
    default_vertex:
        "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
    morphnormal_vertex:
        "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
    skinnormal_vertex:
        "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix \t+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
    defaultnormal_vertex:
        "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
    shadowmap_pars_fragment:
        "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment:
        "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex:
        "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex:
        "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * mPosition;\n}\n#endif",
    alphatest_fragment:
        "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment:
        "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
};
THREE.UniformsUtils = {
    merge: function (a) {
        var b,
            c,
            d,
            f = {};
        for (b = 0; b < a.length; b++) {
            d = this.clone(a[b]);
            for (c in d) f[c] = d[c];
        }
        return f;
    },
    clone: function (a) {
        var b,
            c,
            d,
            f = {};
        for (b in a) {
            f[b] = {};
            for (c in a[b]) {
                d = a[b][c];
                f[b][c] =
                    d instanceof THREE.Color ||
                    d instanceof THREE.Vector2 ||
                    d instanceof THREE.Vector3 ||
                    d instanceof THREE.Vector4 ||
                    d instanceof THREE.Matrix4 ||
                    d instanceof THREE.Texture
                        ? d.clone()
                        : d instanceof Array
                            ? d.slice()
                            : d;
            }
        }
        return f;
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: { type: "c", value: new THREE.Color(15658734) },
        opacity: { type: "f", value: 1 },
        map: { type: "t", value: null },
        offsetRepeat: { type: "v4", value: new THREE.Vector4(0, 0, 1, 1) },
        lightMap: { type: "t", value: null },
        specularMap: { type: "t", value: null },
        envMap: { type: "t", value: null },
        flipEnvMap: { type: "f", value: -1 },
        useRefract: { type: "i", value: 0 },
        reflectivity: { type: "f", value: 1 },
        refractionRatio: { type: "f", value: 0.98 },
        combine: { type: "i", value: 0 },
        morphTargetInfluences: { type: "f", value: 0 }
    },
    bump: {
        bumpMap: { type: "t", value: null },
        bumpScale: { type: "f", value: 1 }
    },
    normalmap: {
        normalMap: { type: "t", value: null },
        normalScale: { type: "v2", value: new THREE.Vector2(1, 1) }
    },
    fog: {
        fogDensity: { type: "f", value: 2.5e-4 },
        fogNear: { type: "f", value: 1 },
        fogFar: { type: "f", value: 2e3 },
        fogColor: { type: "c", value: new THREE.Color(16777215) }
    },
    lights: {
        ambientLightColor: { type: "fv", value: [] },
        directionalLightDirection: { type: "fv", value: [] },
        directionalLightColor: { type: "fv", value: [] },
        hemisphereLightPosition: { type: "fv", value: [] },
        hemisphereLightSkyColor: { type: "fv", value: [] },
        hemisphereLightGroundColor: { type: "fv", value: [] },
        pointLightColor: { type: "fv", value: [] },
        pointLightPosition: { type: "fv", value: [] },
        pointLightDistance: { type: "fv1", value: [] },
        spotLightColor: { type: "fv", value: [] },
        spotLightPosition: { type: "fv", value: [] },
        spotLightDirection: { type: "fv", value: [] },
        spotLightDistance: { type: "fv1", value: [] },
        spotLightAngle: { type: "fv1", value: [] },
        spotLightExponent: { type: "fv1", value: [] }
    },
    particle: {
        psColor: { type: "c", value: new THREE.Color(15658734) },
        opacity: { type: "f", value: 1 },
        size: { type: "f", value: 1 },
        scale: { type: "f", value: 1 },
        map: { type: "t", value: null },
        fogDensity: { type: "f", value: 2.5e-4 },
        fogNear: { type: "f", value: 1 },
        fogFar: { type: "f", value: 2e3 },
        fogColor: { type: "c", value: new THREE.Color(16777215) }
    },
    shadowmap: {
        shadowMap: { type: "tv", value: [] },
        shadowMapSize: { type: "v2v", value: [] },
        shadowBias: { type: "fv1", value: [] },
        shadowDarkness: { type: "fv1", value: [] },
        shadowMatrix: { type: "m4v", value: [] }
    }
};
THREE.ShaderLib = {
    depth: {
        uniforms: {
            mNear: { type: "f", value: 1 },
            mFar: { type: "f", value: 2e3 },
            opacity: { type: "f", value: 1 }
        },
        vertexShader:
            "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader:
            "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
    },
    normal: {
        uniforms: { opacity: { type: "f", value: 1 } },
        vertexShader:
            "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalMatrix * normal;\ngl_Position = projectionMatrix * mvPosition;\n}",
        fragmentShader:
            "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
    },
    basic: {
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.common,
            THREE.UniformsLib.fog,
            THREE.UniformsLib.shadowmap
        ]),
        vertexShader: [
            THREE.ShaderChunk.map_pars_vertex,
            THREE.ShaderChunk.lightmap_pars_vertex,
            THREE.ShaderChunk.envmap_pars_vertex,
            THREE.ShaderChunk.color_pars_vertex,
            THREE.ShaderChunk.morphtarget_pars_vertex,
            THREE.ShaderChunk.skinning_pars_vertex,
            THREE.ShaderChunk.shadowmap_pars_vertex,
            "void main() {",
            THREE.ShaderChunk.map_vertex,
            THREE.ShaderChunk.lightmap_vertex,
            THREE.ShaderChunk.color_vertex,
            "#ifdef USE_ENVMAP",
            THREE.ShaderChunk.morphnormal_vertex,
            THREE.ShaderChunk.skinbase_vertex,
            THREE.ShaderChunk.skinnormal_vertex,
            THREE.ShaderChunk.defaultnormal_vertex,
            "#endif",
            THREE.ShaderChunk.morphtarget_vertex,
            THREE.ShaderChunk.skinning_vertex,
            THREE.ShaderChunk.default_vertex,
            THREE.ShaderChunk.worldpos_vertex,
            THREE.ShaderChunk.envmap_vertex,
            THREE.ShaderChunk.shadowmap_vertex,
            "}"
        ].join("\n"),
        fragmentShader: [
            "uniform vec3 diffuse;\nuniform float opacity;",
            THREE.ShaderChunk.color_pars_fragment,
            THREE.ShaderChunk.map_pars_fragment,
            THREE.ShaderChunk.lightmap_pars_fragment,
            THREE.ShaderChunk.envmap_pars_fragment,
            THREE.ShaderChunk.fog_pars_fragment,
            THREE.ShaderChunk.shadowmap_pars_fragment,
            THREE.ShaderChunk.specularmap_pars_fragment,
            "void main() {\ngl_FragColor = vec4( diffuse, opacity );",
            THREE.ShaderChunk.map_fragment,
            THREE.ShaderChunk.alphatest_fragment,
            THREE.ShaderChunk.specularmap_fragment,
            THREE.ShaderChunk.lightmap_fragment,
            THREE.ShaderChunk.color_fragment,
            THREE.ShaderChunk.envmap_fragment,
            THREE.ShaderChunk.shadowmap_fragment,
            THREE.ShaderChunk.linear_to_gamma_fragment,
            THREE.ShaderChunk.fog_fragment,
            "}"
        ].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.common,
            THREE.UniformsLib.fog,
            THREE.UniformsLib.lights,
            THREE.UniformsLib.shadowmap,
            {
                ambient: { type: "c", value: new THREE.Color(16777215) },
                emissive: { type: "c", value: new THREE.Color(0) },
                wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) }
            }
        ]),
        vertexShader: [
            "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
            THREE.ShaderChunk.map_pars_vertex,
            THREE.ShaderChunk.lightmap_pars_vertex,
            THREE.ShaderChunk.envmap_pars_vertex,
            THREE.ShaderChunk.lights_lambert_pars_vertex,
            THREE.ShaderChunk.color_pars_vertex,
            THREE.ShaderChunk.morphtarget_pars_vertex,
            THREE.ShaderChunk.skinning_pars_vertex,
            THREE.ShaderChunk.shadowmap_pars_vertex,
            "void main() {",
            THREE.ShaderChunk.map_vertex,
            THREE.ShaderChunk.lightmap_vertex,
            THREE.ShaderChunk.color_vertex,
            THREE.ShaderChunk.morphnormal_vertex,
            THREE.ShaderChunk.skinbase_vertex,
            THREE.ShaderChunk.skinnormal_vertex,
            THREE.ShaderChunk.defaultnormal_vertex,
            THREE.ShaderChunk.morphtarget_vertex,
            THREE.ShaderChunk.skinning_vertex,
            THREE.ShaderChunk.default_vertex,
            THREE.ShaderChunk.worldpos_vertex,
            THREE.ShaderChunk.envmap_vertex,
            THREE.ShaderChunk.lights_lambert_vertex,
            THREE.ShaderChunk.shadowmap_vertex,
            "}"
        ].join("\n"),
        fragmentShader: [
            "uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
            THREE.ShaderChunk.color_pars_fragment,
            THREE.ShaderChunk.map_pars_fragment,
            THREE.ShaderChunk.lightmap_pars_fragment,
            THREE.ShaderChunk.envmap_pars_fragment,
            THREE.ShaderChunk.fog_pars_fragment,
            THREE.ShaderChunk.shadowmap_pars_fragment,
            THREE.ShaderChunk.specularmap_pars_fragment,
            "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
            THREE.ShaderChunk.map_fragment,
            THREE.ShaderChunk.alphatest_fragment,
            THREE.ShaderChunk.specularmap_fragment,
            "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",
            THREE.ShaderChunk.lightmap_fragment,
            THREE.ShaderChunk.color_fragment,
            THREE.ShaderChunk.envmap_fragment,
            THREE.ShaderChunk.shadowmap_fragment,
            THREE.ShaderChunk.linear_to_gamma_fragment,
            THREE.ShaderChunk.fog_fragment,
            "}"
        ].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.common,
            THREE.UniformsLib.bump,
            THREE.UniformsLib.normalmap,
            THREE.UniformsLib.fog,
            THREE.UniformsLib.lights,
            THREE.UniformsLib.shadowmap,
            {
                ambient: { type: "c", value: new THREE.Color(16777215) },
                emissive: { type: "c", value: new THREE.Color(0) },
                specular: { type: "c", value: new THREE.Color(1118481) },
                shininess: { type: "f", value: 30 },
                wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) }
            }
        ]),
        vertexShader: [
            "#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
            THREE.ShaderChunk.map_pars_vertex,
            THREE.ShaderChunk.lightmap_pars_vertex,
            THREE.ShaderChunk.envmap_pars_vertex,
            THREE.ShaderChunk.lights_phong_pars_vertex,
            THREE.ShaderChunk.color_pars_vertex,
            THREE.ShaderChunk.morphtarget_pars_vertex,
            THREE.ShaderChunk.skinning_pars_vertex,
            THREE.ShaderChunk.shadowmap_pars_vertex,
            "void main() {",
            THREE.ShaderChunk.map_vertex,
            THREE.ShaderChunk.lightmap_vertex,
            THREE.ShaderChunk.color_vertex,
            THREE.ShaderChunk.morphnormal_vertex,
            THREE.ShaderChunk.skinbase_vertex,
            THREE.ShaderChunk.skinnormal_vertex,
            THREE.ShaderChunk.defaultnormal_vertex,
            "vNormal = transformedNormal;",
            THREE.ShaderChunk.morphtarget_vertex,
            THREE.ShaderChunk.skinning_vertex,
            THREE.ShaderChunk.default_vertex,
            "vViewPosition = -mvPosition.xyz;",
            THREE.ShaderChunk.worldpos_vertex,
            THREE.ShaderChunk.envmap_vertex,
            THREE.ShaderChunk.lights_phong_vertex,
            THREE.ShaderChunk.shadowmap_vertex,
            "}"
        ].join("\n"),
        fragmentShader: [
            "uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",
            THREE.ShaderChunk.color_pars_fragment,
            THREE.ShaderChunk.map_pars_fragment,
            THREE.ShaderChunk.lightmap_pars_fragment,
            THREE.ShaderChunk.envmap_pars_fragment,
            THREE.ShaderChunk.fog_pars_fragment,
            THREE.ShaderChunk.lights_phong_pars_fragment,
            THREE.ShaderChunk.shadowmap_pars_fragment,
            THREE.ShaderChunk.bumpmap_pars_fragment,
            THREE.ShaderChunk.normalmap_pars_fragment,
            THREE.ShaderChunk.specularmap_pars_fragment,
            "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
            THREE.ShaderChunk.map_fragment,
            THREE.ShaderChunk.alphatest_fragment,
            THREE.ShaderChunk.specularmap_fragment,
            THREE.ShaderChunk.lights_phong_fragment,
            THREE.ShaderChunk.lightmap_fragment,
            THREE.ShaderChunk.color_fragment,
            THREE.ShaderChunk.envmap_fragment,
            THREE.ShaderChunk.shadowmap_fragment,
            THREE.ShaderChunk.linear_to_gamma_fragment,
            THREE.ShaderChunk.fog_fragment,
            "}"
        ].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.particle,
            THREE.UniformsLib.shadowmap
        ]),
        vertexShader: [
            "uniform float size;\nuniform float scale;",
            THREE.ShaderChunk.color_pars_vertex,
            THREE.ShaderChunk.shadowmap_pars_vertex,
            "void main() {",
            THREE.ShaderChunk.color_vertex,
            "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
            THREE.ShaderChunk.worldpos_vertex,
            THREE.ShaderChunk.shadowmap_vertex,
            "}"
        ].join("\n"),
        fragmentShader: [
            "uniform vec3 psColor;\nuniform float opacity;",
            THREE.ShaderChunk.color_pars_fragment,
            THREE.ShaderChunk.map_particle_pars_fragment,
            THREE.ShaderChunk.fog_pars_fragment,
            THREE.ShaderChunk.shadowmap_pars_fragment,
            "void main() {\ngl_FragColor = vec4( psColor, opacity );",
            THREE.ShaderChunk.map_particle_fragment,
            THREE.ShaderChunk.alphatest_fragment,
            THREE.ShaderChunk.color_fragment,
            THREE.ShaderChunk.shadowmap_fragment,
            THREE.ShaderChunk.fog_fragment,
            "}"
        ].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [
            THREE.ShaderChunk.morphtarget_pars_vertex,
            THREE.ShaderChunk.skinning_pars_vertex,
            "void main() {",
            THREE.ShaderChunk.skinbase_vertex,
            THREE.ShaderChunk.morphtarget_vertex,
            THREE.ShaderChunk.skinning_vertex,
            THREE.ShaderChunk.default_vertex,
            "}"
        ].join("\n"),
        fragmentShader:
            "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
    }
};
THREE.WebGLRenderer = function (a) {
    function b(a, b) {
        var c = a.vertices.length,
            d = b.material;
        if (d.attributes) {
            if (a.__webglCustomAttributesList === void 0)
                a.__webglCustomAttributesList = [];
            for (var f in d.attributes) {
                var e = d.attributes[f];
                if (!e.__webglInitialized || e.createUniqueBuffers) {
                    e.__webglInitialized = true;
                    var g = 1;
                    e.type === "v2"
                        ? (g = 2)
                        : e.type === "v3"
                            ? (g = 3)
                            : e.type === "v4"
                                ? (g = 4)
                                : e.type === "c" && (g = 3);
                    e.size = g;
                    e.array = new Float32Array(c * g);
                    e.buffer = k.createBuffer();
                    e.buffer.belongsToAttribute = f;
                    e.needsUpdate = true;
                }
                a.__webglCustomAttributesList.push(e);
            }
        }
    }
    function c(a, b) {
        if (a.material && !(a.material instanceof THREE.MeshFaceMaterial))
            return a.material;
        if (b.materialIndex >= 0) return a.geometry.materials[b.materialIndex];
    }
    function d(a) {
        return (a instanceof THREE.MeshBasicMaterial && !a.envMap) ||
            a instanceof THREE.MeshDepthMaterial
            ? false
            : a && a.shading !== void 0 && a.shading === THREE.SmoothShading
                ? THREE.SmoothShading
                : THREE.FlatShading;
    }
    function f(a) {
        return a.map ||
            a.lightMap ||
            a.bumpMap ||
            a.normalMap ||
            a.specularMap ||
            a instanceof THREE.ShaderMaterial
            ? true
            : false;
    }
    function e(a) {
        var b, c, d;
        for (b in a.attributes) {
            d = b === "index" ? k.ELEMENT_ARRAY_BUFFER : k.ARRAY_BUFFER;
            c = a.attributes[b];
            c.buffer = k.createBuffer();
            k.bindBuffer(d, c.buffer);
            k.bufferData(d, c.array, k.STATIC_DRAW);
        }
    }
    function g(a, b, c) {
        var d,
            f,
            e,
            g,
            h = a.vertices;
        g = h.length;
        var i = a.colors,
            j = i.length,
            l = a.__vertexArray,
            m = a.__colorArray,
            n = a.__sortArray,
            o = a.verticesNeedUpdate,
            p = a.colorsNeedUpdate,
            q = a.__webglCustomAttributesList;
        if (c.sortParticles) {
            gb.copy(bb);
            gb.multiplySelf(c.matrixWorld);
            for (d = 0; d < g; d++) {
                f = h[d];
                Pa.copy(f);
                gb.multiplyVector3(Pa);
                n[d] = [Pa.z, d];
            }
            n.sort(function (a, b) {
                return b[0] - a[0];
            });
            for (d = 0; d < g; d++) {
                f = h[n[d][1]];
                e = d * 3;
                l[e] = f.x;
                l[e + 1] = f.y;
                l[e + 2] = f.z;
            }
            for (d = 0; d < j; d++) {
                e = d * 3;
                f = i[n[d][1]];
                m[e] = f.r;
                m[e + 1] = f.g;
                m[e + 2] = f.b;
            }
            if (q) {
                i = 0;
                for (j = q.length; i < j; i++) {
                    h = q[i];
                    if (h.boundTo === void 0 || h.boundTo === "vertices") {
                        e = 0;
                        f = h.value.length;
                        if (h.size === 1)
                            for (d = 0; d < f; d++) {
                                g = n[d][1];
                                h.array[d] = h.value[g];
                            }
                        else if (h.size === 2)
                            for (d = 0; d < f; d++) {
                                g = n[d][1];
                                g = h.value[g];
                                h.array[e] = g.x;
                                h.array[e + 1] = g.y;
                                e = e + 2;
                            }
                        else if (h.size === 3)
                            if (h.type === "c")
                                for (d = 0; d < f; d++) {
                                    g = n[d][1];
                                    g = h.value[g];
                                    h.array[e] = g.r;
                                    h.array[e + 1] = g.g;
                                    h.array[e + 2] = g.b;
                                    e = e + 3;
                                }
                            else
                                for (d = 0; d < f; d++) {
                                    g = n[d][1];
                                    g = h.value[g];
                                    h.array[e] = g.x;
                                    h.array[e + 1] = g.y;
                                    h.array[e + 2] = g.z;
                                    e = e + 3;
                                }
                        else if (h.size === 4)
                            for (d = 0; d < f; d++) {
                                g = n[d][1];
                                g = h.value[g];
                                h.array[e] = g.x;
                                h.array[e + 1] = g.y;
                                h.array[e + 2] = g.z;
                                h.array[e + 3] = g.w;
                                e = e + 4;
                            }
                    }
                }
            }
        } else {
            if (o)
                for (d = 0; d < g; d++) {
                    f = h[d];
                    e = d * 3;
                    l[e] = f.x;
                    l[e + 1] = f.y;
                    l[e + 2] = f.z;
                }
            if (p)
                for (d = 0; d < j; d++) {
                    f = i[d];
                    e = d * 3;
                    m[e] = f.r;
                    m[e + 1] = f.g;
                    m[e + 2] = f.b;
                }
            if (q) {
                i = 0;
                for (j = q.length; i < j; i++) {
                    h = q[i];
                    if (
                        h.needsUpdate &&
                        (h.boundTo === void 0 || h.boundTo === "vertices")
                    ) {
                        f = h.value.length;
                        e = 0;
                        if (h.size === 1)
                            for (d = 0; d < f; d++) h.array[d] = h.value[d];
                        else if (h.size === 2)
                            for (d = 0; d < f; d++) {
                                g = h.value[d];
                                h.array[e] = g.x;
                                h.array[e + 1] = g.y;
                                e = e + 2;
                            }
                        else if (h.size === 3)
                            if (h.type === "c")
                                for (d = 0; d < f; d++) {
                                    g = h.value[d];
                                    h.array[e] = g.r;
                                    h.array[e + 1] = g.g;
                                    h.array[e + 2] = g.b;
                                    e = e + 3;
                                }
                            else
                                for (d = 0; d < f; d++) {
                                    g = h.value[d];
                                    h.array[e] = g.x;
                                    h.array[e + 1] = g.y;
                                    h.array[e + 2] = g.z;
                                    e = e + 3;
                                }
                        else if (h.size === 4)
                            for (d = 0; d < f; d++) {
                                g = h.value[d];
                                h.array[e] = g.x;
                                h.array[e + 1] = g.y;
                                h.array[e + 2] = g.z;
                                h.array[e + 3] = g.w;
                                e = e + 4;
                            }
                    }
                }
            }
        }
        if (o || c.sortParticles) {
            k.bindBuffer(k.ARRAY_BUFFER, a.__webglVertexBuffer);
            k.bufferData(k.ARRAY_BUFFER, l, b);
        }
        if (p || c.sortParticles) {
            k.bindBuffer(k.ARRAY_BUFFER, a.__webglColorBuffer);
            k.bufferData(k.ARRAY_BUFFER, m, b);
        }
        if (q) {
            i = 0;
            for (j = q.length; i < j; i++) {
                h = q[i];
                if (h.needsUpdate || c.sortParticles) {
                    k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                    k.bufferData(k.ARRAY_BUFFER, h.array, b);
                }
            }
        }
    }
    function h(a, b, c) {
        var d = a.attributes,
            f = d.index,
            e = d.position,
            g = d.normal,
            h = d.uv,
            i = d.color,
            d = d.tangent;
        if (a.elementsNeedUpdate && f !== void 0) {
            k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, f.buffer);
            k.bufferData(k.ELEMENT_ARRAY_BUFFER, f.array, b);
        }
        if (a.verticesNeedUpdate && e !== void 0) {
            k.bindBuffer(k.ARRAY_BUFFER, e.buffer);
            k.bufferData(k.ARRAY_BUFFER, e.array, b);
        }
        if (a.normalsNeedUpdate && g !== void 0) {
            k.bindBuffer(k.ARRAY_BUFFER, g.buffer);
            k.bufferData(k.ARRAY_BUFFER, g.array, b);
        }
        if (a.uvsNeedUpdate && h !== void 0) {
            k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
            k.bufferData(k.ARRAY_BUFFER, h.array, b);
        }
        if (a.colorsNeedUpdate && i !== void 0) {
            k.bindBuffer(k.ARRAY_BUFFER, i.buffer);
            k.bufferData(k.ARRAY_BUFFER, i.array, b);
        }
        if (a.tangentsNeedUpdate && d !== void 0) {
            k.bindBuffer(k.ARRAY_BUFFER, d.buffer);
            k.bufferData(k.ARRAY_BUFFER, d.array, b);
        }
        if (c) for (var j in a.attributes) delete a.attributes[j].array;
    }
    function i(a, b) {
        return b.z - a.z;
    }
    function j(a, b) {
        return b[1] - a[1];
    }
    function l(a, b, c) {
        if (a.length)
            for (var d = 0, f = a.length; d < f; d++) {
                ia = da = null;
                N = U = Ca = ua = Ya = Oa = Ja = -1;
                hb = true;
                a[d].render(b, c, rb, Da);
                ia = da = null;
                N = U = Ca = ua = Ya = Oa = Ja = -1;
                hb = true;
            }
    }
    function n(a, b, c, d, f, e, g, h) {
        var i, k, j, l;
        if (b) {
            k = a.length - 1;
            l = b = -1;
        } else {
            k = 0;
            b = a.length;
            l = 1;
        }
        for (var m = k; m !== b; m = m + l) {
            i = a[m];
            if (i.render) {
                k = i.object;
                j = i.buffer;
                if (h) i = h;
                else {
                    i = i[c];
                    if (!i) continue;
                    g &&
                        Q.setBlending(
                            i.blending,
                            i.blendEquation,
                            i.blendSrc,
                            i.blendDst
                        );
                    Q.setDepthTest(i.depthTest);
                    Q.setDepthWrite(i.depthWrite);
                    A(
                        i.polygonOffset,
                        i.polygonOffsetFactor,
                        i.polygonOffsetUnits
                    );
                }
                Q.setMaterialFaces(i);
                j instanceof THREE.BufferGeometry
                    ? Q.renderBufferDirect(d, f, e, i, j, k)
                    : Q.renderBuffer(d, f, e, i, j, k);
            }
        }
    }
    function m(a, b, c, d, f, e, g) {
        for (var h, i, k = 0, j = a.length; k < j; k++) {
            h = a[k];
            i = h.object;
            if (i.visible) {
                if (g) h = g;
                else {
                    h = h[b];
                    if (!h) continue;
                    e &&
                        Q.setBlending(
                            h.blending,
                            h.blendEquation,
                            h.blendSrc,
                            h.blendDst
                        );
                    Q.setDepthTest(h.depthTest);
                    Q.setDepthWrite(h.depthWrite);
                    A(
                        h.polygonOffset,
                        h.polygonOffsetFactor,
                        h.polygonOffsetUnits
                    );
                }
                Q.renderImmediateObject(c, d, f, h, i);
            }
        }
    }
    function q(a, b, c) {
        a.push({ buffer: b, object: c, opaque: null, transparent: null });
    }
    function p(a) {
        for (var b in a.attributes)
            if (a.attributes[b].needsUpdate) return true;
        return false;
    }
    function o(a) {
        for (var b in a.attributes) a.attributes[b].needsUpdate = false;
    }
    function r(a, b) {
        for (var c = a.length - 1; c >= 0; c--)
            a[c].object === b && a.splice(c, 1);
    }
    function t(a, b) {
        for (var c = a.length - 1; c >= 0; c--) a[c] === b && a.splice(c, 1);
    }
    function u(a, b, c, d, f) {
        pa = 0;
        if (d.needsUpdate) {
            d.program && Q.deallocateMaterial(d);
            Q.initMaterial(d, b, c, f);
            d.needsUpdate = false;
        }
        if (d.morphTargets && !f.__webglMorphTargetInfluences)
            f.__webglMorphTargetInfluences = new Float32Array(
                Q.maxMorphTargets
            );
        var e = false,
            g = d.program,
            h = g.uniforms,
            i = d.uniforms;
        if (g !== da) {
            k.useProgram(g);
            da = g;
            e = true;
        }
        if (d.id !== N) {
            N = d.id;
            e = true;
        }
        if (e || a !== ia) {
            k.uniformMatrix4fv(
                h.projectionMatrix,
                false,
                a._projectionMatrixArray
            );
            a !== ia && (ia = a);
        }
        if (d.skinning)
            if (ec && f.useVertexTexture) {
                if (h.boneTexture !== null) {
                    var j = w();
                    k.uniform1i(h.boneTexture, j);
                    Q.setTexture(f.boneTexture, j);
                }
            } else
                h.boneGlobalMatrices !== null &&
                    k.uniformMatrix4fv(
                        h.boneGlobalMatrices,
                        false,
                        f.boneMatrices
                    );
        if (e) {
            if (c && d.fog) {
                i.fogColor.value = c.color;
                if (c instanceof THREE.Fog) {
                    i.fogNear.value = c.near;
                    i.fogFar.value = c.far;
                } else if (c instanceof THREE.FogExp2)
                    i.fogDensity.value = c.density;
            }
            if (
                d instanceof THREE.MeshPhongMaterial ||
                d instanceof THREE.MeshLambertMaterial ||
                d.lights
            ) {
                if (hb) {
                    for (
                        var l = 0,
                            m = 0,
                            n = 0,
                            o,
                            p,
                            q,
                            r,
                            s = qc,
                            t = s.directional.colors,
                            u = s.directional.positions,
                            z = s.point.colors,
                            A = s.point.positions,
                            E = s.point.distances,
                            D = s.spot.colors,
                            G = s.spot.positions,
                            I = s.spot.distances,
                            F = s.spot.directions,
                            J = s.spot.angles,
                            K = s.spot.exponents,
                            L = s.hemi.skyColors,
                            U = s.hemi.groundColors,
                            ga = s.hemi.positions,
                            V = 0,
                            $ = 0,
                            ba = 0,
                            Y = 0,
                            c = (o = q = q = p = 0),
                            e = b.length;
                        c < e;
                        c++
                    ) {
                        j = b[c];
                        if (!j.onlyShadow && j.visible) {
                            o = j.color;
                            r = j.intensity;
                            p = j.distance;
                            if (j instanceof THREE.AmbientLight)
                                if (Q.gammaInput) {
                                    l = l + o.r * o.r;
                                    m = m + o.g * o.g;
                                    n = n + o.b * o.b;
                                } else {
                                    l = l + o.r;
                                    m = m + o.g;
                                    n = n + o.b;
                                }
                            else if (j instanceof THREE.DirectionalLight) {
                                p = V * 3;
                                Q.gammaInput
                                    ? B(t, p, o, r * r)
                                    : v(t, p, o, r);
                                Qa.copy(j.matrixWorld.getPosition());
                                Qa.subSelf(j.target.matrixWorld.getPosition());
                                Qa.normalize();
                                u[p] = Qa.x;
                                u[p + 1] = Qa.y;
                                u[p + 2] = Qa.z;
                                V = V + 1;
                            } else if (j instanceof THREE.PointLight) {
                                q = $ * 3;
                                Q.gammaInput
                                    ? B(z, q, o, r * r)
                                    : v(z, q, o, r);
                                r = j.matrixWorld.getPosition();
                                A[q] = r.x;
                                A[q + 1] = r.y;
                                A[q + 2] = r.z;
                                E[$] = p;
                                $ = $ + 1;
                            } else if (j instanceof THREE.SpotLight) {
                                q = ba * 3;
                                Q.gammaInput
                                    ? B(D, q, o, r * r)
                                    : v(D, q, o, r);
                                r = j.matrixWorld.getPosition();
                                G[q] = r.x;
                                G[q + 1] = r.y;
                                G[q + 2] = r.z;
                                I[ba] = p;
                                Qa.copy(r);
                                Qa.subSelf(j.target.matrixWorld.getPosition());
                                Qa.normalize();
                                F[q] = Qa.x;
                                F[q + 1] = Qa.y;
                                F[q + 2] = Qa.z;
                                J[ba] = Math.cos(j.angle);
                                K[ba] = j.exponent;
                                ba = ba + 1;
                            } else if (j instanceof THREE.HemisphereLight) {
                                p = j.color;
                                q = j.groundColor;
                                o = Y * 3;
                                if (Q.gammaInput) {
                                    r = r * r;
                                    B(L, o, p, r);
                                    B(U, o, q, r);
                                } else {
                                    v(L, o, p, r);
                                    v(U, o, q, r);
                                }
                                r = j.matrixWorld.getPosition();
                                ga[o] = r.x;
                                ga[o + 1] = r.y;
                                ga[o + 2] = r.z;
                                Y = Y + 1;
                            }
                        }
                    }
                    c = V * 3;
                    for (e = t.length; c < e; c++) t[c] = 0;
                    c = $ * 3;
                    for (e = z.length; c < e; c++) z[c] = 0;
                    c = ba * 3;
                    for (e = D.length; c < e; c++) D[c] = 0;
                    c = Y * 3;
                    for (e = L.length; c < e; c++) L[c] = 0;
                    c = Y * 3;
                    for (e = U.length; c < e; c++) U[c] = 0;
                    s.directional.length = V;
                    s.point.length = $;
                    s.spot.length = ba;
                    s.hemi.length = Y;
                    s.ambient[0] = l;
                    s.ambient[1] = m;
                    s.ambient[2] = n;
                    hb = false;
                }
                c = qc;
                i.ambientLightColor.value = c.ambient;
                i.directionalLightColor.value = c.directional.colors;
                i.directionalLightDirection.value = c.directional.positions;
                i.pointLightColor.value = c.point.colors;
                i.pointLightPosition.value = c.point.positions;
                i.pointLightDistance.value = c.point.distances;
                i.spotLightColor.value = c.spot.colors;
                i.spotLightPosition.value = c.spot.positions;
                i.spotLightDistance.value = c.spot.distances;
                i.spotLightDirection.value = c.spot.directions;
                i.spotLightAngle.value = c.spot.angles;
                i.spotLightExponent.value = c.spot.exponents;
                i.hemisphereLightSkyColor.value = c.hemi.skyColors;
                i.hemisphereLightGroundColor.value = c.hemi.groundColors;
                i.hemisphereLightPosition.value = c.hemi.positions;
            }
            if (
                d instanceof THREE.MeshBasicMaterial ||
                d instanceof THREE.MeshLambertMaterial ||
                d instanceof THREE.MeshPhongMaterial
            ) {
                i.opacity.value = d.opacity;
                Q.gammaInput
                    ? i.diffuse.value.copyGammaToLinear(d.color)
                    : (i.diffuse.value = d.color);
                i.map.value = d.map;
                i.lightMap.value = d.lightMap;
                i.specularMap.value = d.specularMap;
                if (d.bumpMap) {
                    i.bumpMap.value = d.bumpMap;
                    i.bumpScale.value = d.bumpScale;
                }
                if (d.normalMap) {
                    i.normalMap.value = d.normalMap;
                    i.normalScale.value.copy(d.normalScale);
                }
                var fa;
                if (d.map) fa = d.map;
                else if (d.specularMap) fa = d.specularMap;
                else if (d.normalMap) fa = d.normalMap;
                else if (d.bumpMap) fa = d.bumpMap;
                if (fa !== void 0) {
                    c = fa.offset;
                    fa = fa.repeat;
                    i.offsetRepeat.value.set(c.x, c.y, fa.x, fa.y);
                }
                i.envMap.value = d.envMap;
                i.flipEnvMap.value =
                    d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1;
                i.reflectivity.value = d.reflectivity;
                i.refractionRatio.value = d.refractionRatio;
                i.combine.value = d.combine;
                i.useRefract.value =
                    d.envMap &&
                    d.envMap.mapping instanceof THREE.CubeRefractionMapping;
            }
            if (d instanceof THREE.LineBasicMaterial) {
                i.diffuse.value = d.color;
                i.opacity.value = d.opacity;
            } else if (d instanceof THREE.ParticleBasicMaterial) {
                i.psColor.value = d.color;
                i.opacity.value = d.opacity;
                i.size.value = d.size;
                i.scale.value = O.height / 2;
                i.map.value = d.map;
            } else if (d instanceof THREE.MeshPhongMaterial) {
                i.shininess.value = d.shininess;
                if (Q.gammaInput) {
                    i.ambient.value.copyGammaToLinear(d.ambient);
                    i.emissive.value.copyGammaToLinear(d.emissive);
                    i.specular.value.copyGammaToLinear(d.specular);
                } else {
                    i.ambient.value = d.ambient;
                    i.emissive.value = d.emissive;
                    i.specular.value = d.specular;
                }
                d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB);
            } else if (d instanceof THREE.MeshLambertMaterial) {
                if (Q.gammaInput) {
                    i.ambient.value.copyGammaToLinear(d.ambient);
                    i.emissive.value.copyGammaToLinear(d.emissive);
                } else {
                    i.ambient.value = d.ambient;
                    i.emissive.value = d.emissive;
                }
                d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB);
            } else if (d instanceof THREE.MeshDepthMaterial) {
                i.mNear.value = a.near;
                i.mFar.value = a.far;
                i.opacity.value = d.opacity;
            } else if (d instanceof THREE.MeshNormalMaterial)
                i.opacity.value = d.opacity;
            if (f.receiveShadow && !d._shadowPass && i.shadowMatrix) {
                c = fa = 0;
                for (e = b.length; c < e; c++) {
                    j = b[c];
                    if (
                        j.castShadow &&
                        (j instanceof THREE.SpotLight ||
                            (j instanceof THREE.DirectionalLight &&
                                !j.shadowCascade))
                    ) {
                        i.shadowMap.value[fa] = j.shadowMap;
                        i.shadowMapSize.value[fa] = j.shadowMapSize;
                        i.shadowMatrix.value[fa] = j.shadowMatrix;
                        i.shadowDarkness.value[fa] = j.shadowDarkness;
                        i.shadowBias.value[fa] = j.shadowBias;
                        fa++;
                    }
                }
            }
            b = d.uniformsList;
            i = 0;
            for (fa = b.length; i < fa; i++)
                if ((e = g.uniforms[b[i][1]])) {
                    c = b[i][0];
                    l = c.type;
                    j = c.value;
                    if (l === "i") k.uniform1i(e, j);
                    else if (l === "f") k.uniform1f(e, j);
                    else if (l === "v2") k.uniform2f(e, j.x, j.y);
                    else if (l === "v3") k.uniform3f(e, j.x, j.y, j.z);
                    else if (l === "v4") k.uniform4f(e, j.x, j.y, j.z, j.w);
                    else if (l === "c") k.uniform3f(e, j.r, j.g, j.b);
                    else if (l === "iv1") k.uniform1iv(e, j);
                    else if (l === "iv") k.uniform3iv(e, j);
                    else if (l === "fv1") k.uniform1fv(e, j);
                    else if (l === "fv") k.uniform3fv(e, j);
                    else if (l === "v2v") {
                        if (c._array === void 0)
                            c._array = new Float32Array(2 * j.length);
                        l = 0;
                        for (m = j.length; l < m; l++) {
                            n = l * 2;
                            c._array[n] = j[l].x;
                            c._array[n + 1] = j[l].y;
                        }
                        k.uniform2fv(e, c._array);
                    } else if (l === "v3v") {
                        if (c._array === void 0)
                            c._array = new Float32Array(3 * j.length);
                        l = 0;
                        for (m = j.length; l < m; l++) {
                            n = l * 3;
                            c._array[n] = j[l].x;
                            c._array[n + 1] = j[l].y;
                            c._array[n + 2] = j[l].z;
                        }
                        k.uniform3fv(e, c._array);
                    } else if (l === "v4v") {
                        if (c._array === void 0)
                            c._array = new Float32Array(4 * j.length);
                        l = 0;
                        for (m = j.length; l < m; l++) {
                            n = l * 4;
                            c._array[n] = j[l].x;
                            c._array[n + 1] = j[l].y;
                            c._array[n + 2] = j[l].z;
                            c._array[n + 3] = j[l].w;
                        }
                        k.uniform4fv(e, c._array);
                    } else if (l === "m4") {
                        if (c._array === void 0)
                            c._array = new Float32Array(16);
                        j.flattenToArray(c._array);
                        k.uniformMatrix4fv(e, false, c._array);
                    } else if (l === "m4v") {
                        if (c._array === void 0)
                            c._array = new Float32Array(16 * j.length);
                        l = 0;
                        for (m = j.length; l < m; l++)
                            j[l].flattenToArrayOffset(c._array, l * 16);
                        k.uniformMatrix4fv(e, false, c._array);
                    } else if (l === "t") {
                        n = j;
                        j = w();
                        k.uniform1i(e, j);
                        if (n)
                            if (
                                n.image instanceof Array &&
                                n.image.length === 6
                            ) {
                                c = n;
                                e = j;
                                if (c.image.length === 6)
                                    if (c.needsUpdate) {
                                        if (!c.image.__webglTextureCube)
                                            c.image.__webglTextureCube =
                                                k.createTexture();
                                        k.activeTexture(k.TEXTURE0 + e);
                                        k.bindTexture(
                                            k.TEXTURE_CUBE_MAP,
                                            c.image.__webglTextureCube
                                        );
                                        k.pixelStorei(
                                            k.UNPACK_FLIP_Y_WEBGL,
                                            c.flipY
                                        );
                                        e =
                                            c instanceof
                                            THREE.CompressedTexture;
                                        j = [];
                                        for (l = 0; l < 6; l++)
                                            if (Q.autoScaleCubemaps && !e) {
                                                m = j;
                                                n = l;
                                                s = c.image[l];
                                                u = Sc;
                                                if (
                                                    !(
                                                        s.width <= u &&
                                                        s.height <= u
                                                    )
                                                ) {
                                                    z = Math.max(
                                                        s.width,
                                                        s.height
                                                    );
                                                    t = Math.floor(
                                                        (s.width * u) / z
                                                    );
                                                    u = Math.floor(
                                                        (s.height * u) / z
                                                    );
                                                    z =
                                                        document.createElement(
                                                            "canvas"
                                                        );
                                                    z.width = t;
                                                    z.height = u;
                                                    z.getContext(
                                                        "2d"
                                                    ).drawImage(
                                                        s,
                                                        0,
                                                        0,
                                                        s.width,
                                                        s.height,
                                                        0,
                                                        0,
                                                        t,
                                                        u
                                                    );
                                                    s = z;
                                                }
                                                m[n] = s;
                                            } else j[l] = c.image[l];
                                        l = j[0];
                                        m =
                                            (l.width & (l.width - 1)) === 0 &&
                                            (l.height & (l.height - 1)) === 0;
                                        n = H(c.format);
                                        s = H(c.type);
                                        M(k.TEXTURE_CUBE_MAP, c, m);
                                        for (l = 0; l < 6; l++)
                                            if (e) {
                                                u = j[l].mipmaps;
                                                z = 0;
                                                for (A = u.length; z < A; z++) {
                                                    t = u[z];
                                                    k.compressedTexImage2D(
                                                        k.TEXTURE_CUBE_MAP_POSITIVE_X +
                                                            l,
                                                        z,
                                                        n,
                                                        t.width,
                                                        t.height,
                                                        0,
                                                        t.data
                                                    );
                                                }
                                            } else
                                                k.texImage2D(
                                                    k.TEXTURE_CUBE_MAP_POSITIVE_X +
                                                        l,
                                                    0,
                                                    n,
                                                    n,
                                                    s,
                                                    j[l]
                                                );
                                        c.generateMipmaps &&
                                            m &&
                                            k.generateMipmap(
                                                k.TEXTURE_CUBE_MAP
                                            );
                                        c.needsUpdate = false;
                                        if (c.onUpdate) c.onUpdate();
                                    } else {
                                        k.activeTexture(k.TEXTURE0 + e);
                                        k.bindTexture(
                                            k.TEXTURE_CUBE_MAP,
                                            c.image.__webglTextureCube
                                        );
                                    }
                            } else if (
                                n instanceof THREE.WebGLRenderTargetCube
                            ) {
                                c = n;
                                k.activeTexture(k.TEXTURE0 + j);
                                k.bindTexture(
                                    k.TEXTURE_CUBE_MAP,
                                    c.__webglTexture
                                );
                            } else Q.setTexture(n, j);
                    } else if (l === "tv") {
                        if (c._array === void 0) c._array = [];
                        l = 0;
                        for (m = c.value.length; l < m; l++) c._array[l] = w();
                        k.uniform1iv(e, c._array);
                        l = 0;
                        for (m = c.value.length; l < m; l++) {
                            n = c.value[l];
                            j = c._array[l];
                            n && Q.setTexture(n, j);
                        }
                    }
                }
            if (
                (d instanceof THREE.ShaderMaterial ||
                    d instanceof THREE.MeshPhongMaterial ||
                    d.envMap) &&
                h.cameraPosition !== null
            ) {
                b = a.matrixWorld.getPosition();
                k.uniform3f(h.cameraPosition, b.x, b.y, b.z);
            }
            (d instanceof THREE.MeshPhongMaterial ||
                d instanceof THREE.MeshLambertMaterial ||
                d instanceof THREE.ShaderMaterial ||
                d.skinning) &&
                h.viewMatrix !== null &&
                k.uniformMatrix4fv(h.viewMatrix, false, a._viewMatrixArray);
        }
        k.uniformMatrix4fv(
            h.modelViewMatrix,
            false,
            f._modelViewMatrix.elements
        );
        h.normalMatrix &&
            k.uniformMatrix3fv(h.normalMatrix, false, f._normalMatrix.elements);
        h.modelMatrix !== null &&
            k.uniformMatrix4fv(h.modelMatrix, false, f.matrixWorld.elements);
        return g;
    }
    function w() {
        var a = pa;
        a >= Dc &&
            console.warn(
                "Trying to use " +
                    a +
                    " texture units while this GPU supports only " +
                    Dc
            );
        pa = pa + 1;
        return a;
    }
    function s(a, b) {
        a._modelViewMatrix.multiply(b.matrixWorldInverse, a.matrixWorld);
        a._normalMatrix.getInverse(a._modelViewMatrix);
        a._normalMatrix.transpose();
    }
    function B(a, b, c, d) {
        a[b] = c.r * c.r * d;
        a[b + 1] = c.g * c.g * d;
        a[b + 2] = c.b * c.b * d;
    }
    function v(a, b, c, d) {
        a[b] = c.r * d;
        a[b + 1] = c.g * d;
        a[b + 2] = c.b * d;
    }
    function A(a, b, c) {
        if (wb !== a) {
            a
                ? k.enable(k.POLYGON_OFFSET_FILL)
                : k.disable(k.POLYGON_OFFSET_FILL);
            wb = a;
        }
        if (a && (xb !== b || fb !== c)) {
            k.polygonOffset(b, c);
            xb = b;
            fb = c;
        }
    }
    function E(a) {
        for (var a = a.split("\n"), b = 0, c = a.length; b < c; b++)
            a[b] = b + 1 + ": " + a[b];
        return a.join("\n");
    }
    function z(a, b) {
        var c;
        a === "fragment"
            ? (c = k.createShader(k.FRAGMENT_SHADER))
            : a === "vertex" && (c = k.createShader(k.VERTEX_SHADER));
        k.shaderSource(c, b);
        k.compileShader(c);
        if (!k.getShaderParameter(c, k.COMPILE_STATUS)) {
            console.error(k.getShaderInfoLog(c));
            console.error(E(b));
            return null;
        }
        return c;
    }
    function M(a, b, c) {
        if (c) {
            k.texParameteri(a, k.TEXTURE_WRAP_S, H(b.wrapS));
            k.texParameteri(a, k.TEXTURE_WRAP_T, H(b.wrapT));
            k.texParameteri(a, k.TEXTURE_MAG_FILTER, H(b.magFilter));
            k.texParameteri(a, k.TEXTURE_MIN_FILTER, H(b.minFilter));
        } else {
            k.texParameteri(a, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE);
            k.texParameteri(a, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE);
            k.texParameteri(a, k.TEXTURE_MAG_FILTER, G(b.magFilter));
            k.texParameteri(a, k.TEXTURE_MIN_FILTER, G(b.minFilter));
        }
        if (
            Pb &&
            b.type !== THREE.FloatType &&
            (b.anisotropy > 1 || b.__oldAnisotropy)
        ) {
            k.texParameterf(
                a,
                Pb.TEXTURE_MAX_ANISOTROPY_EXT,
                Math.min(b.anisotropy, rc)
            );
            b.__oldAnisotropy = b.anisotropy;
        }
    }
    function D(a, b) {
        k.bindRenderbuffer(k.RENDERBUFFER, a);
        if (b.depthBuffer && !b.stencilBuffer) {
            k.renderbufferStorage(
                k.RENDERBUFFER,
                k.DEPTH_COMPONENT16,
                b.width,
                b.height
            );
            k.framebufferRenderbuffer(
                k.FRAMEBUFFER,
                k.DEPTH_ATTACHMENT,
                k.RENDERBUFFER,
                a
            );
        } else if (b.depthBuffer && b.stencilBuffer) {
            k.renderbufferStorage(
                k.RENDERBUFFER,
                k.DEPTH_STENCIL,
                b.width,
                b.height
            );
            k.framebufferRenderbuffer(
                k.FRAMEBUFFER,
                k.DEPTH_STENCIL_ATTACHMENT,
                k.RENDERBUFFER,
                a
            );
        } else
            k.renderbufferStorage(k.RENDERBUFFER, k.RGBA4, b.width, b.height);
    }
    function G(a) {
        return a === THREE.NearestFilter ||
            a === THREE.NearestMipMapNearestFilter ||
            a === THREE.NearestMipMapLinearFilter
            ? k.NEAREST
            : k.LINEAR;
    }
    function H(a) {
        if (a === THREE.RepeatWrapping) return k.REPEAT;
        if (a === THREE.ClampToEdgeWrapping) return k.CLAMP_TO_EDGE;
        if (a === THREE.MirroredRepeatWrapping) return k.MIRRORED_REPEAT;
        if (a === THREE.NearestFilter) return k.NEAREST;
        if (a === THREE.NearestMipMapNearestFilter)
            return k.NEAREST_MIPMAP_NEAREST;
        if (a === THREE.NearestMipMapLinearFilter)
            return k.NEAREST_MIPMAP_LINEAR;
        if (a === THREE.LinearFilter) return k.LINEAR;
        if (a === THREE.LinearMipMapNearestFilter)
            return k.LINEAR_MIPMAP_NEAREST;
        if (a === THREE.LinearMipMapLinearFilter) return k.LINEAR_MIPMAP_LINEAR;
        if (a === THREE.UnsignedByteType) return k.UNSIGNED_BYTE;
        if (a === THREE.UnsignedShort4444Type) return k.UNSIGNED_SHORT_4_4_4_4;
        if (a === THREE.UnsignedShort5551Type) return k.UNSIGNED_SHORT_5_5_5_1;
        if (a === THREE.UnsignedShort565Type) return k.UNSIGNED_SHORT_5_6_5;
        if (a === THREE.ByteType) return k.BYTE;
        if (a === THREE.ShortType) return k.SHORT;
        if (a === THREE.UnsignedShortType) return k.UNSIGNED_SHORT;
        if (a === THREE.IntType) return k.INT;
        if (a === THREE.UnsignedIntType) return k.UNSIGNED_INT;
        if (a === THREE.FloatType) return k.FLOAT;
        if (a === THREE.AlphaFormat) return k.ALPHA;
        if (a === THREE.RGBFormat) return k.RGB;
        if (a === THREE.RGBAFormat) return k.RGBA;
        if (a === THREE.LuminanceFormat) return k.LUMINANCE;
        if (a === THREE.LuminanceAlphaFormat) return k.LUMINANCE_ALPHA;
        if (a === THREE.AddEquation) return k.FUNC_ADD;
        if (a === THREE.SubtractEquation) return k.FUNC_SUBTRACT;
        if (a === THREE.ReverseSubtractEquation) return k.FUNC_REVERSE_SUBTRACT;
        if (a === THREE.ZeroFactor) return k.ZERO;
        if (a === THREE.OneFactor) return k.ONE;
        if (a === THREE.SrcColorFactor) return k.SRC_COLOR;
        if (a === THREE.OneMinusSrcColorFactor) return k.ONE_MINUS_SRC_COLOR;
        if (a === THREE.SrcAlphaFactor) return k.SRC_ALPHA;
        if (a === THREE.OneMinusSrcAlphaFactor) return k.ONE_MINUS_SRC_ALPHA;
        if (a === THREE.DstAlphaFactor) return k.DST_ALPHA;
        if (a === THREE.OneMinusDstAlphaFactor) return k.ONE_MINUS_DST_ALPHA;
        if (a === THREE.DstColorFactor) return k.DST_COLOR;
        if (a === THREE.OneMinusDstColorFactor) return k.ONE_MINUS_DST_COLOR;
        if (a === THREE.SrcAlphaSaturateFactor) return k.SRC_ALPHA_SATURATE;
        if (yb !== void 0) {
            if (a === THREE.RGB_S3TC_DXT1_Format)
                return yb.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (a === THREE.RGBA_S3TC_DXT1_Format)
                return yb.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (a === THREE.RGBA_S3TC_DXT3_Format)
                return yb.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (a === THREE.RGBA_S3TC_DXT5_Format)
                return yb.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }
        return 0;
    }
    console.log("THREE.WebGLRenderer", THREE.REVISION);
    var a = a || {},
        O = a.canvas !== void 0 ? a.canvas : document.createElement("canvas"),
        F = a.precision !== void 0 ? a.precision : "highp",
        J = a.alpha !== void 0 ? a.alpha : true,
        I = a.premultipliedAlpha !== void 0 ? a.premultipliedAlpha : true,
        K = a.antialias !== void 0 ? a.antialias : false,
        V = a.stencil !== void 0 ? a.stencil : true,
        Y =
            a.preserveDrawingBuffer !== void 0
                ? a.preserveDrawingBuffer
                : false,
        $ =
            a.clearColor !== void 0
                ? new THREE.Color(a.clearColor)
                : new THREE.Color(0),
        L = a.clearAlpha !== void 0 ? a.clearAlpha : 0,
        ba = a.maxLights !== void 0 ? a.maxLights : 4;
    this.domElement = O;
    this.context = null;
    this.autoUpdateScene =
        this.autoUpdateObjects =
        this.sortObjects =
        this.autoClearStencil =
        this.autoClearDepth =
        this.autoClearColor =
        this.autoClear =
            true;
    this.shadowMapEnabled =
        this.physicallyBasedShading =
        this.gammaOutput =
        this.gammaInput =
            false;
    this.shadowMapCullFrontFaces =
        this.shadowMapSoft =
        this.shadowMapAutoUpdate =
            true;
    this.shadowMapCascade = this.shadowMapDebug = false;
    this.maxMorphTargets = 8;
    this.maxMorphNormals = 4;
    this.autoScaleCubemaps = true;
    this.renderPluginsPre = [];
    this.renderPluginsPost = [];
    this.info = {
        memory: { programs: 0, geometries: 0, textures: 0 },
        render: { calls: 0, vertices: 0, faces: 0, points: 0 }
    };
    var Q = this,
        fa = [],
        ta = 0,
        da = null,
        ga = null,
        N = -1,
        U = null,
        ia = null,
        Ia = 0,
        pa = 0,
        ua = -1,
        Ca = -1,
        Ja = -1,
        Xa = -1,
        ja = -1,
        pb = -1,
        Oa = -1,
        Ya = -1,
        wb = null,
        xb = null,
        fb = null,
        Fa = null,
        xa = 0,
        qb = 0,
        Ga = 0,
        $a = 0,
        rb = 0,
        Da = 0,
        ab = new THREE.Frustum(),
        bb = new THREE.Matrix4(),
        gb = new THREE.Matrix4(),
        Pa = new THREE.Vector4(),
        Qa = new THREE.Vector3(),
        hb = true,
        qc = {
            ambient: [0, 0, 0],
            directional: { length: 0, colors: [], positions: [] },
            point: { length: 0, colors: [], positions: [], distances: [] },
            spot: {
                length: 0,
                colors: [],
                positions: [],
                distances: [],
                directions: [],
                angles: [],
                exponents: []
            },
            hemi: { length: 0, skyColors: [], groundColors: [], positions: [] }
        },
        k,
        Pb,
        yb;
    try {
        if (
            !(k = O.getContext("experimental-webgl", {
                alpha: J,
                premultipliedAlpha: I,
                antialias: K,
                stencil: V,
                preserveDrawingBuffer: Y
            }))
        )
            throw "Error creating WebGL context.";
    } catch (Rc) {
        console.error(Rc);
    }
    a = k.getExtension("OES_texture_float");
    J = k.getExtension("OES_standard_derivatives");
    Pb =
        k.getExtension("EXT_texture_filter_anisotropic") ||
        k.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
        k.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
    yb =
        k.getExtension("WEBGL_compressed_texture_s3tc") ||
        k.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
        k.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
    a || console.log("THREE.WebGLRenderer: Float textures not supported.");
    J ||
        console.log("THREE.WebGLRenderer: Standard derivatives not supported.");
    Pb ||
        console.log(
            "THREE.WebGLRenderer: Anisotropic texture filtering not supported."
        );
    yb ||
        console.log(
            "THREE.WebGLRenderer: S3TC compressed textures not supported."
        );
    k.clearColor(0, 0, 0, 1);
    k.clearDepth(1);
    k.clearStencil(0);
    k.enable(k.DEPTH_TEST);
    k.depthFunc(k.LEQUAL);
    k.frontFace(k.CCW);
    k.cullFace(k.BACK);
    k.enable(k.CULL_FACE);
    k.enable(k.BLEND);
    k.blendEquation(k.FUNC_ADD);
    k.blendFunc(k.SRC_ALPHA, k.ONE_MINUS_SRC_ALPHA);
    k.clearColor($.r, $.g, $.b, L);
    this.context = k;
    var Dc = k.getParameter(k.MAX_TEXTURE_IMAGE_UNITS),
        J = k.getParameter(k.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    k.getParameter(k.MAX_TEXTURE_SIZE);
    var Sc = k.getParameter(k.MAX_CUBE_MAP_TEXTURE_SIZE),
        rc = Pb ? k.getParameter(Pb.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
        ic = J > 0,
        ec = ic && a;
    yb && k.getParameter(k.COMPRESSED_TEXTURE_FORMATS);
    this.getContext = function () {
        return k;
    };
    this.supportsVertexTextures = function () {
        return ic;
    };
    this.getMaxAnisotropy = function () {
        return rc;
    };
    this.setSize = function (a, b) {
        O.width = a;
        O.height = b;
        this.setViewport(0, 0, O.width, O.height);
    };
    this.setViewport = function (a, b, c, d) {
        xa = a !== void 0 ? a : 0;
        qb = b !== void 0 ? b : 0;
        Ga = c !== void 0 ? c : O.width;
        $a = d !== void 0 ? d : O.height;
        k.viewport(xa, qb, Ga, $a);
    };
    this.setScissor = function (a, b, c, d) {
        k.scissor(a, b, c, d);
    };
    this.enableScissorTest = function (a) {
        a ? k.enable(k.SCISSOR_TEST) : k.disable(k.SCISSOR_TEST);
    };
    this.setClearColorHex = function (a, b) {
        $.setHex(a);
        L = b;
        k.clearColor($.r, $.g, $.b, L);
    };
    this.setClearColor = function (a, b) {
        $.copy(a);
        L = b;
        k.clearColor($.r, $.g, $.b, L);
    };
    this.getClearColor = function () {
        return $;
    };
    this.getClearAlpha = function () {
        return L;
    };
    this.clear = function (a, b, c) {
        var d = 0;
        if (a === void 0 || a) d = d | k.COLOR_BUFFER_BIT;
        if (b === void 0 || b) d = d | k.DEPTH_BUFFER_BIT;
        if (c === void 0 || c) d = d | k.STENCIL_BUFFER_BIT;
        k.clear(d);
    };
    this.clearTarget = function (a, b, c, d) {
        this.setRenderTarget(a);
        this.clear(b, c, d);
    };
    this.addPostPlugin = function (a) {
        a.init(this);
        this.renderPluginsPost.push(a);
    };
    this.addPrePlugin = function (a) {
        a.init(this);
        this.renderPluginsPre.push(a);
    };
    this.deallocateObject = function (a) {
        if (a.__webglInit) {
            a.__webglInit = false;
            delete a._modelViewMatrix;
            delete a._normalMatrix;
            delete a._normalMatrixArray;
            delete a._modelViewMatrixArray;
            delete a._modelMatrixArray;
            if (a instanceof THREE.Mesh)
                for (var b in a.geometry.geometryGroups) {
                    var c = a.geometry.geometryGroups[b];
                    k.deleteBuffer(c.__webglVertexBuffer);
                    k.deleteBuffer(c.__webglNormalBuffer);
                    k.deleteBuffer(c.__webglTangentBuffer);
                    k.deleteBuffer(c.__webglColorBuffer);
                    k.deleteBuffer(c.__webglUVBuffer);
                    k.deleteBuffer(c.__webglUV2Buffer);
                    k.deleteBuffer(c.__webglSkinIndicesBuffer);
                    k.deleteBuffer(c.__webglSkinWeightsBuffer);
                    k.deleteBuffer(c.__webglFaceBuffer);
                    k.deleteBuffer(c.__webglLineBuffer);
                    var d = void 0,
                        e = void 0;
                    if (c.numMorphTargets) {
                        d = 0;
                        for (e = c.numMorphTargets; d < e; d++)
                            k.deleteBuffer(c.__webglMorphTargetsBuffers[d]);
                    }
                    if (c.numMorphNormals) {
                        d = 0;
                        for (e = c.numMorphNormals; d < e; d++)
                            k.deleteBuffer(c.__webglMorphNormalsBuffers[d]);
                    }
                    if (c.__webglCustomAttributesList) {
                        d = void 0;
                        for (d in c.__webglCustomAttributesList)
                            k.deleteBuffer(
                                c.__webglCustomAttributesList[d].buffer
                            );
                    }
                    Q.info.memory.geometries--;
                }
            else if (a instanceof THREE.Ribbon) {
                a = a.geometry;
                k.deleteBuffer(a.__webglVertexBuffer);
                k.deleteBuffer(a.__webglColorBuffer);
                Q.info.memory.geometries--;
            } else if (a instanceof THREE.Line) {
                a = a.geometry;
                k.deleteBuffer(a.__webglVertexBuffer);
                k.deleteBuffer(a.__webglColorBuffer);
                Q.info.memory.geometries--;
            } else if (a instanceof THREE.ParticleSystem) {
                a = a.geometry;
                k.deleteBuffer(a.__webglVertexBuffer);
                k.deleteBuffer(a.__webglColorBuffer);
                Q.info.memory.geometries--;
            }
        }
    };
    this.deallocateTexture = function (a) {
        if (a.__webglInit) {
            a.__webglInit = false;
            k.deleteTexture(a.__webglTexture);
            Q.info.memory.textures--;
        }
    };
    this.deallocateRenderTarget = function (a) {
        if (a && a.__webglTexture) {
            k.deleteTexture(a.__webglTexture);
            if (a instanceof THREE.WebGLRenderTargetCube)
                for (var b = 0; b < 6; b++) {
                    k.deleteFramebuffer(a.__webglFramebuffer[b]);
                    k.deleteRenderbuffer(a.__webglRenderbuffer[b]);
                }
            else {
                k.deleteFramebuffer(a.__webglFramebuffer);
                k.deleteRenderbuffer(a.__webglRenderbuffer);
            }
        }
    };
    this.deallocateMaterial = function (a) {
        var b = a.program;
        if (b) {
            a.program = void 0;
            var c,
                d,
                e = false,
                a = 0;
            for (c = fa.length; a < c; a++) {
                d = fa[a];
                if (d.program === b) {
                    d.usedTimes--;
                    d.usedTimes === 0 && (e = true);
                    break;
                }
            }
            if (e) {
                e = [];
                a = 0;
                for (c = fa.length; a < c; a++) {
                    d = fa[a];
                    d.program !== b && e.push(d);
                }
                fa = e;
                k.deleteProgram(b);
                Q.info.memory.programs--;
            }
        }
    };
    this.updateShadowMap = function (a, b) {
        da = null;
        N = U = Ya = Oa = Ja = -1;
        hb = true;
        Ca = ua = -1;
        this.shadowMapPlugin.update(a, b);
    };
    this.renderBufferImmediate = function (a, b, c) {
        if (a.hasPositions && !a.__webglVertexBuffer)
            a.__webglVertexBuffer = k.createBuffer();
        if (a.hasNormals && !a.__webglNormalBuffer)
            a.__webglNormalBuffer = k.createBuffer();
        if (a.hasUvs && !a.__webglUvBuffer)
            a.__webglUvBuffer = k.createBuffer();
        if (a.hasColors && !a.__webglColorBuffer)
            a.__webglColorBuffer = k.createBuffer();
        if (a.hasPositions) {
            k.bindBuffer(k.ARRAY_BUFFER, a.__webglVertexBuffer);
            k.bufferData(k.ARRAY_BUFFER, a.positionArray, k.DYNAMIC_DRAW);
            k.enableVertexAttribArray(b.attributes.position);
            k.vertexAttribPointer(
                b.attributes.position,
                3,
                k.FLOAT,
                false,
                0,
                0
            );
        }
        if (a.hasNormals) {
            k.bindBuffer(k.ARRAY_BUFFER, a.__webglNormalBuffer);
            if (c.shading === THREE.FlatShading) {
                var d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    l,
                    n,
                    m,
                    o,
                    p = a.count * 3;
                for (o = 0; o < p; o = o + 9) {
                    m = a.normalArray;
                    d = m[o];
                    e = m[o + 1];
                    f = m[o + 2];
                    g = m[o + 3];
                    i = m[o + 4];
                    l = m[o + 5];
                    h = m[o + 6];
                    j = m[o + 7];
                    n = m[o + 8];
                    d = (d + g + h) / 3;
                    e = (e + i + j) / 3;
                    f = (f + l + n) / 3;
                    m[o] = d;
                    m[o + 1] = e;
                    m[o + 2] = f;
                    m[o + 3] = d;
                    m[o + 4] = e;
                    m[o + 5] = f;
                    m[o + 6] = d;
                    m[o + 7] = e;
                    m[o + 8] = f;
                }
            }
            k.bufferData(k.ARRAY_BUFFER, a.normalArray, k.DYNAMIC_DRAW);
            k.enableVertexAttribArray(b.attributes.normal);
            k.vertexAttribPointer(b.attributes.normal, 3, k.FLOAT, false, 0, 0);
        }
        if (a.hasUvs && c.map) {
            k.bindBuffer(k.ARRAY_BUFFER, a.__webglUvBuffer);
            k.bufferData(k.ARRAY_BUFFER, a.uvArray, k.DYNAMIC_DRAW);
            k.enableVertexAttribArray(b.attributes.uv);
            k.vertexAttribPointer(b.attributes.uv, 2, k.FLOAT, false, 0, 0);
        }
        if (a.hasColors && c.vertexColors !== THREE.NoColors) {
            k.bindBuffer(k.ARRAY_BUFFER, a.__webglColorBuffer);
            k.bufferData(k.ARRAY_BUFFER, a.colorArray, k.DYNAMIC_DRAW);
            k.enableVertexAttribArray(b.attributes.color);
            k.vertexAttribPointer(b.attributes.color, 3, k.FLOAT, false, 0, 0);
        }
        k.drawArrays(k.TRIANGLES, 0, a.count);
        a.count = 0;
    };
    this.renderBufferDirect = function (a, b, c, d, e, f) {
        if (d.visible !== false) {
            c = u(a, b, c, d, f);
            a = c.attributes;
            b = false;
            d = e.id * 16777215 + c.id * 2 + (d.wireframe ? 1 : 0);
            if (d !== U) {
                U = d;
                b = true;
            }
            if (f instanceof THREE.Mesh) {
                f = e.offsets;
                f.length > 1 && (b = true);
                d = 0;
                for (c = f.length; d < c; ++d) {
                    var g = f[d].index;
                    if (b) {
                        var h = e.attributes.position,
                            i = h.itemSize;
                        k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                        k.vertexAttribPointer(
                            a.position,
                            i,
                            k.FLOAT,
                            false,
                            0,
                            g * i * 4
                        );
                        h = e.attributes.normal;
                        if (a.normal >= 0 && h) {
                            i = h.itemSize;
                            k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                            k.vertexAttribPointer(
                                a.normal,
                                i,
                                k.FLOAT,
                                false,
                                0,
                                g * i * 4
                            );
                        }
                        h = e.attributes.uv;
                        if (a.uv >= 0 && h)
                            if (h.buffer) {
                                i = h.itemSize;
                                k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                                k.vertexAttribPointer(
                                    a.uv,
                                    i,
                                    k.FLOAT,
                                    false,
                                    0,
                                    g * i * 4
                                );
                                k.enableVertexAttribArray(a.uv);
                            } else k.disableVertexAttribArray(a.uv);
                        i = e.attributes.color;
                        if (a.color >= 0 && i) {
                            var j = i.itemSize;
                            k.bindBuffer(k.ARRAY_BUFFER, i.buffer);
                            k.vertexAttribPointer(
                                a.color,
                                j,
                                k.FLOAT,
                                false,
                                0,
                                g * j * 4
                            );
                        }
                        h = e.attributes.tangent;
                        if (a.tangent >= 0 && h) {
                            i = h.itemSize;
                            k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                            k.vertexAttribPointer(
                                a.tangent,
                                i,
                                k.FLOAT,
                                false,
                                0,
                                g * i * 4
                            );
                        }
                        k.bindBuffer(
                            k.ELEMENT_ARRAY_BUFFER,
                            e.attributes.index.buffer
                        );
                    }
                    k.drawElements(
                        k.TRIANGLES,
                        f[d].count,
                        k.UNSIGNED_SHORT,
                        f[d].start * 2
                    );
                    Q.info.render.calls++;
                    Q.info.render.vertices =
                        Q.info.render.vertices + f[d].count;
                    Q.info.render.faces = Q.info.render.faces + f[d].count / 3;
                }
            } else if (f instanceof THREE.ParticleSystem && b) {
                h = e.attributes.position;
                i = h.itemSize;
                k.bindBuffer(k.ARRAY_BUFFER, h.buffer);
                k.vertexAttribPointer(a.position, i, k.FLOAT, false, 0, 0);
                i = e.attributes.color;
                if (a.color >= 0 && i) {
                    j = i.itemSize;
                    k.bindBuffer(k.ARRAY_BUFFER, i.buffer);
                    k.vertexAttribPointer(a.color, j, k.FLOAT, false, 0, 0);
                }
                k.drawArrays(k.POINTS, 0, h.numItems / 3);
                Q.info.render.calls++;
                Q.info.render.points = Q.info.render.points + h.numItems / 3;
            }
        }
    };
    this.renderBuffer = function (a, b, c, d, e, f) {
        if (d.visible !== false) {
            var g,
                h,
                c = u(a, b, c, d, f),
                b = c.attributes,
                a = false,
                c = e.id * 16777215 + c.id * 2 + (d.wireframe ? 1 : 0);
            if (c !== U) {
                U = c;
                a = true;
            }
            if (!d.morphTargets && b.position >= 0) {
                if (a) {
                    k.bindBuffer(k.ARRAY_BUFFER, e.__webglVertexBuffer);
                    k.vertexAttribPointer(b.position, 3, k.FLOAT, false, 0, 0);
                }
            } else if (f.morphTargetBase) {
                c = d.program.attributes;
                if (f.morphTargetBase !== -1) {
                    k.bindBuffer(
                        k.ARRAY_BUFFER,
                        e.__webglMorphTargetsBuffers[f.morphTargetBase]
                    );
                    k.vertexAttribPointer(c.position, 3, k.FLOAT, false, 0, 0);
                } else if (c.position >= 0) {
                    k.bindBuffer(k.ARRAY_BUFFER, e.__webglVertexBuffer);
                    k.vertexAttribPointer(c.position, 3, k.FLOAT, false, 0, 0);
                }
                if (f.morphTargetForcedOrder.length) {
                    var i = 0;
                    h = f.morphTargetForcedOrder;
                    for (
                        g = f.morphTargetInfluences;
                        i < d.numSupportedMorphTargets && i < h.length;

                    ) {
                        k.bindBuffer(
                            k.ARRAY_BUFFER,
                            e.__webglMorphTargetsBuffers[h[i]]
                        );
                        k.vertexAttribPointer(
                            c["morphTarget" + i],
                            3,
                            k.FLOAT,
                            false,
                            0,
                            0
                        );
                        if (d.morphNormals) {
                            k.bindBuffer(
                                k.ARRAY_BUFFER,
                                e.__webglMorphNormalsBuffers[h[i]]
                            );
                            k.vertexAttribPointer(
                                c["morphNormal" + i],
                                3,
                                k.FLOAT,
                                false,
                                0,
                                0
                            );
                        }
                        f.__webglMorphTargetInfluences[i] = g[h[i]];
                        i++;
                    }
                } else {
                    h = [];
                    g = f.morphTargetInfluences;
                    var l,
                        m = g.length;
                    for (l = 0; l < m; l++) {
                        i = g[l];
                        i > 0 && h.push([l, i]);
                    }
                    if (h.length > d.numSupportedMorphTargets) {
                        h.sort(j);
                        h.length = d.numSupportedMorphTargets;
                    } else
                        h.length > d.numSupportedMorphNormals
                            ? h.sort(j)
                            : h.length === 0 && h.push([0, 0]);
                    for (i = 0; i < d.numSupportedMorphTargets; ) {
                        if (h[i]) {
                            l = h[i][0];
                            k.bindBuffer(
                                k.ARRAY_BUFFER,
                                e.__webglMorphTargetsBuffers[l]
                            );
                            k.vertexAttribPointer(
                                c["morphTarget" + i],
                                3,
                                k.FLOAT,
                                false,
                                0,
                                0
                            );
                            if (d.morphNormals) {
                                k.bindBuffer(
                                    k.ARRAY_BUFFER,
                                    e.__webglMorphNormalsBuffers[l]
                                );
                                k.vertexAttribPointer(
                                    c["morphNormal" + i],
                                    3,
                                    k.FLOAT,
                                    false,
                                    0,
                                    0
                                );
                            }
                            f.__webglMorphTargetInfluences[i] = g[l];
                        } else {
                            k.vertexAttribPointer(
                                c["morphTarget" + i],
                                3,
                                k.FLOAT,
                                false,
                                0,
                                0
                            );
                            d.morphNormals &&
                                k.vertexAttribPointer(
                                    c["morphNormal" + i],
                                    3,
                                    k.FLOAT,
                                    false,
                                    0,
                                    0
                                );
                            f.__webglMorphTargetInfluences[i] = 0;
                        }
                        i++;
                    }
                }
                d.program.uniforms.morphTargetInfluences !== null &&
                    k.uniform1fv(
                        d.program.uniforms.morphTargetInfluences,
                        f.__webglMorphTargetInfluences
                    );
            }
            if (a) {
                if (e.__webglCustomAttributesList) {
                    g = 0;
                    for (h = e.__webglCustomAttributesList.length; g < h; g++) {
                        c = e.__webglCustomAttributesList[g];
                        if (b[c.buffer.belongsToAttribute] >= 0) {
                            k.bindBuffer(k.ARRAY_BUFFER, c.buffer);
                            k.vertexAttribPointer(
                                b[c.buffer.belongsToAttribute],
                                c.size,
                                k.FLOAT,
                                false,
                                0,
                                0
                            );
                        }
                    }
                }
                if (b.color >= 0) {
                    k.bindBuffer(k.ARRAY_BUFFER, e.__webglColorBuffer);
                    k.vertexAttribPointer(b.color, 3, k.FLOAT, false, 0, 0);
                }
                if (b.normal >= 0) {
                    k.bindBuffer(k.ARRAY_BUFFER, e.__webglNormalBuffer);
                    k.vertexAttribPointer(b.normal, 3, k.FLOAT, false, 0, 0);
                }
                if (b.tangent >= 0) {
                    k.bindBuffer(k.ARRAY_BUFFER, e.__webglTangentBuffer);
                    k.vertexAttribPointer(b.tangent, 4, k.FLOAT, false, 0, 0);
                }
                if (b.uv >= 0)
                    if (e.__webglUVBuffer) {
                        k.bindBuffer(k.ARRAY_BUFFER, e.__webglUVBuffer);
                        k.vertexAttribPointer(b.uv, 2, k.FLOAT, false, 0, 0);
                        k.enableVertexAttribArray(b.uv);
                    } else k.disableVertexAttribArray(b.uv);
                if (b.uv2 >= 0)
                    if (e.__webglUV2Buffer) {
                        k.bindBuffer(k.ARRAY_BUFFER, e.__webglUV2Buffer);
                        k.vertexAttribPointer(b.uv2, 2, k.FLOAT, false, 0, 0);
                        k.enableVertexAttribArray(b.uv2);
                    } else k.disableVertexAttribArray(b.uv2);
                if (d.skinning && b.skinIndex >= 0 && b.skinWeight >= 0) {
                    k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinIndicesBuffer);
                    k.vertexAttribPointer(b.skinIndex, 4, k.FLOAT, false, 0, 0);
                    k.bindBuffer(k.ARRAY_BUFFER, e.__webglSkinWeightsBuffer);
                    k.vertexAttribPointer(
                        b.skinWeight,
                        4,
                        k.FLOAT,
                        false,
                        0,
                        0
                    );
                }
            }
            if (f instanceof THREE.Mesh) {
                if (d.wireframe) {
                    d = d.wireframeLinewidth;
                    if (d !== Fa) {
                        k.lineWidth(d);
                        Fa = d;
                    }
                    a &&
                        k.bindBuffer(
                            k.ELEMENT_ARRAY_BUFFER,
                            e.__webglLineBuffer
                        );
                    k.drawElements(
                        k.LINES,
                        e.__webglLineCount,
                        k.UNSIGNED_SHORT,
                        0
                    );
                } else {
                    a &&
                        k.bindBuffer(
                            k.ELEMENT_ARRAY_BUFFER,
                            e.__webglFaceBuffer
                        );
                    k.drawElements(
                        k.TRIANGLES,
                        e.__webglFaceCount,
                        k.UNSIGNED_SHORT,
                        0
                    );
                }
                Q.info.render.calls++;
                Q.info.render.vertices =
                    Q.info.render.vertices + e.__webglFaceCount;
                Q.info.render.faces =
                    Q.info.render.faces + e.__webglFaceCount / 3;
            } else if (f instanceof THREE.Line) {
                f = f.type === THREE.LineStrip ? k.LINE_STRIP : k.LINES;
                d = d.linewidth;
                if (d !== Fa) {
                    k.lineWidth(d);
                    Fa = d;
                }
                k.drawArrays(f, 0, e.__webglLineCount);
                Q.info.render.calls++;
            } else if (f instanceof THREE.ParticleSystem) {
                k.drawArrays(k.POINTS, 0, e.__webglParticleCount);
                Q.info.render.calls++;
                Q.info.render.points =
                    Q.info.render.points + e.__webglParticleCount;
            } else if (f instanceof THREE.Ribbon) {
                k.drawArrays(k.TRIANGLE_STRIP, 0, e.__webglVertexCount);
                Q.info.render.calls++;
            }
        }
    };
    this.render = function (a, b, c, d) {
        if (b instanceof THREE.Camera === false)
            console.error(
                "THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."
            );
        else {
            var e,
                f,
                g,
                h,
                j = a.__lights,
                o = a.fog;
            N = -1;
            hb = true;
            this.autoUpdateScene && a.updateMatrixWorld();
            b.parent === void 0 && b.updateMatrixWorld();
            if (!b._viewMatrixArray) b._viewMatrixArray = new Float32Array(16);
            if (!b._projectionMatrixArray)
                b._projectionMatrixArray = new Float32Array(16);
            b.matrixWorldInverse.getInverse(b.matrixWorld);
            b.matrixWorldInverse.flattenToArray(b._viewMatrixArray);
            b.projectionMatrix.flattenToArray(b._projectionMatrixArray);
            bb.multiply(b.projectionMatrix, b.matrixWorldInverse);
            ab.setFromMatrix(bb);
            this.autoUpdateObjects && this.initWebGLObjects(a);
            l(this.renderPluginsPre, a, b);
            Q.info.render.calls = 0;
            Q.info.render.vertices = 0;
            Q.info.render.faces = 0;
            Q.info.render.points = 0;
            this.setRenderTarget(c);
            (this.autoClear || d) &&
                this.clear(
                    this.autoClearColor,
                    this.autoClearDepth,
                    this.autoClearStencil
                );
            h = a.__webglObjects;
            d = 0;
            for (e = h.length; d < e; d++) {
                f = h[d];
                g = f.object;
                f.render = false;
                if (
                    g.visible &&
                    (!(
                        g instanceof THREE.Mesh ||
                        g instanceof THREE.ParticleSystem
                    ) ||
                        !g.frustumCulled ||
                        ab.contains(g))
                ) {
                    s(g, b);
                    var p = f,
                        q = p.object,
                        r = p.buffer,
                        t = void 0,
                        t = (t = void 0),
                        t = q.material;
                    if (t instanceof THREE.MeshFaceMaterial) {
                        t = r.materialIndex;
                        if (t >= 0) {
                            t = q.geometry.materials[t];
                            if (t.transparent) {
                                p.transparent = t;
                                p.opaque = null;
                            } else {
                                p.opaque = t;
                                p.transparent = null;
                            }
                        }
                    } else if (t)
                        if (t.transparent) {
                            p.transparent = t;
                            p.opaque = null;
                        } else {
                            p.opaque = t;
                            p.transparent = null;
                        }
                    f.render = true;
                    if (this.sortObjects === true)
                        if (g.renderDepth !== null) f.z = g.renderDepth;
                        else {
                            Pa.copy(g.matrixWorld.getPosition());
                            bb.multiplyVector3(Pa);
                            f.z = Pa.z;
                        }
                }
            }
            this.sortObjects && h.sort(i);
            h = a.__webglObjectsImmediate;
            d = 0;
            for (e = h.length; d < e; d++) {
                f = h[d];
                g = f.object;
                if (g.visible) {
                    s(g, b);
                    g = f.object.material;
                    if (g.transparent) {
                        f.transparent = g;
                        f.opaque = null;
                    } else {
                        f.opaque = g;
                        f.transparent = null;
                    }
                }
            }
            if (a.overrideMaterial) {
                d = a.overrideMaterial;
                this.setBlending(
                    d.blending,
                    d.blendEquation,
                    d.blendSrc,
                    d.blendDst
                );
                this.setDepthTest(d.depthTest);
                this.setDepthWrite(d.depthWrite);
                A(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits);
                n(a.__webglObjects, false, "", b, j, o, true, d);
                m(a.__webglObjectsImmediate, "", b, j, o, false, d);
            } else {
                this.setBlending(THREE.NormalBlending);
                n(a.__webglObjects, true, "opaque", b, j, o, false);
                m(a.__webglObjectsImmediate, "opaque", b, j, o, false);
                n(a.__webglObjects, false, "transparent", b, j, o, true);
                m(a.__webglObjectsImmediate, "transparent", b, j, o, true);
            }
            l(this.renderPluginsPost, a, b);
            if (
                c &&
                c.generateMipmaps &&
                c.minFilter !== THREE.NearestFilter &&
                c.minFilter !== THREE.LinearFilter
            )
                if (c instanceof THREE.WebGLRenderTargetCube) {
                    k.bindTexture(k.TEXTURE_CUBE_MAP, c.__webglTexture);
                    k.generateMipmap(k.TEXTURE_CUBE_MAP);
                    k.bindTexture(k.TEXTURE_CUBE_MAP, null);
                } else {
                    k.bindTexture(k.TEXTURE_2D, c.__webglTexture);
                    k.generateMipmap(k.TEXTURE_2D);
                    k.bindTexture(k.TEXTURE_2D, null);
                }
            this.setDepthTest(true);
            this.setDepthWrite(true);
        }
    };
    this.renderImmediateObject = function (a, b, c, d, e) {
        var f = u(a, b, c, d, e);
        U = -1;
        Q.setMaterialFaces(d);
        e.immediateRenderCallback
            ? e.immediateRenderCallback(f, k, ab)
            : e.render(function (a) {
                    Q.renderBufferImmediate(a, f, d);
                });
    };
    this.initWebGLObjects = function (a) {
        if (!a.__webglObjects) {
            a.__webglObjects = [];
            a.__webglObjectsImmediate = [];
            a.__webglSprites = [];
            a.__webglFlares = [];
        }
        for (; a.__objectsAdded.length; ) {
            var i = a.__objectsAdded[0],
                j = a,
                l = void 0,
                m = void 0,
                n = void 0;
            if (!i.__webglInit) {
                i.__webglInit = true;
                i._modelViewMatrix = new THREE.Matrix4();
                i._normalMatrix = new THREE.Matrix3();
                if (i instanceof THREE.Mesh) {
                    m = i.geometry;
                    if (m instanceof THREE.Geometry) {
                        if (m.geometryGroups === void 0) {
                            var s = m,
                                u = void 0,
                                v = void 0,
                                w = void 0,
                                z = void 0,
                                A = void 0,
                                B = void 0,
                                E = void 0,
                                D = {},
                                G = s.morphTargets.length,
                                H = s.morphNormals.length;
                            s.geometryGroups = {};
                            u = 0;
                            for (v = s.faces.length; u < v; u++) {
                                w = s.faces[u];
                                z = w.materialIndex;
                                B = z !== void 0 ? z : -1;
                                D[B] === void 0 &&
                                    (D[B] = { hash: B, counter: 0 });
                                E = D[B].hash + "_" + D[B].counter;
                                s.geometryGroups[E] === void 0 &&
                                    (s.geometryGroups[E] = {
                                        faces3: [],
                                        faces4: [],
                                        materialIndex: z,
                                        vertices: 0,
                                        numMorphTargets: G,
                                        numMorphNormals: H
                                    });
                                A = w instanceof THREE.Face3 ? 3 : 4;
                                if (s.geometryGroups[E].vertices + A > 65535) {
                                    D[B].counter = D[B].counter + 1;
                                    E = D[B].hash + "_" + D[B].counter;
                                    s.geometryGroups[E] === void 0 &&
                                        (s.geometryGroups[E] = {
                                            faces3: [],
                                            faces4: [],
                                            materialIndex: z,
                                            vertices: 0,
                                            numMorphTargets: G,
                                            numMorphNormals: H
                                        });
                                }
                                w instanceof THREE.Face3
                                    ? s.geometryGroups[E].faces3.push(u)
                                    : s.geometryGroups[E].faces4.push(u);
                                s.geometryGroups[E].vertices =
                                    s.geometryGroups[E].vertices + A;
                            }
                            s.geometryGroupsList = [];
                            var I = void 0;
                            for (I in s.geometryGroups) {
                                s.geometryGroups[I].id = Ia++;
                                s.geometryGroupsList.push(s.geometryGroups[I]);
                            }
                        }
                        for (l in m.geometryGroups) {
                            n = m.geometryGroups[l];
                            if (!n.__webglVertexBuffer) {
                                var F = n;
                                F.__webglVertexBuffer = k.createBuffer();
                                F.__webglNormalBuffer = k.createBuffer();
                                F.__webglTangentBuffer = k.createBuffer();
                                F.__webglColorBuffer = k.createBuffer();
                                F.__webglUVBuffer = k.createBuffer();
                                F.__webglUV2Buffer = k.createBuffer();
                                F.__webglSkinIndicesBuffer = k.createBuffer();
                                F.__webglSkinWeightsBuffer = k.createBuffer();
                                F.__webglFaceBuffer = k.createBuffer();
                                F.__webglLineBuffer = k.createBuffer();
                                var L = void 0,
                                    J = void 0;
                                if (F.numMorphTargets) {
                                    F.__webglMorphTargetsBuffers = [];
                                    L = 0;
                                    for (J = F.numMorphTargets; L < J; L++)
                                        F.__webglMorphTargetsBuffers.push(
                                            k.createBuffer()
                                        );
                                }
                                if (F.numMorphNormals) {
                                    F.__webglMorphNormalsBuffers = [];
                                    L = 0;
                                    for (J = F.numMorphNormals; L < J; L++)
                                        F.__webglMorphNormalsBuffers.push(
                                            k.createBuffer()
                                        );
                                }
                                Q.info.memory.geometries++;
                                var N = n,
                                    K = i,
                                    M = K.geometry,
                                    O = N.faces3,
                                    da = N.faces4,
                                    U = O.length * 3 + da.length * 4,
                                    ga = O.length * 1 + da.length * 2,
                                    V = O.length * 3 + da.length * 4,
                                    $ = c(K, N),
                                    ba = f($),
                                    ia = d($),
                                    fa = $.vertexColors
                                        ? $.vertexColors
                                        : false;
                                N.__vertexArray = new Float32Array(U * 3);
                                if (ia)
                                    N.__normalArray = new Float32Array(U * 3);
                                if (M.hasTangents)
                                    N.__tangentArray = new Float32Array(U * 4);
                                if (fa)
                                    N.__colorArray = new Float32Array(U * 3);
                                if (ba) {
                                    if (
                                        M.faceUvs.length > 0 ||
                                        M.faceVertexUvs.length > 0
                                    )
                                        N.__uvArray = new Float32Array(U * 2);
                                    if (
                                        M.faceUvs.length > 1 ||
                                        M.faceVertexUvs.length > 1
                                    )
                                        N.__uv2Array = new Float32Array(U * 2);
                                }
                                if (
                                    K.geometry.skinWeights.length &&
                                    K.geometry.skinIndices.length
                                ) {
                                    N.__skinIndexArray = new Float32Array(
                                        U * 4
                                    );
                                    N.__skinWeightArray = new Float32Array(
                                        U * 4
                                    );
                                }
                                N.__faceArray = new Uint16Array(ga * 3);
                                N.__lineArray = new Uint16Array(V * 2);
                                var Y = void 0,
                                    pa = void 0;
                                if (N.numMorphTargets) {
                                    N.__morphTargetsArrays = [];
                                    Y = 0;
                                    for (pa = N.numMorphTargets; Y < pa; Y++)
                                        N.__morphTargetsArrays.push(
                                            new Float32Array(U * 3)
                                        );
                                }
                                if (N.numMorphNormals) {
                                    N.__morphNormalsArrays = [];
                                    Y = 0;
                                    for (pa = N.numMorphNormals; Y < pa; Y++)
                                        N.__morphNormalsArrays.push(
                                            new Float32Array(U * 3)
                                        );
                                }
                                N.__webglFaceCount = ga * 3;
                                N.__webglLineCount = V * 2;
                                if ($.attributes) {
                                    if (
                                        N.__webglCustomAttributesList === void 0
                                    )
                                        N.__webglCustomAttributesList = [];
                                    var ua = void 0;
                                    for (ua in $.attributes) {
                                        var Ca = $.attributes[ua],
                                            ja = {},
                                            Ja;
                                        for (Ja in Ca) ja[Ja] = Ca[Ja];
                                        if (
                                            !ja.__webglInitialized ||
                                            ja.createUniqueBuffers
                                        ) {
                                            ja.__webglInitialized = true;
                                            var ta = 1;
                                            ja.type === "v2"
                                                ? (ta = 2)
                                                : ja.type === "v3"
                                                    ? (ta = 3)
                                                    : ja.type === "v4"
                                                        ? (ta = 4)
                                                        : ja.type === "c" &&
                                                            (ta = 3);
                                            ja.size = ta;
                                            ja.array = new Float32Array(U * ta);
                                            ja.buffer = k.createBuffer();
                                            ja.buffer.belongsToAttribute = ua;
                                            Ca.needsUpdate = true;
                                            ja.__original = Ca;
                                        }
                                        N.__webglCustomAttributesList.push(ja);
                                    }
                                }
                                N.__inittedArrays = true;
                                m.verticesNeedUpdate = true;
                                m.morphTargetsNeedUpdate = true;
                                m.elementsNeedUpdate = true;
                                m.uvsNeedUpdate = true;
                                m.normalsNeedUpdate = true;
                                m.tangentsNeedUpdate = true;
                                m.colorsNeedUpdate = true;
                            }
                        }
                    } else m instanceof THREE.BufferGeometry && e(m);
                } else if (i instanceof THREE.Ribbon) {
                    m = i.geometry;
                    if (!m.__webglVertexBuffer) {
                        var Da = m;
                        Da.__webglVertexBuffer = k.createBuffer();
                        Da.__webglColorBuffer = k.createBuffer();
                        Q.info.memory.geometries++;
                        var xa = m,
                            Ga = xa.vertices.length;
                        xa.__vertexArray = new Float32Array(Ga * 3);
                        xa.__colorArray = new Float32Array(Ga * 3);
                        xa.__webglVertexCount = Ga;
                        m.verticesNeedUpdate = true;
                        m.colorsNeedUpdate = true;
                    }
                } else if (i instanceof THREE.Line) {
                    m = i.geometry;
                    if (!m.__webglVertexBuffer) {
                        var Oa = m;
                        Oa.__webglVertexBuffer = k.createBuffer();
                        Oa.__webglColorBuffer = k.createBuffer();
                        Q.info.memory.geometries++;
                        var Fa = m,
                            Pa = i,
                            Qa = Fa.vertices.length;
                        Fa.__vertexArray = new Float32Array(Qa * 3);
                        Fa.__colorArray = new Float32Array(Qa * 3);
                        Fa.__webglLineCount = Qa;
                        b(Fa, Pa);
                        m.verticesNeedUpdate = true;
                        m.colorsNeedUpdate = true;
                    }
                } else if (i instanceof THREE.ParticleSystem) {
                    m = i.geometry;
                    if (!m.__webglVertexBuffer)
                        if (m instanceof THREE.Geometry) {
                            var Xa = m;
                            Xa.__webglVertexBuffer = k.createBuffer();
                            Xa.__webglColorBuffer = k.createBuffer();
                            Q.info.memory.geometries++;
                            var Ya = m,
                                pb = i,
                                fb = Ya.vertices.length;
                            Ya.__vertexArray = new Float32Array(fb * 3);
                            Ya.__colorArray = new Float32Array(fb * 3);
                            Ya.__sortArray = [];
                            Ya.__webglParticleCount = fb;
                            b(Ya, pb);
                            m.verticesNeedUpdate = true;
                            m.colorsNeedUpdate = true;
                        } else m instanceof THREE.BufferGeometry && e(m);
                }
            }
            if (!i.__webglActive) {
                if (i instanceof THREE.Mesh) {
                    m = i.geometry;
                    if (m instanceof THREE.BufferGeometry)
                        q(j.__webglObjects, m, i);
                    else
                        for (l in m.geometryGroups) {
                            n = m.geometryGroups[l];
                            q(j.__webglObjects, n, i);
                        }
                } else if (
                    i instanceof THREE.Ribbon ||
                    i instanceof THREE.Line ||
                    i instanceof THREE.ParticleSystem
                ) {
                    m = i.geometry;
                    q(j.__webglObjects, m, i);
                } else
                    i instanceof THREE.ImmediateRenderObject ||
                    i.immediateRenderCallback
                        ? j.__webglObjectsImmediate.push({
                                object: i,
                                opaque: null,
                                transparent: null
                            })
                        : i instanceof THREE.Sprite
                            ? j.__webglSprites.push(i)
                            : i instanceof THREE.LensFlare &&
                                j.__webglFlares.push(i);
                i.__webglActive = true;
            }
            a.__objectsAdded.splice(0, 1);
        }
        for (; a.__objectsRemoved.length; ) {
            var lb = a.__objectsRemoved[0],
                $a = a;
            lb instanceof THREE.Mesh ||
            lb instanceof THREE.ParticleSystem ||
            lb instanceof THREE.Ribbon ||
            lb instanceof THREE.Line
                ? r($a.__webglObjects, lb)
                : lb instanceof THREE.Sprite
                    ? t($a.__webglSprites, lb)
                    : lb instanceof THREE.LensFlare
                        ? t($a.__webglFlares, lb)
                        : (lb instanceof THREE.ImmediateRenderObject ||
                                lb.immediateRenderCallback) &&
                            r($a.__webglObjectsImmediate, lb);
            lb.__webglActive = false;
            a.__objectsRemoved.splice(0, 1);
        }
        for (var hb = 0, rb = a.__webglObjects.length; hb < rb; hb++) {
            var ub = a.__webglObjects[hb].object,
                ea = ub.geometry,
                bb = void 0,
                ab = void 0,
                cb = void 0;
            if (ub instanceof THREE.Mesh)
                if (ea instanceof THREE.BufferGeometry) {
                    (ea.verticesNeedUpdate ||
                        ea.elementsNeedUpdate ||
                        ea.uvsNeedUpdate ||
                        ea.normalsNeedUpdate ||
                        ea.colorsNeedUpdate ||
                        ea.tangentsNeedUpdate) &&
                        h(ea, k.DYNAMIC_DRAW, !ea.dynamic);
                    ea.verticesNeedUpdate = false;
                    ea.elementsNeedUpdate = false;
                    ea.uvsNeedUpdate = false;
                    ea.normalsNeedUpdate = false;
                    ea.colorsNeedUpdate = false;
                    ea.tangentsNeedUpdate = false;
                } else {
                    for (
                        var qb = 0, wb = ea.geometryGroupsList.length;
                        qb < wb;
                        qb++
                    ) {
                        bb = ea.geometryGroupsList[qb];
                        cb = c(ub, bb);
                        ab = cb.attributes && p(cb);
                        if (
                            ea.verticesNeedUpdate ||
                            ea.morphTargetsNeedUpdate ||
                            ea.elementsNeedUpdate ||
                            ea.uvsNeedUpdate ||
                            ea.normalsNeedUpdate ||
                            ea.colorsNeedUpdate ||
                            ea.tangentsNeedUpdate ||
                            ab
                        ) {
                            var la = bb,
                                xb = ub,
                                mb = k.DYNAMIC_DRAW,
                                yb = !ea.dynamic,
                                gb = cb;
                            if (la.__inittedArrays) {
                                var Pb = d(gb),
                                    ec = gb.vertexColors
                                        ? gb.vertexColors
                                        : false,
                                    ic = f(gb),
                                    Fc = Pb === THREE.SmoothShading,
                                    C = void 0,
                                    W = void 0,
                                    Xb = void 0,
                                    P = void 0,
                                    kc = void 0,
                                    Yb = void 0,
                                    vb = void 0,
                                    Gc = void 0,
                                    Qb = void 0,
                                    lc = void 0,
                                    mc = void 0,
                                    R = void 0,
                                    S = void 0,
                                    T = void 0,
                                    ka = void 0,
                                    zb = void 0,
                                    Ab = void 0,
                                    Bb = void 0,
                                    sc = void 0,
                                    Cb = void 0,
                                    Db = void 0,
                                    Eb = void 0,
                                    tc = void 0,
                                    Fb = void 0,
                                    Gb = void 0,
                                    Hb = void 0,
                                    uc = void 0,
                                    Ib = void 0,
                                    Jb = void 0,
                                    Kb = void 0,
                                    vc = void 0,
                                    Lb = void 0,
                                    Mb = void 0,
                                    Nb = void 0,
                                    wc = void 0,
                                    qa = void 0,
                                    qc = void 0,
                                    Zb = void 0,
                                    nc = void 0,
                                    oc = void 0,
                                    Ra = void 0,
                                    rc = void 0,
                                    Ma = void 0,
                                    Na = void 0,
                                    $b = void 0,
                                    Rb = void 0,
                                    Ha = 0,
                                    La = 0,
                                    Sb = 0,
                                    Tb = 0,
                                    nb = 0,
                                    Va = 0,
                                    sa = 0,
                                    Za = 0,
                                    Ka = 0,
                                    aa = 0,
                                    ha = 0,
                                    y = 0,
                                    ra = void 0,
                                    Sa = la.__vertexArray,
                                    xc = la.__uvArray,
                                    yc = la.__uv2Array,
                                    ob = la.__normalArray,
                                    ya = la.__tangentArray,
                                    Ta = la.__colorArray,
                                    za = la.__skinIndexArray,
                                    Aa = la.__skinWeightArray,
                                    Uc = la.__morphTargetsArrays,
                                    Vc = la.__morphNormalsArrays,
                                    Wc = la.__webglCustomAttributesList,
                                    x = void 0,
                                    Ob = la.__faceArray,
                                    ib = la.__lineArray,
                                    db = xb.geometry,
                                    Dc = db.elementsNeedUpdate,
                                    ad = db.uvsNeedUpdate,
                                    Rc = db.normalsNeedUpdate,
                                    Sc = db.tangentsNeedUpdate,
                                    hd = db.colorsNeedUpdate,
                                    id = db.morphTargetsNeedUpdate,
                                    gc = db.vertices,
                                    ma = la.faces3,
                                    na = la.faces4,
                                    Wa = db.faces,
                                    Xc = db.faceVertexUvs[0],
                                    Yc = db.faceVertexUvs[1],
                                    hc = db.skinIndices,
                                    ac = db.skinWeights,
                                    bc = db.morphTargets,
                                    Hc = db.morphNormals;
                                if (db.verticesNeedUpdate) {
                                    C = 0;
                                    for (W = ma.length; C < W; C++) {
                                        P = Wa[ma[C]];
                                        R = gc[P.a];
                                        S = gc[P.b];
                                        T = gc[P.c];
                                        Sa[La] = R.x;
                                        Sa[La + 1] = R.y;
                                        Sa[La + 2] = R.z;
                                        Sa[La + 3] = S.x;
                                        Sa[La + 4] = S.y;
                                        Sa[La + 5] = S.z;
                                        Sa[La + 6] = T.x;
                                        Sa[La + 7] = T.y;
                                        Sa[La + 8] = T.z;
                                        La = La + 9;
                                    }
                                    C = 0;
                                    for (W = na.length; C < W; C++) {
                                        P = Wa[na[C]];
                                        R = gc[P.a];
                                        S = gc[P.b];
                                        T = gc[P.c];
                                        ka = gc[P.d];
                                        Sa[La] = R.x;
                                        Sa[La + 1] = R.y;
                                        Sa[La + 2] = R.z;
                                        Sa[La + 3] = S.x;
                                        Sa[La + 4] = S.y;
                                        Sa[La + 5] = S.z;
                                        Sa[La + 6] = T.x;
                                        Sa[La + 7] = T.y;
                                        Sa[La + 8] = T.z;
                                        Sa[La + 9] = ka.x;
                                        Sa[La + 10] = ka.y;
                                        Sa[La + 11] = ka.z;
                                        La = La + 12;
                                    }
                                    k.bindBuffer(
                                        k.ARRAY_BUFFER,
                                        la.__webglVertexBuffer
                                    );
                                    k.bufferData(k.ARRAY_BUFFER, Sa, mb);
                                }
                                if (id) {
                                    Ra = 0;
                                    for (rc = bc.length; Ra < rc; Ra++) {
                                        C = ha = 0;
                                        for (W = ma.length; C < W; C++) {
                                            $b = ma[C];
                                            P = Wa[$b];
                                            R = bc[Ra].vertices[P.a];
                                            S = bc[Ra].vertices[P.b];
                                            T = bc[Ra].vertices[P.c];
                                            Ma = Uc[Ra];
                                            Ma[ha] = R.x;
                                            Ma[ha + 1] = R.y;
                                            Ma[ha + 2] = R.z;
                                            Ma[ha + 3] = S.x;
                                            Ma[ha + 4] = S.y;
                                            Ma[ha + 5] = S.z;
                                            Ma[ha + 6] = T.x;
                                            Ma[ha + 7] = T.y;
                                            Ma[ha + 8] = T.z;
                                            if (gb.morphNormals) {
                                                if (Fc) {
                                                    Rb =
                                                        Hc[Ra].vertexNormals[
                                                            $b
                                                        ];
                                                    Cb = Rb.a;
                                                    Db = Rb.b;
                                                    Eb = Rb.c;
                                                } else
                                                    Eb =
                                                        Db =
                                                        Cb =
                                                            Hc[Ra].faceNormals[
                                                                $b
                                                            ];
                                                Na = Vc[Ra];
                                                Na[ha] = Cb.x;
                                                Na[ha + 1] = Cb.y;
                                                Na[ha + 2] = Cb.z;
                                                Na[ha + 3] = Db.x;
                                                Na[ha + 4] = Db.y;
                                                Na[ha + 5] = Db.z;
                                                Na[ha + 6] = Eb.x;
                                                Na[ha + 7] = Eb.y;
                                                Na[ha + 8] = Eb.z;
                                            }
                                            ha = ha + 9;
                                        }
                                        C = 0;
                                        for (W = na.length; C < W; C++) {
                                            $b = na[C];
                                            P = Wa[$b];
                                            R = bc[Ra].vertices[P.a];
                                            S = bc[Ra].vertices[P.b];
                                            T = bc[Ra].vertices[P.c];
                                            ka = bc[Ra].vertices[P.d];
                                            Ma = Uc[Ra];
                                            Ma[ha] = R.x;
                                            Ma[ha + 1] = R.y;
                                            Ma[ha + 2] = R.z;
                                            Ma[ha + 3] = S.x;
                                            Ma[ha + 4] = S.y;
                                            Ma[ha + 5] = S.z;
                                            Ma[ha + 6] = T.x;
                                            Ma[ha + 7] = T.y;
                                            Ma[ha + 8] = T.z;
                                            Ma[ha + 9] = ka.x;
                                            Ma[ha + 10] = ka.y;
                                            Ma[ha + 11] = ka.z;
                                            if (gb.morphNormals) {
                                                if (Fc) {
                                                    Rb =
                                                        Hc[Ra].vertexNormals[
                                                            $b
                                                        ];
                                                    Cb = Rb.a;
                                                    Db = Rb.b;
                                                    Eb = Rb.c;
                                                    tc = Rb.d;
                                                } else
                                                    tc =
                                                        Eb =
                                                        Db =
                                                        Cb =
                                                            Hc[Ra].faceNormals[
                                                                $b
                                                            ];
                                                Na = Vc[Ra];
                                                Na[ha] = Cb.x;
                                                Na[ha + 1] = Cb.y;
                                                Na[ha + 2] = Cb.z;
                                                Na[ha + 3] = Db.x;
                                                Na[ha + 4] = Db.y;
                                                Na[ha + 5] = Db.z;
                                                Na[ha + 6] = Eb.x;
                                                Na[ha + 7] = Eb.y;
                                                Na[ha + 8] = Eb.z;
                                                Na[ha + 9] = tc.x;
                                                Na[ha + 10] = tc.y;
                                                Na[ha + 11] = tc.z;
                                            }
                                            ha = ha + 12;
                                        }
                                        k.bindBuffer(
                                            k.ARRAY_BUFFER,
                                            la.__webglMorphTargetsBuffers[Ra]
                                        );
                                        k.bufferData(
                                            k.ARRAY_BUFFER,
                                            Uc[Ra],
                                            mb
                                        );
                                        if (gb.morphNormals) {
                                            k.bindBuffer(
                                                k.ARRAY_BUFFER,
                                                la.__webglMorphNormalsBuffers[
                                                    Ra
                                                ]
                                            );
                                            k.bufferData(
                                                k.ARRAY_BUFFER,
                                                Vc[Ra],
                                                mb
                                            );
                                        }
                                    }
                                }
                                if (ac.length) {
                                    C = 0;
                                    for (W = ma.length; C < W; C++) {
                                        P = Wa[ma[C]];
                                        Ib = ac[P.a];
                                        Jb = ac[P.b];
                                        Kb = ac[P.c];
                                        Aa[aa] = Ib.x;
                                        Aa[aa + 1] = Ib.y;
                                        Aa[aa + 2] = Ib.z;
                                        Aa[aa + 3] = Ib.w;
                                        Aa[aa + 4] = Jb.x;
                                        Aa[aa + 5] = Jb.y;
                                        Aa[aa + 6] = Jb.z;
                                        Aa[aa + 7] = Jb.w;
                                        Aa[aa + 8] = Kb.x;
                                        Aa[aa + 9] = Kb.y;
                                        Aa[aa + 10] = Kb.z;
                                        Aa[aa + 11] = Kb.w;
                                        Lb = hc[P.a];
                                        Mb = hc[P.b];
                                        Nb = hc[P.c];
                                        za[aa] = Lb.x;
                                        za[aa + 1] = Lb.y;
                                        za[aa + 2] = Lb.z;
                                        za[aa + 3] = Lb.w;
                                        za[aa + 4] = Mb.x;
                                        za[aa + 5] = Mb.y;
                                        za[aa + 6] = Mb.z;
                                        za[aa + 7] = Mb.w;
                                        za[aa + 8] = Nb.x;
                                        za[aa + 9] = Nb.y;
                                        za[aa + 10] = Nb.z;
                                        za[aa + 11] = Nb.w;
                                        aa = aa + 12;
                                    }
                                    C = 0;
                                    for (W = na.length; C < W; C++) {
                                        P = Wa[na[C]];
                                        Ib = ac[P.a];
                                        Jb = ac[P.b];
                                        Kb = ac[P.c];
                                        vc = ac[P.d];
                                        Aa[aa] = Ib.x;
                                        Aa[aa + 1] = Ib.y;
                                        Aa[aa + 2] = Ib.z;
                                        Aa[aa + 3] = Ib.w;
                                        Aa[aa + 4] = Jb.x;
                                        Aa[aa + 5] = Jb.y;
                                        Aa[aa + 6] = Jb.z;
                                        Aa[aa + 7] = Jb.w;
                                        Aa[aa + 8] = Kb.x;
                                        Aa[aa + 9] = Kb.y;
                                        Aa[aa + 10] = Kb.z;
                                        Aa[aa + 11] = Kb.w;
                                        Aa[aa + 12] = vc.x;
                                        Aa[aa + 13] = vc.y;
                                        Aa[aa + 14] = vc.z;
                                        Aa[aa + 15] = vc.w;
                                        Lb = hc[P.a];
                                        Mb = hc[P.b];
                                        Nb = hc[P.c];
                                        wc = hc[P.d];
                                        za[aa] = Lb.x;
                                        za[aa + 1] = Lb.y;
                                        za[aa + 2] = Lb.z;
                                        za[aa + 3] = Lb.w;
                                        za[aa + 4] = Mb.x;
                                        za[aa + 5] = Mb.y;
                                        za[aa + 6] = Mb.z;
                                        za[aa + 7] = Mb.w;
                                        za[aa + 8] = Nb.x;
                                        za[aa + 9] = Nb.y;
                                        za[aa + 10] = Nb.z;
                                        za[aa + 11] = Nb.w;
                                        za[aa + 12] = wc.x;
                                        za[aa + 13] = wc.y;
                                        za[aa + 14] = wc.z;
                                        za[aa + 15] = wc.w;
                                        aa = aa + 16;
                                    }
                                    if (aa > 0) {
                                        k.bindBuffer(
                                            k.ARRAY_BUFFER,
                                            la.__webglSkinIndicesBuffer
                                        );
                                        k.bufferData(k.ARRAY_BUFFER, za, mb);
                                        k.bindBuffer(
                                            k.ARRAY_BUFFER,
                                            la.__webglSkinWeightsBuffer
                                        );
                                        k.bufferData(k.ARRAY_BUFFER, Aa, mb);
                                    }
                                }
                                if (hd && ec) {
                                    C = 0;
                                    for (W = ma.length; C < W; C++) {
                                        P = Wa[ma[C]];
                                        vb = P.vertexColors;
                                        Gc = P.color;
                                        if (
                                            vb.length === 3 &&
                                            ec === THREE.VertexColors
                                        ) {
                                            Fb = vb[0];
                                            Gb = vb[1];
                                            Hb = vb[2];
                                        } else Hb = Gb = Fb = Gc;
                                        Ta[Ka] = Fb.r;
                                        Ta[Ka + 1] = Fb.g;
                                        Ta[Ka + 2] = Fb.b;
                                        Ta[Ka + 3] = Gb.r;
                                        Ta[Ka + 4] = Gb.g;
                                        Ta[Ka + 5] = Gb.b;
                                        Ta[Ka + 6] = Hb.r;
                                        Ta[Ka + 7] = Hb.g;
                                        Ta[Ka + 8] = Hb.b;
                                        Ka = Ka + 9;
                                    }
                                    C = 0;
                                    for (W = na.length; C < W; C++) {
                                        P = Wa[na[C]];
                                        vb = P.vertexColors;
                                        Gc = P.color;
                                        if (
                                            vb.length === 4 &&
                                            ec === THREE.VertexColors
                                        ) {
                                            Fb = vb[0];
                                            Gb = vb[1];
                                            Hb = vb[2];
                                            uc = vb[3];
                                        } else uc = Hb = Gb = Fb = Gc;
                                        Ta[Ka] = Fb.r;
                                        Ta[Ka + 1] = Fb.g;
                                        Ta[Ka + 2] = Fb.b;
                                        Ta[Ka + 3] = Gb.r;
                                        Ta[Ka + 4] = Gb.g;
                                        Ta[Ka + 5] = Gb.b;
                                        Ta[Ka + 6] = Hb.r;
                                        Ta[Ka + 7] = Hb.g;
                                        Ta[Ka + 8] = Hb.b;
                                        Ta[Ka + 9] = uc.r;
                                        Ta[Ka + 10] = uc.g;
                                        Ta[Ka + 11] = uc.b;
                                        Ka = Ka + 12;
                                    }
                                    if (Ka > 0) {
                                        k.bindBuffer(
                                            k.ARRAY_BUFFER,
                                            la.__webglColorBuffer
                                        );
                                        k.bufferData(k.ARRAY_BUFFER, Ta, mb);
                                    }
                                }
                                if (Sc && db.hasTangents) {
                                    C = 0;
                                    for (W = ma.length; C < W; C++) {
                                        P = Wa[ma[C]];
                                        Qb = P.vertexTangents;
                                        zb = Qb[0];
                                        Ab = Qb[1];
                                        Bb = Qb[2];
                                        ya[sa] = zb.x;
                                        ya[sa + 1] = zb.y;
                                        ya[sa + 2] = zb.z;
                                        ya[sa + 3] = zb.w;
                                        ya[sa + 4] = Ab.x;
                                        ya[sa + 5] = Ab.y;
                                        ya[sa + 6] = Ab.z;
                                        ya[sa + 7] = Ab.w;
                                        ya[sa + 8] = Bb.x;
                                        ya[sa + 9] = Bb.y;
                                        ya[sa + 10] = Bb.z;
                                        ya[sa + 11] = Bb.w;
                                        sa = sa + 12;
                                    }
                                    C = 0;
                                    for (W = na.length; C < W; C++) {
                                        P = Wa[na[C]];
                                        Qb = P.vertexTangents;
                                        zb = Qb[0];
                                        Ab = Qb[1];
                                        Bb = Qb[2];
                                        sc = Qb[3];
                                        ya[sa] = zb.x;
                                        ya[sa + 1] = zb.y;
                                        ya[sa + 2] = zb.z;
                                        ya[sa + 3] = zb.w;
                                        ya[sa + 4] = Ab.x;
                                        ya[sa + 5] = Ab.y;
                                        ya[sa + 6] = Ab.z;
                                        ya[sa + 7] = Ab.w;
                                        ya[sa + 8] = Bb.x;
                                        ya[sa + 9] = Bb.y;
                                        ya[sa + 10] = Bb.z;
                                        ya[sa + 11] = Bb.w;
                                        ya[sa + 12] = sc.x;
                                        ya[sa + 13] = sc.y;
                                        ya[sa + 14] = sc.z;
                                        ya[sa + 15] = sc.w;
                                        sa = sa + 16;
                                    }
                                    k.bindBuffer(
                                        k.ARRAY_BUFFER,
                                        la.__webglTangentBuffer
                                    );
                                    k.bufferData(k.ARRAY_BUFFER, ya, mb);
                                }
                                if (Rc && Pb) {
                                    C = 0;
                                    for (W = ma.length; C < W; C++) {
                                        P = Wa[ma[C]];
                                        kc = P.vertexNormals;
                                        Yb = P.normal;
                                        if (kc.length === 3 && Fc)
                                            for (qa = 0; qa < 3; qa++) {
                                                Zb = kc[qa];
                                                ob[Va] = Zb.x;
                                                ob[Va + 1] = Zb.y;
                                                ob[Va + 2] = Zb.z;
                                                Va = Va + 3;
                                            }
                                        else
                                            for (qa = 0; qa < 3; qa++) {
                                                ob[Va] = Yb.x;
                                                ob[Va + 1] = Yb.y;
                                                ob[Va + 2] = Yb.z;
                                                Va = Va + 3;
                                            }
                                    }
                                    C = 0;
                                    for (W = na.length; C < W; C++) {
                                        P = Wa[na[C]];
                                        kc = P.vertexNormals;
                                        Yb = P.normal;
                                        if (kc.length === 4 && Fc)
                                            for (qa = 0; qa < 4; qa++) {
                                                Zb = kc[qa];
                                                ob[Va] = Zb.x;
                                                ob[Va + 1] = Zb.y;
                                                ob[Va + 2] = Zb.z;
                                                Va = Va + 3;
                                            }
                                        else
                                            for (qa = 0; qa < 4; qa++) {
                                                ob[Va] = Yb.x;
                                                ob[Va + 1] = Yb.y;
                                                ob[Va + 2] = Yb.z;
                                                Va = Va + 3;
                                            }
                                    }
                                    k.bindBuffer(
                                        k.ARRAY_BUFFER,
                                        la.__webglNormalBuffer
                                    );
                                    k.bufferData(k.ARRAY_BUFFER, ob, mb);
                                }
                                if (ad && Xc && ic) {
                                    C = 0;
                                    for (W = ma.length; C < W; C++) {
                                        Xb = ma[C];
                                        lc = Xc[Xb];
                                        if (lc !== void 0)
                                            for (qa = 0; qa < 3; qa++) {
                                                nc = lc[qa];
                                                xc[Sb] = nc.u;
                                                xc[Sb + 1] = nc.v;
                                                Sb = Sb + 2;
                                            }
                                    }
                                    C = 0;
                                    for (W = na.length; C < W; C++) {
                                        Xb = na[C];
                                        lc = Xc[Xb];
                                        if (lc !== void 0)
                                            for (qa = 0; qa < 4; qa++) {
                                                nc = lc[qa];
                                                xc[Sb] = nc.u;
                                                xc[Sb + 1] = nc.v;
                                                Sb = Sb + 2;
                                            }
                                    }
                                    if (Sb > 0) {
                                        k.bindBuffer(
                                            k.ARRAY_BUFFER,
                                            la.__webglUVBuffer
                                        );
                                        k.bufferData(k.ARRAY_BUFFER, xc, mb);
                                    }
                                }
                                if (ad && Yc && ic) {
                                    C = 0;
                                    for (W = ma.length; C < W; C++) {
                                        Xb = ma[C];
                                        mc = Yc[Xb];
                                        if (mc !== void 0)
                                            for (qa = 0; qa < 3; qa++) {
                                                oc = mc[qa];
                                                yc[Tb] = oc.u;
                                                yc[Tb + 1] = oc.v;
                                                Tb = Tb + 2;
                                            }
                                    }
                                    C = 0;
                                    for (W = na.length; C < W; C++) {
                                        Xb = na[C];
                                        mc = Yc[Xb];
                                        if (mc !== void 0)
                                            for (qa = 0; qa < 4; qa++) {
                                                oc = mc[qa];
                                                yc[Tb] = oc.u;
                                                yc[Tb + 1] = oc.v;
                                                Tb = Tb + 2;
                                            }
                                    }
                                    if (Tb > 0) {
                                        k.bindBuffer(
                                            k.ARRAY_BUFFER,
                                            la.__webglUV2Buffer
                                        );
                                        k.bufferData(k.ARRAY_BUFFER, yc, mb);
                                    }
                                }
                                if (Dc) {
                                    C = 0;
                                    for (W = ma.length; C < W; C++) {
                                        Ob[nb] = Ha;
                                        Ob[nb + 1] = Ha + 1;
                                        Ob[nb + 2] = Ha + 2;
                                        nb = nb + 3;
                                        ib[Za] = Ha;
                                        ib[Za + 1] = Ha + 1;
                                        ib[Za + 2] = Ha;
                                        ib[Za + 3] = Ha + 2;
                                        ib[Za + 4] = Ha + 1;
                                        ib[Za + 5] = Ha + 2;
                                        Za = Za + 6;
                                        Ha = Ha + 3;
                                    }
                                    C = 0;
                                    for (W = na.length; C < W; C++) {
                                        Ob[nb] = Ha;
                                        Ob[nb + 1] = Ha + 1;
                                        Ob[nb + 2] = Ha + 3;
                                        Ob[nb + 3] = Ha + 1;
                                        Ob[nb + 4] = Ha + 2;
                                        Ob[nb + 5] = Ha + 3;
                                        nb = nb + 6;
                                        ib[Za] = Ha;
                                        ib[Za + 1] = Ha + 1;
                                        ib[Za + 2] = Ha;
                                        ib[Za + 3] = Ha + 3;
                                        ib[Za + 4] = Ha + 1;
                                        ib[Za + 5] = Ha + 2;
                                        ib[Za + 6] = Ha + 2;
                                        ib[Za + 7] = Ha + 3;
                                        Za = Za + 8;
                                        Ha = Ha + 4;
                                    }
                                    k.bindBuffer(
                                        k.ELEMENT_ARRAY_BUFFER,
                                        la.__webglFaceBuffer
                                    );
                                    k.bufferData(
                                        k.ELEMENT_ARRAY_BUFFER,
                                        Ob,
                                        mb
                                    );
                                    k.bindBuffer(
                                        k.ELEMENT_ARRAY_BUFFER,
                                        la.__webglLineBuffer
                                    );
                                    k.bufferData(
                                        k.ELEMENT_ARRAY_BUFFER,
                                        ib,
                                        mb
                                    );
                                }
                                if (Wc) {
                                    qa = 0;
                                    for (qc = Wc.length; qa < qc; qa++) {
                                        x = Wc[qa];
                                        if (x.__original.needsUpdate) {
                                            y = 0;
                                            if (x.size === 1)
                                                if (
                                                    x.boundTo === void 0 ||
                                                    x.boundTo === "vertices"
                                                ) {
                                                    C = 0;
                                                    for (
                                                        W = ma.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        P = Wa[ma[C]];
                                                        x.array[y] =
                                                            x.value[P.a];
                                                        x.array[y + 1] =
                                                            x.value[P.b];
                                                        x.array[y + 2] =
                                                            x.value[P.c];
                                                        y = y + 3;
                                                    }
                                                    C = 0;
                                                    for (
                                                        W = na.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        P = Wa[na[C]];
                                                        x.array[y] =
                                                            x.value[P.a];
                                                        x.array[y + 1] =
                                                            x.value[P.b];
                                                        x.array[y + 2] =
                                                            x.value[P.c];
                                                        x.array[y + 3] =
                                                            x.value[P.d];
                                                        y = y + 4;
                                                    }
                                                } else {
                                                    if (x.boundTo === "faces") {
                                                        C = 0;
                                                        for (
                                                            W = ma.length;
                                                            C < W;
                                                            C++
                                                        ) {
                                                            ra = x.value[ma[C]];
                                                            x.array[y] = ra;
                                                            x.array[y + 1] = ra;
                                                            x.array[y + 2] = ra;
                                                            y = y + 3;
                                                        }
                                                        C = 0;
                                                        for (
                                                            W = na.length;
                                                            C < W;
                                                            C++
                                                        ) {
                                                            ra = x.value[na[C]];
                                                            x.array[y] = ra;
                                                            x.array[y + 1] = ra;
                                                            x.array[y + 2] = ra;
                                                            x.array[y + 3] = ra;
                                                            y = y + 4;
                                                        }
                                                    }
                                                }
                                            else if (x.size === 2)
                                                if (
                                                    x.boundTo === void 0 ||
                                                    x.boundTo === "vertices"
                                                ) {
                                                    C = 0;
                                                    for (
                                                        W = ma.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        P = Wa[ma[C]];
                                                        R = x.value[P.a];
                                                        S = x.value[P.b];
                                                        T = x.value[P.c];
                                                        x.array[y] = R.x;
                                                        x.array[y + 1] = R.y;
                                                        x.array[y + 2] = S.x;
                                                        x.array[y + 3] = S.y;
                                                        x.array[y + 4] = T.x;
                                                        x.array[y + 5] = T.y;
                                                        y = y + 6;
                                                    }
                                                    C = 0;
                                                    for (
                                                        W = na.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        P = Wa[na[C]];
                                                        R = x.value[P.a];
                                                        S = x.value[P.b];
                                                        T = x.value[P.c];
                                                        ka = x.value[P.d];
                                                        x.array[y] = R.x;
                                                        x.array[y + 1] = R.y;
                                                        x.array[y + 2] = S.x;
                                                        x.array[y + 3] = S.y;
                                                        x.array[y + 4] = T.x;
                                                        x.array[y + 5] = T.y;
                                                        x.array[y + 6] = ka.x;
                                                        x.array[y + 7] = ka.y;
                                                        y = y + 8;
                                                    }
                                                } else {
                                                    if (x.boundTo === "faces") {
                                                        C = 0;
                                                        for (
                                                            W = ma.length;
                                                            C < W;
                                                            C++
                                                        ) {
                                                            T =
                                                                S =
                                                                R =
                                                                ra =
                                                                    x.value[
                                                                        ma[C]
                                                                    ];
                                                            x.array[y] = R.x;
                                                            x.array[y + 1] =
                                                                R.y;
                                                            x.array[y + 2] =
                                                                S.x;
                                                            x.array[y + 3] =
                                                                S.y;
                                                            x.array[y + 4] =
                                                                T.x;
                                                            x.array[y + 5] =
                                                                T.y;
                                                            y = y + 6;
                                                        }
                                                        C = 0;
                                                        for (
                                                            W = na.length;
                                                            C < W;
                                                            C++
                                                        ) {
                                                            ka =
                                                                T =
                                                                S =
                                                                R =
                                                                ra =
                                                                    x.value[
                                                                        na[C]
                                                                    ];
                                                            x.array[y] = R.x;
                                                            x.array[y + 1] =
                                                                R.y;
                                                            x.array[y + 2] =
                                                                S.x;
                                                            x.array[y + 3] =
                                                                S.y;
                                                            x.array[y + 4] =
                                                                T.x;
                                                            x.array[y + 5] =
                                                                T.y;
                                                            x.array[y + 6] =
                                                                ka.x;
                                                            x.array[y + 7] =
                                                                ka.y;
                                                            y = y + 8;
                                                        }
                                                    }
                                                }
                                            else if (x.size === 3) {
                                                var Z;
                                                Z =
                                                    x.type === "c"
                                                        ? ["r", "g", "b"]
                                                        : ["x", "y", "z"];
                                                if (
                                                    x.boundTo === void 0 ||
                                                    x.boundTo === "vertices"
                                                ) {
                                                    C = 0;
                                                    for (
                                                        W = ma.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        P = Wa[ma[C]];
                                                        R = x.value[P.a];
                                                        S = x.value[P.b];
                                                        T = x.value[P.c];
                                                        x.array[y] = R[Z[0]];
                                                        x.array[y + 1] =
                                                            R[Z[1]];
                                                        x.array[y + 2] =
                                                            R[Z[2]];
                                                        x.array[y + 3] =
                                                            S[Z[0]];
                                                        x.array[y + 4] =
                                                            S[Z[1]];
                                                        x.array[y + 5] =
                                                            S[Z[2]];
                                                        x.array[y + 6] =
                                                            T[Z[0]];
                                                        x.array[y + 7] =
                                                            T[Z[1]];
                                                        x.array[y + 8] =
                                                            T[Z[2]];
                                                        y = y + 9;
                                                    }
                                                    C = 0;
                                                    for (
                                                        W = na.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        P = Wa[na[C]];
                                                        R = x.value[P.a];
                                                        S = x.value[P.b];
                                                        T = x.value[P.c];
                                                        ka = x.value[P.d];
                                                        x.array[y] = R[Z[0]];
                                                        x.array[y + 1] =
                                                            R[Z[1]];
                                                        x.array[y + 2] =
                                                            R[Z[2]];
                                                        x.array[y + 3] =
                                                            S[Z[0]];
                                                        x.array[y + 4] =
                                                            S[Z[1]];
                                                        x.array[y + 5] =
                                                            S[Z[2]];
                                                        x.array[y + 6] =
                                                            T[Z[0]];
                                                        x.array[y + 7] =
                                                            T[Z[1]];
                                                        x.array[y + 8] =
                                                            T[Z[2]];
                                                        x.array[y + 9] =
                                                            ka[Z[0]];
                                                        x.array[y + 10] =
                                                            ka[Z[1]];
                                                        x.array[y + 11] =
                                                            ka[Z[2]];
                                                        y = y + 12;
                                                    }
                                                } else if (
                                                    x.boundTo === "faces"
                                                ) {
                                                    C = 0;
                                                    for (
                                                        W = ma.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        T =
                                                            S =
                                                            R =
                                                            ra =
                                                                x.value[ma[C]];
                                                        x.array[y] = R[Z[0]];
                                                        x.array[y + 1] =
                                                            R[Z[1]];
                                                        x.array[y + 2] =
                                                            R[Z[2]];
                                                        x.array[y + 3] =
                                                            S[Z[0]];
                                                        x.array[y + 4] =
                                                            S[Z[1]];
                                                        x.array[y + 5] =
                                                            S[Z[2]];
                                                        x.array[y + 6] =
                                                            T[Z[0]];
                                                        x.array[y + 7] =
                                                            T[Z[1]];
                                                        x.array[y + 8] =
                                                            T[Z[2]];
                                                        y = y + 9;
                                                    }
                                                    C = 0;
                                                    for (
                                                        W = na.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        ka =
                                                            T =
                                                            S =
                                                            R =
                                                            ra =
                                                                x.value[na[C]];
                                                        x.array[y] = R[Z[0]];
                                                        x.array[y + 1] =
                                                            R[Z[1]];
                                                        x.array[y + 2] =
                                                            R[Z[2]];
                                                        x.array[y + 3] =
                                                            S[Z[0]];
                                                        x.array[y + 4] =
                                                            S[Z[1]];
                                                        x.array[y + 5] =
                                                            S[Z[2]];
                                                        x.array[y + 6] =
                                                            T[Z[0]];
                                                        x.array[y + 7] =
                                                            T[Z[1]];
                                                        x.array[y + 8] =
                                                            T[Z[2]];
                                                        x.array[y + 9] =
                                                            ka[Z[0]];
                                                        x.array[y + 10] =
                                                            ka[Z[1]];
                                                        x.array[y + 11] =
                                                            ka[Z[2]];
                                                        y = y + 12;
                                                    }
                                                } else if (
                                                    x.boundTo === "faceVertices"
                                                ) {
                                                    C = 0;
                                                    for (
                                                        W = ma.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        ra = x.value[ma[C]];
                                                        R = ra[0];
                                                        S = ra[1];
                                                        T = ra[2];
                                                        x.array[y] = R[Z[0]];
                                                        x.array[y + 1] =
                                                            R[Z[1]];
                                                        x.array[y + 2] =
                                                            R[Z[2]];
                                                        x.array[y + 3] =
                                                            S[Z[0]];
                                                        x.array[y + 4] =
                                                            S[Z[1]];
                                                        x.array[y + 5] =
                                                            S[Z[2]];
                                                        x.array[y + 6] =
                                                            T[Z[0]];
                                                        x.array[y + 7] =
                                                            T[Z[1]];
                                                        x.array[y + 8] =
                                                            T[Z[2]];
                                                        y = y + 9;
                                                    }
                                                    C = 0;
                                                    for (
                                                        W = na.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        ra = x.value[na[C]];
                                                        R = ra[0];
                                                        S = ra[1];
                                                        T = ra[2];
                                                        ka = ra[3];
                                                        x.array[y] = R[Z[0]];
                                                        x.array[y + 1] =
                                                            R[Z[1]];
                                                        x.array[y + 2] =
                                                            R[Z[2]];
                                                        x.array[y + 3] =
                                                            S[Z[0]];
                                                        x.array[y + 4] =
                                                            S[Z[1]];
                                                        x.array[y + 5] =
                                                            S[Z[2]];
                                                        x.array[y + 6] =
                                                            T[Z[0]];
                                                        x.array[y + 7] =
                                                            T[Z[1]];
                                                        x.array[y + 8] =
                                                            T[Z[2]];
                                                        x.array[y + 9] =
                                                            ka[Z[0]];
                                                        x.array[y + 10] =
                                                            ka[Z[1]];
                                                        x.array[y + 11] =
                                                            ka[Z[2]];
                                                        y = y + 12;
                                                    }
                                                }
                                            } else if (x.size === 4)
                                                if (
                                                    x.boundTo === void 0 ||
                                                    x.boundTo === "vertices"
                                                ) {
                                                    C = 0;
                                                    for (
                                                        W = ma.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        P = Wa[ma[C]];
                                                        R = x.value[P.a];
                                                        S = x.value[P.b];
                                                        T = x.value[P.c];
                                                        x.array[y] = R.x;
                                                        x.array[y + 1] = R.y;
                                                        x.array[y + 2] = R.z;
                                                        x.array[y + 3] = R.w;
                                                        x.array[y + 4] = S.x;
                                                        x.array[y + 5] = S.y;
                                                        x.array[y + 6] = S.z;
                                                        x.array[y + 7] = S.w;
                                                        x.array[y + 8] = T.x;
                                                        x.array[y + 9] = T.y;
                                                        x.array[y + 10] = T.z;
                                                        x.array[y + 11] = T.w;
                                                        y = y + 12;
                                                    }
                                                    C = 0;
                                                    for (
                                                        W = na.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        P = Wa[na[C]];
                                                        R = x.value[P.a];
                                                        S = x.value[P.b];
                                                        T = x.value[P.c];
                                                        ka = x.value[P.d];
                                                        x.array[y] = R.x;
                                                        x.array[y + 1] = R.y;
                                                        x.array[y + 2] = R.z;
                                                        x.array[y + 3] = R.w;
                                                        x.array[y + 4] = S.x;
                                                        x.array[y + 5] = S.y;
                                                        x.array[y + 6] = S.z;
                                                        x.array[y + 7] = S.w;
                                                        x.array[y + 8] = T.x;
                                                        x.array[y + 9] = T.y;
                                                        x.array[y + 10] = T.z;
                                                        x.array[y + 11] = T.w;
                                                        x.array[y + 12] = ka.x;
                                                        x.array[y + 13] = ka.y;
                                                        x.array[y + 14] = ka.z;
                                                        x.array[y + 15] = ka.w;
                                                        y = y + 16;
                                                    }
                                                } else if (
                                                    x.boundTo === "faces"
                                                ) {
                                                    C = 0;
                                                    for (
                                                        W = ma.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        T =
                                                            S =
                                                            R =
                                                            ra =
                                                                x.value[ma[C]];
                                                        x.array[y] = R.x;
                                                        x.array[y + 1] = R.y;
                                                        x.array[y + 2] = R.z;
                                                        x.array[y + 3] = R.w;
                                                        x.array[y + 4] = S.x;
                                                        x.array[y + 5] = S.y;
                                                        x.array[y + 6] = S.z;
                                                        x.array[y + 7] = S.w;
                                                        x.array[y + 8] = T.x;
                                                        x.array[y + 9] = T.y;
                                                        x.array[y + 10] = T.z;
                                                        x.array[y + 11] = T.w;
                                                        y = y + 12;
                                                    }
                                                    C = 0;
                                                    for (
                                                        W = na.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        ka =
                                                            T =
                                                            S =
                                                            R =
                                                            ra =
                                                                x.value[na[C]];
                                                        x.array[y] = R.x;
                                                        x.array[y + 1] = R.y;
                                                        x.array[y + 2] = R.z;
                                                        x.array[y + 3] = R.w;
                                                        x.array[y + 4] = S.x;
                                                        x.array[y + 5] = S.y;
                                                        x.array[y + 6] = S.z;
                                                        x.array[y + 7] = S.w;
                                                        x.array[y + 8] = T.x;
                                                        x.array[y + 9] = T.y;
                                                        x.array[y + 10] = T.z;
                                                        x.array[y + 11] = T.w;
                                                        x.array[y + 12] = ka.x;
                                                        x.array[y + 13] = ka.y;
                                                        x.array[y + 14] = ka.z;
                                                        x.array[y + 15] = ka.w;
                                                        y = y + 16;
                                                    }
                                                } else if (
                                                    x.boundTo === "faceVertices"
                                                ) {
                                                    C = 0;
                                                    for (
                                                        W = ma.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        ra = x.value[ma[C]];
                                                        R = ra[0];
                                                        S = ra[1];
                                                        T = ra[2];
                                                        x.array[y] = R.x;
                                                        x.array[y + 1] = R.y;
                                                        x.array[y + 2] = R.z;
                                                        x.array[y + 3] = R.w;
                                                        x.array[y + 4] = S.x;
                                                        x.array[y + 5] = S.y;
                                                        x.array[y + 6] = S.z;
                                                        x.array[y + 7] = S.w;
                                                        x.array[y + 8] = T.x;
                                                        x.array[y + 9] = T.y;
                                                        x.array[y + 10] = T.z;
                                                        x.array[y + 11] = T.w;
                                                        y = y + 12;
                                                    }
                                                    C = 0;
                                                    for (
                                                        W = na.length;
                                                        C < W;
                                                        C++
                                                    ) {
                                                        ra = x.value[na[C]];
                                                        R = ra[0];
                                                        S = ra[1];
                                                        T = ra[2];
                                                        ka = ra[3];
                                                        x.array[y] = R.x;
                                                        x.array[y + 1] = R.y;
                                                        x.array[y + 2] = R.z;
                                                        x.array[y + 3] = R.w;
                                                        x.array[y + 4] = S.x;
                                                        x.array[y + 5] = S.y;
                                                        x.array[y + 6] = S.z;
                                                        x.array[y + 7] = S.w;
                                                        x.array[y + 8] = T.x;
                                                        x.array[y + 9] = T.y;
                                                        x.array[y + 10] = T.z;
                                                        x.array[y + 11] = T.w;
                                                        x.array[y + 12] = ka.x;
                                                        x.array[y + 13] = ka.y;
                                                        x.array[y + 14] = ka.z;
                                                        x.array[y + 15] = ka.w;
                                                        y = y + 16;
                                                    }
                                                }
                                            k.bindBuffer(
                                                k.ARRAY_BUFFER,
                                                x.buffer
                                            );
                                            k.bufferData(
                                                k.ARRAY_BUFFER,
                                                x.array,
                                                mb
                                            );
                                        }
                                    }
                                }
                                if (yb) {
                                    delete la.__inittedArrays;
                                    delete la.__colorArray;
                                    delete la.__normalArray;
                                    delete la.__tangentArray;
                                    delete la.__uvArray;
                                    delete la.__uv2Array;
                                    delete la.__faceArray;
                                    delete la.__vertexArray;
                                    delete la.__lineArray;
                                    delete la.__skinIndexArray;
                                    delete la.__skinWeightArray;
                                }
                            }
                        }
                    }
                    ea.verticesNeedUpdate = false;
                    ea.morphTargetsNeedUpdate = false;
                    ea.elementsNeedUpdate = false;
                    ea.uvsNeedUpdate = false;
                    ea.normalsNeedUpdate = false;
                    ea.colorsNeedUpdate = false;
                    ea.tangentsNeedUpdate = false;
                    cb.attributes && o(cb);
                }
            else if (ub instanceof THREE.Ribbon) {
                if (ea.verticesNeedUpdate || ea.colorsNeedUpdate) {
                    var cc = ea,
                        bd = k.DYNAMIC_DRAW,
                        zc = void 0,
                        Ac = void 0,
                        Ic = void 0,
                        dc = void 0,
                        Jc = void 0,
                        cd = cc.vertices,
                        dd = cc.colors,
                        jd = cd.length,
                        kd = dd.length,
                        Kc = cc.__vertexArray,
                        Lc = cc.__colorArray,
                        ld = cc.colorsNeedUpdate;
                    if (cc.verticesNeedUpdate) {
                        for (zc = 0; zc < jd; zc++) {
                            Ic = cd[zc];
                            dc = zc * 3;
                            Kc[dc] = Ic.x;
                            Kc[dc + 1] = Ic.y;
                            Kc[dc + 2] = Ic.z;
                        }
                        k.bindBuffer(k.ARRAY_BUFFER, cc.__webglVertexBuffer);
                        k.bufferData(k.ARRAY_BUFFER, Kc, bd);
                    }
                    if (ld) {
                        for (Ac = 0; Ac < kd; Ac++) {
                            Jc = dd[Ac];
                            dc = Ac * 3;
                            Lc[dc] = Jc.r;
                            Lc[dc + 1] = Jc.g;
                            Lc[dc + 2] = Jc.b;
                        }
                        k.bindBuffer(k.ARRAY_BUFFER, cc.__webglColorBuffer);
                        k.bufferData(k.ARRAY_BUFFER, Lc, bd);
                    }
                }
                ea.verticesNeedUpdate = false;
                ea.colorsNeedUpdate = false;
            } else if (ub instanceof THREE.Line) {
                cb = c(ub, bb);
                ab = cb.attributes && p(cb);
                if (ea.verticesNeedUpdate || ea.colorsNeedUpdate || ab) {
                    var Ub = ea,
                        Zc = k.DYNAMIC_DRAW,
                        Bc = void 0,
                        Cc = void 0,
                        Mc = void 0,
                        Ba = void 0,
                        Nc = void 0,
                        ed = Ub.vertices,
                        fd = Ub.colors,
                        md = ed.length,
                        nd = fd.length,
                        Oc = Ub.__vertexArray,
                        Pc = Ub.__colorArray,
                        od = Ub.colorsNeedUpdate,
                        $c = Ub.__webglCustomAttributesList,
                        Qc = void 0,
                        gd = void 0,
                        Ua = void 0,
                        pc = void 0,
                        eb = void 0,
                        wa = void 0;
                    if (Ub.verticesNeedUpdate) {
                        for (Bc = 0; Bc < md; Bc++) {
                            Mc = ed[Bc];
                            Ba = Bc * 3;
                            Oc[Ba] = Mc.x;
                            Oc[Ba + 1] = Mc.y;
                            Oc[Ba + 2] = Mc.z;
                        }
                        k.bindBuffer(k.ARRAY_BUFFER, Ub.__webglVertexBuffer);
                        k.bufferData(k.ARRAY_BUFFER, Oc, Zc);
                    }
                    if (od) {
                        for (Cc = 0; Cc < nd; Cc++) {
                            Nc = fd[Cc];
                            Ba = Cc * 3;
                            Pc[Ba] = Nc.r;
                            Pc[Ba + 1] = Nc.g;
                            Pc[Ba + 2] = Nc.b;
                        }
                        k.bindBuffer(k.ARRAY_BUFFER, Ub.__webglColorBuffer);
                        k.bufferData(k.ARRAY_BUFFER, Pc, Zc);
                    }
                    if ($c) {
                        Qc = 0;
                        for (gd = $c.length; Qc < gd; Qc++) {
                            wa = $c[Qc];
                            if (
                                wa.needsUpdate &&
                                (wa.boundTo === void 0 ||
                                    wa.boundTo === "vertices")
                            ) {
                                Ba = 0;
                                pc = wa.value.length;
                                if (wa.size === 1)
                                    for (Ua = 0; Ua < pc; Ua++)
                                        wa.array[Ua] = wa.value[Ua];
                                else if (wa.size === 2)
                                    for (Ua = 0; Ua < pc; Ua++) {
                                        eb = wa.value[Ua];
                                        wa.array[Ba] = eb.x;
                                        wa.array[Ba + 1] = eb.y;
                                        Ba = Ba + 2;
                                    }
                                else if (wa.size === 3)
                                    if (wa.type === "c")
                                        for (Ua = 0; Ua < pc; Ua++) {
                                            eb = wa.value[Ua];
                                            wa.array[Ba] = eb.r;
                                            wa.array[Ba + 1] = eb.g;
                                            wa.array[Ba + 2] = eb.b;
                                            Ba = Ba + 3;
                                        }
                                    else
                                        for (Ua = 0; Ua < pc; Ua++) {
                                            eb = wa.value[Ua];
                                            wa.array[Ba] = eb.x;
                                            wa.array[Ba + 1] = eb.y;
                                            wa.array[Ba + 2] = eb.z;
                                            Ba = Ba + 3;
                                        }
                                else if (wa.size === 4)
                                    for (Ua = 0; Ua < pc; Ua++) {
                                        eb = wa.value[Ua];
                                        wa.array[Ba] = eb.x;
                                        wa.array[Ba + 1] = eb.y;
                                        wa.array[Ba + 2] = eb.z;
                                        wa.array[Ba + 3] = eb.w;
                                        Ba = Ba + 4;
                                    }
                                k.bindBuffer(k.ARRAY_BUFFER, wa.buffer);
                                k.bufferData(k.ARRAY_BUFFER, wa.array, Zc);
                            }
                        }
                    }
                }
                ea.verticesNeedUpdate = false;
                ea.colorsNeedUpdate = false;
                cb.attributes && o(cb);
            } else if (ub instanceof THREE.ParticleSystem)
                if (ea instanceof THREE.BufferGeometry) {
                    (ea.verticesNeedUpdate || ea.colorsNeedUpdate) &&
                        h(ea, k.DYNAMIC_DRAW, !ea.dynamic);
                    ea.verticesNeedUpdate = false;
                    ea.colorsNeedUpdate = false;
                } else {
                    cb = c(ub, bb);
                    ab = cb.attributes && p(cb);
                    (ea.verticesNeedUpdate ||
                        ea.colorsNeedUpdate ||
                        ub.sortParticles ||
                        ab) &&
                        g(ea, k.DYNAMIC_DRAW, ub);
                    ea.verticesNeedUpdate = false;
                    ea.colorsNeedUpdate = false;
                    cb.attributes && o(cb);
                }
        }
    };
    this.initMaterial = function (a, b, c, d) {
        var e, f, g, h, i, j, l, m, n;
        a instanceof THREE.MeshDepthMaterial
            ? (n = "depth")
            : a instanceof THREE.MeshNormalMaterial
                ? (n = "normal")
                : a instanceof THREE.MeshBasicMaterial
                    ? (n = "basic")
                    : a instanceof THREE.MeshLambertMaterial
                        ? (n = "lambert")
                        : a instanceof THREE.MeshPhongMaterial
                            ? (n = "phong")
                            : a instanceof THREE.LineBasicMaterial
                                ? (n = "basic")
                                : a instanceof THREE.ParticleBasicMaterial &&
                                    (n = "particle_basic");
        if (n) {
            var o = THREE.ShaderLib[n];
            a.uniforms = THREE.UniformsUtils.clone(o.uniforms);
            a.vertexShader = o.vertexShader;
            a.fragmentShader = o.fragmentShader;
        }
        var p, q;
        p = h = f = e = o = 0;
        for (g = b.length; p < g; p++) {
            q = b[p];
            if (!q.onlyShadow) {
                q instanceof THREE.DirectionalLight && h++;
                q instanceof THREE.PointLight && f++;
                q instanceof THREE.SpotLight && e++;
                q instanceof THREE.HemisphereLight && o++;
            }
        }
        if (f + e + h + o <= ba) {
            p = h;
            g = e;
        } else {
            p = Math.ceil((ba * h) / (f + h));
            g = f = ba - p;
            o = p;
        }
        e = p;
        h = o;
        o = m = 0;
        for (p = b.length; o < p; o++) {
            q = b[o];
            if (q.castShadow) {
                q instanceof THREE.SpotLight && m++;
                q instanceof THREE.DirectionalLight && !q.shadowCascade && m++;
            }
        }
        if (ec && d && d.useVertexTexture) l = 1024;
        else {
            b = k.getParameter(k.MAX_VERTEX_UNIFORM_VECTORS);
            b = Math.floor((b - 20) / 4);
            if (d !== void 0 && d instanceof THREE.SkinnedMesh) {
                b = Math.min(d.bones.length, b);
                b < d.bones.length &&
                    console.warn(
                        "WebGLRenderer: too many bones - " +
                            d.bones.length +
                            ", this GPU supports just " +
                            b +
                            " (try OpenGL instead of ANGLE)"
                    );
            }
            l = b;
        }
        var r;
        a: {
            q = a.fragmentShader;
            p = a.vertexShader;
            var o = a.uniforms,
                b = a.attributes,
                c = {
                    map: !!a.map,
                    envMap: !!a.envMap,
                    lightMap: !!a.lightMap,
                    bumpMap: !!a.bumpMap,
                    normalMap: !!a.normalMap,
                    specularMap: !!a.specularMap,
                    vertexColors: a.vertexColors,
                    fog: c,
                    useFog: a.fog,
                    sizeAttenuation: a.sizeAttenuation,
                    skinning: a.skinning,
                    maxBones: l,
                    useVertexTexture: ec && d && d.useVertexTexture,
                    boneTextureWidth: d && d.boneTextureWidth,
                    boneTextureHeight: d && d.boneTextureHeight,
                    morphTargets: a.morphTargets,
                    morphNormals: a.morphNormals,
                    maxMorphTargets: this.maxMorphTargets,
                    maxMorphNormals: this.maxMorphNormals,
                    maxDirLights: e,
                    maxPointLights: f,
                    maxSpotLights: g,
                    maxHemiLights: h,
                    maxShadows: m,
                    shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
                    shadowMapSoft: this.shadowMapSoft,
                    shadowMapDebug: this.shadowMapDebug,
                    shadowMapCascade: this.shadowMapCascade,
                    alphaTest: a.alphaTest,
                    metal: a.metal,
                    perPixel: a.perPixel,
                    wrapAround: a.wrapAround,
                    doubleSided: a.side === THREE.DoubleSide,
                    flipSided: a.side === THREE.BackSide
                },
                s,
                d = [];
            if (n) d.push(n);
            else {
                d.push(q);
                d.push(p);
            }
            for (s in c) {
                d.push(s);
                d.push(c[s]);
            }
            n = d.join();
            s = 0;
            for (d = fa.length; s < d; s++) {
                e = fa[s];
                if (e.code === n) {
                    e.usedTimes++;
                    r = e.program;
                    break a;
                }
            }
            s = k.createProgram();
            d = [
                "precision " + F + " float;",
                ic ? "#define VERTEX_TEXTURES" : "",
                Q.gammaInput ? "#define GAMMA_INPUT" : "",
                Q.gammaOutput ? "#define GAMMA_OUTPUT" : "",
                Q.physicallyBasedShading
                    ? "#define PHYSICALLY_BASED_SHADING"
                    : "",
                "#define MAX_DIR_LIGHTS " + c.maxDirLights,
                "#define MAX_POINT_LIGHTS " + c.maxPointLights,
                "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
                "#define MAX_HEMI_LIGHTS " + c.maxHemiLights,
                "#define MAX_SHADOWS " + c.maxShadows,
                "#define MAX_BONES " + c.maxBones,
                c.map ? "#define USE_MAP" : "",
                c.envMap ? "#define USE_ENVMAP" : "",
                c.lightMap ? "#define USE_LIGHTMAP" : "",
                c.bumpMap ? "#define USE_BUMPMAP" : "",
                c.normalMap ? "#define USE_NORMALMAP" : "",
                c.specularMap ? "#define USE_SPECULARMAP" : "",
                c.vertexColors ? "#define USE_COLOR" : "",
                c.skinning ? "#define USE_SKINNING" : "",
                c.useVertexTexture ? "#define BONE_TEXTURE" : "",
                c.boneTextureWidth
                    ? "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1)
                    : "",
                c.boneTextureHeight
                    ? "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1)
                    : "",
                c.morphTargets ? "#define USE_MORPHTARGETS" : "",
                c.morphNormals ? "#define USE_MORPHNORMALS" : "",
                c.perPixel ? "#define PHONG_PER_PIXEL" : "",
                c.wrapAround ? "#define WRAP_AROUND" : "",
                c.doubleSided ? "#define DOUBLE_SIDED" : "",
                c.flipSided ? "#define FLIP_SIDED" : "",
                c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
                c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
                c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
                c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
                c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
                "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"
            ].join("\n");
            e = [
                "precision " + F + " float;",
                c.bumpMap || c.normalMap
                    ? "#extension GL_OES_standard_derivatives : enable"
                    : "",
                "#define MAX_DIR_LIGHTS " + c.maxDirLights,
                "#define MAX_POINT_LIGHTS " + c.maxPointLights,
                "#define MAX_SPOT_LIGHTS " + c.maxSpotLights,
                "#define MAX_HEMI_LIGHTS " + c.maxHemiLights,
                "#define MAX_SHADOWS " + c.maxShadows,
                c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "",
                Q.gammaInput ? "#define GAMMA_INPUT" : "",
                Q.gammaOutput ? "#define GAMMA_OUTPUT" : "",
                Q.physicallyBasedShading
                    ? "#define PHYSICALLY_BASED_SHADING"
                    : "",
                c.useFog && c.fog ? "#define USE_FOG" : "",
                c.useFog && c.fog instanceof THREE.FogExp2
                    ? "#define FOG_EXP2"
                    : "",
                c.map ? "#define USE_MAP" : "",
                c.envMap ? "#define USE_ENVMAP" : "",
                c.lightMap ? "#define USE_LIGHTMAP" : "",
                c.bumpMap ? "#define USE_BUMPMAP" : "",
                c.normalMap ? "#define USE_NORMALMAP" : "",
                c.specularMap ? "#define USE_SPECULARMAP" : "",
                c.vertexColors ? "#define USE_COLOR" : "",
                c.metal ? "#define METAL" : "",
                c.perPixel ? "#define PHONG_PER_PIXEL" : "",
                c.wrapAround ? "#define WRAP_AROUND" : "",
                c.doubleSided ? "#define DOUBLE_SIDED" : "",
                c.flipSided ? "#define FLIP_SIDED" : "",
                c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
                c.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
                c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
                c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
                "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"
            ].join("\n");
            e = z("fragment", e + q);
            d = z("vertex", d + p);
            k.attachShader(s, d);
            k.attachShader(s, e);
            k.linkProgram(s);
            k.getProgramParameter(s, k.LINK_STATUS) ||
                console.error(
                    "Could not initialise shader\nVALIDATE_STATUS: " +
                        k.getProgramParameter(s, k.VALIDATE_STATUS) +
                        ", gl error [" +
                        k.getError() +
                        "]"
                );
            k.deleteShader(e);
            k.deleteShader(d);
            s.uniforms = {};
            s.attributes = {};
            var t,
                d = [
                    "viewMatrix",
                    "modelViewMatrix",
                    "projectionMatrix",
                    "normalMatrix",
                    "modelMatrix",
                    "cameraPosition",
                    "morphTargetInfluences"
                ];
            c.useVertexTexture
                ? d.push("boneTexture")
                : d.push("boneGlobalMatrices");
            for (t in o) d.push(t);
            t = d;
            d = 0;
            for (o = t.length; d < o; d++) {
                e = t[d];
                s.uniforms[e] = k.getUniformLocation(s, e);
            }
            d = [
                "position",
                "normal",
                "uv",
                "uv2",
                "tangent",
                "color",
                "skinIndex",
                "skinWeight"
            ];
            for (t = 0; t < c.maxMorphTargets; t++) d.push("morphTarget" + t);
            for (t = 0; t < c.maxMorphNormals; t++) d.push("morphNormal" + t);
            for (r in b) d.push(r);
            r = d;
            t = 0;
            for (c = r.length; t < c; t++) {
                d = r[t];
                s.attributes[d] = k.getAttribLocation(s, d);
            }
            s.id = ta++;
            fa.push({ program: s, code: n, usedTimes: 1 });
            Q.info.memory.programs = fa.length;
            r = s;
        }
        a.program = r;
        r = a.program.attributes;
        r.position >= 0 && k.enableVertexAttribArray(r.position);
        r.color >= 0 && k.enableVertexAttribArray(r.color);
        r.normal >= 0 && k.enableVertexAttribArray(r.normal);
        r.tangent >= 0 && k.enableVertexAttribArray(r.tangent);
        if (a.skinning && r.skinIndex >= 0 && r.skinWeight >= 0) {
            k.enableVertexAttribArray(r.skinIndex);
            k.enableVertexAttribArray(r.skinWeight);
        }
        if (a.attributes)
            for (j in a.attributes)
                r[j] !== void 0 && r[j] >= 0 && k.enableVertexAttribArray(r[j]);
        if (a.morphTargets) {
            a.numSupportedMorphTargets = 0;
            s = "morphTarget";
            for (j = 0; j < this.maxMorphTargets; j++) {
                t = s + j;
                if (r[t] >= 0) {
                    k.enableVertexAttribArray(r[t]);
                    a.numSupportedMorphTargets++;
                }
            }
        }
        if (a.morphNormals) {
            a.numSupportedMorphNormals = 0;
            s = "morphNormal";
            for (j = 0; j < this.maxMorphNormals; j++) {
                t = s + j;
                if (r[t] >= 0) {
                    k.enableVertexAttribArray(r[t]);
                    a.numSupportedMorphNormals++;
                }
            }
        }
        a.uniformsList = [];
        for (i in a.uniforms) a.uniformsList.push([a.uniforms[i], i]);
    };
    this.setFaceCulling = function (a, b) {
        if (a) {
            !b || b === "ccw" ? k.frontFace(k.CCW) : k.frontFace(k.CW);
            a === "back"
                ? k.cullFace(k.BACK)
                : a === "front"
                    ? k.cullFace(k.FRONT)
                    : k.cullFace(k.FRONT_AND_BACK);
            k.enable(k.CULL_FACE);
        } else k.disable(k.CULL_FACE);
    };
    this.setMaterialFaces = function (a) {
        var b = a.side === THREE.DoubleSide,
            a = a.side === THREE.BackSide;
        if (ua !== b) {
            b ? k.disable(k.CULL_FACE) : k.enable(k.CULL_FACE);
            ua = b;
        }
        if (Ca !== a) {
            a ? k.frontFace(k.CW) : k.frontFace(k.CCW);
            Ca = a;
        }
    };
    this.setDepthTest = function (a) {
        if (Oa !== a) {
            a ? k.enable(k.DEPTH_TEST) : k.disable(k.DEPTH_TEST);
            Oa = a;
        }
    };
    this.setDepthWrite = function (a) {
        if (Ya !== a) {
            k.depthMask(a);
            Ya = a;
        }
    };
    this.setBlending = function (a, b, c, d) {
        if (a !== Ja) {
            if (a === THREE.NoBlending) k.disable(k.BLEND);
            else if (a === THREE.AdditiveBlending) {
                k.enable(k.BLEND);
                k.blendEquation(k.FUNC_ADD);
                k.blendFunc(k.SRC_ALPHA, k.ONE);
            } else if (a === THREE.SubtractiveBlending) {
                k.enable(k.BLEND);
                k.blendEquation(k.FUNC_ADD);
                k.blendFunc(k.ZERO, k.ONE_MINUS_SRC_COLOR);
            } else if (a === THREE.MultiplyBlending) {
                k.enable(k.BLEND);
                k.blendEquation(k.FUNC_ADD);
                k.blendFunc(k.ZERO, k.SRC_COLOR);
            } else if (a === THREE.CustomBlending) k.enable(k.BLEND);
            else {
                k.enable(k.BLEND);
                k.blendEquationSeparate(k.FUNC_ADD, k.FUNC_ADD);
                k.blendFuncSeparate(
                    k.SRC_ALPHA,
                    k.ONE_MINUS_SRC_ALPHA,
                    k.ONE,
                    k.ONE_MINUS_SRC_ALPHA
                );
            }
            Ja = a;
        }
        if (a === THREE.CustomBlending) {
            if (b !== Xa) {
                k.blendEquation(H(b));
                Xa = b;
            }
            if (c !== ja || d !== pb) {
                k.blendFunc(H(c), H(d));
                ja = c;
                pb = d;
            }
        } else pb = ja = Xa = null;
    };
    this.setTexture = function (a, b) {
        if (a.needsUpdate) {
            if (!a.__webglInit) {
                a.__webglInit = true;
                a.__webglTexture = k.createTexture();
                Q.info.memory.textures++;
            }
            k.activeTexture(k.TEXTURE0 + b);
            k.bindTexture(k.TEXTURE_2D, a.__webglTexture);
            k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL, a.flipY);
            k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha);
            var c = a.image,
                d =
                    (c.width & (c.width - 1)) === 0 &&
                    (c.height & (c.height - 1)) === 0,
                e = H(a.format),
                f = H(a.type);
            M(k.TEXTURE_2D, a, d);
            if (a instanceof THREE.CompressedTexture)
                for (var f = a.mipmaps, g = 0, h = f.length; g < h; g++) {
                    c = f[g];
                    k.compressedTexImage2D(
                        k.TEXTURE_2D,
                        g,
                        e,
                        c.width,
                        c.height,
                        0,
                        c.data
                    );
                }
            else
                a instanceof THREE.DataTexture
                    ? k.texImage2D(
                            k.TEXTURE_2D,
                            0,
                            e,
                            c.width,
                            c.height,
                            0,
                            e,
                            f,
                            c.data
                        )
                    : k.texImage2D(k.TEXTURE_2D, 0, e, e, f, a.image);
            a.generateMipmaps && d && k.generateMipmap(k.TEXTURE_2D);
            a.needsUpdate = false;
            if (a.onUpdate) a.onUpdate();
        } else {
            k.activeTexture(k.TEXTURE0 + b);
            k.bindTexture(k.TEXTURE_2D, a.__webglTexture);
        }
    };
    this.setRenderTarget = function (a) {
        var b = a instanceof THREE.WebGLRenderTargetCube;
        if (a && !a.__webglFramebuffer) {
            if (a.depthBuffer === void 0) a.depthBuffer = true;
            if (a.stencilBuffer === void 0) a.stencilBuffer = true;
            a.__webglTexture = k.createTexture();
            var c =
                    (a.width & (a.width - 1)) === 0 &&
                    (a.height & (a.height - 1)) === 0,
                d = H(a.format),
                e = H(a.type);
            if (b) {
                a.__webglFramebuffer = [];
                a.__webglRenderbuffer = [];
                k.bindTexture(k.TEXTURE_CUBE_MAP, a.__webglTexture);
                M(k.TEXTURE_CUBE_MAP, a, c);
                for (var f = 0; f < 6; f++) {
                    a.__webglFramebuffer[f] = k.createFramebuffer();
                    a.__webglRenderbuffer[f] = k.createRenderbuffer();
                    k.texImage2D(
                        k.TEXTURE_CUBE_MAP_POSITIVE_X + f,
                        0,
                        d,
                        a.width,
                        a.height,
                        0,
                        d,
                        e,
                        null
                    );
                    var g = a,
                        h = k.TEXTURE_CUBE_MAP_POSITIVE_X + f;
                    k.bindFramebuffer(k.FRAMEBUFFER, a.__webglFramebuffer[f]);
                    k.framebufferTexture2D(
                        k.FRAMEBUFFER,
                        k.COLOR_ATTACHMENT0,
                        h,
                        g.__webglTexture,
                        0
                    );
                    D(a.__webglRenderbuffer[f], a);
                }
                c && k.generateMipmap(k.TEXTURE_CUBE_MAP);
            } else {
                a.__webglFramebuffer = k.createFramebuffer();
                a.__webglRenderbuffer = k.createRenderbuffer();
                k.bindTexture(k.TEXTURE_2D, a.__webglTexture);
                M(k.TEXTURE_2D, a, c);
                k.texImage2D(
                    k.TEXTURE_2D,
                    0,
                    d,
                    a.width,
                    a.height,
                    0,
                    d,
                    e,
                    null
                );
                d = k.TEXTURE_2D;
                k.bindFramebuffer(k.FRAMEBUFFER, a.__webglFramebuffer);
                k.framebufferTexture2D(
                    k.FRAMEBUFFER,
                    k.COLOR_ATTACHMENT0,
                    d,
                    a.__webglTexture,
                    0
                );
                D(a.__webglRenderbuffer, a);
                c && k.generateMipmap(k.TEXTURE_2D);
            }
            b
                ? k.bindTexture(k.TEXTURE_CUBE_MAP, null)
                : k.bindTexture(k.TEXTURE_2D, null);
            k.bindRenderbuffer(k.RENDERBUFFER, null);
            k.bindFramebuffer(k.FRAMEBUFFER, null);
        }
        if (a) {
            b = b
                ? a.__webglFramebuffer[a.activeCubeFace]
                : a.__webglFramebuffer;
            c = a.width;
            a = a.height;
            e = d = 0;
        } else {
            b = null;
            c = Ga;
            a = $a;
            d = xa;
            e = qb;
        }
        if (b !== ga) {
            k.bindFramebuffer(k.FRAMEBUFFER, b);
            k.viewport(d, e, c, a);
            ga = b;
        }
        rb = c;
        Da = a;
    };
    this.shadowMapPlugin = new THREE.ShadowMapPlugin();
    this.addPrePlugin(this.shadowMapPlugin);
    this.addPostPlugin(new THREE.SpritePlugin());
    this.addPostPlugin(new THREE.LensFlarePlugin());
};
THREE.WebGLRenderTarget = function (a, b, c) {
    this.width = a;
    this.height = b;
    c = c || {};
    this.wrapS = c.wrapS !== void 0 ? c.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = c.wrapT !== void 0 ? c.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = c.magFilter !== void 0 ? c.magFilter : THREE.LinearFilter;
    this.minFilter =
        c.minFilter !== void 0 ? c.minFilter : THREE.LinearMipMapLinearFilter;
    this.anisotropy = c.anisotropy !== void 0 ? c.anisotropy : 1;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.format = c.format !== void 0 ? c.format : THREE.RGBAFormat;
    this.type = c.type !== void 0 ? c.type : THREE.UnsignedByteType;
    this.depthBuffer = c.depthBuffer !== void 0 ? c.depthBuffer : true;
    this.stencilBuffer = c.stencilBuffer !== void 0 ? c.stencilBuffer : true;
    this.generateMipmaps = true;
};
THREE.WebGLRenderTarget.prototype.clone = function () {
    var a = new THREE.WebGLRenderTarget(this.width, this.height);
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.anisotropy = this.anisotropy;
    a.minFilter = this.minFilter;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.format = this.format;
    a.type = this.type;
    a.depthBuffer = this.depthBuffer;
    a.stencilBuffer = this.stencilBuffer;
    a.generateMipmaps = this.generateMipmaps;
    return a;
};
THREE.WebGLRenderTargetCube = function (a, b, c) {
    THREE.WebGLRenderTarget.call(this, a, b, c);
    this.activeCubeFace = 0;
};
THREE.WebGLRenderTargetCube.prototype = Object.create(
    THREE.WebGLRenderTarget.prototype
);
THREE.RenderableVertex = function () {
    this.positionWorld = new THREE.Vector3();
    this.positionScreen = new THREE.Vector4();
    this.visible = true;
};
THREE.RenderableVertex.prototype.copy = function (a) {
    this.positionWorld.copy(a.positionWorld);
    this.positionScreen.copy(a.positionScreen);
};
THREE.RenderableFace3 = function () {
    this.v1 = new THREE.RenderableVertex();
    this.v2 = new THREE.RenderableVertex();
    this.v3 = new THREE.RenderableVertex();
    this.centroidWorld = new THREE.Vector3();
    this.centroidScreen = new THREE.Vector3();
    this.normalWorld = new THREE.Vector3();
    this.vertexNormalsWorld = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
    ];
    this.vertexNormalsLength = 0;
    this.material = null;
    this.uvs = [[]];
    this.z = null;
};
THREE.RenderableFace4 = function () {
    this.v1 = new THREE.RenderableVertex();
    this.v2 = new THREE.RenderableVertex();
    this.v3 = new THREE.RenderableVertex();
    this.v4 = new THREE.RenderableVertex();
    this.centroidWorld = new THREE.Vector3();
    this.centroidScreen = new THREE.Vector3();
    this.normalWorld = new THREE.Vector3();
    this.vertexNormalsWorld = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
    ];
    this.vertexNormalsLength = 0;
    this.material = null;
    this.uvs = [[]];
    this.z = null;
};
THREE.RenderableObject = function () {
    this.z = this.object = null;
};
THREE.RenderableParticle = function () {
    this.rotation = this.z = this.y = this.x = this.object = null;
    this.scale = new THREE.Vector2();
    this.material = null;
};
THREE.RenderableLine = function () {
    this.z = null;
    this.v1 = new THREE.RenderableVertex();
    this.v2 = new THREE.RenderableVertex();
    this.material = null;
};
THREE.ColorUtils = {
    adjustHSV: function (a, b, c, d) {
        var f = THREE.ColorUtils.__hsv;
        THREE.ColorUtils.rgbToHsv(a, f);
        f.h = THREE.Math.clamp(f.h + b, 0, 1);
        f.s = THREE.Math.clamp(f.s + c, 0, 1);
        f.v = THREE.Math.clamp(f.v + d, 0, 1);
        a.setHSV(f.h, f.s, f.v);
    },
    rgbToHsv: function (a, b) {
        var c = a.r,
            d = a.g,
            f = a.b,
            e = Math.max(Math.max(c, d), f),
            g = Math.min(Math.min(c, d), f);
        if (g === e) g = c = 0;
        else {
            var h = e - g,
                g = h / e,
                c =
                    (c === e
                        ? (d - f) / h
                        : d === e
                            ? 2 + (f - c) / h
                            : 4 + (c - d) / h) / 6;
            c < 0 && (c = c + 1);
            c > 1 && (c = c - 1);
        }
        b === void 0 && (b = { h: 0, s: 0, v: 0 });
        b.h = c;
        b.s = g;
        b.v = e;
        return b;
    }
};
THREE.ColorUtils.__hsv = { h: 0, s: 0, v: 0 };
THREE.GeometryUtils = {
    merge: function (a, b) {
        for (
            var c,
                d,
                f = a.vertices.length,
                e = b instanceof THREE.Mesh ? b.geometry : b,
                g = a.vertices,
                h = e.vertices,
                i = a.faces,
                j = e.faces,
                l = a.faceVertexUvs[0],
                n = e.faceVertexUvs[0],
                m = {},
                q = 0;
            q < a.materials.length;
            q++
        )
            m[a.materials[q].id] = q;
        if (b instanceof THREE.Mesh) {
            b.matrixAutoUpdate && b.updateMatrix();
            c = b.matrix;
            d = new THREE.Matrix4();
            d.extractRotation(c, b.scale);
        }
        for (var q = 0, p = h.length; q < p; q++) {
            var o = h[q].clone();
            c && c.multiplyVector3(o);
            g.push(o);
        }
        q = 0;
        for (p = j.length; q < p; q++) {
            var g = j[q],
                r,
                t,
                u = g.vertexNormals,
                w = g.vertexColors;
            g instanceof THREE.Face3
                ? (r = new THREE.Face3(g.a + f, g.b + f, g.c + f))
                : g instanceof THREE.Face4 &&
                    (r = new THREE.Face4(g.a + f, g.b + f, g.c + f, g.d + f));
            r.normal.copy(g.normal);
            d && d.multiplyVector3(r.normal);
            h = 0;
            for (o = u.length; h < o; h++) {
                t = u[h].clone();
                d && d.multiplyVector3(t);
                r.vertexNormals.push(t);
            }
            r.color.copy(g.color);
            h = 0;
            for (o = w.length; h < o; h++) {
                t = w[h];
                r.vertexColors.push(t.clone());
            }
            if (g.materialIndex !== void 0) {
                h = e.materials[g.materialIndex];
                o = h.id;
                w = m[o];
                if (w === void 0) {
                    w = a.materials.length;
                    m[o] = w;
                    a.materials.push(h);
                }
                r.materialIndex = w;
            }
            r.centroid.copy(g.centroid);
            c && c.multiplyVector3(r.centroid);
            i.push(r);
        }
        q = 0;
        for (p = n.length; q < p; q++) {
            c = n[q];
            d = [];
            h = 0;
            for (o = c.length; h < o; h++) d.push(new THREE.UV(c[h].u, c[h].v));
            l.push(d);
        }
    },
    clone: function (a) {
        var b = new THREE.Geometry(),
            c,
            d = a.vertices,
            f = a.faces,
            e = a.faceVertexUvs[0];
        if (a.materials) b.materials = a.materials.slice();
        a = 0;
        for (c = d.length; a < c; a++) b.vertices.push(d[a].clone());
        a = 0;
        for (c = f.length; a < c; a++) b.faces.push(f[a].clone());
        a = 0;
        for (c = e.length; a < c; a++) {
            for (var d = e[a], f = [], g = 0, h = d.length; g < h; g++)
                f.push(new THREE.UV(d[g].u, d[g].v));
            b.faceVertexUvs[0].push(f);
        }
        return b;
    },
    randomPointInTriangle: function (a, b, c) {
        var d,
            f,
            e,
            g = new THREE.Vector3(),
            h = THREE.GeometryUtils.__v1;
        d = THREE.GeometryUtils.random();
        f = THREE.GeometryUtils.random();
        if (d + f > 1) {
            d = 1 - d;
            f = 1 - f;
        }
        e = 1 - d - f;
        g.copy(a);
        g.multiplyScalar(d);
        h.copy(b);
        h.multiplyScalar(f);
        g.addSelf(h);
        h.copy(c);
        h.multiplyScalar(e);
        g.addSelf(h);
        return g;
    },
    randomPointInFace: function (a, b, c) {
        var d, f, e;
        if (a instanceof THREE.Face3) {
            d = b.vertices[a.a];
            f = b.vertices[a.b];
            e = b.vertices[a.c];
            return THREE.GeometryUtils.randomPointInTriangle(d, f, e);
        }
        if (a instanceof THREE.Face4) {
            d = b.vertices[a.a];
            f = b.vertices[a.b];
            e = b.vertices[a.c];
            var b = b.vertices[a.d],
                g;
            if (c)
                if (a._area1 && a._area2) {
                    c = a._area1;
                    g = a._area2;
                } else {
                    c = THREE.GeometryUtils.triangleArea(d, f, b);
                    g = THREE.GeometryUtils.triangleArea(f, e, b);
                    a._area1 = c;
                    a._area2 = g;
                }
            else {
                c = THREE.GeometryUtils.triangleArea(d, f, b);
                g = THREE.GeometryUtils.triangleArea(f, e, b);
            }
            return THREE.GeometryUtils.random() * (c + g) < c
                ? THREE.GeometryUtils.randomPointInTriangle(d, f, b)
                : THREE.GeometryUtils.randomPointInTriangle(f, e, b);
        }
    },
    randomPointsInGeometry: function (a, b) {
        function c(a) {
            function b(c, d) {
                if (d < c) return c;
                var e = c + Math.floor((d - c) / 2);
                return j[e] > a ? b(c, e - 1) : j[e] < a ? b(e + 1, d) : e;
            }
            return b(0, j.length - 1);
        }
        var d,
            f,
            e = a.faces,
            g = a.vertices,
            h = e.length,
            i = 0,
            j = [],
            l,
            n,
            m,
            q;
        for (f = 0; f < h; f++) {
            d = e[f];
            if (d instanceof THREE.Face3) {
                l = g[d.a];
                n = g[d.b];
                m = g[d.c];
                d._area = THREE.GeometryUtils.triangleArea(l, n, m);
            } else if (d instanceof THREE.Face4) {
                l = g[d.a];
                n = g[d.b];
                m = g[d.c];
                q = g[d.d];
                d._area1 = THREE.GeometryUtils.triangleArea(l, n, q);
                d._area2 = THREE.GeometryUtils.triangleArea(n, m, q);
                d._area = d._area1 + d._area2;
            }
            i = i + d._area;
            j[f] = i;
        }
        d = [];
        for (f = 0; f < b; f++) {
            g = THREE.GeometryUtils.random() * i;
            g = c(g);
            d[f] = THREE.GeometryUtils.randomPointInFace(e[g], a, true);
        }
        return d;
    },
    triangleArea: function (a, b, c) {
        var d,
            f = THREE.GeometryUtils.__v1;
        f.sub(a, b);
        d = f.length();
        f.sub(a, c);
        a = f.length();
        f.sub(b, c);
        c = f.length();
        b = 0.5 * (d + a + c);
        return Math.sqrt(b * (b - d) * (b - a) * (b - c));
    },
    center: function (a) {
        a.computeBoundingBox();
        var b = a.boundingBox,
            c = new THREE.Vector3();
        c.add(b.min, b.max);
        c.multiplyScalar(-0.5);
        a.applyMatrix(new THREE.Matrix4().makeTranslation(c.x, c.y, c.z));
        a.computeBoundingBox();
        return c;
    },
    normalizeUVs: function (a) {
        for (var a = a.faceVertexUvs[0], b = 0, c = a.length; b < c; b++)
            for (var d = a[b], f = 0, e = d.length; f < e; f++) {
                if (d[f].u !== 1) d[f].u = d[f].u - Math.floor(d[f].u);
                if (d[f].v !== 1) d[f].v = d[f].v - Math.floor(d[f].v);
            }
    },
    triangulateQuads: function (a) {
        var b,
            c,
            d,
            f,
            e = [],
            g = [],
            h = [];
        b = 0;
        for (c = a.faceUvs.length; b < c; b++) g[b] = [];
        b = 0;
        for (c = a.faceVertexUvs.length; b < c; b++) h[b] = [];
        b = 0;
        for (c = a.faces.length; b < c; b++) {
            d = a.faces[b];
            if (d instanceof THREE.Face4) {
                f = d.a;
                var i = d.b,
                    j = d.c,
                    l = d.d,
                    n = new THREE.Face3(),
                    m = new THREE.Face3();
                n.color.copy(d.color);
                m.color.copy(d.color);
                n.materialIndex = d.materialIndex;
                m.materialIndex = d.materialIndex;
                n.a = f;
                n.b = i;
                n.c = l;
                m.a = i;
                m.b = j;
                m.c = l;
                if (d.vertexColors.length === 4) {
                    n.vertexColors[0] = d.vertexColors[0].clone();
                    n.vertexColors[1] = d.vertexColors[1].clone();
                    n.vertexColors[2] = d.vertexColors[3].clone();
                    m.vertexColors[0] = d.vertexColors[1].clone();
                    m.vertexColors[1] = d.vertexColors[2].clone();
                    m.vertexColors[2] = d.vertexColors[3].clone();
                }
                e.push(n, m);
                d = 0;
                for (f = a.faceVertexUvs.length; d < f; d++)
                    if (a.faceVertexUvs[d].length) {
                        n = a.faceVertexUvs[d][b];
                        i = n[1];
                        j = n[2];
                        l = n[3];
                        n = [n[0].clone(), i.clone(), l.clone()];
                        i = [i.clone(), j.clone(), l.clone()];
                        h[d].push(n, i);
                    }
                d = 0;
                for (f = a.faceUvs.length; d < f; d++)
                    if (a.faceUvs[d].length) {
                        i = a.faceUvs[d][b];
                        g[d].push(i, i);
                    }
            } else {
                e.push(d);
                d = 0;
                for (f = a.faceUvs.length; d < f; d++)
                    g[d].push(a.faceUvs[d][b]);
                d = 0;
                for (f = a.faceVertexUvs.length; d < f; d++)
                    h[d].push(a.faceVertexUvs[d][b]);
            }
        }
        a.faces = e;
        a.faceUvs = g;
        a.faceVertexUvs = h;
        a.computeCentroids();
        a.computeFaceNormals();
        a.computeVertexNormals();
        a.hasTangents && a.computeTangents();
    },
    explode: function (a) {
        for (var b = [], c = 0, d = a.faces.length; c < d; c++) {
            var f = b.length,
                e = a.faces[c];
            if (e instanceof THREE.Face4) {
                var g = e.a,
                    h = e.b,
                    i = e.c,
                    g = a.vertices[g],
                    h = a.vertices[h],
                    i = a.vertices[i],
                    j = a.vertices[e.d];
                b.push(g.clone());
                b.push(h.clone());
                b.push(i.clone());
                b.push(j.clone());
                e.a = f;
                e.b = f + 1;
                e.c = f + 2;
                e.d = f + 3;
            } else {
                g = e.a;
                h = e.b;
                i = e.c;
                g = a.vertices[g];
                h = a.vertices[h];
                i = a.vertices[i];
                b.push(g.clone());
                b.push(h.clone());
                b.push(i.clone());
                e.a = f;
                e.b = f + 1;
                e.c = f + 2;
            }
        }
        a.vertices = b;
        delete a.__tmpVertices;
    },
    tessellate: function (a, b) {
        var c,
            d,
            f,
            e,
            g,
            h,
            i,
            j,
            l,
            n,
            m,
            q,
            p,
            o,
            r,
            t,
            u,
            w,
            s,
            B = [],
            v = [];
        c = 0;
        for (d = a.faceVertexUvs.length; c < d; c++) v[c] = [];
        c = 0;
        for (d = a.faces.length; c < d; c++) {
            f = a.faces[c];
            if (f instanceof THREE.Face3) {
                e = f.a;
                g = f.b;
                h = f.c;
                j = a.vertices[e];
                l = a.vertices[g];
                n = a.vertices[h];
                q = j.distanceTo(l);
                p = l.distanceTo(n);
                m = j.distanceTo(n);
                if (q > b || p > b || m > b) {
                    i = a.vertices.length;
                    w = f.clone();
                    s = f.clone();
                    if (q >= p && q >= m) {
                        j = j.clone();
                        j.lerpSelf(l, 0.5);
                        w.a = e;
                        w.b = i;
                        w.c = h;
                        s.a = i;
                        s.b = g;
                        s.c = h;
                        if (f.vertexNormals.length === 3) {
                            e = f.vertexNormals[0].clone();
                            e.lerpSelf(f.vertexNormals[1], 0.5);
                            w.vertexNormals[1].copy(e);
                            s.vertexNormals[0].copy(e);
                        }
                        if (f.vertexColors.length === 3) {
                            e = f.vertexColors[0].clone();
                            e.lerpSelf(f.vertexColors[1], 0.5);
                            w.vertexColors[1].copy(e);
                            s.vertexColors[0].copy(e);
                        }
                        f = 0;
                    } else if (p >= q && p >= m) {
                        j = l.clone();
                        j.lerpSelf(n, 0.5);
                        w.a = e;
                        w.b = g;
                        w.c = i;
                        s.a = i;
                        s.b = h;
                        s.c = e;
                        if (f.vertexNormals.length === 3) {
                            e = f.vertexNormals[1].clone();
                            e.lerpSelf(f.vertexNormals[2], 0.5);
                            w.vertexNormals[2].copy(e);
                            s.vertexNormals[0].copy(e);
                            s.vertexNormals[1].copy(f.vertexNormals[2]);
                            s.vertexNormals[2].copy(f.vertexNormals[0]);
                        }
                        if (f.vertexColors.length === 3) {
                            e = f.vertexColors[1].clone();
                            e.lerpSelf(f.vertexColors[2], 0.5);
                            w.vertexColors[2].copy(e);
                            s.vertexColors[0].copy(e);
                            s.vertexColors[1].copy(f.vertexColors[2]);
                            s.vertexColors[2].copy(f.vertexColors[0]);
                        }
                        f = 1;
                    } else {
                        j = j.clone();
                        j.lerpSelf(n, 0.5);
                        w.a = e;
                        w.b = g;
                        w.c = i;
                        s.a = i;
                        s.b = g;
                        s.c = h;
                        if (f.vertexNormals.length === 3) {
                            e = f.vertexNormals[0].clone();
                            e.lerpSelf(f.vertexNormals[2], 0.5);
                            w.vertexNormals[2].copy(e);
                            s.vertexNormals[0].copy(e);
                        }
                        if (f.vertexColors.length === 3) {
                            e = f.vertexColors[0].clone();
                            e.lerpSelf(f.vertexColors[2], 0.5);
                            w.vertexColors[2].copy(e);
                            s.vertexColors[0].copy(e);
                        }
                        f = 2;
                    }
                    B.push(w, s);
                    a.vertices.push(j);
                    e = 0;
                    for (g = a.faceVertexUvs.length; e < g; e++)
                        if (a.faceVertexUvs[e].length) {
                            j = a.faceVertexUvs[e][c];
                            s = j[0];
                            h = j[1];
                            w = j[2];
                            if (f === 0) {
                                l = s.clone();
                                l.lerpSelf(h, 0.5);
                                j = [s.clone(), l.clone(), w.clone()];
                                h = [l.clone(), h.clone(), w.clone()];
                            } else if (f === 1) {
                                l = h.clone();
                                l.lerpSelf(w, 0.5);
                                j = [s.clone(), h.clone(), l.clone()];
                                h = [l.clone(), w.clone(), s.clone()];
                            } else {
                                l = s.clone();
                                l.lerpSelf(w, 0.5);
                                j = [s.clone(), h.clone(), l.clone()];
                                h = [l.clone(), h.clone(), w.clone()];
                            }
                            v[e].push(j, h);
                        }
                } else {
                    B.push(f);
                    e = 0;
                    for (g = a.faceVertexUvs.length; e < g; e++)
                        v[e].push(a.faceVertexUvs[e][c]);
                }
            } else {
                e = f.a;
                g = f.b;
                h = f.c;
                i = f.d;
                j = a.vertices[e];
                l = a.vertices[g];
                n = a.vertices[h];
                m = a.vertices[i];
                q = j.distanceTo(l);
                p = l.distanceTo(n);
                o = n.distanceTo(m);
                r = j.distanceTo(m);
                if (q > b || p > b || o > b || r > b) {
                    t = a.vertices.length;
                    u = a.vertices.length + 1;
                    w = f.clone();
                    s = f.clone();
                    if (
                        (q >= p && q >= o && q >= r) ||
                        (o >= p && o >= q && o >= r)
                    ) {
                        q = j.clone();
                        q.lerpSelf(l, 0.5);
                        l = n.clone();
                        l.lerpSelf(m, 0.5);
                        w.a = e;
                        w.b = t;
                        w.c = u;
                        w.d = i;
                        s.a = t;
                        s.b = g;
                        s.c = h;
                        s.d = u;
                        if (f.vertexNormals.length === 4) {
                            e = f.vertexNormals[0].clone();
                            e.lerpSelf(f.vertexNormals[1], 0.5);
                            g = f.vertexNormals[2].clone();
                            g.lerpSelf(f.vertexNormals[3], 0.5);
                            w.vertexNormals[1].copy(e);
                            w.vertexNormals[2].copy(g);
                            s.vertexNormals[0].copy(e);
                            s.vertexNormals[3].copy(g);
                        }
                        if (f.vertexColors.length === 4) {
                            e = f.vertexColors[0].clone();
                            e.lerpSelf(f.vertexColors[1], 0.5);
                            g = f.vertexColors[2].clone();
                            g.lerpSelf(f.vertexColors[3], 0.5);
                            w.vertexColors[1].copy(e);
                            w.vertexColors[2].copy(g);
                            s.vertexColors[0].copy(e);
                            s.vertexColors[3].copy(g);
                        }
                        f = 0;
                    } else {
                        q = l.clone();
                        q.lerpSelf(n, 0.5);
                        l = m.clone();
                        l.lerpSelf(j, 0.5);
                        w.a = e;
                        w.b = g;
                        w.c = t;
                        w.d = u;
                        s.a = u;
                        s.b = t;
                        s.c = h;
                        s.d = i;
                        if (f.vertexNormals.length === 4) {
                            e = f.vertexNormals[1].clone();
                            e.lerpSelf(f.vertexNormals[2], 0.5);
                            g = f.vertexNormals[3].clone();
                            g.lerpSelf(f.vertexNormals[0], 0.5);
                            w.vertexNormals[2].copy(e);
                            w.vertexNormals[3].copy(g);
                            s.vertexNormals[0].copy(g);
                            s.vertexNormals[1].copy(e);
                        }
                        if (f.vertexColors.length === 4) {
                            e = f.vertexColors[1].clone();
                            e.lerpSelf(f.vertexColors[2], 0.5);
                            g = f.vertexColors[3].clone();
                            g.lerpSelf(f.vertexColors[0], 0.5);
                            w.vertexColors[2].copy(e);
                            w.vertexColors[3].copy(g);
                            s.vertexColors[0].copy(g);
                            s.vertexColors[1].copy(e);
                        }
                        f = 1;
                    }
                    B.push(w, s);
                    a.vertices.push(q, l);
                    e = 0;
                    for (g = a.faceVertexUvs.length; e < g; e++)
                        if (a.faceVertexUvs[e].length) {
                            j = a.faceVertexUvs[e][c];
                            s = j[0];
                            h = j[1];
                            w = j[2];
                            j = j[3];
                            if (f === 0) {
                                l = s.clone();
                                l.lerpSelf(h, 0.5);
                                n = w.clone();
                                n.lerpSelf(j, 0.5);
                                s = [
                                    s.clone(),
                                    l.clone(),
                                    n.clone(),
                                    j.clone()
                                ];
                                h = [
                                    l.clone(),
                                    h.clone(),
                                    w.clone(),
                                    n.clone()
                                ];
                            } else {
                                l = h.clone();
                                l.lerpSelf(w, 0.5);
                                n = j.clone();
                                n.lerpSelf(s, 0.5);
                                s = [
                                    s.clone(),
                                    h.clone(),
                                    l.clone(),
                                    n.clone()
                                ];
                                h = [
                                    n.clone(),
                                    l.clone(),
                                    w.clone(),
                                    j.clone()
                                ];
                            }
                            v[e].push(s, h);
                        }
                } else {
                    B.push(f);
                    e = 0;
                    for (g = a.faceVertexUvs.length; e < g; e++)
                        v[e].push(a.faceVertexUvs[e][c]);
                }
            }
        }
        a.faces = B;
        a.faceVertexUvs = v;
    }
};
THREE.GeometryUtils.random = THREE.Math.random16;
THREE.GeometryUtils.__v1 = new THREE.Vector3();
THREE.ImageUtils = {
    crossOrigin: "anonymous",
    loadTexture: function (a, b, c, d) {
        var f = new Image(),
            e = new THREE.Texture(f, b),
            b = new THREE.ImageLoader();
        b.addEventListener("load", function (a) {
            e.image = a.content;
            e.needsUpdate = true;
            c && c(e);
        });
        b.addEventListener("error", function (a) {
            d && d(a.message);
        });
        b.crossOrigin = this.crossOrigin;
        b.load(a, f);
        return e;
    },
    loadCompressedTexture: function (a, b, c, d) {
        var f = new THREE.CompressedTexture();
        f.mapping = b;
        var e = new XMLHttpRequest();
        e.onload = function () {
            var a = THREE.ImageUtils.parseDDS(e.response, true);
            f.format = a.format;
            f.mipmaps = a.mipmaps;
            f.image.width = a.width;
            f.image.height = a.height;
            f.generateMipmaps = false;
            f.needsUpdate = true;
            c && c(f);
        };
        e.onerror = d;
        e.open("GET", a, true);
        e.responseType = "arraybuffer";
        e.send(null);
        return f;
    },
    loadTextureCube: function (a, b, c, d) {
        var f = [];
        f.loadCount = 0;
        var e = new THREE.Texture();
        e.image = f;
        if (b !== void 0) e.mapping = b;
        e.flipY = false;
        for (var b = 0, g = a.length; b < g; ++b) {
            var h = new Image();
            f[b] = h;
            h.onload = function () {
                f.loadCount = f.loadCount + 1;
                if (f.loadCount === 6) {
                    e.needsUpdate = true;
                    c && c();
                }
            };
            h.onerror = d;
            h.crossOrigin = this.crossOrigin;
            h.src = a[b];
        }
        return e;
    },
    loadCompressedTextureCube: function (a, b, c, d) {
        var f = [];
        f.loadCount = 0;
        var e = new THREE.CompressedTexture();
        e.image = f;
        if (b !== void 0) e.mapping = b;
        e.flipY = false;
        e.generateMipmaps = false;
        for (
            var b = function (a, b) {
                    return function () {
                        var d = THREE.ImageUtils.parseDDS(a.response, true);
                        b.format = d.format;
                        b.mipmaps = d.mipmaps;
                        b.width = d.width;
                        b.height = d.height;
                        f.loadCount = f.loadCount + 1;
                        if (f.loadCount === 6) {
                            e.format = d.format;
                            e.needsUpdate = true;
                            c && c();
                        }
                    };
                },
                g = 0,
                h = a.length;
            g < h;
            ++g
        ) {
            var i = {};
            f[g] = i;
            var j = new XMLHttpRequest();
            j.onload = b(j, i);
            j.onerror = d;
            j.open("GET", a[g], true);
            j.responseType = "arraybuffer";
            j.send(null);
        }
        return e;
    },
    parseDDS: function (a, b) {
        function c(a) {
            return (
                a.charCodeAt(0) +
                (a.charCodeAt(1) << 8) +
                (a.charCodeAt(2) << 16) +
                (a.charCodeAt(3) << 24)
            );
        }
        var d = {
                mipmaps: [],
                width: 0,
                height: 0,
                format: null,
                mipmapCount: 1
            },
            f = c("DXT1"),
            e = c("DXT3"),
            g = c("DXT5"),
            h = new Int32Array(a, 0, 31);
        if (h[0] !== 542327876) {
            console.error(
                "ImageUtils.parseDDS(): Invalid magic number in DDS header"
            );
            return d;
        }
        if (!h[20] & 4) {
            console.error(
                "ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"
            );
            return d;
        }
        var i = h[21];
        switch (i) {
            case f:
                f = 8;
                d.format = THREE.RGB_S3TC_DXT1_Format;
                break;
            case e:
                f = 16;
                d.format = THREE.RGBA_S3TC_DXT3_Format;
                break;
            case g:
                f = 16;
                d.format = THREE.RGBA_S3TC_DXT5_Format;
                break;
            default:
                console.error(
                    "ImageUtils.parseDDS(): Unsupported FourCC code: ",
                    String.fromCharCode(
                        i & 255,
                        (i >> 8) & 255,
                        (i >> 16) & 255,
                        (i >> 24) & 255
                    )
                );
                return d;
        }
        d.mipmapCount = 1;
        if (h[2] & 131072 && b !== false) d.mipmapCount = Math.max(1, h[7]);
        d.width = h[4];
        d.height = h[3];
        h = h[1] + 4;
        e = d.width;
        g = d.height;
        for (i = 0; i < d.mipmapCount; i++) {
            var j = (((Math.max(4, e) / 4) * Math.max(4, g)) / 4) * f,
                l = { data: new Uint8Array(a, h, j), width: e, height: g };
            d.mipmaps.push(l);
            h = h + j;
            e = Math.max(e * 0.5, 1);
            g = Math.max(g * 0.5, 1);
        }
        return d;
    },
    getNormalMap: function (a, b) {
        var c = function (a) {
                var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
                return [a[0] / b, a[1] / b, a[2] / b];
            },
            b = b | 1,
            d = a.width,
            f = a.height,
            e = document.createElement("canvas");
        e.width = d;
        e.height = f;
        var g = e.getContext("2d");
        g.drawImage(a, 0, 0);
        for (
            var h = g.getImageData(0, 0, d, f).data,
                i = g.createImageData(d, f),
                j = i.data,
                l = 0;
            l < d;
            l++
        )
            for (var n = 0; n < f; n++) {
                var m = n - 1 < 0 ? 0 : n - 1,
                    q = n + 1 > f - 1 ? f - 1 : n + 1,
                    p = l - 1 < 0 ? 0 : l - 1,
                    o = l + 1 > d - 1 ? d - 1 : l + 1,
                    r = [],
                    t = [0, 0, (h[(n * d + l) * 4] / 255) * b];
                r.push([-1, 0, (h[(n * d + p) * 4] / 255) * b]);
                r.push([-1, -1, (h[(m * d + p) * 4] / 255) * b]);
                r.push([0, -1, (h[(m * d + l) * 4] / 255) * b]);
                r.push([1, -1, (h[(m * d + o) * 4] / 255) * b]);
                r.push([1, 0, (h[(n * d + o) * 4] / 255) * b]);
                r.push([1, 1, (h[(q * d + o) * 4] / 255) * b]);
                r.push([0, 1, (h[(q * d + l) * 4] / 255) * b]);
                r.push([-1, 1, (h[(q * d + p) * 4] / 255) * b]);
                m = [];
                p = r.length;
                for (q = 0; q < p; q++) {
                    var o = r[q],
                        u = r[(q + 1) % p],
                        o = [o[0] - t[0], o[1] - t[1], o[2] - t[2]],
                        u = [u[0] - t[0], u[1] - t[1], u[2] - t[2]];
                    m.push(
                        c([
                            o[1] * u[2] - o[2] * u[1],
                            o[2] * u[0] - o[0] * u[2],
                            o[0] * u[1] - o[1] * u[0]
                        ])
                    );
                }
                r = [0, 0, 0];
                for (q = 0; q < m.length; q++) {
                    r[0] = r[0] + m[q][0];
                    r[1] = r[1] + m[q][1];
                    r[2] = r[2] + m[q][2];
                }
                r[0] = r[0] / m.length;
                r[1] = r[1] / m.length;
                r[2] = r[2] / m.length;
                t = (n * d + l) * 4;
                j[t] = (((r[0] + 1) / 2) * 255) | 0;
                j[t + 1] = (((r[1] + 1) / 2) * 255) | 0;
                j[t + 2] = (r[2] * 255) | 0;
                j[t + 3] = 255;
            }
        g.putImageData(i, 0, 0);
        return e;
    },
    generateDataTexture: function (a, b, c) {
        for (
            var d = a * b,
                f = new Uint8Array(3 * d),
                e = Math.floor(c.r * 255),
                g = Math.floor(c.g * 255),
                c = Math.floor(c.b * 255),
                h = 0;
            h < d;
            h++
        ) {
            f[h * 3] = e;
            f[h * 3 + 1] = g;
            f[h * 3 + 2] = c;
        }
        a = new THREE.DataTexture(f, a, b, THREE.RGBFormat);
        a.needsUpdate = true;
        return a;
    }
};
THREE.SceneUtils = {
    showHierarchy: function (a, b) {
        THREE.SceneUtils.traverseHierarchy(a, function (a) {
            a.visible = b;
        });
    },
    traverseHierarchy: function (a, b) {
        var c,
            d,
            f = a.children.length;
        for (d = 0; d < f; d++) {
            c = a.children[d];
            b(c);
            THREE.SceneUtils.traverseHierarchy(c, b);
        }
    },
    createMultiMaterialObject: function (a, b) {
        var c,
            d = b.length,
            f = new THREE.Object3D();
        for (c = 0; c < d; c++) {
            var e = new THREE.Mesh(a, b[c]);
            f.add(e);
        }
        return f;
    },
    cloneObject: function (a) {
        var b;
        if (a instanceof THREE.MorphAnimMesh) {
            b = new THREE.MorphAnimMesh(a.geometry, a.material);
            b.duration = a.duration;
            b.mirroredLoop = a.mirroredLoop;
            b.time = a.time;
            b.lastKeyframe = a.lastKeyframe;
            b.currentKeyframe = a.currentKeyframe;
            b.direction = a.direction;
            b.directionBackwards = a.directionBackwards;
        } else if (a instanceof THREE.SkinnedMesh)
            b = new THREE.SkinnedMesh(
                a.geometry,
                a.material,
                a.useVertexTexture
            );
        else if (a instanceof THREE.Mesh)
            b = new THREE.Mesh(a.geometry, a.material);
        else if (a instanceof THREE.Line)
            b = new THREE.Line(a.geometry, a.material, a.type);
        else if (a instanceof THREE.Ribbon)
            b = new THREE.Ribbon(a.geometry, a.material);
        else if (a instanceof THREE.ParticleSystem) {
            b = new THREE.ParticleSystem(a.geometry, a.material);
            b.sortParticles = a.sortParticles;
        } else if (a instanceof THREE.Particle)
            b = new THREE.Particle(a.material);
        else if (a instanceof THREE.Sprite) {
            b = new THREE.Sprite({});
            b.color.copy(a.color);
            b.map = a.map;
            b.blending = a.blending;
            b.useScreenCoordinates = a.useScreenCoordinates;
            b.mergeWith3D = a.mergeWith3D;
            b.affectedByDistance = a.affectedByDistance;
            b.scaleByViewport = a.scaleByViewport;
            b.alignment = a.alignment;
            b.rotation3d.copy(a.rotation3d);
            b.rotation = a.rotation;
            b.opacity = a.opacity;
            b.uvOffset.copy(a.uvOffset);
            b.uvScale.copy(a.uvScale);
        } else
            a instanceof THREE.LOD
                ? (b = new THREE.LOD())
                : a instanceof THREE.Object3D && (b = new THREE.Object3D());
        b.name = a.name;
        b.parent = a.parent;
        b.up.copy(a.up);
        b.position.copy(a.position);
        b.rotation instanceof THREE.Vector3 && b.rotation.copy(a.rotation);
        b.eulerOrder = a.eulerOrder;
        b.scale.copy(a.scale);
        b.dynamic = a.dynamic;
        b.renderDepth = a.renderDepth;
        b.rotationAutoUpdate = a.rotationAutoUpdate;
        b.matrix.copy(a.matrix);
        b.matrixWorld.copy(a.matrixWorld);
        b.matrixRotationWorld.copy(a.matrixRotationWorld);
        b.matrixAutoUpdate = a.matrixAutoUpdate;
        b.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
        b.quaternion.copy(a.quaternion);
        b.useQuaternion = a.useQuaternion;
        b.boundRadius = a.boundRadius;
        b.boundRadiusScale = a.boundRadiusScale;
        b.visible = a.visible;
        b.castShadow = a.castShadow;
        b.receiveShadow = a.receiveShadow;
        b.frustumCulled = a.frustumCulled;
        for (var c = 0; c < a.children.length; c++) {
            var d = THREE.SceneUtils.cloneObject(a.children[c]);
            b.children[c] = d;
            d.parent = b;
        }
        if (a instanceof THREE.LOD)
            for (c = 0; c < a.LODs.length; c++)
                b.LODs[c] = {
                    visibleAtDistance: a.LODs[c].visibleAtDistance,
                    object3D: b.children[c]
                };
        return b;
    },
    detach: function (a, b, c) {
        a.applyMatrix(b.matrixWorld);
        b.remove(a);
        c.add(a);
    },
    attach: function (a, b, c) {
        var d = new THREE.Matrix4();
        d.getInverse(c.matrixWorld);
        a.applyMatrix(d);
        b.remove(a);
        c.add(a);
    }
};
THREE.WebGLRenderer &&
    (THREE.ShaderUtils = {
        lib: {
            fresnel: {
                uniforms: {
                    mRefractionRatio: { type: "f", value: 1.02 },
                    mFresnelBias: { type: "f", value: 0.1 },
                    mFresnelPower: { type: "f", value: 2 },
                    mFresnelScale: { type: "f", value: 1 },
                    tCube: { type: "t", value: null }
                },
                fragmentShader:
                    "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
                vertexShader:
                    "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = modelMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
            },
            normal: {
                uniforms: THREE.UniformsUtils.merge([
                    THREE.UniformsLib.fog,
                    THREE.UniformsLib.lights,
                    THREE.UniformsLib.shadowmap,
                    {
                        enableAO: { type: "i", value: 0 },
                        enableDiffuse: { type: "i", value: 0 },
                        enableSpecular: { type: "i", value: 0 },
                        enableReflection: { type: "i", value: 0 },
                        enableDisplacement: { type: "i", value: 0 },
                        tDisplacement: { type: "t", value: null },
                        tDiffuse: { type: "t", value: null },
                        tCube: { type: "t", value: null },
                        tNormal: { type: "t", value: null },
                        tSpecular: { type: "t", value: null },
                        tAO: { type: "t", value: null },
                        uNormalScale: {
                            type: "v2",
                            value: new THREE.Vector2(1, 1)
                        },
                        uDisplacementBias: { type: "f", value: 0 },
                        uDisplacementScale: { type: "f", value: 1 },
                        uDiffuseColor: {
                            type: "c",
                            value: new THREE.Color(16777215)
                        },
                        uSpecularColor: {
                            type: "c",
                            value: new THREE.Color(1118481)
                        },
                        uAmbientColor: {
                            type: "c",
                            value: new THREE.Color(16777215)
                        },
                        uShininess: { type: "f", value: 30 },
                        uOpacity: { type: "f", value: 1 },
                        useRefract: { type: "i", value: 0 },
                        uRefractionRatio: { type: "f", value: 0.98 },
                        uReflectivity: { type: "f", value: 0.5 },
                        uOffset: { type: "v2", value: new THREE.Vector2(0, 0) },
                        uRepeat: { type: "v2", value: new THREE.Vector2(1, 1) },
                        wrapRGB: {
                            type: "v3",
                            value: new THREE.Vector3(1, 1, 1)
                        }
                    }
                ]),
                fragmentShader: [
                    "uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightPosition[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
                    THREE.ShaderChunk.shadowmap_pars_fragment,
                    THREE.ShaderChunk.fog_pars_fragment,
                    "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( hemisphereLightPosition[ i ], 1.0 );\nvec3 lVector = normalize( lPosition.xyz + vViewPosition.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = normalize( -lPosition.xyz + vViewPosition.xyz );\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
                    THREE.ShaderChunk.shadowmap_fragment,
                    THREE.ShaderChunk.linear_to_gamma_fragment,
                    THREE.ShaderChunk.fog_fragment,
                    "}"
                ].join("\n"),
                vertexShader: [
                    "attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;",
                    THREE.ShaderChunk.skinning_pars_vertex,
                    THREE.ShaderChunk.shadowmap_pars_vertex,
                    "void main() {",
                    THREE.ShaderChunk.skinbase_vertex,
                    THREE.ShaderChunk.skinnormal_vertex,
                    "#ifdef USE_SKINNING\nvNormal = normalMatrix * skinnedNormal.xyz;\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalMatrix * skinnedTangent.xyz;\n#else\nvNormal = normalMatrix * normal;\nvTangent = normalMatrix * tangent.xyz;\n#endif\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned \t  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 mPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = mPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * mPosition;\n}\n#endif\n}"
                ].join("\n")
            },
            cube: {
                uniforms: {
                    tCube: { type: "t", value: null },
                    tFlip: { type: "f", value: -1 }
                },
                vertexShader:
                    "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = modelMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
                fragmentShader:
                    "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}"
            }
        }
    });
THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function () {
        return this.faces[this.face][this.weight][this.style];
    },
    loadFace: function (a) {
        var b = a.familyName.toLowerCase();
        this.faces[b] = this.faces[b] || {};
        this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {};
        this.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
        return (this.faces[b][a.cssFontWeight][a.cssFontStyle] = a);
    },
    drawText: function (a) {
        for (
            var b = this.getFace(),
                c = this.size / b.resolution,
                d = 0,
                f = String(a).split(""),
                e = f.length,
                g = [],
                a = 0;
            a < e;
            a++
        ) {
            var h = new THREE.Path(),
                h = this.extractGlyphPoints(f[a], b, c, d, h),
                d = d + h.offset;
            g.push(h.path);
        }
        return { paths: g, offset: d / 2 };
    },
    extractGlyphPoints: function (a, b, c, d, f) {
        var e = [],
            g,
            h,
            i,
            j,
            l,
            n,
            m,
            q,
            p,
            o,
            r,
            t = b.glyphs[a] || b.glyphs["?"];
        if (t) {
            if (t.o) {
                b = t._cachedOutline || (t._cachedOutline = t.o.split(" "));
                j = b.length;
                for (a = 0; a < j; ) {
                    i = b[a++];
                    switch (i) {
                        case "m":
                            i = b[a++] * c + d;
                            l = b[a++] * c;
                            f.moveTo(i, l);
                            break;
                        case "l":
                            i = b[a++] * c + d;
                            l = b[a++] * c;
                            f.lineTo(i, l);
                            break;
                        case "q":
                            i = b[a++] * c + d;
                            l = b[a++] * c;
                            q = b[a++] * c + d;
                            p = b[a++] * c;
                            f.quadraticCurveTo(q, p, i, l);
                            if ((g = e[e.length - 1])) {
                                n = g.x;
                                m = g.y;
                                g = 1;
                                for (h = this.divisions; g <= h; g++) {
                                    var u = g / h;
                                    THREE.Shape.Utils.b2(u, n, q, i);
                                    THREE.Shape.Utils.b2(u, m, p, l);
                                }
                            }
                            break;
                        case "b":
                            i = b[a++] * c + d;
                            l = b[a++] * c;
                            q = b[a++] * c + d;
                            p = b[a++] * -c;
                            o = b[a++] * c + d;
                            r = b[a++] * -c;
                            f.bezierCurveTo(i, l, q, p, o, r);
                            if ((g = e[e.length - 1])) {
                                n = g.x;
                                m = g.y;
                                g = 1;
                                for (h = this.divisions; g <= h; g++) {
                                    u = g / h;
                                    THREE.Shape.Utils.b3(u, n, q, o, i);
                                    THREE.Shape.Utils.b3(u, m, p, r, l);
                                }
                            }
                    }
                }
            }
            return { offset: t.ha * c, path: f };
        }
    }
};
THREE.FontUtils.generateShapes = function (a, b) {
    var b = b || {},
        c = b.curveSegments !== void 0 ? b.curveSegments : 4,
        d = b.font !== void 0 ? b.font : "helvetiker",
        f = b.weight !== void 0 ? b.weight : "normal",
        e = b.style !== void 0 ? b.style : "normal";
    THREE.FontUtils.size = b.size !== void 0 ? b.size : 100;
    THREE.FontUtils.divisions = c;
    THREE.FontUtils.face = d;
    THREE.FontUtils.weight = f;
    THREE.FontUtils.style = e;
    c = THREE.FontUtils.drawText(a).paths;
    d = [];
    f = 0;
    for (e = c.length; f < e; f++)
        Array.prototype.push.apply(d, c[f].toShapes());
    return d;
};
(function (a) {
    var b = function (a) {
        for (var b = a.length, f = 0, e = b - 1, g = 0; g < b; e = g++)
            f = f + (a[e].x * a[g].y - a[g].x * a[e].y);
        return f * 0.5;
    };
    a.Triangulate = function (a, d) {
        var f = a.length;
        if (f < 3) return null;
        var e = [],
            g = [],
            h = [],
            i,
            j,
            l;
        if (b(a) > 0) for (j = 0; j < f; j++) g[j] = j;
        else for (j = 0; j < f; j++) g[j] = f - 1 - j;
        var n = 2 * f;
        for (j = f - 1; f > 2; ) {
            if (n-- <= 0) {
                console.log("Warning, unable to triangulate polygon!");
                break;
            }
            i = j;
            f <= i && (i = 0);
            j = i + 1;
            f <= j && (j = 0);
            l = j + 1;
            f <= l && (l = 0);
            var m;
            a: {
                m = a;
                var q = i,
                    p = j,
                    o = l,
                    r = f,
                    t = g,
                    u = void 0,
                    w = void 0,
                    s = void 0,
                    B = void 0,
                    v = void 0,
                    A = void 0,
                    E = void 0,
                    z = void 0,
                    M = void 0,
                    w = m[t[q]].x,
                    s = m[t[q]].y,
                    B = m[t[p]].x,
                    v = m[t[p]].y,
                    A = m[t[o]].x,
                    E = m[t[o]].y;
                if (1e-10 > (B - w) * (E - s) - (v - s) * (A - w)) m = false;
                else {
                    for (u = 0; u < r; u++)
                        if (!(u == q || u == p || u == o)) {
                            var z = m[t[u]].x,
                                M = m[t[u]].y,
                                D = void 0,
                                G = void 0,
                                H = void 0,
                                O = void 0,
                                F = void 0,
                                J = void 0,
                                I = void 0,
                                K = void 0,
                                V = void 0,
                                Y = void 0,
                                $ = void 0,
                                L = void 0,
                                D = (H = F = void 0),
                                D = A - B,
                                G = E - v,
                                H = w - A,
                                O = s - E,
                                F = B - w,
                                J = v - s,
                                I = z - w,
                                K = M - s,
                                V = z - B,
                                Y = M - v,
                                $ = z - A,
                                L = M - E,
                                D = D * Y - G * V,
                                F = F * K - J * I,
                                H = H * L - O * $;
                            if (D >= 0 && H >= 0 && F >= 0) {
                                m = false;
                                break a;
                            }
                        }
                    m = true;
                }
            }
            if (m) {
                e.push([a[g[i]], a[g[j]], a[g[l]]]);
                h.push([g[i], g[j], g[l]]);
                i = j;
                for (l = j + 1; l < f; i++, l++) g[i] = g[l];
                f--;
                n = 2 * f;
            }
        }
        return d ? h : e;
    };
    a.Triangulate.area = b;
    return a;
})(THREE.FontUtils);
self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace
};
THREE.Curve = function () {};
THREE.Curve.prototype.getPoint = function () {
    console.log("Warning, getPoint() not implemented!");
    return null;
};
THREE.Curve.prototype.getPointAt = function (a) {
    a = this.getUtoTmapping(a);
    return this.getPoint(a);
};
THREE.Curve.prototype.getPoints = function (a) {
    a || (a = 5);
    var b,
        c = [];
    for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
    return c;
};
THREE.Curve.prototype.getSpacedPoints = function (a) {
    a || (a = 5);
    var b,
        c = [];
    for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
    return c;
};
THREE.Curve.prototype.getLength = function () {
    var a = this.getLengths();
    return a[a.length - 1];
};
THREE.Curve.prototype.getLengths = function (a) {
    a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
    if (
        this.cacheArcLengths &&
        this.cacheArcLengths.length == a + 1 &&
        !this.needsUpdate
    )
        return this.cacheArcLengths;
    this.needsUpdate = false;
    var b = [],
        c,
        d = this.getPoint(0),
        f,
        e = 0;
    b.push(0);
    for (f = 1; f <= a; f++) {
        c = this.getPoint(f / a);
        e = e + c.distanceTo(d);
        b.push(e);
        d = c;
    }
    return (this.cacheArcLengths = b);
};
THREE.Curve.prototype.updateArcLengths = function () {
    this.needsUpdate = true;
    this.getLengths();
};
THREE.Curve.prototype.getUtoTmapping = function (a, b) {
    var c = this.getLengths(),
        d = 0,
        f = c.length,
        e;
    e = b ? b : a * c[f - 1];
    for (var g = 0, h = f - 1, i; g <= h; ) {
        d = Math.floor(g + (h - g) / 2);
        i = c[d] - e;
        if (i < 0) g = d + 1;
        else if (i > 0) h = d - 1;
        else {
            h = d;
            break;
        }
    }
    d = h;
    if (c[d] == e) return d / (f - 1);
    g = c[d];
    return (c = (d + (e - g) / (c[d + 1] - g)) / (f - 1));
};
THREE.Curve.prototype.getNormalVector = function (a) {
    a = this.getTangent(a);
    return new THREE.Vector2(-a.y, a.x);
};
THREE.Curve.prototype.getTangent = function (a) {
    var b = a - 1e-4,
        a = a + 1e-4;
    b < 0 && (b = 0);
    a > 1 && (a = 1);
    b = this.getPoint(b);
    return this.getPoint(a).clone().subSelf(b).normalize();
};
THREE.Curve.prototype.getTangentAt = function (a) {
    a = this.getUtoTmapping(a);
    return this.getTangent(a);
};
THREE.LineCurve = function (a, b) {
    this.v1 = a;
    this.v2 = b;
};
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.LineCurve.prototype.getPoint = function (a) {
    var b = this.v2.clone().subSelf(this.v1);
    b.multiplyScalar(a).addSelf(this.v1);
    return b;
};
THREE.LineCurve.prototype.getPointAt = function (a) {
    return this.getPoint(a);
};
THREE.LineCurve.prototype.getTangent = function () {
    return this.v2.clone().subSelf(this.v1).normalize();
};
THREE.QuadraticBezierCurve = function (a, b, c) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
};
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.QuadraticBezierCurve.prototype.getPoint = function (a) {
    var b;
    b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
    a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
    return new THREE.Vector2(b, a);
};
THREE.QuadraticBezierCurve.prototype.getTangent = function (a) {
    var b;
    b = THREE.Curve.Utils.tangentQuadraticBezier(
        a,
        this.v0.x,
        this.v1.x,
        this.v2.x
    );
    a = THREE.Curve.Utils.tangentQuadraticBezier(
        a,
        this.v0.y,
        this.v1.y,
        this.v2.y
    );
    b = new THREE.Vector2(b, a);
    b.normalize();
    return b;
};
THREE.CubicBezierCurve = function (a, b, c, d) {
    this.v0 = a;
    this.v1 = b;
    this.v2 = c;
    this.v3 = d;
};
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.CubicBezierCurve.prototype.getPoint = function (a) {
    var b;
    b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
    a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    return new THREE.Vector2(b, a);
};
THREE.CubicBezierCurve.prototype.getTangent = function (a) {
    var b;
    b = THREE.Curve.Utils.tangentCubicBezier(
        a,
        this.v0.x,
        this.v1.x,
        this.v2.x,
        this.v3.x
    );
    a = THREE.Curve.Utils.tangentCubicBezier(
        a,
        this.v0.y,
        this.v1.y,
        this.v2.y,
        this.v3.y
    );
    b = new THREE.Vector2(b, a);
    b.normalize();
    return b;
};
THREE.SplineCurve = function (a) {
    this.points = a == void 0 ? [] : a;
};
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.SplineCurve.prototype.getPoint = function (a) {
    var b = new THREE.Vector2(),
        c = [],
        d = this.points,
        f;
    f = (d.length - 1) * a;
    a = Math.floor(f);
    f = f - a;
    c[0] = a == 0 ? a : a - 1;
    c[1] = a;
    c[2] = a > d.length - 2 ? d.length - 1 : a + 1;
    c[3] = a > d.length - 3 ? d.length - 1 : a + 2;
    b.x = THREE.Curve.Utils.interpolate(
        d[c[0]].x,
        d[c[1]].x,
        d[c[2]].x,
        d[c[3]].x,
        f
    );
    b.y = THREE.Curve.Utils.interpolate(
        d[c[0]].y,
        d[c[1]].y,
        d[c[2]].y,
        d[c[3]].y,
        f
    );
    return b;
};
THREE.EllipseCurve = function (a, b, c, d, f, e, g) {
    this.aX = a;
    this.aY = b;
    this.xRadius = c;
    this.yRadius = d;
    this.aStartAngle = f;
    this.aEndAngle = e;
    this.aClockwise = g;
};
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype);
THREE.EllipseCurve.prototype.getPoint = function (a) {
    var b = this.aEndAngle - this.aStartAngle;
    this.aClockwise || (a = 1 - a);
    b = this.aStartAngle + a * b;
    a = this.aX + this.xRadius * Math.cos(b);
    b = this.aY + this.yRadius * Math.sin(b);
    return new THREE.Vector2(a, b);
};
THREE.ArcCurve = function (a, b, c, d, f, e) {
    THREE.EllipseCurve.call(this, a, b, c, c, d, f, e);
};
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype);
THREE.Curve.Utils = {
    tangentQuadraticBezier: function (a, b, c, d) {
        return 2 * (1 - a) * (c - b) + 2 * a * (d - c);
    },
    tangentCubicBezier: function (a, b, c, d, f) {
        return (
            -3 * b * (1 - a) * (1 - a) +
            3 * c * (1 - a) * (1 - a) -
            6 * a * c * (1 - a) +
            6 * a * d * (1 - a) -
            3 * a * a * d +
            3 * a * a * f
        );
    },
    tangentSpline: function (a) {
        return (
            6 * a * a -
            6 * a +
            (3 * a * a - 4 * a + 1) +
            (-6 * a * a + 6 * a) +
            (3 * a * a - 2 * a)
        );
    },
    interpolate: function (a, b, c, d, f) {
        var a = (c - a) * 0.5,
            d = (d - b) * 0.5,
            e = f * f;
        return (
            (2 * b - 2 * c + a + d) * f * e +
            (-3 * b + 3 * c - 2 * a - d) * e +
            a * f +
            b
        );
    }
};
THREE.Curve.create = function (a, b) {
    a.prototype = Object.create(THREE.Curve.prototype);
    a.prototype.getPoint = b;
    return a;
};
THREE.LineCurve3 = THREE.Curve.create(
    function (a, b) {
        this.v1 = a;
        this.v2 = b;
    },
    function (a) {
        var b = new THREE.Vector3();
        b.sub(this.v2, this.v1);
        b.multiplyScalar(a);
        b.addSelf(this.v1);
        return b;
    }
);
THREE.QuadraticBezierCurve3 = THREE.Curve.create(
    function (a, b, c) {
        this.v0 = a;
        this.v1 = b;
        this.v2 = c;
    },
    function (a) {
        var b, c;
        b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x);
        c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y);
        a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z);
        return new THREE.Vector3(b, c, a);
    }
);
THREE.CubicBezierCurve3 = THREE.Curve.create(
    function (a, b, c, d) {
        this.v0 = a;
        this.v1 = b;
        this.v2 = c;
        this.v3 = d;
    },
    function (a) {
        var b, c;
        b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x);
        c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
        a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z);
        return new THREE.Vector3(b, c, a);
    }
);
THREE.SplineCurve3 = THREE.Curve.create(
    function (a) {
        this.points = a == void 0 ? [] : a;
    },
    function (a) {
        var b = new THREE.Vector3(),
            c = [],
            d = this.points,
            f,
            a = (d.length - 1) * a;
        f = Math.floor(a);
        a = a - f;
        c[0] = f == 0 ? f : f - 1;
        c[1] = f;
        c[2] = f > d.length - 2 ? d.length - 1 : f + 1;
        c[3] = f > d.length - 3 ? d.length - 1 : f + 2;
        f = d[c[0]];
        var e = d[c[1]],
            g = d[c[2]],
            c = d[c[3]];
        b.x = THREE.Curve.Utils.interpolate(f.x, e.x, g.x, c.x, a);
        b.y = THREE.Curve.Utils.interpolate(f.y, e.y, g.y, c.y, a);
        b.z = THREE.Curve.Utils.interpolate(f.z, e.z, g.z, c.z, a);
        return b;
    }
);
THREE.ClosedSplineCurve3 = THREE.Curve.create(
    function (a) {
        this.points = a == void 0 ? [] : a;
    },
    function (a) {
        var b = new THREE.Vector3(),
            c = [],
            d = this.points,
            f;
        f = (d.length - 0) * a;
        a = Math.floor(f);
        f = f - a;
        a =
            a +
            (a > 0 ? 0 : (Math.floor(Math.abs(a) / d.length) + 1) * d.length);
        c[0] = (a - 1) % d.length;
        c[1] = a % d.length;
        c[2] = (a + 1) % d.length;
        c[3] = (a + 2) % d.length;
        b.x = THREE.Curve.Utils.interpolate(
            d[c[0]].x,
            d[c[1]].x,
            d[c[2]].x,
            d[c[3]].x,
            f
        );
        b.y = THREE.Curve.Utils.interpolate(
            d[c[0]].y,
            d[c[1]].y,
            d[c[2]].y,
            d[c[3]].y,
            f
        );
        b.z = THREE.Curve.Utils.interpolate(
            d[c[0]].z,
            d[c[1]].z,
            d[c[2]].z,
            d[c[3]].z,
            f
        );
        return b;
    }
);
THREE.CurvePath = function () {
    this.curves = [];
    this.bends = [];
    this.autoClose = false;
};
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype);
THREE.CurvePath.prototype.add = function (a) {
    this.curves.push(a);
};
THREE.CurvePath.prototype.checkConnection = function () {};
THREE.CurvePath.prototype.closePath = function () {
    var a = this.curves[0].getPoint(0),
        b = this.curves[this.curves.length - 1].getPoint(1);
    a.equals(b) || this.curves.push(new THREE.LineCurve(b, a));
};
THREE.CurvePath.prototype.getPoint = function (a) {
    for (
        var b = a * this.getLength(), c = this.getCurveLengths(), a = 0;
        a < c.length;

    ) {
        if (c[a] >= b) {
            b = c[a] - b;
            a = this.curves[a];
            b = 1 - b / a.getLength();
            return a.getPointAt(b);
        }
        a++;
    }
    return null;
};
THREE.CurvePath.prototype.getLength = function () {
    var a = this.getCurveLengths();
    return a[a.length - 1];
};
THREE.CurvePath.prototype.getCurveLengths = function () {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
        return this.cacheLengths;
    var a = [],
        b = 0,
        c,
        d = this.curves.length;
    for (c = 0; c < d; c++) {
        b = b + this.curves[c].getLength();
        a.push(b);
    }
    return (this.cacheLengths = a);
};
THREE.CurvePath.prototype.getBoundingBox = function () {
    var a = this.getPoints(),
        b,
        c,
        d,
        f,
        e,
        g;
    b = c = Number.NEGATIVE_INFINITY;
    f = e = Number.POSITIVE_INFINITY;
    var h,
        i,
        j,
        l,
        n = a[0] instanceof THREE.Vector3;
    l = n ? new THREE.Vector3() : new THREE.Vector2();
    i = 0;
    for (j = a.length; i < j; i++) {
        h = a[i];
        if (h.x > b) b = h.x;
        else if (h.x < f) f = h.x;
        if (h.y > c) c = h.y;
        else if (h.y < e) e = h.y;
        if (n)
            if (h.z > d) d = h.z;
            else if (h.z < g) g = h.z;
        l.addSelf(h);
    }
    a = { minX: f, minY: e, maxX: b, maxY: c, centroid: l.divideScalar(j) };
    if (n) {
        a.maxZ = d;
        a.minZ = g;
    }
    return a;
};
THREE.CurvePath.prototype.createPointsGeometry = function (a) {
    a = this.getPoints(a, true);
    return this.createGeometry(a);
};
THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a) {
    a = this.getSpacedPoints(a, true);
    return this.createGeometry(a);
};
THREE.CurvePath.prototype.createGeometry = function (a) {
    for (var b = new THREE.Geometry(), c = 0; c < a.length; c++)
        b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
    return b;
};
THREE.CurvePath.prototype.addWrapPath = function (a) {
    this.bends.push(a);
};
THREE.CurvePath.prototype.getTransformedPoints = function (a, b) {
    var c = this.getPoints(a),
        d,
        f;
    if (!b) b = this.bends;
    d = 0;
    for (f = b.length; d < f; d++) c = this.getWrapPoints(c, b[d]);
    return c;
};
THREE.CurvePath.prototype.getTransformedSpacedPoints = function (a, b) {
    var c = this.getSpacedPoints(a),
        d,
        f;
    if (!b) b = this.bends;
    d = 0;
    for (f = b.length; d < f; d++) c = this.getWrapPoints(c, b[d]);
    return c;
};
THREE.CurvePath.prototype.getWrapPoints = function (a, b) {
    var c = this.getBoundingBox(),
        d,
        f,
        e,
        g,
        h,
        i;
    d = 0;
    for (f = a.length; d < f; d++) {
        e = a[d];
        g = e.x;
        h = e.y;
        i = g / c.maxX;
        i = b.getUtoTmapping(i, g);
        g = b.getPoint(i);
        h = b.getNormalVector(i).multiplyScalar(h);
        e.x = g.x + h.x;
        e.y = g.y + h.y;
    }
    return a;
};
THREE.Gyroscope = function () {
    THREE.Object3D.call(this);
};
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype);
THREE.Gyroscope.prototype.updateMatrixWorld = function (a) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || a) {
        if (this.parent) {
            this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix);
            this.matrixWorld.decompose(
                this.translationWorld,
                this.rotationWorld,
                this.scaleWorld
            );
            this.matrix.decompose(
                this.translationObject,
                this.rotationObject,
                this.scaleObject
            );
            this.matrixWorld.compose(
                this.translationWorld,
                this.rotationObject,
                this.scaleWorld
            );
        } else this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = false;
        a = true;
    }
    for (var b = 0, c = this.children.length; b < c; b++)
        this.children[b].updateMatrixWorld(a);
};
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3();
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion();
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion();
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3();
THREE.Path = function (a) {
    THREE.CurvePath.call(this);
    this.actions = [];
    a && this.fromPoints(a);
};
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype);
THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc",
    ELLIPSE: "ellipse"
};
THREE.Path.prototype.fromPoints = function (a) {
    this.moveTo(a[0].x, a[0].y);
    for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y);
};
THREE.Path.prototype.moveTo = function (a, b) {
    var c = Array.prototype.slice.call(arguments);
    this.actions.push({ action: THREE.PathActions.MOVE_TO, args: c });
};
THREE.Path.prototype.lineTo = function (a, b) {
    var c = Array.prototype.slice.call(arguments),
        d = this.actions[this.actions.length - 1].args,
        d = new THREE.LineCurve(
            new THREE.Vector2(d[d.length - 2], d[d.length - 1]),
            new THREE.Vector2(a, b)
        );
    this.curves.push(d);
    this.actions.push({ action: THREE.PathActions.LINE_TO, args: c });
};
THREE.Path.prototype.quadraticCurveTo = function (a, b, c, d) {
    var f = Array.prototype.slice.call(arguments),
        e = this.actions[this.actions.length - 1].args,
        e = new THREE.QuadraticBezierCurve(
            new THREE.Vector2(e[e.length - 2], e[e.length - 1]),
            new THREE.Vector2(a, b),
            new THREE.Vector2(c, d)
        );
    this.curves.push(e);
    this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: f
    });
};
THREE.Path.prototype.bezierCurveTo = function (a, b, c, d, f, e) {
    var g = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1].args,
        h = new THREE.CubicBezierCurve(
            new THREE.Vector2(h[h.length - 2], h[h.length - 1]),
            new THREE.Vector2(a, b),
            new THREE.Vector2(c, d),
            new THREE.Vector2(f, e)
        );
    this.curves.push(h);
    this.actions.push({ action: THREE.PathActions.BEZIER_CURVE_TO, args: g });
};
THREE.Path.prototype.splineThru = function (a) {
    var b = Array.prototype.slice.call(arguments),
        c = this.actions[this.actions.length - 1].args,
        c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
    Array.prototype.push.apply(c, a);
    c = new THREE.SplineCurve(c);
    this.curves.push(c);
    this.actions.push({ action: THREE.PathActions.CSPLINE_THRU, args: b });
};
THREE.Path.prototype.arc = function (a, b, c, d, f, e) {
    var g = this.actions[this.actions.length - 1].args;
    this.absarc(a + g[g.length - 2], b + g[g.length - 1], c, d, f, e);
};
THREE.Path.prototype.absarc = function (a, b, c, d, f, e) {
    this.absellipse(a, b, c, c, d, f, e);
};
THREE.Path.prototype.ellipse = function (a, b, c, d, f, e, g) {
    var h = this.actions[this.actions.length - 1].args;
    this.absellipse(a + h[h.length - 2], b + h[h.length - 1], c, d, f, e, g);
};
THREE.Path.prototype.absellipse = function (a, b, c, d, f, e, g) {
    var h = Array.prototype.slice.call(arguments),
        i = new THREE.EllipseCurve(a, b, c, d, f, e, g);
    this.curves.push(i);
    i = i.getPoint(g ? 1 : 0);
    h.push(i.x);
    h.push(i.y);
    this.actions.push({ action: THREE.PathActions.ELLIPSE, args: h });
};
THREE.Path.prototype.getSpacedPoints = function (a) {
    a || (a = 40);
    for (var b = [], c = 0; c < a; c++) b.push(this.getPoint(c / a));
    return b;
};
THREE.Path.prototype.getPoints = function (a, b) {
    if (this.useSpacedPoints) {
        console.log("tata");
        return this.getSpacedPoints(a, b);
    }
    var a = a || 12,
        c = [],
        d,
        f,
        e,
        g,
        h,
        i,
        j,
        l,
        n,
        m,
        q,
        p,
        o;
    d = 0;
    for (f = this.actions.length; d < f; d++) {
        e = this.actions[d];
        g = e.action;
        e = e.args;
        switch (g) {
            case THREE.PathActions.MOVE_TO:
                c.push(new THREE.Vector2(e[0], e[1]));
                break;
            case THREE.PathActions.LINE_TO:
                c.push(new THREE.Vector2(e[0], e[1]));
                break;
            case THREE.PathActions.QUADRATIC_CURVE_TO:
                h = e[2];
                i = e[3];
                n = e[0];
                m = e[1];
                if (c.length > 0) {
                    g = c[c.length - 1];
                    q = g.x;
                    p = g.y;
                } else {
                    g = this.actions[d - 1].args;
                    q = g[g.length - 2];
                    p = g[g.length - 1];
                }
                for (e = 1; e <= a; e++) {
                    o = e / a;
                    g = THREE.Shape.Utils.b2(o, q, n, h);
                    o = THREE.Shape.Utils.b2(o, p, m, i);
                    c.push(new THREE.Vector2(g, o));
                }
                break;
            case THREE.PathActions.BEZIER_CURVE_TO:
                h = e[4];
                i = e[5];
                n = e[0];
                m = e[1];
                j = e[2];
                l = e[3];
                if (c.length > 0) {
                    g = c[c.length - 1];
                    q = g.x;
                    p = g.y;
                } else {
                    g = this.actions[d - 1].args;
                    q = g[g.length - 2];
                    p = g[g.length - 1];
                }
                for (e = 1; e <= a; e++) {
                    o = e / a;
                    g = THREE.Shape.Utils.b3(o, q, n, j, h);
                    o = THREE.Shape.Utils.b3(o, p, m, l, i);
                    c.push(new THREE.Vector2(g, o));
                }
                break;
            case THREE.PathActions.CSPLINE_THRU:
                g = this.actions[d - 1].args;
                o = [new THREE.Vector2(g[g.length - 2], g[g.length - 1])];
                g = a * e[0].length;
                o = o.concat(e[0]);
                o = new THREE.SplineCurve(o);
                for (e = 1; e <= g; e++) c.push(o.getPointAt(e / g));
                break;
            case THREE.PathActions.ARC:
                h = e[0];
                i = e[1];
                m = e[2];
                j = e[3];
                g = e[4];
                n = !!e[5];
                q = g - j;
                p = a * 2;
                for (e = 1; e <= p; e++) {
                    o = e / p;
                    n || (o = 1 - o);
                    o = j + o * q;
                    g = h + m * Math.cos(o);
                    o = i + m * Math.sin(o);
                    c.push(new THREE.Vector2(g, o));
                }
                break;
            case THREE.PathActions.ELLIPSE:
                h = e[0];
                i = e[1];
                m = e[2];
                l = e[3];
                j = e[4];
                g = e[5];
                n = !!e[6];
                q = g - j;
                p = a * 2;
                for (e = 1; e <= p; e++) {
                    o = e / p;
                    n || (o = 1 - o);
                    o = j + o * q;
                    g = h + m * Math.cos(o);
                    o = i + l * Math.sin(o);
                    c.push(new THREE.Vector2(g, o));
                }
        }
    }
    d = c[c.length - 1];
    Math.abs(d.x - c[0].x) < 1e-10 &&
        Math.abs(d.y - c[0].y) < 1e-10 &&
        c.splice(c.length - 1, 1);
    b && c.push(c[0]);
    return c;
};
THREE.Path.prototype.toShapes = function () {
    var a,
        b,
        c,
        d,
        f = [],
        e = new THREE.Path();
    a = 0;
    for (b = this.actions.length; a < b; a++) {
        c = this.actions[a];
        d = c.args;
        c = c.action;
        if (c == THREE.PathActions.MOVE_TO && e.actions.length != 0) {
            f.push(e);
            e = new THREE.Path();
        }
        e[c].apply(e, d);
    }
    e.actions.length != 0 && f.push(e);
    if (f.length == 0) return [];
    var g;
    d = [];
    a = !THREE.Shape.Utils.isClockWise(f[0].getPoints());
    if (f.length == 1) {
        e = f[0];
        g = new THREE.Shape();
        g.actions = e.actions;
        g.curves = e.curves;
        d.push(g);
        return d;
    }
    if (a) {
        g = new THREE.Shape();
        a = 0;
        for (b = f.length; a < b; a++) {
            e = f[a];
            if (THREE.Shape.Utils.isClockWise(e.getPoints())) {
                g.actions = e.actions;
                g.curves = e.curves;
                d.push(g);
                g = new THREE.Shape();
            } else g.holes.push(e);
        }
    } else {
        a = 0;
        for (b = f.length; a < b; a++) {
            e = f[a];
            if (THREE.Shape.Utils.isClockWise(e.getPoints())) {
                g && d.push(g);
                g = new THREE.Shape();
                g.actions = e.actions;
                g.curves = e.curves;
            } else g.holes.push(e);
        }
        d.push(g);
    }
    return d;
};
THREE.Shape = function () {
    THREE.Path.apply(this, arguments);
    this.holes = [];
};
THREE.Shape.prototype = Object.create(THREE.Path.prototype);
THREE.Shape.prototype.extrude = function (a) {
    return new THREE.ExtrudeGeometry(this, a);
};
THREE.Shape.prototype.makeGeometry = function (a) {
    return new THREE.ShapeGeometry(this, a);
};
THREE.Shape.prototype.getPointsHoles = function (a) {
    var b,
        c = this.holes.length,
        d = [];
    for (b = 0; b < c; b++)
        d[b] = this.holes[b].getTransformedPoints(a, this.bends);
    return d;
};
THREE.Shape.prototype.getSpacedPointsHoles = function (a) {
    var b,
        c = this.holes.length,
        d = [];
    for (b = 0; b < c; b++)
        d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
    return d;
};
THREE.Shape.prototype.extractAllPoints = function (a) {
    return {
        shape: this.getTransformedPoints(a),
        holes: this.getPointsHoles(a)
    };
};
THREE.Shape.prototype.extractPoints = function (a) {
    return this.useSpacedPoints
        ? this.extractAllSpacedPoints(a)
        : this.extractAllPoints(a);
};
THREE.Shape.prototype.extractAllSpacedPoints = function (a) {
    return {
        shape: this.getTransformedSpacedPoints(a),
        holes: this.getSpacedPointsHoles(a)
    };
};
THREE.Shape.Utils = {
    removeHoles: function (a, b) {
        var c = a.concat(),
            d = c.concat(),
            f,
            e,
            g,
            h,
            i,
            j,
            l,
            n,
            m,
            q,
            p = [];
        for (i = 0; i < b.length; i++) {
            j = b[i];
            Array.prototype.push.apply(d, j);
            e = Number.POSITIVE_INFINITY;
            for (f = 0; f < j.length; f++) {
                m = j[f];
                q = [];
                for (n = 0; n < c.length; n++) {
                    l = c[n];
                    l = m.distanceToSquared(l);
                    q.push(l);
                    if (l < e) {
                        e = l;
                        g = f;
                        h = n;
                    }
                }
            }
            f = h - 1 >= 0 ? h - 1 : c.length - 1;
            e = g - 1 >= 0 ? g - 1 : j.length - 1;
            var o = [j[g], c[h], c[f]];
            n = THREE.FontUtils.Triangulate.area(o);
            var r = [j[g], j[e], c[h]];
            m = THREE.FontUtils.Triangulate.area(r);
            q = h;
            l = g;
            h = h + 1;
            g = g + -1;
            h < 0 && (h = h + c.length);
            h = h % c.length;
            g < 0 && (g = g + j.length);
            g = g % j.length;
            f = h - 1 >= 0 ? h - 1 : c.length - 1;
            e = g - 1 >= 0 ? g - 1 : j.length - 1;
            o = [j[g], c[h], c[f]];
            o = THREE.FontUtils.Triangulate.area(o);
            r = [j[g], j[e], c[h]];
            r = THREE.FontUtils.Triangulate.area(r);
            if (n + m > o + r) {
                h = q;
                g = l;
                h < 0 && (h = h + c.length);
                h = h % c.length;
                g < 0 && (g = g + j.length);
                g = g % j.length;
                f = h - 1 >= 0 ? h - 1 : c.length - 1;
                e = g - 1 >= 0 ? g - 1 : j.length - 1;
            }
            n = c.slice(0, h);
            m = c.slice(h);
            q = j.slice(g);
            l = j.slice(0, g);
            e = [j[g], j[e], c[h]];
            p.push([j[g], c[h], c[f]]);
            p.push(e);
            c = n.concat(q).concat(l).concat(m);
        }
        return { shape: c, isolatedPts: p, allpoints: d };
    },
    triangulateShape: function (a, b) {
        var c = THREE.Shape.Utils.removeHoles(a, b),
            d = c.allpoints,
            f = c.isolatedPts,
            c = THREE.FontUtils.Triangulate(c.shape, false),
            e,
            g,
            h,
            i,
            j = {};
        e = 0;
        for (g = d.length; e < g; e++) {
            i = d[e].x + ":" + d[e].y;
            j[i] !== void 0 && console.log("Duplicate point", i);
            j[i] = e;
        }
        e = 0;
        for (g = c.length; e < g; e++) {
            h = c[e];
            for (d = 0; d < 3; d++) {
                i = h[d].x + ":" + h[d].y;
                i = j[i];
                i !== void 0 && (h[d] = i);
            }
        }
        e = 0;
        for (g = f.length; e < g; e++) {
            h = f[e];
            for (d = 0; d < 3; d++) {
                i = h[d].x + ":" + h[d].y;
                i = j[i];
                i !== void 0 && (h[d] = i);
            }
        }
        return c.concat(f);
    },
    isClockWise: function (a) {
        return THREE.FontUtils.Triangulate.area(a) < 0;
    },
    b2p0: function (a, b) {
        var c = 1 - a;
        return c * c * b;
    },
    b2p1: function (a, b) {
        return 2 * (1 - a) * a * b;
    },
    b2p2: function (a, b) {
        return a * a * b;
    },
    b2: function (a, b, c, d) {
        return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d);
    },
    b3p0: function (a, b) {
        var c = 1 - a;
        return c * c * c * b;
    },
    b3p1: function (a, b) {
        var c = 1 - a;
        return 3 * c * c * a * b;
    },
    b3p2: function (a, b) {
        return 3 * (1 - a) * a * a * b;
    },
    b3p3: function (a, b) {
        return a * a * a * b;
    },
    b3: function (a, b, c, d, f) {
        return (
            this.b3p0(a, b) +
            this.b3p1(a, c) +
            this.b3p2(a, d) +
            this.b3p3(a, f)
        );
    }
};
THREE.AnimationHandler = (function () {
    var a = [],
        b = {},
        c = {
            update: function (b) {
                for (var c = 0; c < a.length; c++) a[c].update(b);
            },
            addToUpdate: function (b) {
                a.indexOf(b) === -1 && a.push(b);
            },
            removeFromUpdate: function (b) {
                b = a.indexOf(b);
                b !== -1 && a.splice(b, 1);
            },
            add: function (a) {
                b[a.name] !== void 0 &&
                    console.log(
                        "THREE.AnimationHandler.add: Warning! " +
                            a.name +
                            " already exists in library. Overwriting."
                    );
                b[a.name] = a;
                if (a.initialized !== true) {
                    for (var c = 0; c < a.hierarchy.length; c++) {
                        for (var d = 0; d < a.hierarchy[c].keys.length; d++) {
                            if (a.hierarchy[c].keys[d].time < 0)
                                a.hierarchy[c].keys[d].time = 0;
                            if (
                                a.hierarchy[c].keys[d].rot !== void 0 &&
                                !(
                                    a.hierarchy[c].keys[d].rot instanceof
                                    THREE.Quaternion
                                )
                            ) {
                                var h = a.hierarchy[c].keys[d].rot;
                                a.hierarchy[c].keys[d].rot =
                                    new THREE.Quaternion(
                                        h[0],
                                        h[1],
                                        h[2],
                                        h[3]
                                    );
                            }
                        }
                        if (
                            a.hierarchy[c].keys.length &&
                            a.hierarchy[c].keys[0].morphTargets !== void 0
                        ) {
                            h = {};
                            for (d = 0; d < a.hierarchy[c].keys.length; d++)
                                for (
                                    var i = 0;
                                    i <
                                    a.hierarchy[c].keys[d].morphTargets.length;
                                    i++
                                ) {
                                    var j =
                                        a.hierarchy[c].keys[d].morphTargets[i];
                                    h[j] = -1;
                                }
                            a.hierarchy[c].usedMorphTargets = h;
                            for (d = 0; d < a.hierarchy[c].keys.length; d++) {
                                var l = {};
                                for (j in h) {
                                    for (
                                        i = 0;
                                        i <
                                        a.hierarchy[c].keys[d].morphTargets
                                            .length;
                                        i++
                                    )
                                        if (
                                            a.hierarchy[c].keys[d].morphTargets[
                                                i
                                            ] === j
                                        ) {
                                            l[j] =
                                                a.hierarchy[c].keys[
                                                    d
                                                ].morphTargetsInfluences[i];
                                            break;
                                        }
                                    i ===
                                        a.hierarchy[c].keys[d].morphTargets
                                            .length && (l[j] = 0);
                                }
                                a.hierarchy[c].keys[d].morphTargetsInfluences =
                                    l;
                            }
                        }
                        for (d = 1; d < a.hierarchy[c].keys.length; d++)
                            if (
                                a.hierarchy[c].keys[d].time ===
                                a.hierarchy[c].keys[d - 1].time
                            ) {
                                a.hierarchy[c].keys.splice(d, 1);
                                d--;
                            }
                        for (d = 0; d < a.hierarchy[c].keys.length; d++)
                            a.hierarchy[c].keys[d].index = d;
                    }
                    d = parseInt(a.length * a.fps, 10);
                    a.JIT = {};
                    a.JIT.hierarchy = [];
                    for (c = 0; c < a.hierarchy.length; c++)
                        a.JIT.hierarchy.push(Array(d));
                    a.initialized = true;
                }
            },
            get: function (a) {
                if (typeof a === "string") {
                    if (b[a]) return b[a];
                    console.log(
                        "THREE.AnimationHandler.get: Couldn't find animation " +
                            a
                    );
                    return null;
                }
            },
            parse: function (a) {
                var b = [];
                if (a instanceof THREE.SkinnedMesh)
                    for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
                else d(a, b);
                return b;
            }
        },
        d = function (a, b) {
            b.push(a);
            for (var c = 0; c < a.children.length; c++) d(a.children[c], b);
        };
    c.LINEAR = 0;
    c.CATMULLROM = 1;
    c.CATMULLROM_FORWARD = 2;
    return c;
})();
THREE.Animation = function (a, b, c) {
    this.root = a;
    this.data = THREE.AnimationHandler.get(b);
    this.hierarchy = THREE.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 1;
    this.isPlaying = false;
    this.loop = this.isPaused = true;
    this.interpolationType = c !== void 0 ? c : THREE.AnimationHandler.LINEAR;
    this.points = [];
    this.target = new THREE.Vector3();
};
THREE.Animation.prototype.play = function (a, b) {
    if (this.isPlaying === false) {
        this.isPlaying = true;
        this.loop = a !== void 0 ? a : true;
        this.currentTime = b !== void 0 ? b : 0;
        var c,
            d = this.hierarchy.length,
            f;
        for (c = 0; c < d; c++) {
            f = this.hierarchy[c];
            if (
                this.interpolationType !==
                THREE.AnimationHandler.CATMULLROM_FORWARD
            )
                f.useQuaternion = true;
            f.matrixAutoUpdate = true;
            if (f.animationCache === void 0) {
                f.animationCache = {};
                f.animationCache.prevKey = { pos: 0, rot: 0, scl: 0 };
                f.animationCache.nextKey = { pos: 0, rot: 0, scl: 0 };
                f.animationCache.originalMatrix =
                    f instanceof THREE.Bone ? f.skinMatrix : f.matrix;
            }
            var e = f.animationCache.prevKey;
            f = f.animationCache.nextKey;
            e.pos = this.data.hierarchy[c].keys[0];
            e.rot = this.data.hierarchy[c].keys[0];
            e.scl = this.data.hierarchy[c].keys[0];
            f.pos = this.getNextKeyWith("pos", c, 1);
            f.rot = this.getNextKeyWith("rot", c, 1);
            f.scl = this.getNextKeyWith("scl", c, 1);
        }
        this.update(0);
    }
    this.isPaused = false;
    THREE.AnimationHandler.addToUpdate(this);
};
THREE.Animation.prototype.pause = function () {
    this.isPaused === true
        ? THREE.AnimationHandler.addToUpdate(this)
        : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused;
};
THREE.Animation.prototype.stop = function () {
    this.isPaused = this.isPlaying = false;
    THREE.AnimationHandler.removeFromUpdate(this);
};
THREE.Animation.prototype.update = function (a) {
    if (this.isPlaying !== false) {
        var b = ["pos", "rot", "scl"],
            c,
            d,
            f,
            e,
            g,
            h,
            i,
            j,
            l;
        l = this.currentTime = this.currentTime + a * this.timeScale;
        j = this.currentTime = this.currentTime % this.data.length;
        parseInt(
            Math.min(j * this.data.fps, this.data.length * this.data.fps),
            10
        );
        for (var n = 0, m = this.hierarchy.length; n < m; n++) {
            a = this.hierarchy[n];
            i = a.animationCache;
            for (var q = 0; q < 3; q++) {
                c = b[q];
                g = i.prevKey[c];
                h = i.nextKey[c];
                if (h.time <= l) {
                    if (j < l)
                        if (this.loop) {
                            g = this.data.hierarchy[n].keys[0];
                            for (
                                h = this.getNextKeyWith(c, n, 1);
                                h.time < j;

                            ) {
                                g = h;
                                h = this.getNextKeyWith(c, n, h.index + 1);
                            }
                        } else {
                            this.stop();
                            return;
                        }
                    else {
                        do {
                            g = h;
                            h = this.getNextKeyWith(c, n, h.index + 1);
                        } while (h.time < j);
                    }
                    i.prevKey[c] = g;
                    i.nextKey[c] = h;
                }
                a.matrixAutoUpdate = true;
                a.matrixWorldNeedsUpdate = true;
                d = (j - g.time) / (h.time - g.time);
                f = g[c];
                e = h[c];
                if (d < 0 || d > 1) {
                    console.log(
                        "THREE.Animation.update: Warning! Scale out of bounds:" +
                            d +
                            " on bone " +
                            n
                    );
                    d = d < 0 ? 0 : 1;
                }
                if (c === "pos") {
                    c = a.position;
                    if (
                        this.interpolationType === THREE.AnimationHandler.LINEAR
                    ) {
                        c.x = f[0] + (e[0] - f[0]) * d;
                        c.y = f[1] + (e[1] - f[1]) * d;
                        c.z = f[2] + (e[2] - f[2]) * d;
                    } else if (
                        this.interpolationType ===
                            THREE.AnimationHandler.CATMULLROM ||
                        this.interpolationType ===
                            THREE.AnimationHandler.CATMULLROM_FORWARD
                    ) {
                        this.points[0] = this.getPrevKeyWith(
                            "pos",
                            n,
                            g.index - 1
                        ).pos;
                        this.points[1] = f;
                        this.points[2] = e;
                        this.points[3] = this.getNextKeyWith(
                            "pos",
                            n,
                            h.index + 1
                        ).pos;
                        d = d * 0.33 + 0.33;
                        f = this.interpolateCatmullRom(this.points, d);
                        c.x = f[0];
                        c.y = f[1];
                        c.z = f[2];
                        if (
                            this.interpolationType ===
                            THREE.AnimationHandler.CATMULLROM_FORWARD
                        ) {
                            d = this.interpolateCatmullRom(
                                this.points,
                                d * 1.01
                            );
                            this.target.set(d[0], d[1], d[2]);
                            this.target.subSelf(c);
                            this.target.y = 0;
                            this.target.normalize();
                            d = Math.atan2(this.target.x, this.target.z);
                            a.rotation.set(0, d, 0);
                        }
                    }
                } else if (c === "rot")
                    THREE.Quaternion.slerp(f, e, a.quaternion, d);
                else if (c === "scl") {
                    c = a.scale;
                    c.x = f[0] + (e[0] - f[0]) * d;
                    c.y = f[1] + (e[1] - f[1]) * d;
                    c.z = f[2] + (e[2] - f[2]) * d;
                }
            }
        }
    }
};
THREE.Animation.prototype.interpolateCatmullRom = function (a, b) {
    var c = [],
        d = [],
        f,
        e,
        g,
        h,
        i,
        j;
    f = (a.length - 1) * b;
    e = Math.floor(f);
    f = f - e;
    c[0] = e === 0 ? e : e - 1;
    c[1] = e;
    c[2] = e > a.length - 2 ? e : e + 1;
    c[3] = e > a.length - 3 ? e : e + 2;
    e = a[c[0]];
    h = a[c[1]];
    i = a[c[2]];
    j = a[c[3]];
    c = f * f;
    g = f * c;
    d[0] = this.interpolate(e[0], h[0], i[0], j[0], f, c, g);
    d[1] = this.interpolate(e[1], h[1], i[1], j[1], f, c, g);
    d[2] = this.interpolate(e[2], h[2], i[2], j[2], f, c, g);
    return d;
};
THREE.Animation.prototype.interpolate = function (a, b, c, d, f, e, g) {
    a = (c - a) * 0.5;
    d = (d - b) * 0.5;
    return (
        (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * e + a * f + b
    );
};
THREE.Animation.prototype.getNextKeyWith = function (a, b, c) {
    for (
        var d = this.data.hierarchy[b].keys,
            c =
                this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
                this.interpolationType ===
                    THREE.AnimationHandler.CATMULLROM_FORWARD
                    ? c < d.length - 1
                        ? c
                        : d.length - 1
                    : c % d.length;
        c < d.length;
        c++
    )
        if (d[c][a] !== void 0) return d[c];
    return this.data.hierarchy[b].keys[0];
};
THREE.Animation.prototype.getPrevKeyWith = function (a, b, c) {
    for (
        var d = this.data.hierarchy[b].keys,
            c =
                this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
                this.interpolationType ===
                    THREE.AnimationHandler.CATMULLROM_FORWARD
                    ? c > 0
                        ? c
                        : 0
                    : c >= 0
                        ? c
                        : c + d.length;
        c >= 0;
        c--
    )
        if (d[c][a] !== void 0) return d[c];
    return this.data.hierarchy[b].keys[d.length - 1];
};
THREE.KeyFrameAnimation = function (a, b, c) {
    this.root = a;
    this.data = THREE.AnimationHandler.get(b);
    this.hierarchy = THREE.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 0.001;
    this.isPlaying = false;
    this.loop = this.isPaused = true;
    this.JITCompile = c !== void 0 ? c : true;
    a = 0;
    for (b = this.hierarchy.length; a < b; a++) {
        var c = this.data.hierarchy[a].sids,
            d = this.hierarchy[a];
        if (this.data.hierarchy[a].keys.length && c) {
            for (var f = 0; f < c.length; f++) {
                var e = c[f],
                    g = this.getNextKeyWith(e, a, 0);
                g && g.apply(e);
            }
            d.matrixAutoUpdate = false;
            this.data.hierarchy[a].node.updateMatrix();
            d.matrixWorldNeedsUpdate = true;
        }
    }
};
THREE.KeyFrameAnimation.prototype.play = function (a, b) {
    if (!this.isPlaying) {
        this.isPlaying = true;
        this.loop = a !== void 0 ? a : true;
        this.currentTime = b !== void 0 ? b : 0;
        this.startTimeMs = b;
        this.startTime = 1e7;
        this.endTime = -this.startTime;
        var c,
            d = this.hierarchy.length,
            f,
            e;
        for (c = 0; c < d; c++) {
            f = this.hierarchy[c];
            e = this.data.hierarchy[c];
            f.useQuaternion = true;
            if (e.animationCache === void 0) {
                e.animationCache = {};
                e.animationCache.prevKey = null;
                e.animationCache.nextKey = null;
                e.animationCache.originalMatrix =
                    f instanceof THREE.Bone ? f.skinMatrix : f.matrix;
            }
            f = this.data.hierarchy[c].keys;
            if (f.length) {
                e.animationCache.prevKey = f[0];
                e.animationCache.nextKey = f[1];
                this.startTime = Math.min(f[0].time, this.startTime);
                this.endTime = Math.max(f[f.length - 1].time, this.endTime);
            }
        }
        this.update(0);
    }
    this.isPaused = false;
    THREE.AnimationHandler.addToUpdate(this);
};
THREE.KeyFrameAnimation.prototype.pause = function () {
    this.isPaused
        ? THREE.AnimationHandler.addToUpdate(this)
        : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused;
};
THREE.KeyFrameAnimation.prototype.stop = function () {
    this.isPaused = this.isPlaying = false;
    THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.data.hierarchy.length; a++) {
        var b = this.hierarchy[a],
            c = this.data.hierarchy[a];
        if (c.animationCache !== void 0) {
            var d = c.animationCache.originalMatrix;
            if (b instanceof THREE.Bone) {
                d.copy(b.skinMatrix);
                b.skinMatrix = d;
            } else {
                d.copy(b.matrix);
                b.matrix = d;
            }
            delete c.animationCache;
        }
    }
};
THREE.KeyFrameAnimation.prototype.update = function (a) {
    if (this.isPlaying) {
        var b,
            c,
            d,
            f,
            e = this.data.JIT.hierarchy,
            g,
            h,
            i;
        h = this.currentTime = this.currentTime + a * this.timeScale;
        g = this.currentTime = this.currentTime % this.data.length;
        if (g < this.startTimeMs) g = this.currentTime = this.startTimeMs + g;
        f = parseInt(
            Math.min(g * this.data.fps, this.data.length * this.data.fps),
            10
        );
        if ((i = g < h) && !this.loop) {
            for (var a = 0, j = this.hierarchy.length; a < j; a++) {
                var l = this.data.hierarchy[a].keys,
                    e = this.data.hierarchy[a].sids;
                d = l.length - 1;
                f = this.hierarchy[a];
                if (l.length) {
                    for (l = 0; l < e.length; l++) {
                        g = e[l];
                        (h = this.getPrevKeyWith(g, a, d)) && h.apply(g);
                    }
                    this.data.hierarchy[a].node.updateMatrix();
                    f.matrixWorldNeedsUpdate = true;
                }
            }
            this.stop();
        } else if (!(g < this.startTime)) {
            a = 0;
            for (j = this.hierarchy.length; a < j; a++) {
                d = this.hierarchy[a];
                b = this.data.hierarchy[a];
                var l = b.keys,
                    n = b.animationCache;
                if (this.JITCompile && e[a][f] !== void 0)
                    if (d instanceof THREE.Bone) {
                        d.skinMatrix = e[a][f];
                        d.matrixWorldNeedsUpdate = false;
                    } else {
                        d.matrix = e[a][f];
                        d.matrixWorldNeedsUpdate = true;
                    }
                else if (l.length) {
                    if (this.JITCompile && n)
                        d instanceof THREE.Bone
                            ? (d.skinMatrix = n.originalMatrix)
                            : (d.matrix = n.originalMatrix);
                    b = n.prevKey;
                    c = n.nextKey;
                    if (b && c) {
                        if (c.time <= h) {
                            if (i && this.loop) {
                                b = l[0];
                                for (c = l[1]; c.time < g; ) {
                                    b = c;
                                    c = l[b.index + 1];
                                }
                            } else if (!i)
                                for (
                                    var m = l.length - 1;
                                    c.time < g && c.index !== m;

                                ) {
                                    b = c;
                                    c = l[b.index + 1];
                                }
                            n.prevKey = b;
                            n.nextKey = c;
                        }
                        c.time >= g
                            ? b.interpolate(c, g)
                            : b.interpolate(c, c.time);
                    }
                    this.data.hierarchy[a].node.updateMatrix();
                    d.matrixWorldNeedsUpdate = true;
                }
            }
            if (this.JITCompile && e[0][f] === void 0) {
                this.hierarchy[0].updateMatrixWorld(true);
                for (a = 0; a < this.hierarchy.length; a++)
                    e[a][f] =
                        this.hierarchy[a] instanceof THREE.Bone
                            ? this.hierarchy[a].skinMatrix.clone()
                            : this.hierarchy[a].matrix.clone();
            }
        }
    }
};
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (a, b, c) {
    b = this.data.hierarchy[b].keys;
    for (c = c % b.length; c < b.length; c++)
        if (b[c].hasTarget(a)) return b[c];
    return b[0];
};
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (a, b, c) {
    b = this.data.hierarchy[b].keys;
    for (c = c >= 0 ? c : c + b.length; c >= 0; c--)
        if (b[c].hasTarget(a)) return b[c];
    return b[b.length - 1];
};
THREE.CubeCamera = function (a, b, c) {
    THREE.Object3D.call(this);
    var d = new THREE.PerspectiveCamera(90, 1, a, b);
    d.up.set(0, -1, 0);
    d.lookAt(new THREE.Vector3(1, 0, 0));
    this.add(d);
    var f = new THREE.PerspectiveCamera(90, 1, a, b);
    f.up.set(0, -1, 0);
    f.lookAt(new THREE.Vector3(-1, 0, 0));
    this.add(f);
    var e = new THREE.PerspectiveCamera(90, 1, a, b);
    e.up.set(0, 0, 1);
    e.lookAt(new THREE.Vector3(0, 1, 0));
    this.add(e);
    var g = new THREE.PerspectiveCamera(90, 1, a, b);
    g.up.set(0, 0, -1);
    g.lookAt(new THREE.Vector3(0, -1, 0));
    this.add(g);
    var h = new THREE.PerspectiveCamera(90, 1, a, b);
    h.up.set(0, -1, 0);
    h.lookAt(new THREE.Vector3(0, 0, 1));
    this.add(h);
    var i = new THREE.PerspectiveCamera(90, 1, a, b);
    i.up.set(0, -1, 0);
    i.lookAt(new THREE.Vector3(0, 0, -1));
    this.add(i);
    this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    });
    this.updateCubeMap = function (a, b) {
        var c = this.renderTarget,
            m = c.generateMipmaps;
        c.generateMipmaps = false;
        c.activeCubeFace = 0;
        a.render(b, d, c);
        c.activeCubeFace = 1;
        a.render(b, f, c);
        c.activeCubeFace = 2;
        a.render(b, e, c);
        c.activeCubeFace = 3;
        a.render(b, g, c);
        c.activeCubeFace = 4;
        a.render(b, h, c);
        c.generateMipmaps = m;
        c.activeCubeFace = 5;
        a.render(b, i, c);
    };
};
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype);
THREE.CombinedCamera = function (a, b, c, d, f, e, g) {
    THREE.Camera.call(this);
    this.fov = c;
    this.left = -a / 2;
    this.right = a / 2;
    this.top = b / 2;
    this.bottom = -b / 2;
    this.cameraO = new THREE.OrthographicCamera(
        a / -2,
        a / 2,
        b / 2,
        b / -2,
        e,
        g
    );
    this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, f);
    this.zoom = 1;
    this.toPerspective();
};
THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.CombinedCamera.prototype.toPerspective = function () {
    this.near = this.cameraP.near;
    this.far = this.cameraP.far;
    this.cameraP.fov = this.fov / this.zoom;
    this.cameraP.updateProjectionMatrix();
    this.projectionMatrix = this.cameraP.projectionMatrix;
    this.inPerspectiveMode = true;
    this.inOrthographicMode = false;
};
THREE.CombinedCamera.prototype.toOrthographic = function () {
    var a = this.cameraP.aspect,
        b = (this.cameraP.near + this.cameraP.far) / 2,
        b = Math.tan(this.fov / 2) * b,
        a = (2 * b * a) / 2,
        b = b / this.zoom,
        a = a / this.zoom;
    this.cameraO.left = -a;
    this.cameraO.right = a;
    this.cameraO.top = b;
    this.cameraO.bottom = -b;
    this.cameraO.updateProjectionMatrix();
    this.near = this.cameraO.near;
    this.far = this.cameraO.far;
    this.projectionMatrix = this.cameraO.projectionMatrix;
    this.inPerspectiveMode = false;
    this.inOrthographicMode = true;
};
THREE.CombinedCamera.prototype.setSize = function (a, b) {
    this.cameraP.aspect = a / b;
    this.left = -a / 2;
    this.right = a / 2;
    this.top = b / 2;
    this.bottom = -b / 2;
};
THREE.CombinedCamera.prototype.setFov = function (a) {
    this.fov = a;
    this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
};
THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
    if (this.inPerspectiveMode) this.toPerspective();
    else {
        this.toPerspective();
        this.toOrthographic();
    }
};
THREE.CombinedCamera.prototype.setLens = function (a, b) {
    b === void 0 && (b = 24);
    var c = 2 * Math.atan(b / (a * 2)) * (180 / Math.PI);
    this.setFov(c);
    return c;
};
THREE.CombinedCamera.prototype.setZoom = function (a) {
    this.zoom = a;
    this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
};
THREE.CombinedCamera.prototype.toFrontView = function () {
    this.rotation.x = 0;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = false;
};
THREE.CombinedCamera.prototype.toBackView = function () {
    this.rotation.x = 0;
    this.rotation.y = Math.PI;
    this.rotation.z = 0;
    this.rotationAutoUpdate = false;
};
THREE.CombinedCamera.prototype.toLeftView = function () {
    this.rotation.x = 0;
    this.rotation.y = -Math.PI / 2;
    this.rotation.z = 0;
    this.rotationAutoUpdate = false;
};
THREE.CombinedCamera.prototype.toRightView = function () {
    this.rotation.x = 0;
    this.rotation.y = Math.PI / 2;
    this.rotation.z = 0;
    this.rotationAutoUpdate = false;
};
THREE.CombinedCamera.prototype.toTopView = function () {
    this.rotation.x = -Math.PI / 2;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = false;
};
THREE.CombinedCamera.prototype.toBottomView = function () {
    this.rotation.x = Math.PI / 2;
    this.rotation.y = 0;
    this.rotation.z = 0;
    this.rotationAutoUpdate = false;
};
THREE.FirstPersonControls = function (a, b) {
    function c(a, b) {
        return function () {
            b.apply(a, arguments);
        };
    }
    this.object = a;
    this.target = new THREE.Vector3(0, 0, 0);
    this.domElement = b !== void 0 ? b : document;
    this.movementSpeed = 1;
    this.lookSpeed = 0.005;
    this.lookVertical = true;
    this.autoForward = false;
    this.activeLook = true;
    this.heightSpeed = false;
    this.heightCoef = 1;
    this.heightMin = 0;
    this.heightMax = 1;
    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;
    this.theta =
        this.phi =
        this.lon =
        this.lat =
        this.mouseY =
        this.mouseX =
        this.autoSpeedFactor =
            0;
    this.mouseDragOn =
        this.freeze =
        this.moveRight =
        this.moveLeft =
        this.moveBackward =
        this.moveForward =
            false;
    this.viewHalfY = this.viewHalfX = 0;
    this.domElement !== document &&
        this.domElement.setAttribute("tabindex", -1);
    this.handleResize = function () {
        if (this.domElement === document) {
            this.viewHalfX = window.innerWidth / 2;
            this.viewHalfY = window.innerHeight / 2;
        } else {
            this.viewHalfX = this.domElement.offsetWidth / 2;
            this.viewHalfY = this.domElement.offsetHeight / 2;
        }
    };
    this.onMouseDown = function (a) {
        this.domElement !== document && this.domElement.focus();
        a.preventDefault();
        a.stopPropagation();
        if (this.activeLook)
            switch (a.button) {
                case 0:
                    this.moveForward = true;
                    break;
                case 2:
                    this.moveBackward = true;
            }
        this.mouseDragOn = true;
    };
    this.onMouseUp = function (a) {
        a.preventDefault();
        a.stopPropagation();
        if (this.activeLook)
            switch (a.button) {
                case 0:
                    this.moveForward = false;
                    break;
                case 2:
                    this.moveBackward = false;
            }
        this.mouseDragOn = false;
    };
    this.onMouseMove = function (a) {
        if (this.domElement === document) {
            this.mouseX = a.pageX - this.viewHalfX;
            this.mouseY = a.pageY - this.viewHalfY;
        } else {
            this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX;
            this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY;
        }
    };
    this.onKeyDown = function (a) {
        switch (a.keyCode) {
            case 38:
            case 87:
                this.moveForward = true;
                break;
            case 37:
            case 65:
                this.moveLeft = true;
                break;
            case 40:
            case 83:
                this.moveBackward = true;
                break;
            case 39:
            case 68:
                this.moveRight = true;
                break;
            case 82:
                this.moveUp = true;
                break;
            case 70:
                this.moveDown = true;
                break;
            case 81:
                this.freeze = !this.freeze;
        }
    };
    this.onKeyUp = function (a) {
        switch (a.keyCode) {
            case 38:
            case 87:
                this.moveForward = false;
                break;
            case 37:
            case 65:
                this.moveLeft = false;
                break;
            case 40:
            case 83:
                this.moveBackward = false;
                break;
            case 39:
            case 68:
                this.moveRight = false;
                break;
            case 82:
                this.moveUp = false;
                break;
            case 70:
                this.moveDown = false;
        }
    };
    this.update = function (a) {
        var b = 0;
        if (!this.freeze) {
            if (this.heightSpeed) {
                b =
                    THREE.Math.clamp(
                        this.object.position.y,
                        this.heightMin,
                        this.heightMax
                    ) - this.heightMin;
                this.autoSpeedFactor = a * b * this.heightCoef;
            } else this.autoSpeedFactor = 0;
            b = a * this.movementSpeed;
            (this.moveForward || (this.autoForward && !this.moveBackward)) &&
                this.object.translateZ(-(b + this.autoSpeedFactor));
            this.moveBackward && this.object.translateZ(b);
            this.moveLeft && this.object.translateX(-b);
            this.moveRight && this.object.translateX(b);
            this.moveUp && this.object.translateY(b);
            this.moveDown && this.object.translateY(-b);
            a = a * this.lookSpeed;
            this.activeLook || (a = 0);
            this.lon = this.lon + this.mouseX * a;
            if (this.lookVertical) this.lat = this.lat - this.mouseY * a;
            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = ((90 - this.lat) * Math.PI) / 180;
            this.theta = (this.lon * Math.PI) / 180;
            var b = this.target,
                c = this.object.position;
            b.x = c.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
            b.y = c.y + 100 * Math.cos(this.phi);
            b.z = c.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
            b = 1;
            this.constrainVertical &&
                (b = Math.PI / (this.verticalMax - this.verticalMin));
            this.lon = this.lon + this.mouseX * a;
            if (this.lookVertical) this.lat = this.lat - this.mouseY * a * b;
            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = ((90 - this.lat) * Math.PI) / 180;
            this.theta = (this.lon * Math.PI) / 180;
            if (this.constrainVertical)
                this.phi = THREE.Math.mapLinear(
                    this.phi,
                    0,
                    Math.PI,
                    this.verticalMin,
                    this.verticalMax
                );
            b = this.target;
            c = this.object.position;
            b.x = c.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
            b.y = c.y + 100 * Math.cos(this.phi);
            b.z = c.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
            this.object.lookAt(b);
        }
    };
    this.domElement.addEventListener(
        "contextmenu",
        function (a) {
            a.preventDefault();
        },
        false
    );
    this.domElement.addEventListener(
        "mousemove",
        c(this, this.onMouseMove),
        false
    );
    this.domElement.addEventListener(
        "mousedown",
        c(this, this.onMouseDown),
        false
    );
    this.domElement.addEventListener("mouseup", c(this, this.onMouseUp), false);
    this.domElement.addEventListener("keydown", c(this, this.onKeyDown), false);
    this.domElement.addEventListener("keyup", c(this, this.onKeyUp), false);
    this.handleResize();
};
THREE.PathControls = function (a, b) {
    function c(a) {
        return (a = a * 2) < 1 ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1);
    }
    function d(a, b) {
        return function () {
            b.apply(a, arguments);
        };
    }
    function f(a, b, c, d) {
        var e = { name: c, fps: 0.6, length: d, hierarchy: [] },
            f,
            g = b.getControlPointsArray(),
            h = b.getLength(),
            r = g.length,
            t = 0;
        f = r - 1;
        b = { parent: -1, keys: [] };
        b.keys[0] = { time: 0, pos: g[0], rot: [0, 0, 0, 1], scl: [1, 1, 1] };
        b.keys[f] = { time: d, pos: g[f], rot: [0, 0, 0, 1], scl: [1, 1, 1] };
        for (f = 1; f < r - 1; f++) {
            t = (d * h.chunks[f]) / h.total;
            b.keys[f] = { time: t, pos: g[f] };
        }
        e.hierarchy[0] = b;
        THREE.AnimationHandler.add(e);
        return new THREE.Animation(
            a,
            c,
            THREE.AnimationHandler.CATMULLROM_FORWARD,
            false
        );
    }
    function e(a, b) {
        var c,
            d,
            e = new THREE.Geometry();
        for (c = 0; c < a.points.length * b; c++) {
            d = c / (a.points.length * b);
            d = a.getPoint(d);
            e.vertices[c] = new THREE.Vector3(d.x, d.y, d.z);
        }
        return e;
    }
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    this.id = "PathControls" + THREE.PathControlsIdCounter++;
    this.duration = 1e4;
    this.waypoints = [];
    this.useConstantSpeed = true;
    this.resamplingCoef = 50;
    this.debugPath = new THREE.Object3D();
    this.debugDummy = new THREE.Object3D();
    this.animationParent = new THREE.Object3D();
    this.lookSpeed = 0.005;
    this.lookHorizontal = this.lookVertical = true;
    this.verticalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    };
    this.horizontalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI]
    };
    this.target = new THREE.Object3D();
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = 0;
    var g = Math.PI * 2,
        h = Math.PI / 180;
    this.viewHalfY = this.viewHalfX = 0;
    this.domElement !== document &&
        this.domElement.setAttribute("tabindex", -1);
    this.handleResize = function () {
        if (this.domElement === document) {
            this.viewHalfX = window.innerWidth / 2;
            this.viewHalfY = window.innerHeight / 2;
        } else {
            this.viewHalfX = this.domElement.offsetWidth / 2;
            this.viewHalfY = this.domElement.offsetHeight / 2;
        }
    };
    this.update = function (a) {
        var b;
        if (this.lookHorizontal)
            this.lon = this.lon + this.mouseX * this.lookSpeed * a;
        if (this.lookVertical)
            this.lat = this.lat - this.mouseY * this.lookSpeed * a;
        this.lon = Math.max(0, Math.min(360, this.lon));
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * h;
        this.theta = this.lon * h;
        a = this.phi % g;
        this.phi = a >= 0 ? a : a + g;
        b = this.verticalAngleMap.srcRange;
        a = this.verticalAngleMap.dstRange;
        b = THREE.Math.mapLinear(this.phi, b[0], b[1], a[0], a[1]);
        var d = a[1] - a[0];
        this.phi = c((b - a[0]) / d) * d + a[0];
        b = this.horizontalAngleMap.srcRange;
        a = this.horizontalAngleMap.dstRange;
        b = THREE.Math.mapLinear(this.theta, b[0], b[1], a[0], a[1]);
        d = a[1] - a[0];
        this.theta = c((b - a[0]) / d) * d + a[0];
        a = this.target.position;
        a.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
        a.y = 100 * Math.cos(this.phi);
        a.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.object.lookAt(this.target.position);
    };
    this.onMouseMove = function (a) {
        if (this.domElement === document) {
            this.mouseX = a.pageX - this.viewHalfX;
            this.mouseY = a.pageY - this.viewHalfY;
        } else {
            this.mouseX = a.pageX - this.domElement.offsetLeft - this.viewHalfX;
            this.mouseY = a.pageY - this.domElement.offsetTop - this.viewHalfY;
        }
    };
    this.init = function () {
        this.spline = new THREE.Spline();
        this.spline.initFromArray(this.waypoints);
        this.useConstantSpeed &&
            this.spline.reparametrizeByArcLength(this.resamplingCoef);
        if (this.createDebugDummy) {
            var a = new THREE.MeshLambertMaterial({ color: 30719 }),
                b = new THREE.MeshLambertMaterial({ color: 65280 }),
                c = new THREE.CubeGeometry(10, 10, 20),
                g = new THREE.CubeGeometry(2, 2, 10);
            this.animationParent = new THREE.Mesh(c, a);
            a = new THREE.Mesh(g, b);
            a.position.set(0, 10, 0);
            this.animation = f(
                this.animationParent,
                this.spline,
                this.id,
                this.duration
            );
            this.animationParent.add(this.object);
            this.animationParent.add(this.target);
            this.animationParent.add(a);
        } else {
            this.animation = f(
                this.animationParent,
                this.spline,
                this.id,
                this.duration
            );
            this.animationParent.add(this.target);
            this.animationParent.add(this.object);
        }
        if (this.createDebugPath) {
            var a = this.debugPath,
                b = this.spline,
                g = e(b, 10),
                c = e(b, 10),
                h = new THREE.LineBasicMaterial({
                    color: 16711680,
                    linewidth: 3
                }),
                g = new THREE.Line(g, h),
                c = new THREE.ParticleSystem(
                    c,
                    new THREE.ParticleBasicMaterial({
                        color: 16755200,
                        size: 3
                    })
                );
            g.scale.set(1, 1, 1);
            a.add(g);
            c.scale.set(1, 1, 1);
            a.add(c);
            for (
                var g = new THREE.SphereGeometry(1, 16, 8),
                    h = new THREE.MeshBasicMaterial({ color: 65280 }),
                    q = 0;
                q < b.points.length;
                q++
            ) {
                c = new THREE.Mesh(g, h);
                c.position.copy(b.points[q]);
                a.add(c);
            }
        }
        this.domElement.addEventListener(
            "mousemove",
            d(this, this.onMouseMove),
            false
        );
    };
    this.handleResize();
};
THREE.PathControlsIdCounter = 0;
THREE.FlyControls = function (a, b) {
    function c(a, b) {
        return function () {
            b.apply(a, arguments);
        };
    }
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    b && this.domElement.setAttribute("tabindex", -1);
    this.movementSpeed = 1;
    this.rollSpeed = 0.005;
    this.autoForward = this.dragToLook = false;
    this.object.useQuaternion = true;
    this.tmpQuaternion = new THREE.Quaternion();
    this.mouseStatus = 0;
    this.moveState = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        forward: 0,
        back: 0,
        pitchUp: 0,
        pitchDown: 0,
        yawLeft: 0,
        yawRight: 0,
        rollLeft: 0,
        rollRight: 0
    };
    this.moveVector = new THREE.Vector3(0, 0, 0);
    this.rotationVector = new THREE.Vector3(0, 0, 0);
    this.handleEvent = function (a) {
        if (typeof this[a.type] == "function") this[a.type](a);
    };
    this.keydown = function (a) {
        if (!a.altKey) {
            switch (a.keyCode) {
                case 16:
                    this.movementSpeedMultiplier = 0.1;
                    break;
                case 87:
                    this.moveState.forward = 1;
                    break;
                case 83:
                    this.moveState.back = 1;
                    break;
                case 65:
                    this.moveState.left = 1;
                    break;
                case 68:
                    this.moveState.right = 1;
                    break;
                case 82:
                    this.moveState.up = 1;
                    break;
                case 70:
                    this.moveState.down = 1;
                    break;
                case 38:
                    this.moveState.pitchUp = 1;
                    break;
                case 40:
                    this.moveState.pitchDown = 1;
                    break;
                case 37:
                    this.moveState.yawLeft = 1;
                    break;
                case 39:
                    this.moveState.yawRight = 1;
                    break;
                case 81:
                    this.moveState.rollLeft = 1;
                    break;
                case 69:
                    this.moveState.rollRight = 1;
            }
            this.updateMovementVector();
            this.updateRotationVector();
        }
    };
    this.keyup = function (a) {
        switch (a.keyCode) {
            case 16:
                this.movementSpeedMultiplier = 1;
                break;
            case 87:
                this.moveState.forward = 0;
                break;
            case 83:
                this.moveState.back = 0;
                break;
            case 65:
                this.moveState.left = 0;
                break;
            case 68:
                this.moveState.right = 0;
                break;
            case 82:
                this.moveState.up = 0;
                break;
            case 70:
                this.moveState.down = 0;
                break;
            case 38:
                this.moveState.pitchUp = 0;
                break;
            case 40:
                this.moveState.pitchDown = 0;
                break;
            case 37:
                this.moveState.yawLeft = 0;
                break;
            case 39:
                this.moveState.yawRight = 0;
                break;
            case 81:
                this.moveState.rollLeft = 0;
                break;
            case 69:
                this.moveState.rollRight = 0;
        }
        this.updateMovementVector();
        this.updateRotationVector();
    };
    this.mousedown = function (a) {
        this.domElement !== document && this.domElement.focus();
        a.preventDefault();
        a.stopPropagation();
        if (this.dragToLook) this.mouseStatus++;
        else
            switch (a.button) {
                case 0:
                    this.object.moveForward = true;
                    break;
                case 2:
                    this.object.moveBackward = true;
            }
    };
    this.mousemove = function (a) {
        if (!this.dragToLook || this.mouseStatus > 0) {
            var b = this.getContainerDimensions(),
                c = b.size[0] / 2,
                g = b.size[1] / 2;
            this.moveState.yawLeft = -(a.pageX - b.offset[0] - c) / c;
            this.moveState.pitchDown = (a.pageY - b.offset[1] - g) / g;
            this.updateRotationVector();
        }
    };
    this.mouseup = function (a) {
        a.preventDefault();
        a.stopPropagation();
        if (this.dragToLook) {
            this.mouseStatus--;
            this.moveState.yawLeft = this.moveState.pitchDown = 0;
        } else
            switch (a.button) {
                case 0:
                    this.moveForward = false;
                    break;
                case 2:
                    this.moveBackward = false;
            }
        this.updateRotationVector();
    };
    this.update = function (a) {
        var b = a * this.movementSpeed,
            a = a * this.rollSpeed;
        this.object.translateX(this.moveVector.x * b);
        this.object.translateY(this.moveVector.y * b);
        this.object.translateZ(this.moveVector.z * b);
        this.tmpQuaternion
            .set(
                this.rotationVector.x * a,
                this.rotationVector.y * a,
                this.rotationVector.z * a,
                1
            )
            .normalize();
        this.object.quaternion.multiplySelf(this.tmpQuaternion);
        this.object.matrix.setPosition(this.object.position);
        this.object.matrix.setRotationFromQuaternion(this.object.quaternion);
        this.object.matrixWorldNeedsUpdate = true;
    };
    this.updateMovementVector = function () {
        var a =
            this.moveState.forward || (this.autoForward && !this.moveState.back)
                ? 1
                : 0;
        this.moveVector.x = -this.moveState.left + this.moveState.right;
        this.moveVector.y = -this.moveState.down + this.moveState.up;
        this.moveVector.z = -a + this.moveState.back;
    };
    this.updateRotationVector = function () {
        this.rotationVector.x =
            -this.moveState.pitchDown + this.moveState.pitchUp;
        this.rotationVector.y =
            -this.moveState.yawRight + this.moveState.yawLeft;
        this.rotationVector.z =
            -this.moveState.rollRight + this.moveState.rollLeft;
    };
    this.getContainerDimensions = function () {
        return this.domElement != document
            ? {
                    size: [
                        this.domElement.offsetWidth,
                        this.domElement.offsetHeight
                    ],
                    offset: [
                        this.domElement.offsetLeft,
                        this.domElement.offsetTop
                    ]
                }
            : { size: [window.innerWidth, window.innerHeight], offset: [0, 0] };
    };
    this.domElement.addEventListener(
        "mousemove",
        c(this, this.mousemove),
        false
    );
    this.domElement.addEventListener(
        "mousedown",
        c(this, this.mousedown),
        false
    );
    this.domElement.addEventListener("mouseup", c(this, this.mouseup), false);
    this.domElement.addEventListener("keydown", c(this, this.keydown), false);
    this.domElement.addEventListener("keyup", c(this, this.keyup), false);
    this.updateMovementVector();
    this.updateRotationVector();
};
THREE.RollControls = function (a, b) {
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    this.mouseLook = true;
    this.autoForward = false;
    this.rollSpeed = this.movementSpeed = this.lookSpeed = 1;
    this.constrainVertical = [-0.9, 0.9];
    this.object.matrixAutoUpdate = false;
    this.forward = new THREE.Vector3(0, 0, 1);
    this.roll = 0;
    var c = new THREE.Vector3(),
        d = new THREE.Vector3(),
        f = new THREE.Vector3(),
        e = new THREE.Matrix4(),
        g = false,
        h = 1,
        i = 0,
        j = 0,
        l = 0,
        n = 0,
        m = 0,
        q = 0,
        p = 0;
    this.handleResize = function () {
        q = window.innerWidth / 2;
        p = window.innerHeight / 2;
    };
    this.update = function (a) {
        if (this.mouseLook) {
            var b = a * this.lookSpeed;
            this.rotateHorizontally(b * n);
            this.rotateVertically(b * m);
        }
        b = a * this.movementSpeed;
        this.object.translateZ(
            -b * (i > 0 || (this.autoForward && !(i < 0)) ? 1 : i)
        );
        this.object.translateX(b * j);
        this.object.translateY(b * l);
        if (g) this.roll = this.roll + this.rollSpeed * a * h;
        if (this.forward.y > this.constrainVertical[1]) {
            this.forward.y = this.constrainVertical[1];
            this.forward.normalize();
        } else if (this.forward.y < this.constrainVertical[0]) {
            this.forward.y = this.constrainVertical[0];
            this.forward.normalize();
        }
        f.copy(this.forward);
        d.set(0, 1, 0);
        c.cross(d, f).normalize();
        d.cross(f, c).normalize();
        this.object.matrix.elements[0] = c.x;
        this.object.matrix.elements[4] = d.x;
        this.object.matrix.elements[8] = f.x;
        this.object.matrix.elements[1] = c.y;
        this.object.matrix.elements[5] = d.y;
        this.object.matrix.elements[9] = f.y;
        this.object.matrix.elements[2] = c.z;
        this.object.matrix.elements[6] = d.z;
        this.object.matrix.elements[10] = f.z;
        e.identity();
        e.elements[0] = Math.cos(this.roll);
        e.elements[4] = -Math.sin(this.roll);
        e.elements[1] = Math.sin(this.roll);
        e.elements[5] = Math.cos(this.roll);
        this.object.matrix.multiplySelf(e);
        this.object.matrixWorldNeedsUpdate = true;
        this.object.matrix.elements[12] = this.object.position.x;
        this.object.matrix.elements[13] = this.object.position.y;
        this.object.matrix.elements[14] = this.object.position.z;
    };
    this.translateX = function (a) {
        this.object.position.x =
            this.object.position.x + this.object.matrix.elements[0] * a;
        this.object.position.y =
            this.object.position.y + this.object.matrix.elements[1] * a;
        this.object.position.z =
            this.object.position.z + this.object.matrix.elements[2] * a;
    };
    this.translateY = function (a) {
        this.object.position.x =
            this.object.position.x + this.object.matrix.elements[4] * a;
        this.object.position.y =
            this.object.position.y + this.object.matrix.elements[5] * a;
        this.object.position.z =
            this.object.position.z + this.object.matrix.elements[6] * a;
    };
    this.translateZ = function (a) {
        this.object.position.x =
            this.object.position.x - this.object.matrix.elements[8] * a;
        this.object.position.y =
            this.object.position.y - this.object.matrix.elements[9] * a;
        this.object.position.z =
            this.object.position.z - this.object.matrix.elements[10] * a;
    };
    this.rotateHorizontally = function (a) {
        c.set(
            this.object.matrix.elements[0],
            this.object.matrix.elements[1],
            this.object.matrix.elements[2]
        );
        c.multiplyScalar(a);
        this.forward.subSelf(c);
        this.forward.normalize();
    };
    this.rotateVertically = function (a) {
        d.set(
            this.object.matrix.elements[4],
            this.object.matrix.elements[5],
            this.object.matrix.elements[6]
        );
        d.multiplyScalar(a);
        this.forward.addSelf(d);
        this.forward.normalize();
    };
    this.domElement.addEventListener(
        "contextmenu",
        function (a) {
            a.preventDefault();
        },
        false
    );
    this.domElement.addEventListener(
        "mousemove",
        function (a) {
            n = (a.clientX - q) / window.innerWidth;
            m = (a.clientY - p) / window.innerHeight;
        },
        false
    );
    this.domElement.addEventListener(
        "mousedown",
        function (a) {
            a.preventDefault();
            a.stopPropagation();
            switch (a.button) {
                case 0:
                    i = 1;
                    break;
                case 2:
                    i = -1;
            }
        },
        false
    );
    this.domElement.addEventListener(
        "mouseup",
        function (a) {
            a.preventDefault();
            a.stopPropagation();
            switch (a.button) {
                case 0:
                    i = 0;
                    break;
                case 2:
                    i = 0;
            }
        },
        false
    );
    this.domElement.addEventListener(
        "keydown",
        function (a) {
            switch (a.keyCode) {
                case 38:
                case 87:
                    i = 1;
                    break;
                case 37:
                case 65:
                    j = -1;
                    break;
                case 40:
                case 83:
                    i = -1;
                    break;
                case 39:
                case 68:
                    j = 1;
                    break;
                case 81:
                    g = true;
                    h = 1;
                    break;
                case 69:
                    g = true;
                    h = -1;
                    break;
                case 82:
                    l = 1;
                    break;
                case 70:
                    l = -1;
            }
        },
        false
    );
    this.domElement.addEventListener(
        "keyup",
        function (a) {
            switch (a.keyCode) {
                case 38:
                case 87:
                    i = 0;
                    break;
                case 37:
                case 65:
                    j = 0;
                    break;
                case 40:
                case 83:
                    i = 0;
                    break;
                case 39:
                case 68:
                    j = 0;
                    break;
                case 81:
                    g = false;
                    break;
                case 69:
                    g = false;
                    break;
                case 82:
                    l = 0;
                    break;
                case 70:
                    l = 0;
            }
        },
        false
    );
    this.handleResize();
};
THREE.TrackballControls = function (a, b) {
    function c(a) {
        if (d.enabled) {
            a.preventDefault();
            a.stopPropagation();
            var b = 0;
            a.wheelDelta
                ? (b = a.wheelDelta / 40)
                : a.detail && (b = -a.detail / 3);
            l.y = l.y + (1 / b) * 0.05;
        }
    }
    THREE.EventTarget.call(this);
    var d = this;
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    this.enabled = true;
    this.screen = { width: 0, height: 0, offsetLeft: 0, offsetTop: 0 };
    this.radius = (this.screen.width + this.screen.height) / 4;
    this.rotateSpeed = 1;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;
    this.staticMoving = this.noPan = this.noZoom = this.noRotate = false;
    this.dynamicDampingFactor = 0.2;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.keys = [65, 83, 68];
    this.target = new THREE.Vector3();
    var f = new THREE.Vector3(),
        e = false,
        g = -1,
        h = new THREE.Vector3(),
        i = new THREE.Vector3(),
        j = new THREE.Vector3(),
        l = new THREE.Vector2(),
        n = new THREE.Vector2(),
        m = new THREE.Vector2(),
        q = new THREE.Vector2(),
        p = { type: "change" };
    this.handleResize = function () {
        this.screen.width = window.innerWidth;
        this.screen.height = window.innerHeight;
        this.screen.offsetLeft = 0;
        this.screen.offsetTop = 0;
        this.radius = (this.screen.width + this.screen.height) / 4;
    };
    this.handleEvent = function (a) {
        if (typeof this[a.type] == "function") this[a.type](a);
    };
    this.getMouseOnScreen = function (a, b) {
        return new THREE.Vector2(
            ((a - d.screen.offsetLeft) / d.radius) * 0.5,
            ((b - d.screen.offsetTop) / d.radius) * 0.5
        );
    };
    this.getMouseProjectionOnBall = function (a, b) {
        var c = new THREE.Vector3(
                (a - d.screen.width * 0.5 - d.screen.offsetLeft) / d.radius,
                (d.screen.height * 0.5 + d.screen.offsetTop - b) / d.radius,
                0
            ),
            e = c.length();
        e > 1 ? c.normalize() : (c.z = Math.sqrt(1 - e * e));
        h.copy(d.object.position).subSelf(d.target);
        e = d.object.up.clone().setLength(c.y);
        e.addSelf(d.object.up.clone().crossSelf(h).setLength(c.x));
        e.addSelf(h.setLength(c.z));
        return e;
    };
    this.rotateCamera = function () {
        var a = Math.acos(i.dot(j) / i.length() / j.length());
        if (a) {
            var b = new THREE.Vector3().cross(i, j).normalize(),
                c = new THREE.Quaternion(),
                a = a * d.rotateSpeed;
            c.setFromAxisAngle(b, -a);
            c.multiplyVector3(h);
            c.multiplyVector3(d.object.up);
            c.multiplyVector3(j);
            if (d.staticMoving) i.copy(j);
            else {
                c.setFromAxisAngle(b, a * (d.dynamicDampingFactor - 1));
                c.multiplyVector3(i);
            }
        }
    };
    this.zoomCamera = function () {
        var a = 1 + (n.y - l.y) * d.zoomSpeed;
        if (a !== 1 && a > 0) {
            h.multiplyScalar(a);
            d.staticMoving
                ? l.copy(n)
                : (l.y = l.y + (n.y - l.y) * this.dynamicDampingFactor);
        }
    };
    this.panCamera = function () {
        var a = q.clone().subSelf(m);
        if (a.lengthSq()) {
            a.multiplyScalar(h.length() * d.panSpeed);
            var b = h.clone().crossSelf(d.object.up).setLength(a.x);
            b.addSelf(d.object.up.clone().setLength(a.y));
            d.object.position.addSelf(b);
            d.target.addSelf(b);
            d.staticMoving
                ? (m = q)
                : m.addSelf(a.sub(q, m).multiplyScalar(d.dynamicDampingFactor));
        }
    };
    this.checkDistances = function () {
        if (!d.noZoom || !d.noPan) {
            d.object.position.lengthSq() > d.maxDistance * d.maxDistance &&
                d.object.position.setLength(d.maxDistance);
            h.lengthSq() < d.minDistance * d.minDistance &&
                d.object.position.add(d.target, h.setLength(d.minDistance));
        }
    };
    this.update = function () {
        h.copy(d.object.position).subSelf(d.target);
        d.noRotate || d.rotateCamera();
        d.noZoom || d.zoomCamera();
        d.noPan || d.panCamera();
        d.object.position.add(d.target, h);
        d.checkDistances();
        d.object.lookAt(d.target);
        if (f.distanceToSquared(d.object.position) > 0) {
            d.dispatchEvent(p);
            f.copy(d.object.position);
        }
    };
    this.domElement.addEventListener(
        "contextmenu",
        function (a) {
            a.preventDefault();
        },
        false
    );
    this.domElement.addEventListener(
        "mousemove",
        function (a) {
            if (d.enabled) {
                if (e) {
                    i = j = d.getMouseProjectionOnBall(a.clientX, a.clientY);
                    l = n = d.getMouseOnScreen(a.clientX, a.clientY);
                    m = q = d.getMouseOnScreen(a.clientX, a.clientY);
                    e = false;
                }
                g !== -1 &&
                    (g === 0 && !d.noRotate
                        ? (j = d.getMouseProjectionOnBall(a.clientX, a.clientY))
                        : g === 1 && !d.noZoom
                            ? (n = d.getMouseOnScreen(a.clientX, a.clientY))
                            : g === 2 &&
                                !d.noPan &&
                                (q = d.getMouseOnScreen(a.clientX, a.clientY)));
            }
        },
        false
    );
    this.domElement.addEventListener(
        "mousedown",
        function (a) {
            if (d.enabled) {
                a.preventDefault();
                a.stopPropagation();
                if (g === -1) {
                    g = a.button;
                    g === 0 && !d.noRotate
                        ? (i = j =
                                d.getMouseProjectionOnBall(
                                    a.clientX,
                                    a.clientY
                                ))
                        : g === 1 && !d.noZoom
                            ? (l = n = d.getMouseOnScreen(a.clientX, a.clientY))
                            : this.noPan ||
                                (m = q =
                                    d.getMouseOnScreen(a.clientX, a.clientY));
                }
            }
        },
        false
    );
    this.domElement.addEventListener(
        "mouseup",
        function (a) {
            if (d.enabled) {
                a.preventDefault();
                a.stopPropagation();
                g = -1;
            }
        },
        false
    );
    this.domElement.addEventListener("DOMMouseScroll", c, false);
    this.domElement.addEventListener("mousewheel", c, false);
    window.addEventListener(
        "keydown",
        function (a) {
            if (d.enabled && g === -1) {
                a.keyCode === d.keys[0] && !d.noRotate
                    ? (g = 0)
                    : a.keyCode === d.keys[1] && !d.noZoom
                        ? (g = 1)
                        : a.keyCode === d.keys[2] && !d.noPan && (g = 2);
                g !== -1 && (e = true);
            }
        },
        false
    );
    window.addEventListener(
        "keyup",
        function () {
            d.enabled && g !== -1 && (g = -1);
        },
        false
    );
    this.handleResize();
};
THREE.OrbitControls = function (a, b) {
    function c() {
        return ((2 * Math.PI) / 60 / 60) * e.autoRotateSpeed;
    }
    function d(a) {
        a.preventDefault();
        if (u === t.ROTATE) {
            i.set(a.clientX, a.clientY);
            j.sub(i, h);
            e.rotateLeft(((2 * Math.PI * j.x) / g) * e.userRotateSpeed);
            e.rotateUp(((2 * Math.PI * j.y) / g) * e.userRotateSpeed);
            h.copy(i);
        } else if (u === t.ZOOM) {
            n.set(a.clientX, a.clientY);
            m.sub(n, l);
            m.y > 0 ? e.zoomIn() : e.zoomOut();
            l.copy(n);
        }
    }
    function f() {
        if (e.userRotate) {
            document.removeEventListener("mousemove", d, false);
            document.removeEventListener("mouseup", f, false);
            u = t.NONE;
        }
    }
    THREE.EventTarget.call(this);
    this.object = a;
    this.domElement = b !== void 0 ? b : document;
    this.center = new THREE.Vector3();
    this.userZoom = true;
    this.userZoomSpeed = 1;
    this.userRotate = true;
    this.userRotateSpeed = 1;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    var e = this,
        g = 1800,
        h = new THREE.Vector2(),
        i = new THREE.Vector2(),
        j = new THREE.Vector2(),
        l = new THREE.Vector2(),
        n = new THREE.Vector2(),
        m = new THREE.Vector2(),
        q = 0,
        p = 0,
        o = 1,
        r = new THREE.Vector3(),
        t = { NONE: -1, ROTATE: 0, ZOOM: 1 },
        u = t.NONE,
        w = { type: "change" };
    this.rotateLeft = function (a) {
        a === void 0 && (a = c());
        p = p - a;
    };
    this.rotateRight = function (a) {
        a === void 0 && (a = c());
        p = p + a;
    };
    this.rotateUp = function (a) {
        a === void 0 && (a = c());
        q = q - a;
    };
    this.rotateDown = function (a) {
        a === void 0 && (a = c());
        q = q + a;
    };
    this.zoomIn = function (a) {
        a === void 0 && (a = Math.pow(0.95, e.userZoomSpeed));
        o = o / a;
    };
    this.zoomOut = function (a) {
        a === void 0 && (a = Math.pow(0.95, e.userZoomSpeed));
        o = o * a;
    };
    this.update = function () {
        var a = this.object.position,
            b = a.clone().subSelf(this.center),
            d = Math.atan2(b.x, b.z),
            e = Math.atan2(Math.sqrt(b.x * b.x + b.z * b.z), b.y);
        this.autoRotate && this.rotateLeft(c());
        var d = d + p,
            e = e + q,
            e = Math.max(1e-6, Math.min(Math.PI - 1e-6, e)),
            f = b.length();
        b.x = f * Math.sin(e) * Math.sin(d);
        b.y = f * Math.cos(e);
        b.z = f * Math.sin(e) * Math.cos(d);
        b.multiplyScalar(o);
        a.copy(this.center).addSelf(b);
        this.object.lookAt(this.center);
        q = p = 0;
        o = 1;
        if (r.distanceTo(this.object.position) > 0) {
            this.dispatchEvent(w);
            r.copy(this.object.position);
        }
    };
    this.domElement.addEventListener(
        "contextmenu",
        function (a) {
            a.preventDefault();
        },
        false
    );
    this.domElement.addEventListener(
        "mousedown",
        function (a) {
            if (e.userRotate) {
                a.preventDefault();
                if (a.button === 0 || a.button === 2) {
                    u = t.ROTATE;
                    h.set(a.clientX, a.clientY);
                } else if (a.button === 1) {
                    u = t.ZOOM;
                    l.set(a.clientX, a.clientY);
                }
                document.addEventListener("mousemove", d, false);
                document.addEventListener("mouseup", f, false);
            }
        },
        false
    );
    this.domElement.addEventListener(
        "mousewheel",
        function (a) {
            e.userZoom && (a.wheelDelta > 0 ? e.zoomOut() : e.zoomIn());
        },
        false
    );
};
THREE.CircleGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this);
    var a = a || 50,
        c = c !== void 0 ? c : 0,
        d = d !== void 0 ? d : Math.PI * 2,
        b = b !== void 0 ? Math.max(3, b) : 8,
        f,
        e = [];
    f = new THREE.Vector3();
    var g = new THREE.UV(0.5, 0.5);
    this.vertices.push(f);
    e.push(g);
    for (f = 0; f <= b; f++) {
        var h = new THREE.Vector3();
        h.x = a * Math.cos(c + (f / b) * d);
        h.y = a * Math.sin(c + (f / b) * d);
        this.vertices.push(h);
        e.push(new THREE.UV((h.x / a + 1) / 2, -(h.y / a + 1) / 2 + 1));
    }
    c = new THREE.Vector3(0, 0, -1);
    for (f = 1; f <= b; f++) {
        this.faces.push(new THREE.Face3(f, f + 1, 0, [c, c, c]));
        this.faceVertexUvs[0].push([e[f], e[f + 1], g]);
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.boundingSphere = { radius: a };
};
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CubeGeometry = function (a, b, c, d, f, e, g, h) {
    function i(a, b, c, g, h, i, l, m) {
        var n,
            o = d || 1,
            p = f || 1,
            q = h / 2,
            r = i / 2,
            t = j.vertices.length;
        if ((a === "x" && b === "y") || (a === "y" && b === "x")) n = "z";
        else if ((a === "x" && b === "z") || (a === "z" && b === "x")) {
            n = "y";
            p = e || 1;
        } else if ((a === "z" && b === "y") || (a === "y" && b === "z")) {
            n = "x";
            o = e || 1;
        }
        var u = o + 1,
            w = p + 1,
            Y = h / o,
            $ = i / p,
            L = new THREE.Vector3();
        L[n] = l > 0 ? 1 : -1;
        for (h = 0; h < w; h++)
            for (i = 0; i < u; i++) {
                var ba = new THREE.Vector3();
                ba[a] = (i * Y - q) * c;
                ba[b] = (h * $ - r) * g;
                ba[n] = l;
                j.vertices.push(ba);
            }
        for (h = 0; h < p; h++)
            for (i = 0; i < o; i++) {
                a = new THREE.Face4(
                    i + u * h + t,
                    i + u * (h + 1) + t,
                    i + 1 + u * (h + 1) + t,
                    i + 1 + u * h + t
                );
                a.normal.copy(L);
                a.vertexNormals.push(
                    L.clone(),
                    L.clone(),
                    L.clone(),
                    L.clone()
                );
                a.materialIndex = m;
                j.faces.push(a);
                j.faceVertexUvs[0].push([
                    new THREE.UV(i / o, 1 - h / p),
                    new THREE.UV(i / o, 1 - (h + 1) / p),
                    new THREE.UV((i + 1) / o, 1 - (h + 1) / p),
                    new THREE.UV((i + 1) / o, 1 - h / p)
                ]);
            }
    }
    THREE.Geometry.call(this);
    var j = this,
        l = a / 2,
        n = b / 2,
        m = c / 2,
        q,
        p,
        o,
        r,
        t,
        u;
    if (g !== void 0) {
        if (g instanceof Array) this.materials = g;
        else {
            this.materials = [];
            for (q = 0; q < 6; q++) this.materials.push(g);
        }
        q = 0;
        r = 1;
        p = 2;
        t = 3;
        o = 4;
        u = 5;
    } else this.materials = [];
    this.sides = { px: true, nx: true, py: true, ny: true, pz: true, nz: true };
    if (h != void 0)
        for (var w in h) this.sides[w] !== void 0 && (this.sides[w] = h[w]);
    this.sides.px && i("z", "y", -1, -1, c, b, l, q);
    this.sides.nx && i("z", "y", 1, -1, c, b, -l, r);
    this.sides.py && i("x", "z", 1, 1, a, c, n, p);
    this.sides.ny && i("x", "z", 1, -1, a, c, -n, t);
    this.sides.pz && i("x", "y", 1, -1, a, b, m, o);
    this.sides.nz && i("x", "y", -1, -1, a, b, -m, u);
    this.computeCentroids();
    this.mergeVertices();
};
THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.CylinderGeometry = function (a, b, c, d, f, e) {
    THREE.Geometry.call(this);
    var a = a !== void 0 ? a : 20,
        b = b !== void 0 ? b : 20,
        c = c !== void 0 ? c : 100,
        g = c / 2,
        d = d || 8,
        f = f || 1,
        h,
        i,
        j = [],
        l = [];
    for (i = 0; i <= f; i++) {
        var n = [],
            m = [],
            q = i / f,
            p = q * (b - a) + a;
        for (h = 0; h <= d; h++) {
            var o = h / d,
                r = new THREE.Vector3();
            r.x = p * Math.sin(o * Math.PI * 2);
            r.y = -q * c + g;
            r.z = p * Math.cos(o * Math.PI * 2);
            this.vertices.push(r);
            n.push(this.vertices.length - 1);
            m.push(new THREE.UV(o, 1 - q));
        }
        j.push(n);
        l.push(m);
    }
    c = (b - a) / c;
    for (h = 0; h < d; h++) {
        if (a !== 0) {
            n = this.vertices[j[0][h]].clone();
            m = this.vertices[j[0][h + 1]].clone();
        } else {
            n = this.vertices[j[1][h]].clone();
            m = this.vertices[j[1][h + 1]].clone();
        }
        n.setY(Math.sqrt(n.x * n.x + n.z * n.z) * c).normalize();
        m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize();
        for (i = 0; i < f; i++) {
            var q = j[i][h],
                p = j[i + 1][h],
                o = j[i + 1][h + 1],
                r = j[i][h + 1],
                t = n.clone(),
                u = n.clone(),
                w = m.clone(),
                s = m.clone(),
                B = l[i][h].clone(),
                v = l[i + 1][h].clone(),
                A = l[i + 1][h + 1].clone(),
                E = l[i][h + 1].clone();
            this.faces.push(new THREE.Face4(q, p, o, r, [t, u, w, s]));
            this.faceVertexUvs[0].push([B, v, A, E]);
        }
    }
    if (!e && a > 0) {
        this.vertices.push(new THREE.Vector3(0, g, 0));
        for (h = 0; h < d; h++) {
            q = j[0][h];
            p = j[0][h + 1];
            o = this.vertices.length - 1;
            t = new THREE.Vector3(0, 1, 0);
            u = new THREE.Vector3(0, 1, 0);
            w = new THREE.Vector3(0, 1, 0);
            B = l[0][h].clone();
            v = l[0][h + 1].clone();
            A = new THREE.UV(v.u, 0);
            this.faces.push(new THREE.Face3(q, p, o, [t, u, w]));
            this.faceVertexUvs[0].push([B, v, A]);
        }
    }
    if (!e && b > 0) {
        this.vertices.push(new THREE.Vector3(0, -g, 0));
        for (h = 0; h < d; h++) {
            q = j[i][h + 1];
            p = j[i][h];
            o = this.vertices.length - 1;
            t = new THREE.Vector3(0, -1, 0);
            u = new THREE.Vector3(0, -1, 0);
            w = new THREE.Vector3(0, -1, 0);
            B = l[i][h + 1].clone();
            v = l[i][h].clone();
            A = new THREE.UV(v.u, 1);
            this.faces.push(new THREE.Face3(q, p, o, [t, u, w]));
            this.faceVertexUvs[0].push([B, v, A]);
        }
    }
    this.computeCentroids();
    this.computeFaceNormals();
};
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry = function (a, b) {
    if (typeof a !== "undefined") {
        THREE.Geometry.call(this);
        a = a instanceof Array ? a : [a];
        this.shapebb = a[a.length - 1].getBoundingBox();
        this.addShapeList(a, b);
        this.computeCentroids();
        this.computeFaceNormals();
    }
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ExtrudeGeometry.prototype.addShapeList = function (a, b) {
    for (var c = a.length, d = 0; d < c; d++) this.addShape(a[d], b);
};
THREE.ExtrudeGeometry.prototype.addShape = function (a, b) {
    function c(a, b, c) {
        b || console.log("die");
        return b.clone().multiplyScalar(c).addSelf(a);
    }
    function d(a, b, c) {
        var d = THREE.ExtrudeGeometry.__v1,
            e = THREE.ExtrudeGeometry.__v2,
            f = THREE.ExtrudeGeometry.__v3,
            g = THREE.ExtrudeGeometry.__v4,
            h = THREE.ExtrudeGeometry.__v5,
            i = THREE.ExtrudeGeometry.__v6;
        d.set(a.x - b.x, a.y - b.y);
        e.set(a.x - c.x, a.y - c.y);
        d = d.normalize();
        e = e.normalize();
        f.set(-d.y, d.x);
        g.set(e.y, -e.x);
        h.copy(a).addSelf(f);
        i.copy(a).addSelf(g);
        if (h.equals(i)) return g.clone();
        h.copy(b).addSelf(f);
        i.copy(c).addSelf(g);
        f = d.dot(g);
        g = i.subSelf(h).dot(g);
        if (f === 0) {
            console.log("Either infinite or no solutions!");
            g === 0
                ? console.log("Its finite solutions.")
                : console.log("Too bad, no solutions.");
        }
        g = g / f;
        if (g < 0) {
            b = Math.atan2(b.y - a.y, b.x - a.x);
            a = Math.atan2(c.y - a.y, c.x - a.x);
            b > a && (a = a + Math.PI * 2);
            c = (b + a) / 2;
            a = -Math.cos(c);
            c = -Math.sin(c);
            return new THREE.Vector2(a, c);
        }
        return d.multiplyScalar(g).addSelf(h).subSelf(a).clone();
    }
    function f(c, d) {
        var e, f;
        for (L = c.length; --L >= 0; ) {
            e = L;
            f = L - 1;
            f < 0 && (f = c.length - 1);
            for (var g = 0, h = m + l * 2, g = 0; g < h; g++) {
                var i = V * g,
                    j = V * (g + 1),
                    n = d + e + i,
                    i = d + f + i,
                    o = d + f + j,
                    j = d + e + j,
                    p = c,
                    q = g,
                    r = h,
                    s = e,
                    v = f,
                    n = n + D,
                    i = i + D,
                    o = o + D,
                    j = j + D;
                M.faces.push(new THREE.Face4(n, i, o, j, null, null, t));
                n = u.generateSideWallUV(M, a, p, b, n, i, o, j, q, r, s, v);
                M.faceVertexUvs[0].push(n);
            }
        }
    }
    function e(a, b, c) {
        M.vertices.push(new THREE.Vector3(a, b, c));
    }
    function g(c, d, e, f) {
        c = c + D;
        d = d + D;
        e = e + D;
        M.faces.push(new THREE.Face3(c, d, e, null, null, r));
        c = f
            ? u.generateBottomUV(M, a, b, c, d, e)
            : u.generateTopUV(M, a, b, c, d, e);
        M.faceVertexUvs[0].push(c);
    }
    var h = b.amount !== void 0 ? b.amount : 100,
        i = b.bevelThickness !== void 0 ? b.bevelThickness : 6,
        j = b.bevelSize !== void 0 ? b.bevelSize : i - 2,
        l = b.bevelSegments !== void 0 ? b.bevelSegments : 3,
        n = b.bevelEnabled !== void 0 ? b.bevelEnabled : true,
        m = b.steps !== void 0 ? b.steps : 1,
        q = b.extrudePath,
        p,
        o = false,
        r = b.material,
        t = b.extrudeMaterial,
        u =
            b.UVGenerator !== void 0
                ? b.UVGenerator
                : THREE.ExtrudeGeometry.WorldUVGenerator,
        w,
        s,
        B,
        v;
    if (q) {
        p = q.getSpacedPoints(m);
        o = true;
        n = false;
        w =
            b.frames !== void 0
                ? b.frames
                : new THREE.TubeGeometry.FrenetFrames(q, m, false);
        s = new THREE.Vector3();
        B = new THREE.Vector3();
        v = new THREE.Vector3();
    }
    if (!n) j = i = l = 0;
    var A,
        E,
        z,
        M = this,
        D = this.vertices.length,
        q = a.extractPoints(),
        G = q.shape,
        q = q.holes,
        H = !THREE.Shape.Utils.isClockWise(G);
    if (H) {
        G = G.reverse();
        E = 0;
        for (z = q.length; E < z; E++) {
            A = q[E];
            THREE.Shape.Utils.isClockWise(A) && (q[E] = A.reverse());
        }
        H = false;
    }
    var O = THREE.Shape.Utils.triangulateShape(G, q),
        H = G;
    E = 0;
    for (z = q.length; E < z; E++) {
        A = q[E];
        G = G.concat(A);
    }
    var F,
        J,
        I,
        K,
        V = G.length,
        Y = O.length,
        $ = [],
        L = 0,
        ba = H.length;
    F = ba - 1;
    for (J = L + 1; L < ba; L++, F++, J++) {
        F === ba && (F = 0);
        J === ba && (J = 0);
        $[L] = d(H[L], H[F], H[J]);
    }
    var Q = [],
        fa,
        ta = $.concat();
    E = 0;
    for (z = q.length; E < z; E++) {
        A = q[E];
        fa = [];
        L = 0;
        ba = A.length;
        F = ba - 1;
        for (J = L + 1; L < ba; L++, F++, J++) {
            F === ba && (F = 0);
            J === ba && (J = 0);
            fa[L] = d(A[L], A[F], A[J]);
        }
        Q.push(fa);
        ta = ta.concat(fa);
    }
    for (F = 0; F < l; F++) {
        A = F / l;
        I = i * (1 - A);
        J = j * Math.sin((A * Math.PI) / 2);
        L = 0;
        for (ba = H.length; L < ba; L++) {
            K = c(H[L], $[L], J);
            e(K.x, K.y, -I);
        }
        E = 0;
        for (z = q.length; E < z; E++) {
            A = q[E];
            fa = Q[E];
            L = 0;
            for (ba = A.length; L < ba; L++) {
                K = c(A[L], fa[L], J);
                e(K.x, K.y, -I);
            }
        }
    }
    J = j;
    for (L = 0; L < V; L++) {
        K = n ? c(G[L], ta[L], J) : G[L];
        if (o) {
            B.copy(w.normals[0]).multiplyScalar(K.x);
            s.copy(w.binormals[0]).multiplyScalar(K.y);
            v.copy(p[0]).addSelf(B).addSelf(s);
            e(v.x, v.y, v.z);
        } else e(K.x, K.y, 0);
    }
    for (A = 1; A <= m; A++)
        for (L = 0; L < V; L++) {
            K = n ? c(G[L], ta[L], J) : G[L];
            if (o) {
                B.copy(w.normals[A]).multiplyScalar(K.x);
                s.copy(w.binormals[A]).multiplyScalar(K.y);
                v.copy(p[A]).addSelf(B).addSelf(s);
                e(v.x, v.y, v.z);
            } else e(K.x, K.y, (h / m) * A);
        }
    for (F = l - 1; F >= 0; F--) {
        A = F / l;
        I = i * (1 - A);
        J = j * Math.sin((A * Math.PI) / 2);
        L = 0;
        for (ba = H.length; L < ba; L++) {
            K = c(H[L], $[L], J);
            e(K.x, K.y, h + I);
        }
        E = 0;
        for (z = q.length; E < z; E++) {
            A = q[E];
            fa = Q[E];
            L = 0;
            for (ba = A.length; L < ba; L++) {
                K = c(A[L], fa[L], J);
                o
                    ? e(K.x, K.y + p[m - 1].y, p[m - 1].x + I)
                    : e(K.x, K.y, h + I);
            }
        }
    }
    if (n) {
        i = V * 0;
        for (L = 0; L < Y; L++) {
            h = O[L];
            g(h[2] + i, h[1] + i, h[0] + i, true);
        }
        i = V * (m + l * 2);
        for (L = 0; L < Y; L++) {
            h = O[L];
            g(h[0] + i, h[1] + i, h[2] + i, false);
        }
    } else {
        for (L = 0; L < Y; L++) {
            h = O[L];
            g(h[2], h[1], h[0], true);
        }
        for (L = 0; L < Y; L++) {
            h = O[L];
            g(h[0] + V * m, h[1] + V * m, h[2] + V * m, false);
        }
    }
    h = 0;
    f(H, h);
    h = h + H.length;
    E = 0;
    for (z = q.length; E < z; E++) {
        A = q[E];
        f(A, h);
        h = h + A.length;
    }
};
THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function (a, b, c, d, f, e) {
        b = a.vertices[f].x;
        f = a.vertices[f].y;
        c = a.vertices[e].x;
        e = a.vertices[e].y;
        return [
            new THREE.UV(a.vertices[d].x, a.vertices[d].y),
            new THREE.UV(b, f),
            new THREE.UV(c, e)
        ];
    },
    generateBottomUV: function (a, b, c, d, f, e) {
        return this.generateTopUV(a, b, c, d, f, e);
    },
    generateSideWallUV: function (a, b, c, d, f, e, g, h) {
        var b = a.vertices[f].x,
            c = a.vertices[f].y,
            f = a.vertices[f].z,
            d = a.vertices[e].x,
            i = a.vertices[e].y,
            e = a.vertices[e].z,
            j = a.vertices[g].x,
            l = a.vertices[g].y,
            g = a.vertices[g].z,
            n = a.vertices[h].x,
            m = a.vertices[h].y,
            a = a.vertices[h].z;
        return Math.abs(c - i) < 0.01
            ? [
                    new THREE.UV(b, 1 - f),
                    new THREE.UV(d, 1 - e),
                    new THREE.UV(j, 1 - g),
                    new THREE.UV(n, 1 - a)
                ]
            : [
                    new THREE.UV(c, 1 - f),
                    new THREE.UV(i, 1 - e),
                    new THREE.UV(l, 1 - g),
                    new THREE.UV(m, 1 - a)
                ];
    }
};
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2();
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2();
THREE.ShapeGeometry = function (a, b) {
    THREE.Geometry.call(this);
    a instanceof Array === false && (a = [a]);
    this.shapebb = a[a.length - 1].getBoundingBox();
    this.addShapeList(a, b);
    this.computeCentroids();
    this.computeFaceNormals();
};
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ShapeGeometry.prototype.addShapeList = function (a, b) {
    for (var c = 0, d = a.length; c < d; c++) this.addShape(a[c], b);
    return this;
};
THREE.ShapeGeometry.prototype.addShape = function (a, b) {
    b === void 0 && (b = {});
    var c = b.material,
        d =
            b.UVGenerator === void 0
                ? THREE.ExtrudeGeometry.WorldUVGenerator
                : b.UVGenerator,
        f,
        e,
        g,
        h = this.vertices.length;
    f = a.extractPoints();
    var i = f.shape,
        j = f.holes;
    if (!THREE.Shape.Utils.isClockWise(i)) {
        i = i.reverse();
        f = 0;
        for (e = j.length; f < e; f++) {
            g = j[f];
            THREE.Shape.Utils.isClockWise(g) && (j[f] = g.reverse());
        }
    }
    var l = THREE.Shape.Utils.triangulateShape(i, j);
    f = 0;
    for (e = j.length; f < e; f++) {
        g = j[f];
        i = i.concat(g);
    }
    j = i.length;
    e = l.length;
    for (f = 0; f < j; f++) {
        g = i[f];
        this.vertices.push(new THREE.Vector3(g.x, g.y, 0));
    }
    for (f = 0; f < e; f++) {
        j = l[f];
        i = j[2] + h;
        g = j[1] + h;
        j = j[0] + h;
        this.faces.push(new THREE.Face3(i, g, j, null, null, c));
        this.faceVertexUvs[0].push(d.generateBottomUV(this, a, b, i, g, j));
    }
};
THREE.LatheGeometry = function (a, b, c) {
    THREE.Geometry.call(this);
    for (
        var b = b || 12,
            c = c || 2 * Math.PI,
            d = [],
            f = new THREE.Matrix4().makeRotationZ(c / b),
            e = 0;
        e < a.length;
        e++
    ) {
        d[e] = a[e].clone();
        this.vertices.push(d[e]);
    }
    for (var g = b + 1, c = 0; c < g; c++)
        for (e = 0; e < d.length; e++) {
            d[e] = f.multiplyVector3(d[e].clone());
            this.vertices.push(d[e]);
        }
    for (c = 0; c < b; c++) {
        d = 0;
        for (f = a.length; d < f - 1; d++) {
            this.faces.push(
                new THREE.Face4(
                    c * f + d,
                    ((c + 1) % g) * f + d,
                    ((c + 1) % g) * f + ((d + 1) % f),
                    c * f + ((d + 1) % f)
                )
            );
            this.faceVertexUvs[0].push([
                new THREE.UV(1 - c / b, d / f),
                new THREE.UV(1 - (c + 1) / b, d / f),
                new THREE.UV(1 - (c + 1) / b, (d + 1) / f),
                new THREE.UV(1 - c / b, (d + 1) / f)
            ]);
        }
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
};
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.PlaneGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this);
    for (
        var f = a / 2,
            e = b / 2,
            c = c || 1,
            d = d || 1,
            g = c + 1,
            h = d + 1,
            i = a / c,
            j = b / d,
            l = new THREE.Vector3(0, 0, 1),
            a = 0;
        a < h;
        a++
    )
        for (b = 0; b < g; b++)
            this.vertices.push(new THREE.Vector3(b * i - f, -(a * j - e), 0));
    for (a = 0; a < d; a++)
        for (b = 0; b < c; b++) {
            f = new THREE.Face4(
                b + g * a,
                b + g * (a + 1),
                b + 1 + g * (a + 1),
                b + 1 + g * a
            );
            f.normal.copy(l);
            f.vertexNormals.push(l.clone(), l.clone(), l.clone(), l.clone());
            this.faces.push(f);
            this.faceVertexUvs[0].push([
                new THREE.UV(b / c, 1 - a / d),
                new THREE.UV(b / c, 1 - (a + 1) / d),
                new THREE.UV((b + 1) / c, 1 - (a + 1) / d),
                new THREE.UV((b + 1) / c, 1 - a / d)
            ]);
        }
    this.computeCentroids();
};
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.SphereGeometry = function (a, b, c, d, f, e, g) {
    THREE.Geometry.call(this);
    var a = a || 50,
        d = d !== void 0 ? d : 0,
        f = f !== void 0 ? f : Math.PI * 2,
        e = e !== void 0 ? e : 0,
        g = g !== void 0 ? g : Math.PI,
        b = Math.max(3, Math.floor(b) || 8),
        c = Math.max(2, Math.floor(c) || 6),
        h,
        i,
        j = [],
        l = [];
    for (i = 0; i <= c; i++) {
        var n = [],
            m = [];
        for (h = 0; h <= b; h++) {
            var q = h / b,
                p = i / c,
                o = new THREE.Vector3();
            o.x = -a * Math.cos(d + q * f) * Math.sin(e + p * g);
            o.y = a * Math.cos(e + p * g);
            o.z = a * Math.sin(d + q * f) * Math.sin(e + p * g);
            this.vertices.push(o);
            n.push(this.vertices.length - 1);
            m.push(new THREE.UV(q, 1 - p));
        }
        j.push(n);
        l.push(m);
    }
    for (i = 0; i < c; i++)
        for (h = 0; h < b; h++) {
            var d = j[i][h + 1],
                f = j[i][h],
                e = j[i + 1][h],
                g = j[i + 1][h + 1],
                n = this.vertices[d].clone().normalize(),
                m = this.vertices[f].clone().normalize(),
                q = this.vertices[e].clone().normalize(),
                p = this.vertices[g].clone().normalize(),
                o = l[i][h + 1].clone(),
                r = l[i][h].clone(),
                t = l[i + 1][h].clone(),
                u = l[i + 1][h + 1].clone();
            if (Math.abs(this.vertices[d].y) == a) {
                this.faces.push(new THREE.Face3(d, e, g, [n, q, p]));
                this.faceVertexUvs[0].push([o, t, u]);
            } else if (Math.abs(this.vertices[e].y) == a) {
                this.faces.push(new THREE.Face3(d, f, e, [n, m, q]));
                this.faceVertexUvs[0].push([o, r, t]);
            } else {
                this.faces.push(new THREE.Face4(d, f, e, g, [n, m, q, p]));
                this.faceVertexUvs[0].push([o, r, t, u]);
            }
        }
    this.computeCentroids();
    this.computeFaceNormals();
    this.boundingSphere = { radius: a };
};
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TextGeometry = function (a, b) {
    var c = THREE.FontUtils.generateShapes(a, b);
    b.amount = b.height !== void 0 ? b.height : 50;
    if (b.bevelThickness === void 0) b.bevelThickness = 10;
    if (b.bevelSize === void 0) b.bevelSize = 8;
    if (b.bevelEnabled === void 0) b.bevelEnabled = false;
    THREE.ExtrudeGeometry.call(this, c, b);
};
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype);
THREE.TorusGeometry = function (a, b, c, d, f) {
    THREE.Geometry.call(this);
    this.radius = a || 100;
    this.tube = b || 40;
    this.segmentsR = c || 8;
    this.segmentsT = d || 6;
    this.arc = f || Math.PI * 2;
    f = new THREE.Vector3();
    a = [];
    b = [];
    for (c = 0; c <= this.segmentsR; c++)
        for (d = 0; d <= this.segmentsT; d++) {
            var e = (d / this.segmentsT) * this.arc,
                g = (c / this.segmentsR) * Math.PI * 2;
            f.x = this.radius * Math.cos(e);
            f.y = this.radius * Math.sin(e);
            var h = new THREE.Vector3();
            h.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(e);
            h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(e);
            h.z = this.tube * Math.sin(g);
            this.vertices.push(h);
            a.push(new THREE.UV(d / this.segmentsT, c / this.segmentsR));
            b.push(h.clone().subSelf(f).normalize());
        }
    for (c = 1; c <= this.segmentsR; c++)
        for (d = 1; d <= this.segmentsT; d++) {
            var f = (this.segmentsT + 1) * c + d - 1,
                e = (this.segmentsT + 1) * (c - 1) + d - 1,
                g = (this.segmentsT + 1) * (c - 1) + d,
                h = (this.segmentsT + 1) * c + d,
                i = new THREE.Face4(f, e, g, h, [b[f], b[e], b[g], b[h]]);
            i.normal.addSelf(b[f]);
            i.normal.addSelf(b[e]);
            i.normal.addSelf(b[g]);
            i.normal.addSelf(b[h]);
            i.normal.normalize();
            this.faces.push(i);
            this.faceVertexUvs[0].push([
                a[f].clone(),
                a[e].clone(),
                a[g].clone(),
                a[h].clone()
            ]);
        }
    this.computeCentroids();
};
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TorusKnotGeometry = function (a, b, c, d, f, e, g) {
    function h(a, b, c, d, e, f) {
        var g = Math.cos(a);
        Math.cos(b);
        b = Math.sin(a);
        a = (c / d) * a;
        c = Math.cos(a);
        g = e * (2 + c) * 0.5 * g;
        b = e * (2 + c) * b * 0.5;
        e = f * e * Math.sin(a) * 0.5;
        return new THREE.Vector3(g, b, e);
    }
    THREE.Geometry.call(this);
    this.radius = a || 200;
    this.tube = b || 40;
    this.segmentsR = c || 64;
    this.segmentsT = d || 8;
    this.p = f || 2;
    this.q = e || 3;
    this.heightScale = g || 1;
    this.grid = Array(this.segmentsR);
    c = new THREE.Vector3();
    d = new THREE.Vector3();
    f = new THREE.Vector3();
    for (a = 0; a < this.segmentsR; ++a) {
        this.grid[a] = Array(this.segmentsT);
        for (b = 0; b < this.segmentsT; ++b) {
            var i = (a / this.segmentsR) * 2 * this.p * Math.PI,
                g = (b / this.segmentsT) * 2 * Math.PI,
                e = h(i, g, this.q, this.p, this.radius, this.heightScale),
                i = h(
                    i + 0.01,
                    g,
                    this.q,
                    this.p,
                    this.radius,
                    this.heightScale
                );
            c.sub(i, e);
            d.add(i, e);
            f.cross(c, d);
            d.cross(f, c);
            f.normalize();
            d.normalize();
            i = -this.tube * Math.cos(g);
            g = this.tube * Math.sin(g);
            e.x = e.x + (i * d.x + g * f.x);
            e.y = e.y + (i * d.y + g * f.y);
            e.z = e.z + (i * d.z + g * f.z);
            this.grid[a][b] =
                this.vertices.push(new THREE.Vector3(e.x, e.y, e.z)) - 1;
        }
    }
    for (a = 0; a < this.segmentsR; ++a)
        for (b = 0; b < this.segmentsT; ++b) {
            var f = (a + 1) % this.segmentsR,
                e = (b + 1) % this.segmentsT,
                c = this.grid[a][b],
                d = this.grid[f][b],
                f = this.grid[f][e],
                e = this.grid[a][e],
                g = new THREE.UV(a / this.segmentsR, b / this.segmentsT),
                i = new THREE.UV((a + 1) / this.segmentsR, b / this.segmentsT),
                j = new THREE.UV(
                    (a + 1) / this.segmentsR,
                    (b + 1) / this.segmentsT
                ),
                l = new THREE.UV(a / this.segmentsR, (b + 1) / this.segmentsT);
            this.faces.push(new THREE.Face4(c, d, f, e));
            this.faceVertexUvs[0].push([g, i, j, l]);
        }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
};
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry = function (a, b, c, d, f, e) {
    THREE.Geometry.call(this);
    this.path = a;
    this.segments = b || 64;
    this.radius = c || 1;
    this.segmentsRadius = d || 8;
    this.closed = f || false;
    if (e) this.debug = new THREE.Object3D();
    this.grid = [];
    var g,
        h,
        e = this.segments + 1,
        i,
        j,
        l,
        n = new THREE.Vector3(),
        m,
        q,
        p,
        b = new THREE.TubeGeometry.FrenetFrames(a, b, f);
    m = b.tangents;
    q = b.normals;
    p = b.binormals;
    this.tangents = m;
    this.normals = q;
    this.binormals = p;
    for (b = 0; b < e; b++) {
        this.grid[b] = [];
        d = b / (e - 1);
        l = a.getPointAt(d);
        d = m[b];
        g = q[b];
        h = p[b];
        if (this.debug) {
            this.debug.add(new THREE.ArrowHelper(d, l, c, 255));
            this.debug.add(new THREE.ArrowHelper(g, l, c, 16711680));
            this.debug.add(new THREE.ArrowHelper(h, l, c, 65280));
        }
        for (d = 0; d < this.segmentsRadius; d++) {
            i = (d / this.segmentsRadius) * 2 * Math.PI;
            j = -this.radius * Math.cos(i);
            i = this.radius * Math.sin(i);
            n.copy(l);
            n.x = n.x + (j * g.x + i * h.x);
            n.y = n.y + (j * g.y + i * h.y);
            n.z = n.z + (j * g.z + i * h.z);
            this.grid[b][d] =
                this.vertices.push(new THREE.Vector3(n.x, n.y, n.z)) - 1;
        }
    }
    for (b = 0; b < this.segments; b++)
        for (d = 0; d < this.segmentsRadius; d++) {
            e = f ? (b + 1) % this.segments : b + 1;
            n = (d + 1) % this.segmentsRadius;
            a = this.grid[b][d];
            c = this.grid[e][d];
            e = this.grid[e][n];
            n = this.grid[b][n];
            m = new THREE.UV(b / this.segments, d / this.segmentsRadius);
            q = new THREE.UV((b + 1) / this.segments, d / this.segmentsRadius);
            p = new THREE.UV(
                (b + 1) / this.segments,
                (d + 1) / this.segmentsRadius
            );
            g = new THREE.UV(b / this.segments, (d + 1) / this.segmentsRadius);
            this.faces.push(new THREE.Face4(a, c, e, n));
            this.faceVertexUvs[0].push([m, q, p, g]);
        }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
};
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TubeGeometry.FrenetFrames = function (a, b, c) {
    new THREE.Vector3();
    var d = new THREE.Vector3();
    new THREE.Vector3();
    var f = [],
        e = [],
        g = [],
        h = new THREE.Vector3(),
        i = new THREE.Matrix4(),
        b = b + 1,
        j,
        l,
        n;
    this.tangents = f;
    this.normals = e;
    this.binormals = g;
    for (j = 0; j < b; j++) {
        l = j / (b - 1);
        f[j] = a.getTangentAt(l);
        f[j].normalize();
    }
    e[0] = new THREE.Vector3();
    g[0] = new THREE.Vector3();
    a = Number.MAX_VALUE;
    j = Math.abs(f[0].x);
    l = Math.abs(f[0].y);
    n = Math.abs(f[0].z);
    if (j <= a) {
        a = j;
        d.set(1, 0, 0);
    }
    if (l <= a) {
        a = l;
        d.set(0, 1, 0);
    }
    n <= a && d.set(0, 0, 1);
    h.cross(f[0], d).normalize();
    e[0].cross(f[0], h);
    g[0].cross(f[0], e[0]);
    for (j = 1; j < b; j++) {
        e[j] = e[j - 1].clone();
        g[j] = g[j - 1].clone();
        h.cross(f[j - 1], f[j]);
        if (h.length() > 1e-4) {
            h.normalize();
            d = Math.acos(f[j - 1].dot(f[j]));
            i.makeRotationAxis(h, d).multiplyVector3(e[j]);
        }
        g[j].cross(f[j], e[j]);
    }
    if (c) {
        d = Math.acos(e[0].dot(e[b - 1]));
        d = d / (b - 1);
        f[0].dot(h.cross(e[0], e[b - 1])) > 0 && (d = -d);
        for (j = 1; j < b; j++) {
            i.makeRotationAxis(f[j], d * j).multiplyVector3(e[j]);
            g[j].cross(f[j], e[j]);
        }
    }
};
THREE.PolyhedronGeometry = function (a, b, c, d) {
    function f(a) {
        var b = a.normalize().clone();
        b.index = i.vertices.push(b) - 1;
        var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
            a =
                Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI +
                0.5;
        b.uv = new THREE.UV(c, 1 - a);
        return b;
    }
    function e(a, b, c, d) {
        if (d < 1) {
            d = new THREE.Face3(a.index, b.index, c.index, [
                a.clone(),
                b.clone(),
                c.clone()
            ]);
            d.centroid.addSelf(a).addSelf(b).addSelf(c).divideScalar(3);
            d.normal = d.centroid.clone().normalize();
            i.faces.push(d);
            d = Math.atan2(d.centroid.z, -d.centroid.x);
            i.faceVertexUvs[0].push([
                h(a.uv, a, d),
                h(b.uv, b, d),
                h(c.uv, c, d)
            ]);
        } else {
            d = d - 1;
            e(a, g(a, b), g(a, c), d);
            e(g(a, b), b, g(b, c), d);
            e(g(a, c), g(b, c), c, d);
            e(g(a, b), g(b, c), g(a, c), d);
        }
    }
    function g(a, b) {
        n[a.index] || (n[a.index] = []);
        n[b.index] || (n[b.index] = []);
        var c = n[a.index][b.index];
        c === void 0 &&
            (n[a.index][b.index] =
                n[b.index][a.index] =
                c =
                    f(new THREE.Vector3().add(a, b).divideScalar(2)));
        return c;
    }
    function h(a, b, c) {
        c < 0 && a.u === 1 && (a = new THREE.UV(a.u - 1, a.v));
        b.x === 0 &&
            b.z === 0 &&
            (a = new THREE.UV(c / 2 / Math.PI + 0.5, a.v));
        return a;
    }
    THREE.Geometry.call(this);
    for (var c = c || 1, d = d || 0, i = this, j = 0, l = a.length; j < l; j++)
        f(new THREE.Vector3(a[j][0], a[j][1], a[j][2]));
    for (var n = [], a = this.vertices, j = 0, l = b.length; j < l; j++)
        e(a[b[j][0]], a[b[j][1]], a[b[j][2]], d);
    this.mergeVertices();
    j = 0;
    for (l = this.vertices.length; j < l; j++)
        this.vertices[j].multiplyScalar(c);
    this.computeCentroids();
    this.boundingSphere = { radius: c };
};
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.IcosahedronGeometry = function (a, b) {
    var c = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(
        this,
        [
            [-1, c, 0],
            [1, c, 0],
            [-1, -c, 0],
            [1, -c, 0],
            [0, -1, c],
            [0, 1, c],
            [0, -1, -c],
            [0, 1, -c],
            [c, 0, -1],
            [c, 0, 1],
            [-c, 0, -1],
            [-c, 0, 1]
        ],
        [
            [0, 11, 5],
            [0, 5, 1],
            [0, 1, 7],
            [0, 7, 10],
            [0, 10, 11],
            [1, 5, 9],
            [5, 11, 4],
            [11, 10, 2],
            [10, 7, 6],
            [7, 1, 8],
            [3, 9, 4],
            [3, 4, 2],
            [3, 2, 6],
            [3, 6, 8],
            [3, 8, 9],
            [4, 9, 5],
            [2, 4, 11],
            [6, 2, 10],
            [8, 6, 7],
            [9, 8, 1]
        ],
        a,
        b
    );
};
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.OctahedronGeometry = function (a, b) {
    THREE.PolyhedronGeometry.call(
        this,
        [
            [1, 0, 0],
            [-1, 0, 0],
            [0, 1, 0],
            [0, -1, 0],
            [0, 0, 1],
            [0, 0, -1]
        ],
        [
            [0, 2, 4],
            [0, 4, 3],
            [0, 3, 5],
            [0, 5, 2],
            [1, 2, 5],
            [1, 5, 3],
            [1, 3, 4],
            [1, 4, 2]
        ],
        a,
        b
    );
};
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.TetrahedronGeometry = function (a, b) {
    THREE.PolyhedronGeometry.call(
        this,
        [
            [1, 1, 1],
            [-1, -1, 1],
            [-1, 1, -1],
            [1, -1, -1]
        ],
        [
            [2, 1, 0],
            [0, 3, 2],
            [1, 3, 0],
            [2, 3, 1]
        ],
        a,
        b
    );
};
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ParametricGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this);
    var f = this.vertices,
        e = this.faces,
        g = this.faceVertexUvs[0],
        d = d === void 0 ? false : d,
        h,
        i,
        j,
        l,
        n = b + 1;
    for (h = 0; h <= c; h++) {
        l = h / c;
        for (i = 0; i <= b; i++) {
            j = i / b;
            j = a(j, l);
            f.push(j);
        }
    }
    var m, q, p, o;
    for (h = 0; h < c; h++)
        for (i = 0; i < b; i++) {
            a = h * n + i;
            f = h * n + i + 1;
            l = (h + 1) * n + i;
            j = (h + 1) * n + i + 1;
            m = new THREE.UV(i / b, h / c);
            q = new THREE.UV((i + 1) / b, h / c);
            p = new THREE.UV(i / b, (h + 1) / c);
            o = new THREE.UV((i + 1) / b, (h + 1) / c);
            if (d) {
                e.push(new THREE.Face3(a, f, l));
                e.push(new THREE.Face3(f, j, l));
                g.push([m, q, p]);
                g.push([q, o, p]);
            } else {
                e.push(new THREE.Face4(a, f, j, l));
                g.push([m, q, o, p]);
            }
        }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
};
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.ConvexGeometry = function (a) {
    function b(a) {
        var b = a.length();
        return new THREE.UV(a.x / b, a.y / b);
    }
    THREE.Geometry.call(this);
    for (
        var c = [
                [0, 1, 2],
                [0, 2, 1]
            ],
            d = 3;
        d < a.length;
        d++
    ) {
        var f = d,
            e = a[f].clone(),
            g = e.length();
        e.x = e.x + g * (Math.random() - 0.5) * 2e-6;
        e.y = e.y + g * (Math.random() - 0.5) * 2e-6;
        e.z = e.z + g * (Math.random() - 0.5) * 2e-6;
        for (var g = [], h = 0; h < c.length; ) {
            var i = c[h],
                j = e,
                l = a[i[0]],
                n;
            n = l;
            var m = a[i[1]],
                q = a[i[2]],
                p = new THREE.Vector3(),
                o = new THREE.Vector3();
            p.sub(q, m);
            o.sub(n, m);
            p.crossSelf(o);
            p.isZero() || p.normalize();
            n = p;
            l = n.dot(l);
            if (n.dot(j) >= l) {
                for (j = 0; j < 3; j++) {
                    l = [i[j], i[(j + 1) % 3]];
                    n = true;
                    for (m = 0; m < g.length; m++)
                        if (g[m][0] === l[1] && g[m][1] === l[0]) {
                            g[m] = g[g.length - 1];
                            g.pop();
                            n = false;
                            break;
                        }
                    n && g.push(l);
                }
                c[h] = c[c.length - 1];
                c.pop();
            } else h++;
        }
        for (m = 0; m < g.length; m++) c.push([g[m][0], g[m][1], f]);
    }
    f = 0;
    e = Array(a.length);
    for (d = 0; d < c.length; d++) {
        g = c[d];
        for (h = 0; h < 3; h++) {
            if (e[g[h]] === void 0) {
                e[g[h]] = f++;
                this.vertices.push(a[g[h]]);
            }
            g[h] = e[g[h]];
        }
    }
    for (d = 0; d < c.length; d++)
        this.faces.push(new THREE.Face3(c[d][0], c[d][1], c[d][2]));
    for (d = 0; d < this.faces.length; d++) {
        g = this.faces[d];
        this.faceVertexUvs[0].push([
            b(this.vertices[g.a]),
            b(this.vertices[g.b]),
            b(this.vertices[g.c])
        ]);
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
};
THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype);
THREE.AxisHelper = function () {
    THREE.Object3D.call(this);
    var a = new THREE.Geometry();
    a.vertices.push(new THREE.Vector3());
    a.vertices.push(new THREE.Vector3(0, 100, 0));
    var b = new THREE.CylinderGeometry(0, 5, 25, 5, 1),
        c;
    c = new THREE.Line(a, new THREE.LineBasicMaterial({ color: 16711680 }));
    c.rotation.z = -Math.PI / 2;
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({ color: 16711680 }));
    c.position.x = 100;
    c.rotation.z = -Math.PI / 2;
    this.add(c);
    c = new THREE.Line(a, new THREE.LineBasicMaterial({ color: 65280 }));
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({ color: 65280 }));
    c.position.y = 100;
    this.add(c);
    c = new THREE.Line(a, new THREE.LineBasicMaterial({ color: 255 }));
    c.rotation.x = Math.PI / 2;
    this.add(c);
    c = new THREE.Mesh(b, new THREE.MeshBasicMaterial({ color: 255 }));
    c.position.z = 100;
    c.rotation.x = Math.PI / 2;
    this.add(c);
};
THREE.AxisHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper = function (a, b, c, d) {
    THREE.Object3D.call(this);
    d === void 0 && (d = 16776960);
    c === void 0 && (c = 20);
    var f = new THREE.Geometry();
    f.vertices.push(new THREE.Vector3(0, 0, 0));
    f.vertices.push(new THREE.Vector3(0, 1, 0));
    this.line = new THREE.Line(f, new THREE.LineBasicMaterial({ color: d }));
    this.add(this.line);
    f = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
    this.cone = new THREE.Mesh(f, new THREE.MeshBasicMaterial({ color: d }));
    this.cone.position.set(0, 1, 0);
    this.add(this.cone);
    if (b instanceof THREE.Vector3) this.position = b;
    this.setDirection(a);
    this.setLength(c);
};
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype);
THREE.ArrowHelper.prototype.setDirection = function (a) {
    var b = new THREE.Vector3(0, 1, 0).crossSelf(a),
        a = Math.acos(new THREE.Vector3(0, 1, 0).dot(a.clone().normalize()));
    this.matrix = new THREE.Matrix4().makeRotationAxis(b.normalize(), a);
    this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder);
};
THREE.ArrowHelper.prototype.setLength = function (a) {
    this.scale.set(a, a, a);
};
THREE.ArrowHelper.prototype.setColor = function (a) {
    this.line.material.color.setHex(a);
    this.cone.material.color.setHex(a);
};
THREE.CameraHelper = function (a) {
    function b(a, b, d) {
        c(a, d);
        c(b, d);
    }
    function c(a, b) {
        d.geometry.vertices.push(new THREE.Vector3());
        d.geometry.colors.push(new THREE.Color(b));
        d.pointMap[a] === void 0 && (d.pointMap[a] = []);
        d.pointMap[a].push(d.geometry.vertices.length - 1);
    }
    THREE.Line.call(this);
    var d = this;
    this.geometry = new THREE.Geometry();
    this.material = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors
    });
    this.type = THREE.LinePieces;
    this.matrixWorld = a.matrixWorld;
    this.matrixAutoUpdate = false;
    this.pointMap = {};
    b("n1", "n2", 16755200);
    b("n2", "n4", 16755200);
    b("n4", "n3", 16755200);
    b("n3", "n1", 16755200);
    b("f1", "f2", 16755200);
    b("f2", "f4", 16755200);
    b("f4", "f3", 16755200);
    b("f3", "f1", 16755200);
    b("n1", "f1", 16755200);
    b("n2", "f2", 16755200);
    b("n3", "f3", 16755200);
    b("n4", "f4", 16755200);
    b("p", "n1", 16711680);
    b("p", "n2", 16711680);
    b("p", "n3", 16711680);
    b("p", "n4", 16711680);
    b("u1", "u2", 43775);
    b("u2", "u3", 43775);
    b("u3", "u1", 43775);
    b("c", "t", 16777215);
    b("p", "c", 3355443);
    b("cn1", "cn2", 3355443);
    b("cn3", "cn4", 3355443);
    b("cf1", "cf2", 3355443);
    b("cf3", "cf4", 3355443);
    this.camera = a;
    this.update(a);
};
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype);
THREE.CameraHelper.prototype.update = function () {
    function a(a, d, f, e) {
        THREE.CameraHelper.__v.set(d, f, e);
        THREE.CameraHelper.__projector.unprojectVector(
            THREE.CameraHelper.__v,
            THREE.CameraHelper.__c
        );
        a = b.pointMap[a];
        if (a !== void 0) {
            d = 0;
            for (f = a.length; d < f; d++)
                b.geometry.vertices[a[d]].copy(THREE.CameraHelper.__v);
        }
    }
    var b = this;
    THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);
    a("c", 0, 0, -1);
    a("t", 0, 0, 1);
    a("n1", -1, -1, -1);
    a("n2", 1, -1, -1);
    a("n3", -1, 1, -1);
    a("n4", 1, 1, -1);
    a("f1", -1, -1, 1);
    a("f2", 1, -1, 1);
    a("f3", -1, 1, 1);
    a("f4", 1, 1, 1);
    a("u1", 0.7, 1.1, -1);
    a("u2", -0.7, 1.1, -1);
    a("u3", 0, 2, -1);
    a("cf1", -1, 0, 1);
    a("cf2", 1, 0, 1);
    a("cf3", 0, -1, 1);
    a("cf4", 0, 1, 1);
    a("cn1", -1, 0, -1);
    a("cn2", 1, 0, -1);
    a("cn3", 0, -1, -1);
    a("cn4", 0, 1, -1);
    this.geometry.verticesNeedUpdate = true;
};
THREE.CameraHelper.__projector = new THREE.Projector();
THREE.CameraHelper.__v = new THREE.Vector3();
THREE.CameraHelper.__c = new THREE.Camera();
THREE.SubdivisionModifier = function (a) {
    this.subdivisions = a === void 0 ? 1 : a;
    this.useOldVertexColors = false;
    this.supportUVs = true;
    this.debug = false;
};
THREE.SubdivisionModifier.prototype.modify = function (a) {
    for (var b = this.subdivisions; b-- > 0; ) this.smooth(a);
};
THREE.SubdivisionModifier.prototype.smooth = function (a) {
    function b() {
        l.debug && console.log.apply(console, arguments);
    }
    function c() {
        console && console.log.apply(console, arguments);
    }
    function d(a, c, d, f, g, h, m) {
        var n = new THREE.Face4(a, c, d, f, null, g.color, g.materialIndex);
        if (l.useOldVertexColors) {
            n.vertexColors = [];
            for (var o, p, q, r = 0; r < 4; r++) {
                q = h[r];
                o = new THREE.Color();
                o.setRGB(0, 0, 0);
                for (var s = 0; s < q.length; s++) {
                    p = g.vertexColors[q[s] - 1];
                    o.r = o.r + p.r;
                    o.g = o.g + p.g;
                    o.b = o.b + p.b;
                }
                o.r = o.r / q.length;
                o.g = o.g / q.length;
                o.b = o.b / q.length;
                n.vertexColors[r] = o;
            }
        }
        i.push(n);
        if (l.supportUVs) {
            g = [e(a, ""), e(c, m), e(d, m), e(f, m)];
            g[0]
                ? g[1]
                    ? g[2]
                        ? g[3]
                            ? j.push(g)
                            : b("d :( ", f + ":" + m)
                        : b("c :( ", d + ":" + m)
                    : b("b :( ", c + ":" + m)
                : b("a :( ", a + ":" + m);
        }
    }
    function f(a, b) {
        return Math.min(a, b) + "_" + Math.max(a, b);
    }
    function e(a, d) {
        var e = a + ":" + d,
            f = r[e];
        if (!f) {
            a >= t && a < t + m.length ? b("face pt") : b("edge pt");
            c("warning, UV not found for", e);
            return null;
        }
        return f;
    }
    function g(a, b, d) {
        var e = a + ":" + b;
        e in r
            ? c("dup vertexNo", a, "oldFaceNo", b, "value", d, "key", e, r[e])
            : (r[e] = d);
    }
    var h = [],
        i = [],
        j = [],
        l = this,
        n = a.vertices,
        m = a.faces,
        h = n.concat(),
        q = [],
        p = {},
        o = {},
        r = {},
        t = n.length,
        u,
        w,
        s,
        B,
        v,
        A = a.faceVertexUvs[0];
    b("originalFaces, uvs, originalVerticesLength", m.length, A.length, t);
    if (l.supportUVs) {
        u = 0;
        for (w = A.length; u < w; u++) {
            s = 0;
            for (B = A[u].length; s < B; s++) {
                v = m[u]["abcd".charAt(s)];
                g(v, u, A[u][s]);
            }
        }
    }
    if (A.length == 0) l.supportUVs = false;
    u = 0;
    for (var E in r) u++;
    if (!u) {
        l.supportUVs = false;
        b("no uvs");
    }
    b("-- Original Faces + Vertices UVs completed", r, "vs", A.length);
    var z;
    u = 0;
    for (w = m.length; u < w; u++) {
        v = m[u];
        q.push(v.centroid);
        h.push(v.centroid);
        if (l.supportUVs) {
            z = new THREE.UV();
            if (v instanceof THREE.Face3) {
                z.u = e(v.a, u).u + e(v.b, u).u + e(v.c, u).u;
                z.v = e(v.a, u).v + e(v.b, u).v + e(v.c, u).v;
                z.u = z.u / 3;
                z.v = z.v / 3;
            } else if (v instanceof THREE.Face4) {
                z.u = e(v.a, u).u + e(v.b, u).u + e(v.c, u).u + e(v.d, u).u;
                z.v = e(v.a, u).v + e(v.b, u).v + e(v.c, u).v + e(v.d, u).v;
                z.u = z.u / 4;
                z.v = z.v / 4;
            }
            g(t + u, "", z);
        }
    }
    b("-- added UVs for new Faces", r);
    E = function (a, b) {
        M[a] === void 0 && (M[a] = []);
        M[a].push(b);
    };
    var M = {},
        A = 0;
    for (w = a.faces.length; A < w; A++) {
        v = a.faces[A];
        if (v instanceof THREE.Face3) {
            z = f(v.a, v.b);
            E(z, A);
            z = f(v.b, v.c);
            E(z, A);
            z = f(v.c, v.a);
            E(z, A);
        } else if (v instanceof THREE.Face4) {
            z = f(v.a, v.b);
            E(z, A);
            z = f(v.b, v.c);
            E(z, A);
            z = f(v.c, v.d);
            E(z, A);
            z = f(v.d, v.a);
            E(z, A);
        }
    }
    w = M;
    var D = 0,
        G,
        H;
    E = {};
    A = {};
    for (u in w) {
        z = w[u];
        G = u.split("_");
        H = G[0];
        G = G[1];
        s = H;
        v = [H, G];
        E[s] === void 0 && (E[s] = []);
        E[s].push(v);
        s = G;
        v = [H, G];
        E[s] === void 0 && (E[s] = []);
        E[s].push(v);
        s = 0;
        for (B = z.length; s < B; s++) {
            v = z[s];
            var O = H,
                F = v,
                J = u;
            A[O] === void 0 && (A[O] = {});
            A[O][F] = J;
            O = G;
            F = u;
            A[O] === void 0 && (A[O] = {});
            A[O][v] = F;
        }
        z.length < 2 && (o[u] = true);
    }
    b("vertexEdgeMap", E, "vertexFaceMap", A);
    for (u in w) {
        z = w[u];
        v = z[0];
        B = z[1];
        G = u.split("_");
        H = G[0];
        G = G[1];
        z = new THREE.Vector3();
        if (o[u]) {
            z.addSelf(n[H]);
            z.addSelf(n[G]);
            z.multiplyScalar(0.5);
        } else {
            z.addSelf(q[v]);
            z.addSelf(q[B]);
            z.addSelf(n[H]);
            z.addSelf(n[G]);
            z.multiplyScalar(0.25);
        }
        p[u] = t + m.length + D;
        h.push(z);
        D++;
        if (l.supportUVs) {
            z = new THREE.UV();
            z.u = e(H, v).u + e(G, v).u;
            z.v = e(H, v).v + e(G, v).v;
            z.u = z.u / 2;
            z.v = z.v / 2;
            g(p[u], v, z);
            if (!o[u]) {
                z = new THREE.UV();
                z.u = e(H, B).u + e(G, B).u;
                z.v = e(H, B).v + e(G, B).v;
                z.u = z.u / 2;
                z.v = z.v / 2;
                g(p[u], B, z);
            }
        }
    }
    b("-- Step 2 done");
    var I, K;
    G = ["123", "12", "2", "23"];
    B = ["123", "23", "3", "31"];
    var O = ["123", "31", "1", "12"],
        F = ["1234", "12", "2", "23"],
        J = ["1234", "23", "3", "34"],
        V = ["1234", "34", "4", "41"],
        Y = ["1234", "41", "1", "12"];
    u = 0;
    for (w = q.length; u < w; u++) {
        v = m[u];
        z = t + u;
        if (v instanceof THREE.Face3) {
            D = f(v.a, v.b);
            H = f(v.b, v.c);
            I = f(v.c, v.a);
            d(z, p[D], v.b, p[H], v, G, u);
            d(z, p[H], v.c, p[I], v, B, u);
            d(z, p[I], v.a, p[D], v, O, u);
        } else if (v instanceof THREE.Face4) {
            D = f(v.a, v.b);
            H = f(v.b, v.c);
            I = f(v.c, v.d);
            K = f(v.d, v.a);
            d(z, p[D], v.b, p[H], v, F, u);
            d(z, p[H], v.c, p[I], v, J, u);
            d(z, p[I], v.d, p[K], v, V, u);
            d(z, p[K], v.a, p[D], v, Y, u);
        } else b("face should be a face!", v);
    }
    p = new THREE.Vector3();
    v = new THREE.Vector3();
    u = 0;
    for (w = n.length; u < w; u++)
        if (E[u] !== void 0) {
            p.set(0, 0, 0);
            v.set(0, 0, 0);
            H = new THREE.Vector3(0, 0, 0);
            z = 0;
            for (s in A[u]) {
                p.addSelf(q[s]);
                z++;
            }
            G = 0;
            D = E[u].length;
            for (s = 0; s < D; s++) o[f(E[u][s][0], E[u][s][1])] && G++;
            if (G != 2) {
                p.divideScalar(z);
                for (s = 0; s < D; s++) {
                    z = E[u][s];
                    z = n[z[0]].clone().addSelf(n[z[1]]).divideScalar(2);
                    v.addSelf(z);
                }
                v.divideScalar(D);
                H.addSelf(n[u]);
                H.multiplyScalar(D - 3);
                H.addSelf(p);
                H.addSelf(v.multiplyScalar(2));
                H.divideScalar(D);
                h[u] = H;
            }
        }
    a.vertices = h;
    a.faces = i;
    a.faceVertexUvs[0] = j;
    delete a.__tmpVertices;
    a.computeCentroids();
    a.computeFaceNormals();
    a.computeVertexNormals();
};
THREE.ImmediateRenderObject = function () {
    THREE.Object3D.call(this);
    this.render = function () {};
};
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare = function (a, b, c, d, f) {
    THREE.Object3D.call(this);
    this.lensFlares = [];
    this.positionScreen = new THREE.Vector3();
    this.customUpdateCallback = void 0;
    a !== void 0 && this.add(a, b, c, d, f);
};
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype);
THREE.LensFlare.prototype.add = function (a, b, c, d, f, e) {
    b === void 0 && (b = -1);
    c === void 0 && (c = 0);
    e === void 0 && (e = 1);
    f === void 0 && (f = new THREE.Color(16777215));
    if (d === void 0) d = THREE.NormalBlending;
    c = Math.min(c, Math.max(0, c));
    this.lensFlares.push({
        texture: a,
        size: b,
        distance: c,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: e,
        color: f,
        blending: d
    });
};
THREE.LensFlare.prototype.updateLensFlares = function () {
    var a,
        b = this.lensFlares.length,
        c,
        d = -this.positionScreen.x * 2,
        f = -this.positionScreen.y * 2;
    for (a = 0; a < b; a++) {
        c = this.lensFlares[a];
        c.x = this.positionScreen.x + d * c.distance;
        c.y = this.positionScreen.y + f * c.distance;
        c.wantedRotation = c.x * Math.PI * 0.25;
        c.rotation = c.rotation + (c.wantedRotation - c.rotation) * 0.25;
    }
};
THREE.MorphBlendMesh = function (a, b) {
    THREE.Mesh.call(this, a, b);
    this.animationsMap = {};
    this.animationsList = [];
    var c = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, c - 1, c / 1);
    this.setAnimationWeight("__default", 1);
};
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.MorphBlendMesh.prototype.createAnimation = function (a, b, c, d) {
    b = {
        startFrame: b,
        endFrame: c,
        length: c - b + 1,
        fps: d,
        duration: (c - b) / d,
        lastFrame: 0,
        currentFrame: 0,
        active: false,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: false,
        mirroredLoop: false
    };
    this.animationsMap[a] = b;
    this.animationsList.push(b);
};
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (a) {
    for (
        var b = /([a-z]+)(\d+)/,
            c,
            d = {},
            f = this.geometry,
            e = 0,
            g = f.morphTargets.length;
        e < g;
        e++
    ) {
        var h = f.morphTargets[e].name.match(b);
        if (h && h.length > 1) {
            var i = h[1];
            d[i] || (d[i] = { start: Infinity, end: -Infinity });
            h = d[i];
            if (e < h.start) h.start = e;
            if (e > h.end) h.end = e;
            c || (c = i);
        }
    }
    for (i in d) {
        h = d[i];
        this.createAnimation(i, h.start, h.end, a);
    }
    this.firstAnimation = c;
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (a) {
    if ((a = this.animationsMap[a])) {
        a.direction = 1;
        a.directionBackwards = false;
    }
};
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (a) {
    if ((a = this.animationsMap[a])) {
        a.direction = -1;
        a.directionBackwards = true;
    }
};
THREE.MorphBlendMesh.prototype.setAnimationFPS = function (a, b) {
    var c = this.animationsMap[a];
    if (c) {
        c.fps = b;
        c.duration = (c.end - c.start) / c.fps;
    }
};
THREE.MorphBlendMesh.prototype.setAnimationDuration = function (a, b) {
    var c = this.animationsMap[a];
    if (c) {
        c.duration = b;
        c.fps = (c.end - c.start) / c.duration;
    }
};
THREE.MorphBlendMesh.prototype.setAnimationWeight = function (a, b) {
    var c = this.animationsMap[a];
    if (c) c.weight = b;
};
THREE.MorphBlendMesh.prototype.setAnimationTime = function (a, b) {
    var c = this.animationsMap[a];
    if (c) c.time = b;
};
THREE.MorphBlendMesh.prototype.getAnimationTime = function (a) {
    var b = 0;
    if ((a = this.animationsMap[a])) b = a.time;
    return b;
};
THREE.MorphBlendMesh.prototype.getAnimationDuration = function (a) {
    var b = -1;
    if ((a = this.animationsMap[a])) b = a.duration;
    return b;
};
THREE.MorphBlendMesh.prototype.playAnimation = function (a) {
    var b = this.animationsMap[a];
    if (b) {
        b.time = 0;
        b.active = true;
    } else console.warn("animation[" + a + "] undefined");
};
THREE.MorphBlendMesh.prototype.stopAnimation = function (a) {
    if ((a = this.animationsMap[a])) a.active = false;
};
THREE.MorphBlendMesh.prototype.update = function (a) {
    for (var b = 0, c = this.animationsList.length; b < c; b++) {
        var d = this.animationsList[b];
        if (d.active) {
            var f = d.duration / d.length;
            d.time = d.time + d.direction * a;
            if (d.mirroredLoop) {
                if (d.time > d.duration || d.time < 0) {
                    d.direction = d.direction * -1;
                    if (d.time > d.duration) {
                        d.time = d.duration;
                        d.directionBackwards = true;
                    }
                    if (d.time < 0) {
                        d.time = 0;
                        d.directionBackwards = false;
                    }
                }
            } else {
                d.time = d.time % d.duration;
                if (d.time < 0) d.time = d.time + d.duration;
            }
            var e =
                    d.startFrame +
                    THREE.Math.clamp(Math.floor(d.time / f), 0, d.length - 1),
                g = d.weight;
            if (e !== d.currentFrame) {
                this.morphTargetInfluences[d.lastFrame] = 0;
                this.morphTargetInfluences[d.currentFrame] = 1 * g;
                this.morphTargetInfluences[e] = 0;
                d.lastFrame = d.currentFrame;
                d.currentFrame = e;
            }
            f = (d.time % f) / f;
            d.directionBackwards && (f = 1 - f);
            this.morphTargetInfluences[d.currentFrame] = f * g;
            this.morphTargetInfluences[d.lastFrame] = (1 - f) * g;
        }
    }
};
THREE.LensFlarePlugin = function () {
    function a(a) {
        var c = b.createProgram(),
            d = b.createShader(b.FRAGMENT_SHADER),
            e = b.createShader(b.VERTEX_SHADER);
        b.shaderSource(d, a.fragmentShader);
        b.shaderSource(e, a.vertexShader);
        b.compileShader(d);
        b.compileShader(e);
        b.attachShader(c, d);
        b.attachShader(c, e);
        b.linkProgram(c);
        return c;
    }
    var b, c, d, f, e, g, h, i, j, l, n, m, q;
    this.init = function (p) {
        b = p.context;
        c = p;
        d = new Float32Array(16);
        f = new Uint16Array(6);
        p = 0;
        d[p++] = -1;
        d[p++] = -1;
        d[p++] = 0;
        d[p++] = 0;
        d[p++] = 1;
        d[p++] = -1;
        d[p++] = 1;
        d[p++] = 0;
        d[p++] = 1;
        d[p++] = 1;
        d[p++] = 1;
        d[p++] = 1;
        d[p++] = -1;
        d[p++] = 1;
        d[p++] = 0;
        d[p++] = 1;
        p = 0;
        f[p++] = 0;
        f[p++] = 1;
        f[p++] = 2;
        f[p++] = 0;
        f[p++] = 2;
        f[p++] = 3;
        e = b.createBuffer();
        g = b.createBuffer();
        b.bindBuffer(b.ARRAY_BUFFER, e);
        b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
        b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
        h = b.createTexture();
        i = b.createTexture();
        b.bindTexture(b.TEXTURE_2D, h);
        b.texImage2D(
            b.TEXTURE_2D,
            0,
            b.RGB,
            16,
            16,
            0,
            b.RGB,
            b.UNSIGNED_BYTE,
            null
        );
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
        b.bindTexture(b.TEXTURE_2D, i);
        b.texImage2D(
            b.TEXTURE_2D,
            0,
            b.RGBA,
            16,
            16,
            0,
            b.RGBA,
            b.UNSIGNED_BYTE,
            null
        );
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
        if (b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0) {
            j = false;
            l = a(THREE.ShaderFlares.lensFlare);
        } else {
            j = true;
            l = a(THREE.ShaderFlares.lensFlareVertexTexture);
        }
        n = {};
        m = {};
        n.vertex = b.getAttribLocation(l, "position");
        n.uv = b.getAttribLocation(l, "uv");
        m.renderType = b.getUniformLocation(l, "renderType");
        m.map = b.getUniformLocation(l, "map");
        m.occlusionMap = b.getUniformLocation(l, "occlusionMap");
        m.opacity = b.getUniformLocation(l, "opacity");
        m.color = b.getUniformLocation(l, "color");
        m.scale = b.getUniformLocation(l, "scale");
        m.rotation = b.getUniformLocation(l, "rotation");
        m.screenPosition = b.getUniformLocation(l, "screenPosition");
        q = false;
    };
    this.render = function (a, d, f, t) {
        var a = a.__webglFlares,
            u = a.length;
        if (u) {
            var w = new THREE.Vector3(),
                s = t / f,
                B = f * 0.5,
                v = t * 0.5,
                A = 16 / t,
                E = new THREE.Vector2(A * s, A),
                z = new THREE.Vector3(1, 1, 0),
                M = new THREE.Vector2(1, 1),
                D = m,
                A = n;
            b.useProgram(l);
            if (!q) {
                b.enableVertexAttribArray(n.vertex);
                b.enableVertexAttribArray(n.uv);
                q = true;
            }
            b.uniform1i(D.occlusionMap, 0);
            b.uniform1i(D.map, 1);
            b.bindBuffer(b.ARRAY_BUFFER, e);
            b.vertexAttribPointer(A.vertex, 2, b.FLOAT, false, 16, 0);
            b.vertexAttribPointer(A.uv, 2, b.FLOAT, false, 16, 8);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
            b.disable(b.CULL_FACE);
            b.depthMask(false);
            var G, H, O, F, J;
            for (G = 0; G < u; G++) {
                A = 16 / t;
                E.set(A * s, A);
                F = a[G];
                w.set(
                    F.matrixWorld.elements[12],
                    F.matrixWorld.elements[13],
                    F.matrixWorld.elements[14]
                );
                d.matrixWorldInverse.multiplyVector3(w);
                d.projectionMatrix.multiplyVector3(w);
                z.copy(w);
                M.x = z.x * B + B;
                M.y = z.y * v + v;
                if (j || (M.x > 0 && M.x < f && M.y > 0 && M.y < t)) {
                    b.activeTexture(b.TEXTURE1);
                    b.bindTexture(b.TEXTURE_2D, h);
                    b.copyTexImage2D(
                        b.TEXTURE_2D,
                        0,
                        b.RGB,
                        M.x - 8,
                        M.y - 8,
                        16,
                        16,
                        0
                    );
                    b.uniform1i(D.renderType, 0);
                    b.uniform2f(D.scale, E.x, E.y);
                    b.uniform3f(D.screenPosition, z.x, z.y, z.z);
                    b.disable(b.BLEND);
                    b.enable(b.DEPTH_TEST);
                    b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                    b.activeTexture(b.TEXTURE0);
                    b.bindTexture(b.TEXTURE_2D, i);
                    b.copyTexImage2D(
                        b.TEXTURE_2D,
                        0,
                        b.RGBA,
                        M.x - 8,
                        M.y - 8,
                        16,
                        16,
                        0
                    );
                    b.uniform1i(D.renderType, 1);
                    b.disable(b.DEPTH_TEST);
                    b.activeTexture(b.TEXTURE1);
                    b.bindTexture(b.TEXTURE_2D, h);
                    b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                    F.positionScreen.copy(z);
                    F.customUpdateCallback
                        ? F.customUpdateCallback(F)
                        : F.updateLensFlares();
                    b.uniform1i(D.renderType, 2);
                    b.enable(b.BLEND);
                    H = 0;
                    for (O = F.lensFlares.length; H < O; H++) {
                        J = F.lensFlares[H];
                        if (J.opacity > 0.001 && J.scale > 0.001) {
                            z.x = J.x;
                            z.y = J.y;
                            z.z = J.z;
                            A = (J.size * J.scale) / t;
                            E.x = A * s;
                            E.y = A;
                            b.uniform3f(D.screenPosition, z.x, z.y, z.z);
                            b.uniform2f(D.scale, E.x, E.y);
                            b.uniform1f(D.rotation, J.rotation);
                            b.uniform1f(D.opacity, J.opacity);
                            b.uniform3f(
                                D.color,
                                J.color.r,
                                J.color.g,
                                J.color.b
                            );
                            c.setBlending(
                                J.blending,
                                J.blendEquation,
                                J.blendSrc,
                                J.blendDst
                            );
                            c.setTexture(J.texture, 1);
                            b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                        }
                    }
                }
            }
            b.enable(b.CULL_FACE);
            b.enable(b.DEPTH_TEST);
            b.depthMask(true);
        }
    };
};
THREE.ShadowMapPlugin = function () {
    var a,
        b,
        c,
        d,
        f,
        e,
        g = new THREE.Frustum(),
        h = new THREE.Matrix4(),
        i = new THREE.Vector3(),
        j = new THREE.Vector3();
    this.init = function (g) {
        a = g.context;
        b = g;
        var g = THREE.ShaderLib.depthRGBA,
            h = THREE.UniformsUtils.clone(g.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h
        });
        d = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            morphTargets: true
        });
        f = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            skinning: true
        });
        e = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            morphTargets: true,
            skinning: true
        });
        c._shadowPass = true;
        d._shadowPass = true;
        f._shadowPass = true;
        e._shadowPass = true;
    };
    this.render = function (a, c) {
        b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c);
    };
    this.update = function (l, n) {
        var m,
            q,
            p,
            o,
            r,
            t,
            u,
            w,
            s,
            B = [];
        o = 0;
        a.clearColor(1, 1, 1, 1);
        a.disable(a.BLEND);
        a.enable(a.CULL_FACE);
        a.frontFace(a.CCW);
        b.shadowMapCullFrontFaces ? a.cullFace(a.FRONT) : a.cullFace(a.BACK);
        b.setDepthTest(true);
        m = 0;
        for (q = l.__lights.length; m < q; m++) {
            p = l.__lights[m];
            if (p.castShadow)
                if (p instanceof THREE.DirectionalLight && p.shadowCascade)
                    for (r = 0; r < p.shadowCascadeCount; r++) {
                        var v;
                        if (p.shadowCascadeArray[r])
                            v = p.shadowCascadeArray[r];
                        else {
                            s = p;
                            u = r;
                            v = new THREE.DirectionalLight();
                            v.isVirtual = true;
                            v.onlyShadow = true;
                            v.castShadow = true;
                            v.shadowCameraNear = s.shadowCameraNear;
                            v.shadowCameraFar = s.shadowCameraFar;
                            v.shadowCameraLeft = s.shadowCameraLeft;
                            v.shadowCameraRight = s.shadowCameraRight;
                            v.shadowCameraBottom = s.shadowCameraBottom;
                            v.shadowCameraTop = s.shadowCameraTop;
                            v.shadowCameraVisible = s.shadowCameraVisible;
                            v.shadowDarkness = s.shadowDarkness;
                            v.shadowBias = s.shadowCascadeBias[u];
                            v.shadowMapWidth = s.shadowCascadeWidth[u];
                            v.shadowMapHeight = s.shadowCascadeHeight[u];
                            v.pointsWorld = [];
                            v.pointsFrustum = [];
                            w = v.pointsWorld;
                            t = v.pointsFrustum;
                            for (var A = 0; A < 8; A++) {
                                w[A] = new THREE.Vector3();
                                t[A] = new THREE.Vector3();
                            }
                            w = s.shadowCascadeNearZ[u];
                            s = s.shadowCascadeFarZ[u];
                            t[0].set(-1, -1, w);
                            t[1].set(1, -1, w);
                            t[2].set(-1, 1, w);
                            t[3].set(1, 1, w);
                            t[4].set(-1, -1, s);
                            t[5].set(1, -1, s);
                            t[6].set(-1, 1, s);
                            t[7].set(1, 1, s);
                            v.originalCamera = n;
                            t = new THREE.Gyroscope();
                            t.position = p.shadowCascadeOffset;
                            t.add(v);
                            t.add(v.target);
                            n.add(t);
                            p.shadowCascadeArray[r] = v;
                            console.log("Created virtualLight", v);
                        }
                        u = p;
                        w = r;
                        s = u.shadowCascadeArray[w];
                        s.position.copy(u.position);
                        s.target.position.copy(u.target.position);
                        s.lookAt(s.target);
                        s.shadowCameraVisible = u.shadowCameraVisible;
                        s.shadowDarkness = u.shadowDarkness;
                        s.shadowBias = u.shadowCascadeBias[w];
                        t = u.shadowCascadeNearZ[w];
                        u = u.shadowCascadeFarZ[w];
                        s = s.pointsFrustum;
                        s[0].z = t;
                        s[1].z = t;
                        s[2].z = t;
                        s[3].z = t;
                        s[4].z = u;
                        s[5].z = u;
                        s[6].z = u;
                        s[7].z = u;
                        B[o] = v;
                        o++;
                    }
                else {
                    B[o] = p;
                    o++;
                }
        }
        m = 0;
        for (q = B.length; m < q; m++) {
            p = B[m];
            if (!p.shadowMap) {
                p.shadowMap = new THREE.WebGLRenderTarget(
                    p.shadowMapWidth,
                    p.shadowMapHeight,
                    {
                        minFilter: THREE.LinearFilter,
                        magFilter: THREE.LinearFilter,
                        format: THREE.RGBAFormat
                    }
                );
                p.shadowMapSize = new THREE.Vector2(
                    p.shadowMapWidth,
                    p.shadowMapHeight
                );
                p.shadowMatrix = new THREE.Matrix4();
            }
            if (!p.shadowCamera) {
                if (p instanceof THREE.SpotLight)
                    p.shadowCamera = new THREE.PerspectiveCamera(
                        p.shadowCameraFov,
                        p.shadowMapWidth / p.shadowMapHeight,
                        p.shadowCameraNear,
                        p.shadowCameraFar
                    );
                else if (p instanceof THREE.DirectionalLight)
                    p.shadowCamera = new THREE.OrthographicCamera(
                        p.shadowCameraLeft,
                        p.shadowCameraRight,
                        p.shadowCameraTop,
                        p.shadowCameraBottom,
                        p.shadowCameraNear,
                        p.shadowCameraFar
                    );
                else {
                    console.error("Unsupported light type for shadow");
                    continue;
                }
                l.add(p.shadowCamera);
                b.autoUpdateScene && l.updateMatrixWorld();
            }
            if (p.shadowCameraVisible && !p.cameraHelper) {
                p.cameraHelper = new THREE.CameraHelper(p.shadowCamera);
                p.shadowCamera.add(p.cameraHelper);
            }
            if (p.isVirtual && v.originalCamera == n) {
                r = n;
                o = p.shadowCamera;
                t = p.pointsFrustum;
                s = p.pointsWorld;
                i.set(Infinity, Infinity, Infinity);
                j.set(-Infinity, -Infinity, -Infinity);
                for (u = 0; u < 8; u++) {
                    w = s[u];
                    w.copy(t[u]);
                    THREE.ShadowMapPlugin.__projector.unprojectVector(w, r);
                    o.matrixWorldInverse.multiplyVector3(w);
                    if (w.x < i.x) i.x = w.x;
                    if (w.x > j.x) j.x = w.x;
                    if (w.y < i.y) i.y = w.y;
                    if (w.y > j.y) j.y = w.y;
                    if (w.z < i.z) i.z = w.z;
                    if (w.z > j.z) j.z = w.z;
                }
                o.left = i.x;
                o.right = j.x;
                o.top = j.y;
                o.bottom = i.y;
                o.updateProjectionMatrix();
            }
            o = p.shadowMap;
            t = p.shadowMatrix;
            r = p.shadowCamera;
            r.position.copy(p.matrixWorld.getPosition());
            r.lookAt(p.target.matrixWorld.getPosition());
            r.updateMatrixWorld();
            r.matrixWorldInverse.getInverse(r.matrixWorld);
            if (p.cameraHelper) p.cameraHelper.visible = p.shadowCameraVisible;
            p.shadowCameraVisible && p.cameraHelper.update();
            t.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
            t.multiplySelf(r.projectionMatrix);
            t.multiplySelf(r.matrixWorldInverse);
            if (!r._viewMatrixArray) r._viewMatrixArray = new Float32Array(16);
            if (!r._projectionMatrixArray)
                r._projectionMatrixArray = new Float32Array(16);
            r.matrixWorldInverse.flattenToArray(r._viewMatrixArray);
            r.projectionMatrix.flattenToArray(r._projectionMatrixArray);
            h.multiply(r.projectionMatrix, r.matrixWorldInverse);
            g.setFromMatrix(h);
            b.setRenderTarget(o);
            b.clear();
            s = l.__webglObjects;
            p = 0;
            for (o = s.length; p < o; p++) {
                u = s[p];
                t = u.object;
                u.render = false;
                if (
                    t.visible &&
                    t.castShadow &&
                    (!(t instanceof THREE.Mesh) ||
                        !t.frustumCulled ||
                        g.contains(t))
                ) {
                    t._modelViewMatrix.multiply(
                        r.matrixWorldInverse,
                        t.matrixWorld
                    );
                    u.render = true;
                }
            }
            p = 0;
            for (o = s.length; p < o; p++) {
                u = s[p];
                if (u.render) {
                    t = u.object;
                    u = u.buffer;
                    w = t.customDepthMaterial
                        ? t.customDepthMaterial
                        : t instanceof THREE.SkinnedMesh
                            ? t.geometry.morphTargets.length
                                ? e
                                : f
                            : t.geometry.morphTargets.length
                                ? d
                                : c;
                    u instanceof THREE.BufferGeometry
                        ? b.renderBufferDirect(r, l.__lights, null, w, u, t)
                        : b.renderBuffer(r, l.__lights, null, w, u, t);
                }
            }
            s = l.__webglObjectsImmediate;
            p = 0;
            for (o = s.length; p < o; p++) {
                u = s[p];
                t = u.object;
                if (t.visible && t.castShadow) {
                    t._modelViewMatrix.multiply(
                        r.matrixWorldInverse,
                        t.matrixWorld
                    );
                    b.renderImmediateObject(r, l.__lights, null, c, t);
                }
            }
        }
        m = b.getClearColor();
        q = b.getClearAlpha();
        a.clearColor(m.r, m.g, m.b, q);
        a.enable(a.BLEND);
        b.shadowMapCullFrontFaces && a.cullFace(a.BACK);
    };
};
THREE.ShadowMapPlugin.__projector = new THREE.Projector();
THREE.SpritePlugin = function () {
    function a(a, b) {
        return b.z - a.z;
    }
    var b, c, d, f, e, g, h, i, j, l;
    this.init = function (a) {
        b = a.context;
        c = a;
        d = new Float32Array(16);
        f = new Uint16Array(6);
        a = 0;
        d[a++] = -1;
        d[a++] = -1;
        d[a++] = 0;
        d[a++] = 0;
        d[a++] = 1;
        d[a++] = -1;
        d[a++] = 1;
        d[a++] = 0;
        d[a++] = 1;
        d[a++] = 1;
        d[a++] = 1;
        d[a++] = 1;
        d[a++] = -1;
        d[a++] = 1;
        d[a++] = 0;
        d[a++] = 1;
        a = 0;
        f[a++] = 0;
        f[a++] = 1;
        f[a++] = 2;
        f[a++] = 0;
        f[a++] = 2;
        f[a++] = 3;
        e = b.createBuffer();
        g = b.createBuffer();
        b.bindBuffer(b.ARRAY_BUFFER, e);
        b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
        b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
        var a = THREE.ShaderSprite.sprite,
            m = b.createProgram(),
            q = b.createShader(b.FRAGMENT_SHADER),
            p = b.createShader(b.VERTEX_SHADER);
        b.shaderSource(q, a.fragmentShader);
        b.shaderSource(p, a.vertexShader);
        b.compileShader(q);
        b.compileShader(p);
        b.attachShader(m, q);
        b.attachShader(m, p);
        b.linkProgram(m);
        h = m;
        i = {};
        j = {};
        i.position = b.getAttribLocation(h, "position");
        i.uv = b.getAttribLocation(h, "uv");
        j.uvOffset = b.getUniformLocation(h, "uvOffset");
        j.uvScale = b.getUniformLocation(h, "uvScale");
        j.rotation = b.getUniformLocation(h, "rotation");
        j.scale = b.getUniformLocation(h, "scale");
        j.alignment = b.getUniformLocation(h, "alignment");
        j.color = b.getUniformLocation(h, "color");
        j.map = b.getUniformLocation(h, "map");
        j.opacity = b.getUniformLocation(h, "opacity");
        j.useScreenCoordinates = b.getUniformLocation(
            h,
            "useScreenCoordinates"
        );
        j.affectedByDistance = b.getUniformLocation(h, "affectedByDistance");
        j.screenPosition = b.getUniformLocation(h, "screenPosition");
        j.modelViewMatrix = b.getUniformLocation(h, "modelViewMatrix");
        j.projectionMatrix = b.getUniformLocation(h, "projectionMatrix");
        l = false;
    };
    this.render = function (d, f, q, p) {
        var d = d.__webglSprites,
            o = d.length;
        if (o) {
            var r = i,
                t = j,
                u = p / q,
                q = q * 0.5,
                w = p * 0.5,
                s = true;
            b.useProgram(h);
            if (!l) {
                b.enableVertexAttribArray(r.position);
                b.enableVertexAttribArray(r.uv);
                l = true;
            }
            b.disable(b.CULL_FACE);
            b.enable(b.BLEND);
            b.depthMask(true);
            b.bindBuffer(b.ARRAY_BUFFER, e);
            b.vertexAttribPointer(r.position, 2, b.FLOAT, false, 16, 0);
            b.vertexAttribPointer(r.uv, 2, b.FLOAT, false, 16, 8);
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, g);
            b.uniformMatrix4fv(
                t.projectionMatrix,
                false,
                f._projectionMatrixArray
            );
            b.activeTexture(b.TEXTURE0);
            b.uniform1i(t.map, 0);
            for (var B, v = [], r = 0; r < o; r++) {
                B = d[r];
                if (B.visible && B.opacity !== 0)
                    if (B.useScreenCoordinates) B.z = -B.position.z;
                    else {
                        B._modelViewMatrix.multiply(
                            f.matrixWorldInverse,
                            B.matrixWorld
                        );
                        B.z = -B._modelViewMatrix.elements[14];
                    }
            }
            d.sort(a);
            for (r = 0; r < o; r++) {
                B = d[r];
                if (
                    B.visible &&
                    B.opacity !== 0 &&
                    B.map &&
                    B.map.image &&
                    B.map.image.width
                ) {
                    if (B.useScreenCoordinates) {
                        b.uniform1i(t.useScreenCoordinates, 1);
                        b.uniform3f(
                            t.screenPosition,
                            (B.position.x - q) / q,
                            (w - B.position.y) / w,
                            Math.max(0, Math.min(1, B.position.z))
                        );
                    } else {
                        b.uniform1i(t.useScreenCoordinates, 0);
                        b.uniform1i(
                            t.affectedByDistance,
                            B.affectedByDistance ? 1 : 0
                        );
                        b.uniformMatrix4fv(
                            t.modelViewMatrix,
                            false,
                            B._modelViewMatrix.elements
                        );
                    }
                    f = B.map.image.width / (B.scaleByViewport ? p : 1);
                    v[0] = f * u * B.scale.x;
                    v[1] = f * B.scale.y;
                    b.uniform2f(t.uvScale, B.uvScale.x, B.uvScale.y);
                    b.uniform2f(t.uvOffset, B.uvOffset.x, B.uvOffset.y);
                    b.uniform2f(t.alignment, B.alignment.x, B.alignment.y);
                    b.uniform1f(t.opacity, B.opacity);
                    b.uniform3f(t.color, B.color.r, B.color.g, B.color.b);
                    b.uniform1f(t.rotation, B.rotation);
                    b.uniform2fv(t.scale, v);
                    if (B.mergeWith3D && !s) {
                        b.enable(b.DEPTH_TEST);
                        s = true;
                    } else if (!B.mergeWith3D && s) {
                        b.disable(b.DEPTH_TEST);
                        s = false;
                    }
                    c.setBlending(
                        B.blending,
                        B.blendEquation,
                        B.blendSrc,
                        B.blendDst
                    );
                    c.setTexture(B.map, 0);
                    b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
                }
            }
            b.enable(b.CULL_FACE);
            b.enable(b.DEPTH_TEST);
            b.depthMask(true);
        }
    };
};
THREE.DepthPassPlugin = function () {
    this.enabled = false;
    this.renderTarget = null;
    var a,
        b,
        c,
        d,
        f = new THREE.Frustum(),
        e = new THREE.Matrix4();
    this.init = function (e) {
        a = e.context;
        b = e;
        var e = THREE.ShaderLib.depthRGBA,
            f = THREE.UniformsUtils.clone(e.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: e.fragmentShader,
            vertexShader: e.vertexShader,
            uniforms: f
        });
        d = new THREE.ShaderMaterial({
            fragmentShader: e.fragmentShader,
            vertexShader: e.vertexShader,
            uniforms: f,
            morphTargets: true
        });
        c._shadowPass = true;
        d._shadowPass = true;
    };
    this.render = function (a, b) {
        this.enabled && this.update(a, b);
    };
    this.update = function (g, h) {
        var i, j, l, n, m, q;
        a.clearColor(1, 1, 1, 1);
        a.disable(a.BLEND);
        b.setDepthTest(true);
        b.autoUpdateScene && g.updateMatrixWorld();
        if (!h._viewMatrixArray) h._viewMatrixArray = new Float32Array(16);
        if (!h._projectionMatrixArray)
            h._projectionMatrixArray = new Float32Array(16);
        h.matrixWorldInverse.getInverse(h.matrixWorld);
        h.matrixWorldInverse.flattenToArray(h._viewMatrixArray);
        h.projectionMatrix.flattenToArray(h._projectionMatrixArray);
        e.multiply(h.projectionMatrix, h.matrixWorldInverse);
        f.setFromMatrix(e);
        b.setRenderTarget(this.renderTarget);
        b.clear();
        q = g.__webglObjects;
        i = 0;
        for (j = q.length; i < j; i++) {
            l = q[i];
            m = l.object;
            l.render = false;
            if (
                m.visible &&
                (!(m instanceof THREE.Mesh) ||
                    !m.frustumCulled ||
                    f.contains(m))
            ) {
                m._modelViewMatrix.multiply(
                    h.matrixWorldInverse,
                    m.matrixWorld
                );
                l.render = true;
            }
        }
        i = 0;
        for (j = q.length; i < j; i++) {
            l = q[i];
            if (l.render) {
                m = l.object;
                l = l.buffer;
                m.material && b.setMaterialFaces(m.material);
                n = m.customDepthMaterial
                    ? m.customDepthMaterial
                    : m.geometry.morphTargets.length
                        ? d
                        : c;
                l instanceof THREE.BufferGeometry
                    ? b.renderBufferDirect(h, g.__lights, null, n, l, m)
                    : b.renderBuffer(h, g.__lights, null, n, l, m);
            }
        }
        q = g.__webglObjectsImmediate;
        i = 0;
        for (j = q.length; i < j; i++) {
            l = q[i];
            m = l.object;
            if (m.visible && m.castShadow) {
                m._modelViewMatrix.multiply(
                    h.matrixWorldInverse,
                    m.matrixWorld
                );
                b.renderImmediateObject(h, g.__lights, null, c, m);
            }
        }
        i = b.getClearColor();
        j = b.getClearAlpha();
        a.clearColor(i.r, i.g, i.b, j);
        a.enable(a.BLEND);
    };
};
THREE.ShaderFlares = {
    lensFlareVertexTexture: {
        vertexShader:
            "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader:
            "precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    },
    lensFlare: {
        vertexShader:
            "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader:
            "precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    }
};
THREE.ShaderSprite = {
    sprite: {
        vertexShader:
            "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader:
            "precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"
    }
};
export default THREE;
