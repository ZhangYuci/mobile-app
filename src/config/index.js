const DEFAULT_CONFIG = {
    //标题
    APP_NAME: import.meta.env.VITE_APP_TITLE,
    //版本号
    APP_VER: "0.0.0",
    //是否加密localStorage, 为空不加密，可填写AES(模式ECB,移位Pkcs7)加密
    LS_ENCRYPTION: '',
    //localStorageAES加密秘钥，位数建议填写8的倍数
    LS_ENCRYPTION_key: '4Z^N4KJL&2PLxYz9',
    //接口地址
    API_URL: import.meta.env.VITE_APP_BASE_API,
    //请求超时
    TIMEOUT: 10000,
    //TokenCacheKey
    TOKEN_CACHE_KEY: "app-token",
    //TokenName
    TOKEN_NAME: "Authorization",
    //Token前缀，注意最后有个空格，如不需要需设置空字符串
    TOKEN_PREFIX: "Bearer ",
    //追加其他请求头
    HEADERS: {},
    //请求是否开启缓存
    REQUEST_CACHE: false,
};

export default DEFAULT_CONFIG;