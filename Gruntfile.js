'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dist: {
        files: 
        [
          {
            expand: true,
            cwd: 'css',
            src: ['*.less'],
            dest: 'css',
            ext: '.css'
          },
          {
            expand: true,
            cwd: 'css_an',
            src: ['*.less'],
            dest: 'css_an',
            ext: '.css'
          }
        ]
      }
    },
    sprite:{
      all: {
        // 待合并的文件
        src               : 'images/src/*.png',
        // 合并后输出的文件
        dest              : 'images/dest/sprite.png',
        // 输出对应雪碧图的样式
        destCss           : 'css/sprite.less',
        // 可选: 手动指定样式里引用图片的路径
        imgPath           : '../images/dest/sprite.png',
        cssVarMap: function(sprite) {
            sprite.name = sprite.name.replace(/^\s{1}/, ''); //去除文件名前空白
            sprite.name = sprite.name.replace('@2x', '');
            sprite.name = 'icon-' + sprite.name;
        },
        // 可选: 指定算法 (top-down, left-right, diagonal,alt-diagonal, binary-tree )等
        // 默认是top-down,二叉树合并出来的图体积最小
        algorithm         : 'binary-tree',
        // 可选: 指定CSS格式 (默认根据destCSS中的后缀设置格式)
        // (stylus, scss, scss_maps, sass, less, json, json_array, css)
        cssFormat        : 'less'
      }
    },
    watch: {
      options: {
        nospawn: true
      },
      css: {
        files: [
          'css/*.less',
          'css_an/*.less'
        ],
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks( "grunt-contrib-less" );
  grunt.loadNpmTasks( "grunt-contrib-watch" );
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('default', [
    'sprite'
  ]);
};
