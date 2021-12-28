var gulp = require('gulp');
var babel = require('gulp-babel');//把es6语法解析成es5
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩
var rev = require('gulp-rev');//对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//替换路径
var htmlmin = require('gulp-htmlmin'); //压缩html里面的js，css，去除空格
var del = require('del');//删除文件

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./build/js'))
        .pipe(rev.manifest('rev-js-manifest.json'))
        .pipe(gulp.dest('./build/js'));
});

var imageFile = './src/img/**/*'
//拷贝除HTML外其他的文件
gulp.task('copyImg', function () {
    return gulp.src([imageFile])
        .pipe(gulp.dest('./build/img'));
});

gulp.task('revimg', function () {
    //css，主要是针对img替换
    return gulp.src(['./build/**/rev-images-manifest.json', './build/css/*.css'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('./build/css'));
});

//css压缩
var autoprefix = require('gulp-autoprefixer');//兼容处理
var minifyCss = require('gulp-minify-css');//压缩
gulp.task('style', function () {
    return gulp.src('./src/css/*.css')
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('./build/css'))
        .pipe(rev.manifest('rev-css-manifest.json'))
        .pipe(gulp.dest('./build/css'));
});

//html压缩
gulp.task('revHtml', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        babel: true,
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('./src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./build'))
});

//使用rev替换成md5文件名，这里包括html和css的资源文件也一起
gulp.task('rev', function () {
    //html，针对js,css,img
    return gulp.src(['./build/**/*.json', './build/*.html'])
        .pipe(revCollector({

            replaceReved: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('revjs', function () {
    //css，主要是针对img替换
    return gulp.src(['./build/**/rev-images-manifest.json', './build/js/**/*.js'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                '../img': '../build/img'
            }
        }))
        .pipe(gulp.dest('./build/js'));
});

//删除Build文件
gulp.task('clean:Build', function () {
    return del([
        './build/**/',
    ]);
});

//执行多个任务gulp4的用法 gulp.series()串行，gulp.parallel()并行
gulp.task('default', gulp.series('clean:Build', gulp.parallel('js', 'copyImg', 'style', 'revHtml'), 'rev', 'revjs', function () {

}))