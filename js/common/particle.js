/**
 * 动画：圆球
 * @author Philip
 */

/**
 * 绘制圆球
 * @constructor 
 * @param { Number } x轴位移
 * @param { Number } y轴位移
 * @param { Number } 角度
 */
function Particle(x, y, radius) {
    this.init(x, y, radius);
}

Particle.prototype = {
    /**
     * 初始化一个圆球
     * @param { Number } x轴位移
     * @param { Number } y轴位移
     * @param { Number } 角度
     * @returns none
     */ 
    init : function(x, y, radius) {

        this.alive = true;

        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta = random(TWO_PI);
        this.drag = 0.92;
        this.color = '#fff';

        this.x = x || 0.0;
        this.y = y || 0.0;

        this.vx = 0.0;
        this.vy = 0.0;
    },
    /**
     * 移动圆球
     * @returns none
     */ 
    move : function() {

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= this.drag;
        this.vy *= this.drag;

        this.theta += random(-0.5, 0.5) * this.wander;
        this.vx += sin(this.theta) * 0.1;
        this.vy += cos(this.theta) * 0.1;

        this.radius *= 0.96;
        this.alive = this.radius > 0.5;
    },
    /**
     * 绘制
     * @param { Context } 画笔
     * @returns none
     */ 
    draw : function(ctx) {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

module.exports = Particle;