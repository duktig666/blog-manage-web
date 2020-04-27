const os = require('os') // Node.js 的 os 模块提供了一些基本的系统操作函数

module.exports = {
    getIp(){
        const ifaces = os.networkInterfaces(); // 获得网络接口列表。
        let ip = '';
        for(const dev in ifaces) {
            ifaces[dev].forEach(function(details) {
                if(ip === '' && details.family === 'IPv4' && !details.internal) {
                    ip = details.address;
                    return;
                }
            })
        }
        // console.log('ip:',ip)
        return ip || '127.0.0.1'
    }
};