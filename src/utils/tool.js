import CryptoJS from 'crypto-js';
import sysConfig from "../config/index";

const tool = {}

/* localStorage */
tool.data = {
    set(key, data, datetime = 0) {
        //加密
        if (sysConfig.LS_ENCRYPTION == "AES") {
            data = tool.crypto.AES.encrypt(JSON.stringify(data), sysConfig.LS_ENCRYPTION_key)
        }
        let cacheValue = {
            content: data,
            datetime: parseInt(datetime) === 0 ? 0 : new Date().getTime() + parseInt(datetime) * 1000
        }
        return localStorage.setItem(key, JSON.stringify(cacheValue))
    },
    get(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key))
            if (value) {
                let nowTime = new Date().getTime()
                if (nowTime > value.datetime && value.datetime != 0) {
                    localStorage.removeItem(key)
                    return null;
                }
                //解密
                if (sysConfig.LS_ENCRYPTION == "AES") {
                    value.content = JSON.parse(tool.crypto.AES.decrypt(value.content, sysConfig.LS_ENCRYPTION_key))
                }
                return value.content
            }
            return null
        } catch (err) {
            return null
        }
    },
    remove(key) {
        return localStorage.removeItem(key)
    },
    clear() {
        return localStorage.clear()
    }
}

/*sessionStorage*/
tool.session = {
    set(table, settings) {
        let _set = JSON.stringify(settings)
        return sessionStorage.setItem(table, _set);
    },
    get(table) {
        let data = sessionStorage.getItem(table);
        try {
            data = JSON.parse(data)
        } catch (err) {
            return null
        }
        return data;
    },
    remove(table) {
        return sessionStorage.removeItem(table);
    },
    clear() {
        return sessionStorage.clear();
    }
}

/*cookie*/
tool.cookie = {
    set(name, value, config = {}) {
        let cfg = {
            expires: null,
            path: null,
            domain: null,
            secure: false,
            httpOnly: false,
            sameSite: 'Strict',
            ...config
        }
        let cookieStr = `${name}=${escape(value)}`
        if (cfg.expires) {
            let exp = new Date()
            exp.setTime(exp.getTime() + parseInt(cfg.expires) * 1000)
            cookieStr += `;expires=${exp.toGMTString()}`
        }
        if (cfg.path) {
            cookieStr += `;path=${cfg.path}`
        }
        if (cfg.domain) {
            cookieStr += `;domain=${cfg.domain}`
        }
        if (cfg.sameSite) {
            cookieStr += `;sameSite=${cfg.sameSite}`
        }
        document.cookie = cookieStr
    },
    get(name) {
        let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"))
        if (arr != null) {
            return unescape(arr[2])
        } else {
            return null
        }
    },
    remove(name) {
        let exp = new Date()
        exp.setTime(exp.getTime() - 1)
        document.cookie = `${name}=;expires=${exp.toGMTString()}`
    }
}

/* Fullscreen */
tool.screen = function (element) {
    let isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    if (isFull) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    } else {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
}

/* 复制对象 */
tool.objCopy = function (value) {
    const cache = new WeakMap();
    function _deepClone(value) {
        if (value === null || typeof value !== 'object') return value;
        if (value instanceof Date) return new Date(value.getTime());
        if (value instanceof RegExp) return new RegExp(value);
        if (cache.has(value)) return cache.get(value);
        const result = Array.isArray(value) ? [] : {};
        cache.set(value, result);
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                result[key] = _deepClone(value[key]);
            }
        }
        return result;
    }
    return _deepClone(value);
}

/* 日期格式化 */
tool.dateFormat = function (date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date)
    let o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/* 千分符 */
tool.groupSeparator = function (num) {
    num = num + '';
    if (!num.includes('.')) {
        num += '.'
    }
    return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ',';
    }).replace(/\.$/, '');
}

/* 常用加解密 */
tool.crypto = {
    //MD5加密
    MD5(data) {
        return CryptoJS.MD5(data).toString()
    },
    //BASE64加解密
    BASE64: {
        encrypt(data) {
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
        },
        decrypt(cipher) {
            return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)
        }
    },
    //AES加解密
    AES: {
        encrypt(data, secretKey, config = {}) {
            if (secretKey.length % 8 != 0) {
                console.warn("[app error]: 秘钥长度需为8的倍数，否则解密将会失败。")
            }
            const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
                iv: CryptoJS.enc.Utf8.parse(config.iv || ""),
                mode: CryptoJS.mode[config.mode || "ECB"],
                padding: CryptoJS.pad[config.padding || "Pkcs7"]
            })
            return result.toString()
        },
        decrypt(cipher, secretKey, config = {}) {
            const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
                iv: CryptoJS.enc.Utf8.parse(config.iv || ""),
                mode: CryptoJS.mode[config.mode || "ECB"],
                padding: CryptoJS.pad[config.padding || "Pkcs7"]
            })
            return CryptoJS.enc.Utf8.stringify(result);
        }
    }
}

export default tool
