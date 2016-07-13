// 常用的功能：
// uglify:压缩
// cssmin:css操作
// imagemin：图片操作
// htmlmin:html操作
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {//压缩
            options: {
                mangle: false, //不混淆变量名
                preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'//头信息
            },
            build: {
                //动态文件映射，当运行任务时会自动找到cwd参数下的src参数下所有符合规则的js文件
                //添加或删除文件时不需要更新 Gruntfile。
                files: [
                   {
                       expand: true,       // 启用动态扩展
                       cwd: 'Scripts/',    // 源文件匹配都相对此目录
                       src: ['*.js'],      // 匹配规则
                       dest: 'dest/js/',   // 任务目标保存路径
                       ext: '.min.js',     // 目标文件路径中文件的扩展名
                       extDot: 'first'     // 扩展名始于文件名的第一个点号
                   },
                ],
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            //动态文件映射，当运行任务时会自动找到cwd参数下的src参数下所有符合规则的css文件
            build: {
                files: [{
                    expand: true,
                    cwd: 'Content/',
                    src: ['*.css', '**/*.css'],
                    dest: 'dest/css/',
                    ext: '.min.css',
                    extDot: 'first'
                }]
            }
        }

    });
    grunt.file.defaultEncoding = 'GBK';
    //载入concat和uglify插件，分别对于合并和压缩 
    grunt.loadNpmTasks('grunt-contrib-uglify');//
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //当执行 Grunt 且不通过参数指定任务时，将执行本配置的内容任务。
    grunt.registerTask('default', ['uglify', 'cssmin']);
}