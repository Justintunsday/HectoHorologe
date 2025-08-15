// 存储上一次的值用于比较
let lastStdHours = '00';
let lastStdMinutes = '00';
let lastStdSeconds = '00';
let lastCentesimalHours = '00';
let lastCentesimalMinutes = '00';
let lastCentesimalSeconds = '00';

// 平滑过渡的百进制秒针
let smoothCentesimalSeconds = 0;

// 高精度时钟更新
function updateClocks(timestamp) {
    const now = new Date();
    
    // 更新24小时制时钟
    const stdHours = now.getHours().toString().padStart(2, '0');
    const stdMinutes = now.getMinutes().toString().padStart(2, '0');
    const stdSeconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('std-hours').textContent = stdHours;
    document.getElementById('std-minutes').textContent = stdMinutes;
    document.getElementById('std-seconds').textContent = stdSeconds;
    
    // 计算百进制时间
    const totalSecondsToday = (now.getHours() * 3600) + 
                            (now.getMinutes() * 60) + 
                            now.getSeconds() + 
                            (now.getMilliseconds() / 1000);
    
    // 百进制计算 (100分钟=1小时, 100秒=1分钟)
    const centesimalHours = now.getHours(); // 小时保持24小时制
    
    // 计算百进制分钟 (100分钟=1小时)
    const centesimalMinutes = Math.floor((totalSecondsToday % 3600) / 36);
    
    // 平滑过渡的百进制秒针计算
    // 36秒标准时间 = 100百进制秒
    smoothCentesimalSeconds = (totalSecondsToday % 36) * (100 / 36);
    
    // 确保秒数在0-99.999...之间
    if (smoothCentesimalSeconds >= 100) {
        smoothCentesimalSeconds = 0;
    }
    
    const centesimalHoursStr = centesimalHours.toString().padStart(2, '0');
    const centesimalMinutesStr = centesimalMinutes.toString().padStart(2, '0');
    const centesimalSecondsStr = Math.floor(smoothCentesimalSeconds).toString().padStart(2, '0');
    
    // 更新百进制显示
    document.getElementById('centesimal-hours').textContent = centesimalHoursStr;
    document.getElementById('centesimal-minutes').textContent = centesimalMinutesStr;
    document.getElementById('centesimal-seconds').textContent = centesimalSecondsStr;
    
    // 检查哪些数字变化了并添加动画
    if (lastStdHours !== stdHours) {
        animateDigit('std-hours');
    }
    if (lastStdMinutes !== stdMinutes) {
        animateDigit('std-minutes');
    }
    if (lastStdSeconds !== stdSeconds) {
        animateDigit('std-seconds');
    }
    if (lastCentesimalHours !== centesimalHoursStr) {
        animateDigit('centesimal-hours');
    }
    if (lastCentesimalMinutes !== centesimalMinutesStr) {
        animateDigit('centesimal-minutes');
    }
    if (lastCentesimalSeconds !== centesimalSecondsStr) {
        animateDigit('centesimal-seconds');
    }
    
    // 更新上一次的值
    lastStdHours = stdHours;
    lastStdMinutes = stdMinutes;
    lastStdSeconds = stdSeconds;
    lastCentesimalHours = centesimalHoursStr;
    lastCentesimalMinutes = centesimalMinutesStr;
    lastCentesimalSeconds = centesimalSecondsStr;
    
    // 使用requestAnimationFrame实现平滑更新
    requestAnimationFrame(updateClocks);
}

// 数字翻转动画
function animateDigit(id) {
    const digit = document.getElementById(id);
    digit.style.animation = 'none';
    // 触发重绘
    void digit.offsetWidth;
    digit.style.animation = 'digitFlip 0.5s ease-out';
}

// 初始调用
document.addEventListener('DOMContentLoaded', () => {
    // 添加加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-out';
        document.body.style.opacity = '1';
    }, 100);
    
    requestAnimationFrame(updateClocks);
});