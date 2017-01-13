
var gulp = require('gulp');
var newer = require('gulp-newer');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var pkg = require('./package.json');

/*
* Gulp tasks setting
* */
var devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

var scss = {
    in: ['src/scss/map.scss', 'src/scss/style.scss'],
    watch: ['src/scss/**/*'],
    out: 'css/',
    sassOpts: {
        outputStyle: function() {
            devBuild ? 'nested' : 'compressed';
        },
        imagePath: '../images',
        precision: 8,
        errLogToConsole: true
    }
};
var connectOpts = {
    port: '3000',
    root: '',
    livereload: true
}

console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');


/*
* Gulp tasks
* */
gulp.task('clean', function() {
    del([
        'css/*'
    ]);
});

gulp.task('connect', function() {
    connect.server(connectOpts);
});

gulp.task('sass', function() {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(autoprefixer("last 5 version", "> 1%", "ie 8"))
        .pipe(gulp.dest(scss.out))
        .pipe(connect.reload(connectOpts));
});

gulp.task('default', ['sass', 'connect'], function() {
    gulp.watch(scss.watch, ['sass']);
});