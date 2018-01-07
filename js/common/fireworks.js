/**
 * 动画：烟花
 * @author juedis
 */

import Particle from './particle';
import { debounce } from '../common/common';

module.exports = function () {
    var MAX_PARTICLES = 280;
    var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
    var TWO_PI = 6.28;

    var particles = [];
    var pool = [];

    // 创建一个新的sketch对象
    var sketch = Sketch.create({
        'container': document.body
    });

    /**
     * 启动
     * @returns none
     */ 
    sketch.setup = function () {
        var particle, max, i, n, x, y;

        max = random(60, 600);
        x = window.innerWidth / 2 - 100;
        y = window.innerHeight / 2 - 100;

        for (i = 0; i < max; i ++) {
            sketch.spawn(x, y);
        }
    };

    /**
     * 生成圆球
     * @params { Number } 坐标x
     * @params { Number } 坐标y     
     * @returns none
     */ 
    sketch.spawn = function (x, y) {

        var particle, theta, force;

        if (particles.length >= MAX_PARTICLES) {
            pool.push(particles.shift());
        }

        particle = pool.length ? pool.pop() : new Particle();
        particle.init(x, y, random(5, 40));

        particle.wander = random(0.5, 2.0);
        particle.color = random(COLOURS);
        particle.drag = random(0.9, 0.99);

        theta = random(TWO_PI);
        force = random(2, 8);

        particle.vx = sin(theta) * force;
        particle.vy = cos(theta) * force;

        particles.push(particle);
    };

    /**
     * 更新
     * @returns none
     */ 
    sketch.update = function () {

        var i, particle;

        for (i = particles.length - 1; i >= 0; i--) {

            particle = particles[i];

            if (particle.alive)
                particle.move();
            else
                pool.push(particles.splice(i, 1)[0]);
        }
    };

    /**
     * 绘制圆型
     * @returns none
     */ 
    sketch.draw = function () {

        sketch.globalCompositeOperation = 'lighter';

        for ( var i = particles.length - 1; i >= 0; i--) {
            particles[i].draw(sketch);
        }
    };

    /**
     * 添加webGl消息
     * @params { Object } 参数
     * @returns none
     */ 
    sketch.mousemove = debounce(function () {

        var particle, theta, force, touch, max, i, j, n;

        for (i = 0, n = sketch.touches.length; i < n; i++) {

            touch = sketch.touches[i], max = random(1, 4);

            for (j = 0; j < max; j++) {
                sketch.spawn(touch.x, touch.y);
            }
        }
    }, 60, false);
};

